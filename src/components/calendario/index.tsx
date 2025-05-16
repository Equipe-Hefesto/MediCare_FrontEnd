import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, PanResponder, GestureResponderEvent, PanResponderGestureState, Modal, } from 'react-native';
import dayjs, { Dayjs } from 'dayjs';
import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './style';

import 'dayjs/locale/pt';

dayjs.locale('pt');
interface Reminder {
    date: string;
    note: string;
    situacao: string;
    dosage?: string;
    observacao?: string;
}

interface CalendarProps {
    reminders?: Reminder[];
    onDayPress?: (date: Dayjs) => void;
}

const Calendar: React.FC<CalendarProps> = ({
    reminders = [],
    onDayPress = () => { },
}) => {
    const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedReminder, setSelectedReminder] = useState<Reminder | null>(
        null
    );


    const startOfMonth = currentDate.startOf('month');
    const startDay = startOfMonth.day();

    const getDaysArray = (): Dayjs[] => {
        const days: Dayjs[] = [];
        const firstCalendarDay = startOfMonth.subtract(startDay, 'day');
        for (let i = 0; i < 42; i++) {
            days.push(firstCalendarDay.add(i, 'day'));
        }
        return days;
    };

    const changeMonth = (amount: number) => {
        setCurrentDate((prev) => prev.add(amount, 'month'));
    };

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_evt, gestureState) =>
                Math.abs(gestureState.dx) > 20,
            onPanResponderRelease: (
                _evt: GestureResponderEvent,
                gestureState: PanResponderGestureState
            ) => {
                if (gestureState.dx > 50) changeMonth(-1);
                else if (gestureState.dx < -50) changeMonth(1);
            },
        })
    ).current;

    const getBackgroundColorForSituacao = (situacao: string) => {
        switch (situacao) {
            case 'pendente':
                return 'rgba(255, 217, 0, 0.7)';
            case 'concluido':
                return 'rgba(144, 238, 144, 0.7)';
            case 'atrasado':
                return 'rgba(255, 99, 71, 0.7)';
            default:
                return 'rgba(38, 119, 151, 0.7)';
        }
    };

    const handleReminderPress = (reminder: Reminder) => {
        setSelectedReminder(reminder);
        setModalVisible(true);
    };

    return (
        <View style={styles.card} {...panResponder.panHandlers}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.monthContainer}>
                        <Text style={styles.month}>{currentDate.format('MMMM')}</Text>
                    </View>
                    <View style={styles.yearContainer}>
                        <Text style={styles.year}>{currentDate.format('YYYY')}</Text>
                    </View>
                </View>

                <View style={styles.weekRow}>
                    {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day, idx) => (
                        <Text key={idx} style={styles.weekDay}>
                            {day}
                        </Text>
                    ))}
                </View>

                <FlatList
                    data={getDaysArray()}
                    numColumns={7}
                    scrollEnabled={false}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => {
                        const isCurrentMonth = item.month() === currentDate.month();
                        const isToday = item.isSame(dayjs(), 'day');
                        const reminder = reminders.find((r) =>
                            dayjs(r.date).isSame(item, 'day')
                        );

                        return (
                            <TouchableOpacity
                                style={[
                                    styles.dayCell,
                                    !isCurrentMonth && styles.dayOutsideMonth,
                                    isToday && styles.todayCell,
                                ]}
                                onPress={() => {
                                    onDayPress(item);
                                    if (reminder) handleReminderPress(reminder);
                                }}
                            >
                                <Text
                                    style={[styles.dayNumber, !isCurrentMonth && styles.dayNumberOutside]}
                                >
                                    {item.date()}
                                </Text>
                                {reminder && (
                                    <Text
                                        style={[
                                            styles.reminderText,
                                            { backgroundColor: getBackgroundColorForSituacao(reminder.situacao) },
                                        ]}
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                    >
                                        {reminder.note}
                                    </Text>
                                )}
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>

            {selectedReminder && (
                <Modal
                    transparent
                    visible={modalVisible}
                    animationType="fade"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <BlurView intensity={70} tint="light" style={styles.modalOverlay}>
                        <View style={styles.modalCard}>
                            <Text style={styles.modalTitle}>
                                <MaterialCommunityIcons size={32} name="pill" />
                                {selectedReminder.note}
                            </Text>

                            <Text style={styles.modalLabel}>Situação</Text>
                            <Text style={styles.modalText}>{selectedReminder.situacao}</Text>

                            <Text style={styles.modalLabel}>Data Lembrete</Text>
                            <Text style={styles.modalText}>{selectedReminder.date}</Text>

                            <Text style={styles.modalLabel}>Observação</Text>
                            <Text style={styles.modalText}>{selectedReminder.observacao || '—'}</Text>

                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                style={styles.closeButton}
                            >
                                <Text style={{ color: '#fff' }}>Fechar</Text>
                            </TouchableOpacity>
                        </View>
                    </BlurView>
                </Modal>
            )}
        </View>
    );
};


export default Calendar;
