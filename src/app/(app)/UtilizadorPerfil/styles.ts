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
    },
    scrollContent: {
        paddingTop: 16,
        paddingBottom: 100, // Garante espaço suficiente abaixo do último campo

    },
  containerBotao: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10, // se quiser espaço entre os botões
},
    titulo: {
        fontSize: 24,
        marginTop: 16,
        fontWeight: "bold",
        color: "#267797",
        alignSelf: "center",
    },
    subtitulo: {
        fontSize: 24,
        margin: 8,
        color: "#333",
        fontWeight: "500",
        alignSelf: "center",
    },
    containerTextoInput: {
    alignSelf: "stretch",
    marginBottom: 16,
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
    height: 40,
    width: "100%",
    paddingHorizontal: 12,
    textAlignVertical: "center",
    backgroundColor: "#FFFFFF",
  },
  errorText: {
    marginTop: 4,
    marginLeft: 4,
    fontSize: 10,
    color: "#FF4D4D",
  },  container: {
    alignItems: 'center',
    margin: 10,
  },
  image: {
    width: 128,
    height: 128,
    borderRadius: 8,
  },
  text: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  
});