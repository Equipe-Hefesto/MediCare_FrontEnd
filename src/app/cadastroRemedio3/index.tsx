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
import { WeekDaySelector } from "@/src/components/weekDaySelector";




export default function CadastroRemedio3() {
const [selected, setSelected] = useState<number[]>([]);

    return (
        <View style={styles.containerPai}>

            <TopBar />

            <View style={styles.paiFilho}>

                <View style={styles.containerFilho}>
                    <Text style={styles.titulo}> Adicionar Remédio </Text>

                    <View style={styles.containerBarra}>

                        <ProgressBar variant="mixed" currentStep={2} />

                    </View>

                    <WeekDaySelector
  selectedDays={selected}
  onSelect={(index) => {
    setSelected((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  }}
  today={new Date().getDay()} // pega o dia atual (0 a 6)
/>

                    <View style={styles.containerBotao}>
                        <Botao texto={"Próximo"} width={150} onPress={() => router.replace('./cadastroRemedio4')} />
                    </View>
                </View>

            </View>


            <MenuInferior cor1={"#fff"} cor2={"#fff"} cor3={"#ACE1F5"} cor4={"#fff"} />

        </View>
    )
}