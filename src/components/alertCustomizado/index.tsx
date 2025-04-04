import { Modal, View, Text, TouchableOpacity, Button } from "react-native";
import { styles } from "../alertCustomizado/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
    visivel: boolean;
    onPress: () => void;
}

export function AlertCustomizado( { visivel, onPress }: Props ){

  if (!visivel) return null;

  return (
    <Modal transparent visible={visivel} animationType="fade">

      <View style={styles.containerPai}>

        <View style={styles.containerSuperior}>
          
        </View>

        <View style={styles.containerInferior}>
          
          <View style={styles.containerFilho}> 
          
            <MaterialCommunityIcons name="alert" style={styles.icone}/>
            <Text style={styles.texto}> Opa! Algo deu errado </Text>

          </View>

          <View style={styles.containerBotao}>

            <TouchableOpacity style={styles.botao} onPress={onPress}> 
              
              <Text style={styles.textoBotao}> Ok </Text> 
            
            </TouchableOpacity>

          </View>

        </View>

      </View>
    
    </Modal>
  );
}