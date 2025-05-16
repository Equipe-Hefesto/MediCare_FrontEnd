import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    containerPai:{
        flex: 1,
        backgroundColor: "#ACE1F5",
    },
    
    paiFilho:{
        flex: 1,
        justifyContent: "center",
    },

    containerFilho:{
        backgroundColor: "#fff",
        alignSelf: "center",
        width: "96%",
        height: "88%",
        marginTop: -75,
        borderRadius: 16,
        elevation: 5,
    },


    
     containerBarra:{
        alignSelf: "center",
        width: "90%",
        height: 30,
        marginTop: 4,
        flexDirection: "row",
        justifyContent: "space-around"
    },


    icone:{
        color: "#fff",
        alignSelf: "center",
        fontSize: 150,
    },
    titulo:{
        fontSize: 24,
        fontWeight: "bold",
        color: "#267797",
        alignSelf: "center",
        paddingTop: 8,
        fontFamily: 'Montserrat_400Regular', // aqui é o nome exato da fonte

    },



     container: {
        marginTop: 8,
        alignSelf: "center",
        width: 300,
    
  },
  label: {
    marginBottom: 8,
    fontWeight: 'bold',
    fontSize: 16,
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
  input: {
    flex: 1,
    height: 40,
  },
  icon: {
    marginLeft: 10,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  selected: {
    marginTop: 10,
    fontStyle: 'italic',
  },
  texto:{
        fontSize: 20,
        marginBottom: 10,
        color: "#505050",
    },
    containerBotao:{
        paddingTop: 10,
        paddingRight: 20,
    },
})