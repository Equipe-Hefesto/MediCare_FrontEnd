import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "../cadastroUtilizador4/styles"
import { SemiTopBar } from "../../components/semiTopBar";
import { InputTexto } from "../../components/inputTexto";
import { Botao } from "../../components/botao";
import { AlertCustomizado } from "../../components/alertCustomizado";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function CadastroUtilizador4(){

    const router = useRouter();
    const [alertaVisivel, setAlertaVisivel] = useState(false);

    const [cpfResponsavel, setCpfResponsavel] = useState("");
    const [cpfCuidador, setCpfCuidador] = useState("");


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
                
                    <View style={styles.containerInput}> <InputTexto keyboardType={"numeric"} texto={"Se você tem um responsável, informe o CPF"} onChangeText={setCpfResponsavel} secureTextEntry={false} /> </View>
                
                    <View style={styles.containerInput}> <InputTexto keyboardType={"numeric"} texto={"Se você tem um Cuidador, informe o CPF"} onChangeText={setCpfCuidador} secureTextEntry={false} /> </View>
                </View>        
                
                <View style={styles.containerBotao}> <Botao texto={"Próximo"} width={150} onPress={proximo}/> </View>
                            
            </View>

            <AlertCustomizado visivel={alertaVisivel} onPress={() => setAlertaVisivel(false)}/>
            
        </View>
    );
}