import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const WEEK_DAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

type WeekDaySelectorProps = {
  selectedDays: number[]; // índices dos dias selecionados
  onSelect: (index: number) => void;
};

export const WeekDaySelector = ({ selectedDays, onSelect }: WeekDaySelectorProps) => {
  return (
    <View style={styles.container2}>
      <Text style={styles.texto}>Dias da semana</Text>
      <View style={styles.container}>
        {WEEK_DAYS.map((day, index) => {
          const isSelected = selectedDays.includes(index);
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
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    justifyContent: 'center',
    paddingVertical: 2,
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
  texto: {
    fontSize: 16,
    marginBottom: 2, 
    color: "#333", 
    fontWeight: "500", 
  },
  container2: {
    alignSelf: "stretch",
    marginTop: 16,
  },
});
