import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    PanResponder,
    GestureResponderEvent,
    PanResponderGestureState,
    Modal,
    ScrollView,
} from 'react-native';
import dayjs, { Dayjs } from 'dayjs';
import { BlurView } from 'expo-blur';
import { styles } from './style';
import 'dayjs/locale/pt';

dayjs.locale('pt');

interface Alarme {
    idAlarme: number;
    idPosologia: number;
    dataHora: string;
    descricao: string;
    status: string; // 'A', 'P', 'C'
    posologia: any | null;
}

interface CalendarProps {
    alarmes?: Alarme[];
    onDayPress?: (date: Dayjs) => void;
}

const Calendar: React.FC<CalendarProps> = ({
    alarmes = [],
    onDayPress = () => {},
}) => {
    const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

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

    const getBackgroundColorForStatus = (status: string) => {
        switch (status) {
            case 'S':
                return 'rgba(255, 217, 0, 0.7)';
            case 'T':
                return 'rgba(144, 238, 144, 0.7)';
            case 'A':
                return 'rgba(255, 99, 71, 0.7)';
            default:
                return 'rgba(38, 119, 151, 0.7)';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'T':
                return 'Tomado';
            case 'A':
                return 'Atrasado';
            case 'S':
                return 'Adiado';
            default:
                return 'Desconhecido';
        }
    };

    const handleDayPress = (date: Dayjs) => {
        onDayPress(date);
        setSelectedDate(date);
        setModalVisible(true);
    };

    const alarmesForSelectedDate = alarmes.filter((a) =>
        selectedDate && dayjs(a.dataHora).isSame(selectedDate, 'day')
    );

    return (
        <View style={styles.card} {...panResponder.panHandlers}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.monthContainer}>
                        <Text style={styles.month}>
                            {currentDate.format('MMMM')}
                        </Text>
                    </View>
                    <View style={styles.yearContainer}>
                        <Text style={styles.year}>
                            {currentDate.format('YYYY')}
                        </Text>
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
                        const alarmsOfDay = alarmes.filter(a =>
                            dayjs(a.dataHora).isSame(item, 'day')
                        );

                        return (
                            <TouchableOpacity
                                key={item.toString()}
                                style={[
                                    styles.dayCell,
                                    !isCurrentMonth && styles.dayOutsideMonth,
                                    isToday && styles.todayCell,
                                ]}
                                onPress={() => handleDayPress(item)}
                            >
                                <Text
                                    style={[
                                        styles.dayNumber,
                                        !isCurrentMonth && styles.dayNumberOutside,
                                    ]}
                                >
                                    {item.date()}
                                </Text>

                                {alarmsOfDay.map((alarm, i) => (
                                    i < 3 ? (
                                        <Text
                                            key={alarm.idAlarme}
                                            style={[
                                                styles.reminderText,
                                                { backgroundColor: getBackgroundColorForStatus(alarm.status) },
                                            ]}
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                        >
                                            {alarm.descricao}
                                        </Text>
                                    ) : null
                                ))}

                                {alarmsOfDay.length > 3 && (
                                    <Text>...</Text>
                                )}
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>

            {selectedDate && (
                <Modal
                    transparent
                    visible={modalVisible}
                    animationType="fade"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <BlurView intensity={70} tint="light" style={styles.modalOverlay}>
                        <View style={styles.modalCard}>
                            <Text
                                style={{
                                    ...styles.modalTitle,
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#ccc',
                                    borderStyle: 'dotted',
                                    paddingBottom: 8,
                                    marginBottom: 12,
                                }}
                            >
                                {selectedDate.format('DD [de] MMMM (dddd)')}
                            </Text>

                            <ScrollView style={{ height: 320 }}>
                                {alarmesForSelectedDate.length > 0 ? (
                                    alarmesForSelectedDate.map(alarm => (
                                        <TouchableOpacity key={alarm.idAlarme}>
                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    justifyContent: "space-between",
                                                    margin: 8
                                                }}
                                            >
                                                <Text style={styles.hora}>
                                                    {dayjs(alarm.dataHora).format('HH:mm')}
                                                </Text>
                                                <View style={{ flexDirection: "column" }}>
                                                    <Text style={styles.modalLabel}>{alarm.descricao}</Text>
                                                    <Text style={styles.modalText}>{getStatusLabel(alarm.status)}</Text>
                                                </View>
                                                <View
                                                    style={{
                                                        width: 20,
                                                        height: 20,
                                                        backgroundColor: getBackgroundColorForStatus(alarm.status),
                                                        borderRadius: 360,
                                                        alignSelf: "center",
                                                        marginRight: 16,
                                                    }}
                                                />
                                            </View>
                                        </TouchableOpacity>
                                    ))
                                ) : (
                                    <Text style={styles.modalText}>Nenhum alarme para este dia.</Text>
                                )}
                            </ScrollView>

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
