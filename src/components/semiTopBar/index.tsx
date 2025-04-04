{/*Criado exlusivamente pra ser usado em situações que a Top Bar não tem o menu hamburguer*/}

import { View, Text, TouchableOpacity, Image } from "react-native";
import { styles } from "../semiTopBar/styles";

export function SemiTopBar() {
  return (
    <View> 

      <View style={styles.topBar}> {/*NÃO DELETAR, sem isso fica impossível centralizar o texto*/}
        
        <View style={styles.containerLogo}> <Image source={require('../../../assets/images/logo.png')} style={styles.logo}/> </View>
        
        <View style={styles.containerTexto}> <Text style={styles.titulo}> MediCare </Text> </View>

        <View></View>
     
      </View>

    </View>
  );
}
