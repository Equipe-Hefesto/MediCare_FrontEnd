import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    containerPai: {
        flex: 1,
        backgroundColor: "#ACE1F5",
    },
    card: {
        flex: 1,
        margin: 16,
        borderRadius: 12,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 3,
        overflow: "hidden",
    },
    progressBar: {
        marginTop: 16,
        alignSelf: "center",
    },
    scrollContainer: {
        width:324,
        alignSelf:"center",
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 24,
    },
    scrollContent: {
        paddingTop: 16,
        paddingBottom: 100, 
    },
    containerBotao: {
        position: "static",
        marginBottom: 24,
        marginRight: 16,
    },
     containerEsqueceuSenha:{
        alignSelf: "center",
        width:324,
        paddingHorizontal: 16,

    },
    esqueceuSenha:{
        color: "#999999",
        paddingTop: 5,
    },
    titulo:{
        alignSelf: "center",
        color: "#000",
        fontSize: 40,
        fontWeight: "bold", 
        padding:24,
    },
});