import { View, Text, Image } from "react-native";
import { styles } from "../semiTopBar/styles";

export function SemiTopBar() {
  return (
    <View>
      <View style={styles.topBar}>
        <View style={styles.containerLogo}>
          <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
        </View>
        <View style={styles.containerTexto}>
          <Text style={styles.titulo}>MediCare</Text>
        </View>
        <View />
      </View>
    </View>
  );
}
