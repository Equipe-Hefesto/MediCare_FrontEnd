import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  menuLateral: {
    position: "absolute",
    top: 0, // altura da TopBar
    right: 0,
    width: 250,
    height: "100%",
    backgroundColor: "#064663",
    zIndex: 999,
    padding: 20,
  },
  userImage: {
    marginTop:48,
    width: 128,
    height: 128,
    borderRadius: 100,
    alignSelf: "center",
    marginBottom: 10,
  },
  nomePerfil: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 5,
  },
  trocarPerfil: {
    color: "#ccc",
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
    paddingVertical:12,
    marginBottom: 20,
    backgroundColor:"#267797",
    borderRadius:8,
  },
  menuItem: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 15,
    paddingLeft: 10,
     textAlign: "center",
  },
  icon:{
    position: "absolute",
    right: 0,
    margin: 16
  },
  icon2:{
    position: "absolute",
    left: 0,
    bottom: 0,
    marginLeft: 16,
    marginBottom:24
  },
  
});
