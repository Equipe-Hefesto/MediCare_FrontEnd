import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import { styles } from "./styles";
import { router } from "expo-router";
import Icon from "react-native-vector-icons/Feather";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useMenu } from "@/src/context/menuContext";
import { BlurView } from "expo-blur";
import { AuthContext } from "@/src/context/AuthContext";

const SCREEN_WIDTH = Dimensions.get("window").width;

export function MenuLateral() {
  const { menuAberto, setMenuAberto } = useMenu();
  const auth = useContext(AuthContext);

  if (!auth) {
    console.log("Deu erro auth");
    return null;
  }

  const { perfilSelecionado } = auth;

  const slideAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current;
  const [visivel, setVisivel] = useState(false);
  const getImageByPerfil = (perfil: string | null) => {
    switch (perfil) {
      case 'Cuidador':
        return require('../../../assets/images/Cuidador.jpg');
      case 'Responsável':
        return require('../../../assets/images/Responsavel.jpg');
      case 'Comum':
        return require('../../../assets/images/UtilizadorPerfil.jpg');
      default:
        return require('../../../assets/images/user.png');
    }
  };

  // Controla visibilidade com delay pra permitir animar saída
  useEffect(() => {
    if (menuAberto) {
      setVisivel(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: SCREEN_WIDTH,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setVisivel(false));
    }
  }, [menuAberto]);

  if (!visivel) return null;

  return (
    <View style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 999 }}>
      <TouchableWithoutFeedback onPress={() => setMenuAberto(false)}>
        <BlurView
          intensity={70}
          tint="prominent"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
          }}
        />
      </TouchableWithoutFeedback>

      <Animated.View
        style={[
          styles.menuLateral,
          {
            position: "absolute",
            top: 0,
            zIndex: 2,
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        <TouchableOpacity onPress={() => setMenuAberto(false)} style={styles.icon}>
          <Icon name="x" size={48} color="#3B82A0" />
        </TouchableOpacity>

        <Image source={getImageByPerfil(perfilSelecionado)} style={styles.userImage} />
        <Text style={styles.nomePerfil}>{perfilSelecionado}</Text>
        <Text onPress={() => router.replace("/UtilizadorPerfil")} style={styles.trocarPerfil}>Trocar perfil</Text>

        <TouchableOpacity><Text style={styles.menuItem}>Conta</Text></TouchableOpacity>
        <TouchableOpacity><Text style={styles.menuItem}>Ajuda</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace("/SobreNos")}>
          <Text style={styles.menuItem}>Sobre nós</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace("/_sitemap")}>
          <Text style={styles.menuItem}>Admin</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.icon2}>
          <Icon name="log-out" size={48} color="#3B82A0" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
