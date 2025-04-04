import { TouchableOpacity, Text } from "react-native";
import { styles } from "../botao/styles"; 

interface Props {
    texto: string;
    width?: number;
    onPress: () => void;
}

export function Botao( {texto, width, onPress}: Props ){
    return (
    <TouchableOpacity activeOpacity={0.7} style={[styles.botao, { width }]} onPress={onPress}>
    
        <Text style={styles.texto}> {texto} </Text>
    
    </TouchableOpacity>
    );
}