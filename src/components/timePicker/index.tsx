import React, { useState } from "react";
import { View, Text, Button, Platform, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

type TimePickerProps = {
  label?: string;
  value?: string;
  onChange: (hora: string) => void;
};

export const TimePicker = ({ label = "Escolher hora", value, onChange }: TimePickerProps) => {
  const [show, setShow] = useState(false);
  const [horaSelecionada, setHoraSelecionada] = useState<Date | null>(
    value ? new Date(`1970-01-01T${value}:00`) : null
  );

  const handleChange = (event: any, selectedDate?: Date) => {
    setShow(false);
    if (selectedDate) {
      setHoraSelecionada(selectedDate);
      const horas = selectedDate.getHours().toString().padStart(2, "0");
      const minutos = selectedDate.getMinutes().toString().padStart(2, "0");
      onChange(`${horas}:${minutos}`);
    }
  };

  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={{ fontSize: 16,
    marginBottom: 8, 
    color: "#333", 
    fontWeight: "500",  }}>{label}</Text>

      <TouchableOpacity
        onPress={() => setShow(true)}
        style={{
          borderWidth: 1,
          borderRadius: 8,
          borderColor: "#3B82A0",
          height: 48,
          width: "100%",
          paddingHorizontal: 12,
          backgroundColor: "#FFFFFF",
          display:"flex",
          flexDirection: "column",
          justifyContent:"center"
          
        }}
      >
        <Text style={{ fontSize: 16, lineHeight: 20  }}>{horaSelecionada ? `${horaSelecionada.getHours().toString().padStart(2, "0")}:${horaSelecionada.getMinutes().toString().padStart(2, "0")}` : "Selecionar hora" }</Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={horaSelecionada || new Date()}
          mode="time"
          is24Hour={true}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleChange}
        />
      )}
    </View>
  );
};
