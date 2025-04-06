import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "../cadastroResponsavel3/styles"
import { SemiTopBar } from "../../components/semiTopBar";
import { BarraProgresso } from "../../components/barraProgresso";
import { InputTexto } from "../../components/inputTexto";
import { Botao } from "../../components/botao";
import { AlertCustomizado } from "../../components/alertCustomizado";
import { useState } from "react";

export default function CadastroResponsavel3(){

    const router = useRouter();
    const [alertaVisivel, setAlertaVisivel] = useState(false);

    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const [borderColor1, setBorderColor1] = useState("");
    const [borderColor2, setBorderColor2] = useState("");
    const [borderColor3, setBorderColor3] = useState("");
    const [borderColor4, setBorderColor4] = useState("");

    if (borderColor1 == "")
        setBorderColor1("#267797")
    if (borderColor2 == "")
        setBorderColor2("#267797")
    if (borderColor3 == "")
        setBorderColor3("#267797")
    if (borderColor4 == "")
        setBorderColor4("#267797")

    function proximo(){
        if (email == "")
            setBorderColor1("red")
        else
            setBorderColor1("#267797")

        if (telefone == "")
            setBorderColor2("red")
        else
            setBorderColor2("#267797")

        if (senha == "")
            setBorderColor3("red")
        else
            setBorderColor3("#267797")

        if (confirmarSenha == "")
            setBorderColor4("red")
        else
            setBorderColor4("#267797")
        
        if (email != "" && telefone != "" && senha != "" && confirmarSenha != "")
            router.push("./cadastroResponsavel4")
    }
    
    return (
        <View style={styles.containerPai}>

            <SemiTopBar />
            
            <View style={styles.container}>

                <BarraProgresso />
                
                <View style={styles.containerInputs}>
                
                    <View style={styles.containerInput}> <InputTexto borderColor={borderColor1} texto={"E-mail"} onChangeText={setEmail} secureTextEntry={false} /> </View>
                
                    <View style={styles.containerInput}> <InputTexto borderColor={borderColor2} texto={"Telefone"} onChangeText={setTelefone} secureTextEntry={false} /> </View>

                    <View style={styles.containerInput}> <InputTexto borderColor={borderColor3} texto={"Crie uma senha"} onChangeText={setSenha} secureTextEntry={true} /> </View>
                
                    <View style={styles.containerInput}> <InputTexto borderColor={borderColor4} texto={"Confirme sua senha"} onChangeText={setConfirmarSenha} secureTextEntry={true} /> </View>
                
                </View>        
                
                <View style={styles.containerBotao}> <Botao texto={"Próximo"} width={150} onPress={proximo}/> </View>
                            
            </View>

            <AlertCustomizado visivel={alertaVisivel} onPress={() => setAlertaVisivel(false)}/>
            
        </View>
    );
}