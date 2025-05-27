import { StyleSheet } from "react-native";

export const styles2 = StyleSheet.create({
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
    marginBottom: 91

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
    marginBottom: 8,
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
  },
  container: {
    marginTop: 8,
    alignSelf: "center",
    width: 300,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#267797",
    width: 300,
    height: 40,
    paddingLeft: 10,

  },
  selected: {
    marginTop: 10,
    fontStyle: 'italic',
  },
  botaoFlutuante: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007C91",
    borderRadius: 50,
    padding: 16,
    elevation: 5,
    zIndex: 10,
  },
});