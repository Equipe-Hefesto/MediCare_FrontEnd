import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

type RadioCardProps = {
  title: string;
  description?: string;
  subtitle?: string;
  selected: boolean;
  onPress: () => void;
};

export const RadioCard = ({ title, description, subtitle, selected, onPress }: RadioCardProps) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: selected ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: selected ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [selected]);

  return (
    
    <TouchableOpacity
      style={[styles.card, selected ? styles.selectedCard : styles.unselectedCard]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.headerRow}>
        <Text style={[styles.title, selected && styles.titleSelected]}>{title}</Text>
        <View
  style={[
    styles.radioCircle,
    { borderColor: selected ? '#fff' : '#000' },
  ]}>
          <Animated.View
            style={[
              styles.radioCircleInside,
              { 
                transform: [{ scale: scaleAnim }],
                opacity: opacityAnim,
              },
            ]}
          />
        </View>
      </View>
      {selected && (
        <>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  selectedCard: {
    backgroundColor: '#669EB1',
  },
  unselectedCard: {
    backgroundColor: '#F0F0F0',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: 20,
    color: '#000',
  },
  titleSelected: {
    color: '#FFF',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleInside: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#FFF',
  },
  description: {
    marginTop: 12,
    color: '#DDEFF3',
    fontWeight: '500',
  },
  subtitle: {
    marginTop: 12,
    color: '#DDEFF3',
    fontSize: 10,
  },
});
