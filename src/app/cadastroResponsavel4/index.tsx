import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "../cadastroResponsavel4/styles"
import { SemiTopBar } from "../../components/semiTopBar";
import { InputTexto } from "../../components/inputTexto";
import { Botao } from "../../components/botao";
import { AlertCustomizado } from "../../components/alertCustomizado";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function CadastroResponsavel4(){

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
                
                    <View style={styles.containerInput}> <InputTexto keyboardType={"numeric"} texto={"Se você tem um familiar, informe o CPF"} onChangeText={setCpfUtilizador} secureTextEntry={false} /> </View>
                
                    <View style={styles.containerInput}>

                        <Text style={styles.texto}> Qual grau de Parentesco </Text>
                
                        <Picker selectedValue={parentesco} onValueChange={(parentescoSelecionado) => setParentesco(parentescoSelecionado)} style={styles.picker}>
                            <Picker.Item label="Pai/Mãe" value="pai/mae" />
                            <Picker.Item label="Avô/Avó" value="avo" />
                            <Picker.Item label="Esposo/Esposa" value="esposo/esposa" />
                            <Picker.Item label="Filho/Filha" value="filho/filha" />
                            <Picker.Item label="Outro(a)" value="outro" />
                        </Picker>

                    </View>
                </View>        
                
                <View style={styles.containerBotao}> <Botao texto={"Próximo"} width={150} onPress={proximo}/> </View>
                            
            </View>

            <AlertCustomizado visivel={alertaVisivel} onPress={() => setAlertaVisivel(false)}/>
            
        </View>
    );
}