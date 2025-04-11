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
        marginTop: 20,
    },

    containerInput:{
        marginTop: 30,
        alignSelf: "center",
        width: 300,
    },
    
    containerBotao:{
        paddingTop: 10,
        paddingRight: 20,
    },

    picker:{
        width: 300,
        height: 50,
        borderColor: "#267797",
    },

    texto:{
        fontSize: 20,
        marginBottom: 10,
        color: "#505050",
    },
})