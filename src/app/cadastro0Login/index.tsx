import { View, Text, Image } from "react-native";
import { styles } from "../cadastro0Login/styles";
import { SemiTopBar } from "../../components/semiTopBar";
import { BarraProgresso } from "../../components/barraProgresso";
import { AlertCustomizado } from "../../components/alertCustomizado";
import { Botao } from "../../components/botao";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export function Cadastro0Login(){

    const router = useRouter();

    return(
        <View style={styles.containerPai}>
            
            <SemiTopBar />
            
            <View style={styles.container}>

                <Text style={styles.titulo}> Bem-vindo! </Text>
                
                <View style={styles.containerLogo}> <Image source={require("../../../assets/images/logo.png")} style={styles.logo}/> </View>

                <View style={styles.containerBotoes}>
                
                    <View style={styles.containerBotao}> <Botao texto="Entrar" width={200} onPress={() => router.push("./login")}/> </View>

                    <Text style={styles.titulo}> OU </Text>

                    <View style={styles.containerBotao}> <Botao texto="Cadastrar" width={200} onPress={() => router.push("./cadastro1")}/> </View>

                </View>

            </View>

        </View>
    );
}