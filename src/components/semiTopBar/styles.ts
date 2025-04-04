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

  containerTexto:{
    flex: 1,
    width: "100%",
    justifyContent: "center",
    paddingRight: 40,
  },

  titulo: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
    alignSelf: "center",
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
