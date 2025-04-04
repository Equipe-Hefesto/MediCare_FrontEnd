import { View, Text, TouchableOpacity, Image } from "react-native";
import { styles } from "../topBar/styles";
import { useRouter } from "expo-router";

export function TopBar() {
  
  const router = useRouter();

  function menuHamburguer(){
    router.replace('/_sitemap')
  }
  
  return (
    <View> 

      <View style={styles.topBar}> {/*NÃO DELETAR, sem isso fica impossível centralizar o texto*/}
        
        <View style={styles.containerLogo}> <Image source={require('../../../assets/images/logo.png')} style={styles.logo}/> </View>
        
        <Text style={styles.titulo}> MediCare </Text>
        
        <TouchableOpacity onPress={menuHamburguer}>
          
          <View style={styles.hamburguer}> {/* Coloca as três linhas uma embaixo da otura (Sem a view, elas se alinham na vertical) */}
              
              <View style={styles.linha}></View>
              <View style={styles.linha}></View>
              <View style={styles.linha}></View>
          
          </View>
       
        </TouchableOpacity>
     
      </View>

    </View>
  );
}
