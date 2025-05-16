import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  containerTextoInput: {
    alignSelf: "stretch", 
  },

  texto: {
    fontSize: 16,
    marginBottom: 8, 
    color: "#333", 
    fontWeight: "500", 
  },

  input: {
    fontSize: 16,
    borderWidth: 1,
    lineHeight: 20,
    borderRadius: 8, 
    borderColor: "#3B82A0", 
    height: 48, 
    width: "100%",  
    paddingHorizontal: 12,
    textAlignVertical: "center", 
    backgroundColor: "#FFFFFF", 
  },

  errorText: {
    marginTop: 4,
    marginLeft: 4,
    fontSize: 10,
    color: "#FF4D4D", // Cor vermelha para o erro
  },
});
