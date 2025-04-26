import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    containerPai:{
        flex: 1,
        backgroundColor: "#ACE1F5",
    },
    
    paiFilho:{
        flex: 1,
        justifyContent: "center",
    },

    containerFilho:{
        backgroundColor: "#fff",
        alignSelf: "center",
        width: "95%",
        height: "75%",
        marginTop: -70,
        borderRadius: 20,
        elevation: 5,
    },

    titulo:{
        marginTop: "10%",
        alignSelf: "center",
        fontSize: 15,
        width: 200,
        textAlign: "center",
    },

    containerBotao:{
        alignSelf: "center",
        marginTop: 100,
        backgroundColor: "#267797",
        width: 200,
        height: 200,
        borderColor: "#267797",
        borderRadius: 100,
        justifyContent: "center",
    },

    icone:{
        color: "#fff",
        alignSelf: "center",
        fontSize: 150,
    },
})