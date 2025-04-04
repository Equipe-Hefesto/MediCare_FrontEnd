import { View, Text, TouchableOpacity } from "react-native";
import {styles} from "../menuInferior/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { usePathname } from "expo-router";

export function MenuInferior(){

    const pathname = usePathname();

    const cor1 = pathname === '../../home' ? 'white' : "#ACE1F5";

    const cor2 = pathname === '../../home' ? 'white' : "white";

    const cor3 = pathname === '../../home' ? 'white' : "white";

    const cor4 = pathname === '../../home' ? 'white' : "white";

    const router = useRouter();

    return (
        <View style={styles.containerPai}>

            <View style={styles.container}>

                <TouchableOpacity style={styles.iconeTexto} onPress={() => router.replace('/home')}>

                    <MaterialCommunityIcons color={cor1} style={styles.icone} name="home"/>
                    <Text style={{marginTop: 5, color: cor1}}> Início </Text>

                </TouchableOpacity>

                <TouchableOpacity style={styles.iconeTexto}>

                    <MaterialCommunityIcons color={cor2} style={styles.icone} name="calendar-month"/>
                    <Text style={{marginTop: 5, color: cor2}}> Calendário </Text>  
               
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconeTexto}>

                    <MaterialCommunityIcons color={cor3} style={styles.icone} name="pill"/>
                    <Text style={{marginTop: 5, color: cor3}}> Medicamentos </Text>      
               
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.iconeTexto}>

                    <MaterialCommunityIcons color={cor4} style={styles.icone} name="heart"/>
                    <Text style={{marginTop: 5, color: cor4}}> Apoio </Text>

                </TouchableOpacity>
            
            </View>
            
        </View>
    )
}