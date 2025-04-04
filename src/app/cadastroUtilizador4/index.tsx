import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "../cadastroUtilizador4/styles"
import { SemiTopBar } from "../../components/semiTopBar";
import { BarraProgresso } from "../../components/barraProgresso";
import { InputTexto } from "../../components/inputTexto";
import { Botao } from "../../components/botao";
import { AlertCustomizado } from "../../components/alertCustomizado";
import { useState } from "react";

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

                <BarraProgresso />
                
                <View style={styles.containerInputs}>
                
                    <View style={styles.containerInput}> <InputTexto texto={"Se você tem um responsável, informe o CPF"} onChangeText={setCpfResponsavel} secureTextEntry={false} /> </View>
                
                    <View style={styles.containerInput}> <InputTexto texto={"Se você tem um Cuidador, informe o CPF"} onChangeText={setCpfCuidador} secureTextEntry={false} /> </View>
                </View>        
                
                <View style={styles.containerBotao}> <Botao texto={"Próximo"} width={150} onPress={proximo}/> </View>
                            
            </View>

            <AlertCustomizado visivel={alertaVisivel} onPress={() => setAlertaVisivel(false)}/>
            
        </View>
    );
}