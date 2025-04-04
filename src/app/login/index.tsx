import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SemiTopBar } from "../../components/semiTopBar";
import { InputTexto } from "../../components/inputTexto";
import { AlertCustomizado } from "../../components/alertCustomizado";
import { Botao } from "../../components/botao";
import { styles } from "../login/styles";
import { useState } from "react";
import { useRouter } from 'expo-router';

export default function Login(){

    const [alertaVisivel, setAlertaVisivel] = useState(false);

    const router = useRouter();
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");

    const [borderColor1, setBorderColor1] = useState("");
    const [borderColor2, setBorderColor2] = useState("");

    if (borderColor1 == "")
        setBorderColor1("#267797")
    if (borderColor2 == "")
        setBorderColor2("#267797")

    function login(){
        if(usuario == "")
            setBorderColor1("red")
        else
            setBorderColor1("#267797")

        if (senha == "")
            setBorderColor2("red")
        else
            setBorderColor1("#267797")

        if (usuario != "" && senha != "")
            router.replace("./home")
    }

    return (
        <View style={styles.containerPai}>

            <SemiTopBar />

            <View style={styles.container}>
                
                <View style={styles.containerInputs}>

                    <InputTexto borderColor={borderColor1} onChangeText={setUsuario} secureTextEntry={false} texto={"E-mail ou CPF"}/>

                    <View style={styles.inputSenha}>

                        <InputTexto borderColor={borderColor2} onChangeText={setSenha} secureTextEntry={true} texto={"Senha"}/>
                        <View style={styles.containerEsqueceuSenha}><Text style={styles.esqueceuSenha}> Esqueceu sua senha? </Text></View>
                    
                    </View>

                </View>
                
                <View style={styles.containerBotao}> <Botao texto="Próximo" onPress={login} width={150}/> </View>

            </View>

            <AlertCustomizado visivel={alertaVisivel} onPress={() => setAlertaVisivel(false)}/>

        </View>
    )
}