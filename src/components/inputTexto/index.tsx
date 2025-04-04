import { View, Text, TextInput } from 'react-native';
import { styles } from '../inputTexto/styles';

interface Props {
    texto: string;
    secureTextEntry: boolean;
    onChangeText: (text: string) => void;
    borderColor?: string
}

export function InputTexto( {borderColor, texto, secureTextEntry, onChangeText}: Props ){
    if (borderColor == null)
    {
        borderColor = "#267797"
    }

    return (
        <View style={styles.containerTextoInput}>
        
            <Text style={styles.texto}> { texto } </Text>
            <TextInput onChangeText={onChangeText} style={[styles.input, { borderColor }]} secureTextEntry={secureTextEntry} />
    
        </View>
    )
}