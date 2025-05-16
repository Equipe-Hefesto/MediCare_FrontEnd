import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { InputTexto } from "../inputTexto"; // Certifique-se de que o caminho está correto
import { format } from "date-fns"; // Usando date-fns para formatação de data

type Props = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  visivel?: boolean;
  mensagemErro?: string;
};

export const DateInput = ({ label = "Data", value, onChange, visivel, mensagemErro }: Props) => {
  const [isPickerVisible, setPickerVisible] = useState(false);

  const showPicker = () => setPickerVisible(true);
  const hidePicker = () => setPickerVisible(false);

  const handleConfirm = (date: Date) => {
    const formattedDate = format(date, "dd/MM/yyyy"); 
    onChange(formattedDate); 
    hidePicker();
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={showPicker} activeOpacity={1}>
          <InputTexto
            texto={label}
            value={value}
            visivel={visivel}
            keyboardType="number-pad"
            mensagemErro={mensagemErro}
            editable={false}
            onChangeText={onChange}
            maskType="datetime"
            maxLength={10}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.icon} onPress={showPicker}>
          <Icon name="calendar" size={29.5} color="#fff" />
        </TouchableOpacity>
      </View>

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
  wrapper: {
    position: "relative",
    justifyContent: "center",
  },
  icon: {
    position: "absolute",
    right: 0.3,
    top: 33.8,
    backgroundColor: "#3B82A0",
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    padding: 8,
    zIndex: 2,
  },
});
