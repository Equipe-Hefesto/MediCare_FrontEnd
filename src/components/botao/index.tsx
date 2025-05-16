import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

interface Props {
    texto: string;
    width?: number;
    onPress: () => void;
    tipo?: "preenchido" | "outlined";
}

export function Botao({ texto, width, onPress, tipo = "preenchido" }: Props) {
    const isOutlined = tipo === "outlined";

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            style={[
                styles.botaoBase,
                isOutlined ? styles.outlined : styles.preenchido,
                { width }
            ]}
            onPress={onPress}
        >
            <View>
                <Text style={[styles.textoBase, isOutlined ? styles.textoOutlined : styles.textoPreenchido]}>
                    {texto}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const corPrincipal = "#267797";

const styles = StyleSheet.create({
    botaoBase: {
        height: 70,
        borderRadius: 16,
        justifyContent: "center",
        marginTop: 20,
        alignSelf: "flex-end",
        borderWidth: 2,
    },
    preenchido: {
        backgroundColor: corPrincipal,
        borderColor: corPrincipal,
    },
    outlined: {
        backgroundColor: "transparent",
        borderColor: corPrincipal,
    },
    textoBase: {
        fontSize: 25,
        alignSelf: "center",
        fontWeight: "bold",
    },
    textoPreenchido: {
        color: "#fff",
    },
    textoOutlined: {
        color: corPrincipal,
    },
});
