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
    progressBar: {
        marginTop: 24,
        alignSelf: "center",
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
    containerBotao: {
        position: "static",
        marginBottom: 24,
        marginRight: 16,
        
    },
    titulo: {
        fontSize: 24,
        marginTop: 16,
        marginBottom:8,
        fontWeight: "bold",
        color: "#267797",
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
 errorText: {
    marginTop: 0,
    marginLeft: 4,
    fontSize: 10,
    color: "#FF4D4D", 
  },
  
});
