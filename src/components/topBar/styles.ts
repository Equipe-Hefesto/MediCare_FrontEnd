import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  topBar: {
    height: 78,
    backgroundColor: "#267797",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 10, 
    paddingRight: 20,
  },

  titulo: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
    alignSelf: "center",
  },
  
  hamburguer:{
    marginTop: 20,
  },

  linha:{
    backgroundColor: "#fff",
    height: 4,
    width: 40,
    borderRadius: 3,
    marginVertical: 4,
  },
  
  logo:{
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  containerLogo:{
    justifyContent: "center",
  },
  menuLateral: {
  position: "absolute",
  top: 78, // logo abaixo da topBar
  left: 0,
  width: 250,
  height: "100%",
  backgroundColor: "#064663",
  padding: 20,
  zIndex: 10, // fica por cima de outros elementos
},

userImage: {
  width: 80,
  height: 80,
  borderRadius: 40,
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
  fontSize: 14,
  textAlign: "center",
  marginBottom: 20,
},

menuItem: {
  color: "#fff",
  fontSize: 18,
  marginBottom: 15,
  paddingLeft: 10,
},

});
