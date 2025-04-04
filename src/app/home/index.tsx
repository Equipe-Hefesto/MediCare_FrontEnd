import {View, Text, Image, TouchableOpacity} from "react-native";
import {MenuInferior} from "../../components/menuInferior";
import {TopBar} from "../../components/topBar";
import {styles} from "../home/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";

export default function TelaInicial(){
    const [alertaVisivel, setAlertaVisivel] = useState(false);
    return (
        <View style={styles.containerPai}>
            
            <TopBar />
            
            <View style={styles.containerUsuario}>

                <View style={styles.bemVindoUsuario}>

                    <Text style={styles.bemVindo}> Bem vindo, </Text>
                    
                    <Text id="usuario" style={styles.usuario}> Usuário </Text>
               
                </View>
                
                <Image source={require('../../../assets/images/user.png')} style={styles.imagem}/>
           
            </View>
            
            <TouchableOpacity activeOpacity={0.8} style={styles.containerBotao}>
                   
                <View style={styles.iconeBotao}>
                   
                    <MaterialCommunityIcons style={styles.icone} name="calendar-month"/>
               
                </View>

                <View style={styles.containerTexto}>

                    <Text style={styles.textoBotao}> Calendário </Text>

                </View>

            </TouchableOpacity>
            
            <TouchableOpacity activeOpacity={0.8} style={styles.containerBotao}>

                <View style={styles.iconeBotao}>

                    <MaterialCommunityIcons style={styles.icone} name="pill"/>
                    
                </View>

                <View style={styles.containerTexto}>
                        
                    <Text style={styles.textoBotao}> Medicamentos </Text>
    
                </View>

            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} style={styles.containerBotao}>
                   
                <View style={styles.iconeBotao}>
                    
                    <MaterialCommunityIcons style={styles.icone} name="heart"/>
                   
                </View>
                
                <View style={styles.containerTexto}>
                        
                    <Text style={styles.textoBotao}> Rede de Apoio </Text>

                </View>
            
            </TouchableOpacity>
            
            <View style={styles.menuInferior}> <MenuInferior /> </View>
        
        </View>
    )
}