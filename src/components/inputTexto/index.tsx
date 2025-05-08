import { View, Text, TextInput, KeyboardTypeOptions } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';  
import { styles } from '../inputTexto/styles';

// Corrija os tipos aceitos para maskType, agora usando os tipos exatos da biblioteca
interface Props {
    texto: string;
    secureTextEntry: boolean;
    value?: string;
    onChangeText: (text: string) => void;
    borderColor?: string;
    keyboardType?: KeyboardTypeOptions;
    editable?: boolean;
    showSoftInputOnFocus?: boolean;
    onFocus?: () => void;
    maskType?: 'cpf' | 'cnpj' | 'zip-code' | 'money' | 'cel-phone' | 'datetime' | 'custom';
}

export function InputTexto({
    borderColor,
    texto,
    secureTextEntry,
    onChangeText,
    keyboardType,
    value,
    onFocus,
    maskType,  // Passando o tipo da máscara
}: Props) {
    if (borderColor == null) {
        borderColor = "#267797";
    }

    return (
        <View style={styles.containerTextoInput}>
            <Text style={styles.texto}> {String(texto)} </Text>

            {/* Verifica se maskType foi passado, e se sim, usa o TextInputMask */}
            {maskType ? (
                <TextInputMask
                    type={maskType}  // Usando o tipo da máscara (ex: 'cpf', 'phone', etc.)
                    value={value}
                    onChangeText={onChangeText}  // Atualiza o valor limpo
                    style={[styles.input, { borderColor }]}
                    keyboardType={keyboardType || 'default'}
                    secureTextEntry={secureTextEntry}
                    onFocus={onFocus}
                />
            ) : (
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    style={[styles.input, { borderColor }]}
                    keyboardType={keyboardType || 'default'}
                    secureTextEntry={secureTextEntry}
                    onFocus={onFocus}
                />
            )}
        </View>
    );
}
