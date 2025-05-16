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

    titulo:{
        fontSize: 40,
        fontWeight: "bold",
        color: "#267797",
        alignSelf: "center",
        paddingTop: 25,
    },

    logo:{
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    
    containerLogo:{
        paddingTop: 50,
        alignSelf: "center",
    },

    containerBotoes:{
        paddingTop: 40,
    },

    containerBotao:{
        paddingTop: 10,
        paddingBottom: 10,
        alignSelf: "center",
    },
})
