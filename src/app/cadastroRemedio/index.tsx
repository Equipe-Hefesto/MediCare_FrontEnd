import { Text, TouchableOpacity, View } from "react-native";
import { MenuInferior } from "../../components/menuInferior";
import { TopBar } from "../../components/topBar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "./styles"
import { router } from "expo-router";

export default function CadastroRemedio(){
    return(
        <View style={styles.containerPai}>

            <TopBar />

                <View style={styles.paiFilho}> 
                    
                    <View style={styles.containerFilho}> 

                        <Text style={styles.titulo}> Clique para adicionar seu remédio </Text>

                        <TouchableOpacity activeOpacity={0.7} onPress={() => router.replace('./RemedioCadastro1')} style={styles.containerBotao}>
                            
                            <MaterialCommunityIcons name="plus" style={styles.icone} />

                        </TouchableOpacity>

                    </View>

                </View>

            <MenuInferior cor1={"#fff"} cor2={"#fff"} cor3={"#ACE1F5"} cor4={"#fff"}/>

        </View>
    )
}