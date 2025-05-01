import { Text, View } from "react-native";
import { styles } from "../cadastroResponsavel2/styles"
import { SemiTopBar } from "../../components/semiTopBar";
import { InputTexto } from "../../components/inputTexto";
import { useState } from "react";
import { Botao } from "../../components/botao";
import { useRouter } from "expo-router";
import { AlertCustomizado } from "../../components/alertCustomizado";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function CadastroResponsavel2(){

    const router = useRouter();
    const [alertaVisivel, setAlertaVisivel] = useState(false);

    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [cpf, setCPF] = useState("");

    const [borderColor1, setBorderColor1] = useState("");
    const [borderColor2, setBorderColor2] = useState("");
    const [borderColor3, setBorderColor3] = useState("");

    if (borderColor1 == "")
        setBorderColor1("#267797")
    if (borderColor2 == "")
        setBorderColor2("#267797")
    if (borderColor3 == "")
        setBorderColor3("#267797")

    function proximo(){
        if (nome == "")
            setBorderColor1("red")
        else
            setBorderColor1("#267797")

        if (sobrenome == "")
            setBorderColor2("red")
        else
            setBorderColor2("#267797")

        if (cpf == "")
            setBorderColor3("red")
        else 
            setBorderColor3("#267797")
        
        if (nome != "" && sobrenome != "" && cpf != "")
            router.push("./cadastroResponsavel3")
    }

    return(
        <View style={styles.containerPai}>

            <SemiTopBar />

            <View style={styles.container}>

                <View style={styles.containerBarra}>
                            
                    <View style={styles.containerCirculoFeito}>
                                    
                        <View style={styles.containerTexto}> <MaterialCommunityIcons style={styles.numero} name="check" color={"#fff"}/> </View>
                                
                    </View>
                    
                    <View style={styles.linha}> </View>
                    
                    <View style={styles.containerCirculoFeito}>
                                    
                        <View style={styles.containerTexto}> <Text style={styles.numeroAtual}> 2 </Text> </View>
                                
                    </View>
                    
                    <View style={styles.linha}> </View>
                    
                    <View style={styles.containerCirculo}>
                                    
                        <View style={styles.containerTexto}> <Text style={styles.numero}> 3 </Text> </View>
                                
                    </View>
                    
                    <View style={styles.linha}> </View>
                    
                    <View style={styles.containerCirculo}>
                                    
                        <View style={styles.containerTexto}> <Text style={styles.numero}> 4 </Text> </View>
                                
                    </View>
                    
                </View>

                <View style={styles.containerInputs}>

                    <View style={styles.containerInput}> <InputTexto borderColor={borderColor1} texto={"Informe seu primeiro Nome"} onChangeText={setNome} secureTextEntry={false} /> </View>

                    <View style={styles.containerInput}> <InputTexto borderColor={borderColor2} texto={"Informe seu Sobrenome"} onChangeText={setSobrenome} secureTextEntry={false} /> </View>

                    <View style={styles.containerInput}> <InputTexto keyboardType={"numeric"} borderColor={borderColor3} texto={"Informe seu CPF"} onChangeText={setCPF} secureTextEntry={false} /> </View>

                </View>        

                <View style={styles.containerBotao}> <Botao texto={"Próximo"} width={150} onPress={proximo}/> </View>
            
            </View>

            <AlertCustomizado visivel={alertaVisivel} onPress={() => setAlertaVisivel(false)}/>
            
        </View>
    );
}