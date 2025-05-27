import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({

    containerPai:{
        position: "absolute",
        right: 0,
        left: 0,
        bottom: 0,
        height: 75,
    },

    container:{
        flex: 1,
        backgroundColor: "#267797",
        flexDirection: "row",
        justifyContent: "space-around",
        marginLeft: -10,
    },

    iconeTexto:{
        width: 100,
        justifyContent: "center",
        alignItems: "center",
    },

    icone:{
        fontSize: 25,
    },
    pontoNotificacao: {
    position: "absolute",
    top: -2,
    right: -6,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "red",
},

})