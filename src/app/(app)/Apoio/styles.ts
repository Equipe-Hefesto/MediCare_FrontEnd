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

menuOpcao: {
  backgroundColor: "#fff",
  padding: 10,
  borderRadius: 8,
  marginBottom: 8,
  elevation: 2,
},
  botaoFlutuante2: {
    backgroundColor: "#F863FB",
    borderRadius: 50,
    padding: 10,
    elevation: 5,
    zIndex: 10,
},
 botaoFlutuante3: {
    backgroundColor: "#F8C315",
    borderRadius: 50,
    padding: 10,
    elevation: 5,
    zIndex: 10,
},
 icon: {
    backgroundColor: "#007C91",
    borderRadius: 50,
    padding: 16,
    elevation: 5,
    zIndex: 10,
},
solicitacaoBotao: {
  borderBottomWidth: 1,
  borderColor: "#d9d9d9",
  marginHorizontal: 8,
  paddingHorizontal: 16,
  paddingVertical: 8,
  marginTop: 8,
  flexDirection: "row",
  alignItems: "center",
  
},
solicitacaoTexto: {
  marginLeft: 8,
},
solicitacaoBadge: {
  backgroundColor: "red",
  width: 24,
  height: 24,
  borderRadius: 15,
  alignItems: "center",
  justifyContent: "center",
  marginLeft: 8,
},
solicitacaoBadgeTexto: {
  color: "#fff",
  fontWeight: "bold",
},
overlay: {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: "rgba(0,0,0,0.3)",
},
menuFlutuanteWrapper: {
  position: "absolute",
  bottom: 100,
  right: 20,
},
menuFlutuanteInterno: {
  alignItems: "flex-end",
  position: "absolute",
  bottom: 90,
  right: 26,
},
menuFlutuanteLinha: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 4,
},
menuFlutuanteTexto: {
  color: "#fff",
  marginRight: 8,
},modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
},
modalContent: {
    position: "absolute",
    top: "20%",
    left: "5%",
    right: "5%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 10,
    zIndex: 20,
},
modalTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#007C91",
},
modalTexto: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
},
modalItem: {
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: "#ddd",
},
modalBotoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
},
modalBotaoAceitar: {
    backgroundColor: "#4CAF50",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
},
modalBotaoRecusar: {
    backgroundColor: "#F44336",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
},
modalBotaoTexto: {
    color: "#fff",
    fontWeight: "bold",
},


});