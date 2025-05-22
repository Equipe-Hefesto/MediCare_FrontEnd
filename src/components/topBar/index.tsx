import { View, Text, TouchableOpacity, Image } from "react-native";
import { styles } from "./styles";
import { useMenu } from "@/src/context/menuContext";
import { MenuLateral } from "../menuLateral";

export function TopBar() {
    const { menuAberto,setMenuAberto } = useMenu();

  return (
    <View style={styles.topBar}>
      <View style={styles.containerLogo}>
        <Image source={require("../../../assets/images/logo.png")} style={styles.logo} />
      </View>

      <Text style={styles.titulo}> MediCare </Text>

      <TouchableOpacity onPress={() => setMenuAberto(true)}>
        <View style={styles.hamburguer}>
          <View style={styles.linha}></View>
          <View style={styles.linha}></View>
          <View style={styles.linha}></View>
        </View>
      </TouchableOpacity>
     
    </View>
    
  );
}
