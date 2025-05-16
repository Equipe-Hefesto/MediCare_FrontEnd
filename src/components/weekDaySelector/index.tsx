import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const WEEK_DAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];


type WeekDaySelectorProps = {
  selectedDays: number[]; // agora usamos os índices
  onSelect: (index: number) => void;
  today?: number; // ex: 0 = domingo, 1 = segunda, etc
};

export const WeekDaySelector = ({ selectedDays, onSelect, today }: WeekDaySelectorProps) => {
  return (
    <View style={styles.container}>
      {WEEK_DAYS.map((day, index) => {
        const isSelected = selectedDays.includes(index);
        const isToday = index === today;
        const isWeekend = index === 0 || index === 6;

        return (
          <TouchableOpacity
            key={index}
            onPress={() => onSelect(index)}
            style={[
              styles.dayCircle,
              isSelected && (isWeekend ? styles.selectedRed : styles.selectedBlue),
            ]}
          >
            <Text style={[styles.dayText, isSelected && styles.dayTextSelected]}>{day}</Text>
            {isToday && <View style={styles.todayDot} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

  
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
    padding: 10,
  },
  dayCircle: {
    width: 30,
    height: 30,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#16697A',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
    position: 'relative',
  },
  selectedBlue: {
    backgroundColor: '#16697A',
    borderColor: '#16697A',
  },
  selectedRed: {
    backgroundColor: '#B22222',
    borderColor: '#B22222',
  },
  dayText: {
    color: '#000',
    fontWeight: 'bold',
  },
  dayTextSelected: {
    color: '#FFF',
  },
  todayDot: {
    position: 'absolute',
    bottom: 4,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: 'red',
  },
});
