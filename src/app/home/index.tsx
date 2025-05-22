import { View, Text, Image, TouchableOpacity } from "react-native";
import { MenuInferior } from "../../components/menuInferior";
import { TopBar } from "../../components/topBar";
import { styles } from "../home/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { Slot, useRouter } from "expo-router";
import { AuthContext } from "@/src/context/AuthContext";
import { MenuLateral } from "@/src/components/menuLateral";
import { useMenu } from "@/src/context/menuContext";
import { jwtDecode } from "jwt-decode";

export default function TelaInicial() {
    const [alertaVisivel, setAlertaVisivel] = useState(false);
    const router = useRouter();
    const auth = useContext(AuthContext);
    const { menuAberto } = useMenu();
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

    if (!auth) {
        console.log("Deu erro auth")
        return null;
    }
    const { token, perfilSelecionado } = auth;
      const [username, setUsername] = useState("");
    
      useEffect(() => {
        const fetchRoles = async () => {
          if (!token) return;
    
          const decoded: any = jwtDecode(token);
          const userRoles = Array.isArray(decoded.unique_name) ? decoded.unique_name : [decoded.unique_name];
          setUsername(userRoles);
        };
    
        fetchRoles();
      }, []);
    

    console.log("token ", token)
    return (
        <View style={styles.containerPai}>


            <TopBar />
            {menuAberto && <MenuLateral />}
            <View style={styles.containerUsuario}>

                <View style={styles.bemVindoUsuario}>

                    <Text style={styles.bemVindo}> Bem vindo, </Text>

                    <Text id="usuario" style={styles.usuario}> {username} </Text>

                </View>

                <Image source={getImageByPerfil(perfilSelecionado)} style={styles.imagem} />

            </View>

            <TouchableOpacity activeOpacity={0.8} style={styles.containerBotao} onPress={() => router.replace('/Calendario')}>

                <View style={styles.iconeBotao}>

                    <MaterialCommunityIcons style={styles.icone} name="calendar-month" />

                </View>

                <View style={styles.containerTexto}>

                    <Text style={styles.textoBotao}> Calendário </Text>

                </View>

            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} style={styles.containerBotao} onPress={() => router.replace("./cadastroRemedio")}>

                <View style={styles.iconeBotao}>

                    <MaterialCommunityIcons style={styles.icone} name="pill" />

                </View>

                <View style={styles.containerTexto}>

                    <Text style={styles.textoBotao}> Medicamentos </Text>

                </View>

            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} style={styles.containerBotao}>

                <View style={styles.iconeBotao}>

                    <MaterialCommunityIcons style={styles.icone} name="heart" />

                </View>

                <View style={styles.containerTexto}>

                    <Text style={styles.textoBotao}> Rede de Apoio </Text>

                </View>

            </TouchableOpacity>

            <View style={styles.menuInferior}> <MenuInferior cor1={"#ACE1F5"} cor2={"#fff"} cor3={"#fff"} cor4={"#fff"} /> </View>

        </View>
    )
}