import { StyleSheet } from "react-native"

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

    titulo:{
        fontSize: 40,
        fontWeight: "bold",
        color: "#267797",
        alignSelf: "center",
        paddingTop: 25,
    },

    containerTextoPicker:{
        alignSelf: "center",
        width: 300,
        paddingTop: 40,
    },

    textoPicker:{
        fontSize: 25,
        marginBottom: 20,
        color: "#505050",
    },

    picker:{
        width: 300,
        height: 50,
        borderColor: "#267797",
    },

    containerPicker:{
        width: 300,
        height: 50,
        borderWidth: 1,
        borderColor: "#267797",
        borderRadius: 5,
    },

    containerBotao:{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
        paddingBottom: 30,
        paddingRight: 20,
    },
})