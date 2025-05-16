import { View, Text, Image } from "react-native";
import { styles } from "./styles";
import { SemiTopBar } from "../../components/semiTopBar";
import { Botao } from "../../components/botao";
import { useRouter } from "expo-router";

export default function Inicial(){

    const router = useRouter();

    return(
        <View style={styles.containerPai}>
            
            <SemiTopBar />
            
            <View style={styles.container}>

                <Text style={styles.titulo}> Bem-vindo! </Text>
                
                <View style={styles.containerLogo}> <Image source={require("../../../assets/images/logo.png")} style={styles.logo}/> </View>

                <View style={styles.containerBotoes}>
                
                    <View style={styles.containerBotao}> <Botao texto="Entrar" width={200} onPress={() => router.push("./Login")}/> </View>

                    <Text style={styles.titulo}> OU </Text>

                    <View style={styles.containerBotao}> <Botao texto="Cadastrar" width={200} onPress={() => router.push("./UtilizadorCadastro1")}/> </View>

                </View>

            </View>

        </View>
    );
}