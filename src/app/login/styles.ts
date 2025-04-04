import { StyleSheet, TouchableOpacity } from "react-native"

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
        marginTop: 100,
    },

    containerEsqueceuSenha:{
        alignSelf: "center",
        width: 300,
    },

    esqueceuSenha:{
        color: "#0000FF",
        paddingTop: 5,
    },

    inputSenha:{
        marginTop: 30,
    },

    containerBotaoCadastro:{
        alignSelf: "center",
        marginTop: 30,
    },
    
    containerBotao:{
        paddingTop: 30,
        marginRight: 20,
    },
    
})