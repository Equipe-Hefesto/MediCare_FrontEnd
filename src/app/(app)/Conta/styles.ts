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
    scrollContainer: {
        width: 324,
        alignSelf: "center",
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 0,
        paddingBottom: 58
    },
    scrollContent: {
        paddingTop: 16,
        paddingBottom: 100,

    },

    titulo: {
        fontSize: 32,
        marginTop: 16,
        marginBottom: 15,
        fontWeight: "bold",
        color: "#004059",
        alignSelf: "center",
    },
   containerLinha: {
    bottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    width: 324,
    alignSelf: "center",
    
    },
    container:{
    width:158
    },

    texto: {
        color: "#004059",
        fontSize: 18,
        marginHorizontal: 20,
        textAlign: "justify",
        fontWeight: "bold",
        lineHeight: 30,
        marginBottom: 100,
    },

    botao: {
        backgroundColor: "#267797",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
        width: "45%",
        height: 50,
        marginHorizontal: 10
    },
    
    textoBotao: {
        fontSize: 20,
        color: "#fff"
    },

    botoes: {
        flexDirection: "row",
        marginBottom: 50
    }
  
});
