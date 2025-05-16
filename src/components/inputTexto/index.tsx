import { View, Text, TextInput, KeyboardTypeOptions } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { styles } from '../inputTexto/styles';

interface Props {
  texto: string;
  secureTextEntry?: boolean;
  value?: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  editable?: boolean;
  showSoftInputOnFocus?: boolean;
  onFocus?: () => void;
  maskType?: 'cpf' | 'cnpj' | 'zip-code' | 'money' | 'cel-phone' | 'datetime' | 'custom';
  placeholder?: string;
  maxLength?: number;
  visivel?: boolean;
  mensagemErro?: string;
    marginBottom?: number;

}

export function InputTexto({
  texto,
  secureTextEntry = false,
  value,
  onChangeText,
  keyboardType = 'default',
  editable = true,
  showSoftInputOnFocus = true,
  onFocus,
  maskType,
  placeholder = '',
  visivel = false,
  mensagemErro = '',
  maxLength,
  marginBottom,


}: Props) {
  const borderColor = visivel ? '#FF4D4D' : '#267797';

  return (
    <View style={[styles.containerTextoInput, { marginBottom: marginBottom ?? 16 }]}>
      <Text style={styles.texto}>{texto}</Text>

      {maskType ? (
        <TextInputMask
          type={maskType}
          value={value}
          onChangeText={onChangeText}
          style={[styles.input, { borderColor }]}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          editable={editable}
          showSoftInputOnFocus={showSoftInputOnFocus}
          onFocus={onFocus}
          placeholder={placeholder}
          placeholderTextColor="#888"
          maxLength={maxLength} 

        />
      ) : (
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={[styles.input, { borderColor }]}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          editable={editable}
          showSoftInputOnFocus={showSoftInputOnFocus}
          onFocus={onFocus}
          placeholder={placeholder}
          placeholderTextColor="#888"
          maxLength={maxLength} 

        />
      )}

      {visivel && !!mensagemErro && (
        <Text style={styles.errorText}>{mensagemErro}</Text>
      )}
    </View>
  );
}
