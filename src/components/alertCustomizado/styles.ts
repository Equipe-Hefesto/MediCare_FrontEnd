import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    containerPai:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },

    containerSuperior:{
        width: "75%",
        height: 50,
        backgroundColor: "#267797",
        
    },

    containerInferior:{
        width: "75%",
        height: 120,
        backgroundColor: "#ACE1F5",
        alignItems: "flex-start",
        paddingLeft: 10,
    },

    containerFilho:{
        paddingTop: 10,
        flexDirection: "row",
        alignItems: "center",
    },

    icone:{
        fontSize: 50,
        color: "#8f180f",
    },

    texto:{
        fontSize: 25,
        fontWeight: "bold",
    },
    
    containerBotao:{
        alignSelf: "flex-end",
        marginTop: 10,
        marginRight: 10,
    },

    botao:{
        backgroundColor: "#fff",
        width: 70,
        height: 35,
        justifyContent: "center",
        borderRadius: 10,
    },

    textoBotao:{
        textAlign: "center",
        fontSize: 25,
        fontWeight: "bold",
    },
})