import { Text, TouchableOpacity, View } from "react-native";
import { MenuInferior } from "../../components/menuInferior";
import { TopBar } from "../../components/topBar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "./styles"
import { ProgressBar } from "@/src/components/progressBar";
import {
    TextInput,
    FlatList,
} from 'react-native';
import { useState } from "react";
import { Botao } from "@/src/components/botao";
import { router } from "expo-router";



export default function CadastroRemedio3() {

    return (
        <View style={styles.containerPai}>

            <TopBar />

            <View style={styles.paiFilho}>

                <View style={styles.containerFilho}>
                    <Text style={styles.titulo}> Adicionar Remédio </Text>

                    <View style={styles.containerBarra}>

                        <ProgressBar variant="mixed" currentStep={3} />

                    </View>


                    <View style={styles.containerBotao}>
                        <Botao texto={"Próximo"} width={150} onPress={() => router.replace('./home')} />
                    </View>
                </View>

            </View>


            <MenuInferior cor1={"#fff"} cor2={"#fff"} cor3={"#ACE1F5"} cor4={"#fff"} />

        </View>
    )
}