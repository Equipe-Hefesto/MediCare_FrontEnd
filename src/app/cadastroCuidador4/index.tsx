import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "../cadastroCuidador4/styles"
import { SemiTopBar } from "../../components/semiTopBar";
import { InputTexto } from "../../components/inputTexto";
import { Botao } from "../../components/botao";
import { AlertCustomizado } from "../../components/alertCustomizado";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function CadastroCuidador4(){

    const router = useRouter();
    const [alertaVisivel, setAlertaVisivel] = useState(false);

    const [cpfUtilizador, setCpfUtilizador] = useState("");
    const [parentesco, setParentesco] = useState("pai/mae");


    function proximo(){
        alert("Cadastro realizado!")

        router.replace("./home")
    }
    
    return (
        <View style={styles.containerPai}>

            <SemiTopBar />
            
            <View style={styles.container}>

                <View style={styles.containerBarra}>
                                
                    <View style={styles.containerCirculoFeito}>
                                                        
                        <View style={styles.containerTexto}> <MaterialCommunityIcons style={styles.numero} name="check" color={"#fff"}/> </View>
                                                    
                    </View>
                                        
                    <View style={styles.linha}> </View>
                                        
                    <View style={styles.containerCirculoFeito}>
                                                        
                        <View style={styles.containerTexto}> <MaterialCommunityIcons style={styles.numero} name="check" color={"#fff"}/> </View>
                                                    
                    </View>
                                        
                    <View style={styles.linha}> </View>
                                        
                    <View style={styles.containerCirculoFeito}>
                                                        
                        <View style={styles.containerTexto}> <MaterialCommunityIcons style={styles.numero} name="check" color={"#fff"}/> </View>
                                                    
                    </View>
                                        
                    <View style={styles.linha}> </View>
                                        
                    <View style={styles.containerCirculoFeito}>
                                                        
                        <View style={styles.containerTexto}> <Text style={styles.numeroAtual}> 4 </Text> </View>
                                                    
                    </View>
                                    
                </View>
            
                <View style={styles.containerInputs}>
                
                    <View style={styles.containerInput}> <InputTexto keyboardType={"numeric"} texto={"Se você tem um paciente, informe o CPF"} onChangeText={setCpfUtilizador} secureTextEntry={false} /> </View>
                
                </View>        
                
                <View style={styles.containerBotao}> <Botao texto={"Próximo"} width={150} onPress={proximo}/> </View>
                            
            </View>

            <AlertCustomizado visivel={alertaVisivel} onPress={() => setAlertaVisivel(false)}/>
            
        </View>
    );
}