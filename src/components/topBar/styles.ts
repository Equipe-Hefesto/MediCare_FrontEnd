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

});
