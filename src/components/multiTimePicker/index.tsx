import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";

type Props = {
  horarios: string[];
  onChange: (novosHorarios: string[]) => void;
};

export const MultiTimePicker = ({ horarios, onChange }: Props) => {
  const [isPickerVisible, setPickerVisible] = useState(false);

  const showPicker = () => setPickerVisible(true);
  const hidePicker = () => setPickerVisible(false);

  const handleConfirm = (date: Date) => {
    const hora = format(date, "HH:mm");

    if (!horarios.includes(hora)) {
      onChange([...horarios, hora]);
    }

    hidePicker();
  };

  const removerHorario = (hora: string) => {
    const atualizados = horarios.filter((h) => h !== hora);
    onChange(atualizados);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showPicker} style={styles.botao}>
        <Text style={styles.botaoTexto}>Adicionar horário</Text>
      </TouchableOpacity>

     <ScrollView style={styles.scroll}>
      <FlatList
        data={horarios}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.horario}>{item}</Text>
            <TouchableOpacity onPress={() => removerHorario(item)}>
              <Text style={styles.remover}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhum horário adicionado</Text>}
      />
      </ScrollView>

      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hidePicker}
        is24Hour={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  botao: {
    backgroundColor: "#3B82A0",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 12,
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 6,
    marginBottom: 8,
  },
  horario: {
    fontSize: 16,
  },
  remover: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
  vazio: {
    color: "#888",
    textAlign: "center",
  },
  scroll:{
    paddingBottom:100,
    marginBottom: 96
  }
});
