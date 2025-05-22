import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { InputTexto } from "../inputTexto";
import { format, parse, differenceInDays, isBefore } from "date-fns";

type Props = {
  dataInicio: string;
  dataFim: string;
  onChangeInicio: (value: string) => void;
  onChangeFim: (value: string) => void;
  visivel: boolean;
};

export const DateRangeInput = ({
  dataInicio,
  dataFim,
  onChangeInicio,
  onChangeFim,
  visivel
}: Props) => {
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [isInicio, setIsInicio] = useState(true); // true = início, false = fim
    const [visivelI, setVisivel] = useState(false);
  const showPicker = (isInicioField: boolean) => {
    setIsInicio(isInicioField);
    setPickerVisible(true);
  };

  const hidePicker = () => setPickerVisible(false);

  const handleConfirm = (date: Date) => {
    const formattedDate = format(date, "dd/MM/yyyy");
    if (isInicio) {
      onChangeInicio(formattedDate);
      setVisivel(false)
    } else {
      // Validação: fim não pode ser antes do início
      const inicioDate = parse(dataInicio, "dd/MM/yyyy", new Date());
      if (dataInicio && isBefore(date, inicioDate)) {
        setVisivel(true)
        onChangeFim("")
      } else {
        onChangeFim(formattedDate);
        setVisivel(false)
      }
    }
    hidePicker();
  };

  const getDuracaoTexto = () => {
    try {
      const inicio = parse(dataInicio, "dd/MM/yyyy", new Date());
      const fim = parse(dataFim, "dd/MM/yyyy", new Date());
      const dias = differenceInDays(fim, inicio);
      if (isNaN(dias)) return null;
      return dias >= 0 ? `${dias} dia(s) de duração` : null;
    } catch {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.linha}>
        <TouchableOpacity onPress={() => showPicker(true)} activeOpacity={1} style={styles.inputWrapper}>
          <InputTexto
            texto="Início"
            value={dataInicio}
            visivel={(visivel || visivelI)}
            keyboardType="number-pad"
            editable={false}
            onChangeText={onChangeInicio}
            maskType="datetime"
            maxLength={10}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => showPicker(false)} activeOpacity={1} style={styles.inputWrapper}>
          <InputTexto
            texto="Fim"
            value={dataFim}
            visivel={(visivel || visivelI)}
            keyboardType="number-pad"
            editable={false}
            onChangeText={onChangeFim}
            maskType="datetime"
            maxLength={10}
          />
        </TouchableOpacity>
      </View>
      {(visivel || visivelI) && (
              <Text style={styles.errorText}>Digite uma data válida.</Text>
            )}

      {getDuracaoTexto() && (
        <Text style={styles.duracaoTexto}>{getDuracaoTexto()}</Text>
      )}

      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hidePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  linha: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  inputWrapper: {
    flex: 1,
  },
  duracaoTexto: {
    marginTop: 0,
    color: "#333",
    fontSize: 14,
    fontStyle: "italic",
  },
   errorText: {
    marginTop: 0,
    marginLeft: 4,
    fontSize: 10,
    color: "#FF4D4D", 
  },
});
