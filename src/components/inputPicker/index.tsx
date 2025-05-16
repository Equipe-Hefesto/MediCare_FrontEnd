import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

interface Props {
  texto: string;
  value?: string;
  onChangeText: (text: string) => void;
  visivel?: boolean;
  mensagemErro?: string;
  itens: { label: string; value: string }[];
  zIndex?: number;
}


const InputPicker: React.FC<Props> = ({
  texto,
  value,
  onChangeText,
  visivel = false,
  mensagemErro = '',
  itens,
  zIndex,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={[styles.container, { zIndex }]}>
      <Text style={styles.label}>{texto}</Text>
      <DropDownPicker
        open={open}
        value={value ?? null}
        items={itens}
        setOpen={setOpen}
        setValue={(callback) => {
          const newValue = callback(value);
          onChangeText(newValue as string);
        }}
        setItems={() => { }} // não precisa mais controlar o estado internamente
        placeholder="Selecione"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />
      {visivel && mensagemErro ? (
        <Text style={styles.error}>{mensagemErro}</Text>
      ) : null}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: 200,
    zIndex: 1000, // alto para garantir prioridade
    position: 'relative', // necessário para zIndex funcionar
  },
  dropdown: {
    fontSize: 16,
    borderWidth: 1,
    lineHeight: 20,
    borderRadius: 8,
    borderColor: '#3B82A0',
    height: 48,
    alignSelf: 'stretch',
    paddingHorizontal: 12,
    textAlignVertical: 'center',
    backgroundColor: '#FFFFFF',
    zIndex: 1000, // adiciona aqui também
  },
  dropdownContainer: {
    borderColor: '#3B82A0',
    zIndex: 1000, // importante aqui também
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    fontWeight: '500',
  },
  error: {
    marginTop: 6,
    color: 'red',
    fontSize: 13,
  },
});


export default InputPicker;
