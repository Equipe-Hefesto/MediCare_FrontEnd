import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    containerPai:{
        height: "100%",
    },
    
    containerUsuario:{
        height: 142,
        backgroundColor: "#ACE1F5",
        justifyContent: "space-around",
        flexDirection: "row", 
    },

    bemVindoUsuario:{
        justifyContent: "center",
        flexDirection: "column",
    },

    bemVindo:{
        color: "#267797",
        fontSize: 28,
        fontWeight: "bold",
    },

    usuario:{
        color: "#267797",
        fontSize: 28,
        fontWeight: "bold",
    },

    imagem:{
        width: 128,
        height: 128,
        borderRadius: 360,
        alignSelf: "center",
    },

    containerBotao:{
        borderColor: "#267797",
        borderRadius: 10,
        borderWidth: 2,
        width: 320,
        height: 100,
        marginTop: 45,
        alignSelf: "center",
        overflow: "hidden",
        flexDirection: "row",
    },

    iconeBotao:{
        borderColor: "#267797",
        backgroundColor: "#267797",
        borderWidth: 1,
        width: 100,
        justifyContent: "center",
    },

    icone:{
        color: "#fff",
        alignSelf: "center",
        fontSize: 65,
    },

    textoBotao:{
        fontSize: 30,
        color: "#267797",
    },

    containerTexto:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    menuInferior:{
        flex: 1,
    },

    menu:{
        flex: 1,
        position: "absolute",
        zIndex: 10,
        bottom: 0,
        right: 0,

    }
})