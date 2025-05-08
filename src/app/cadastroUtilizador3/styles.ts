import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    containerPai:{
        flex: 1,
        backgroundColor: "#ACE1F5",
    },

    container:{
        top: 0,
        backgroundColor: "#fff",
        alignSelf: "center",
        width: "90%",
        height: "85%",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        elevation: 5,

    },

    containerInputs:{
        marginTop: 0,
    },

    containerInput:{
        marginTop: 30,
    },
    
    containerBotao:{
        paddingTop: 10,
        paddingRight: 20,
    },

    containerBarra:{
        alignSelf: "center",
        width: "90%",
        height: 30,
        marginTop: 30,
        flexDirection: "row",
        justifyContent: "space-around"
    },

    containerCirculo:{
        borderWidth: 2,
        borderColor: "#267797",
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: "center",
    },

    containerCirculoFeito:{
        borderWidth: 2,
        borderColor: "#267797",
        backgroundColor: "#267797",
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: "center",
    },

    numero:{
        justifyContent: "center",
        fontSize: 20,
    },

    numeroAtual:{
        fontSize: 20,
        color: "#fff"
    },

    containerTexto:{
        flex: 1,
        justifyContent: "center",
    },

    linha:{
        flex: 1,
        borderWidth: 1,
        borderColor: "#267797",
        height: 1,
        alignSelf: "center",
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        marginLeft: 10,
        color: "#000",
    },
    
    inputText: {
        borderWidth: 1,
        borderColor: "#267797",
        borderRadius: 5,
        height: 40,
        paddingLeft: 10,
        marginHorizontal: 10,
        backgroundColor: "#fff",
    },
})