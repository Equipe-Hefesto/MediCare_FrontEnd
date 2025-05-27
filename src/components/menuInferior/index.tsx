import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../menuInferior/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface Props {
    cor1: string;
    cor2: string;
    cor3: string;
    cor4: string;
    temSolicitacoes?: boolean;
}

export function MenuInferior({ cor1, cor2, cor3, cor4, temSolicitacoes = false }: Props) {
    const router = useRouter();

    return (
        <View style={styles.containerPai}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.iconeTexto} onPress={() => router.replace('/home')}>
                    <MaterialCommunityIcons color={cor1} style={styles.icone} name="home" />
                    <Text style={{ marginTop: 5, color: cor1 }}> Início </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconeTexto} onPress={() => router.replace('/Calendario')}>
                    <MaterialCommunityIcons color={cor2} style={styles.icone} name="calendar-month" />
                    <Text style={{ marginTop: 5, color: cor2 }}> Calendário </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconeTexto} onPress={() => router.replace('/Remedio')}>
                    <MaterialCommunityIcons color={cor3} style={styles.icone} name="pill" />
                    <Text style={{ marginTop: 5, color: cor3 }}> Remédios </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconeTexto} onPress={() => router.replace('/Apoio')}>
                    <View style={{ position: 'relative', alignItems: 'center' }}>
                        <MaterialCommunityIcons color={cor4} style={styles.icone} name="heart" />
                        {temSolicitacoes && (
                            <View style={styles.pontoNotificacao} />
                        )}
                    </View>
                    <Text style={{ marginTop: 5, color: cor4 }}> Apoio </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
