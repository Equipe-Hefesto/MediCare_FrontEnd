import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SemiTopBar } from "../../components/semiTopBar";
import { InputTexto } from "../../components/inputTexto";
import { AlertCustomizado } from "../../components/alertCustomizado";
import { Botao } from "../../components/botao";
import { styles } from "../login/styles";
import { useState } from "react";
import { useRouter } from 'expo-router';

export default function Login() {

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

    async function login() {
        let formOk = true;
        if (usuario == "") {
            formOk = false;
            setBorderColor1("red")
        } else
            setBorderColor1("#267797")

        if (senha == "") {
            formOk = false;
            setBorderColor2("red")
        } else
            setBorderColor1("#267797")

        if (!formOk) {
            return;
        }

        try {
            //  Chama a API
            const response = await fetch(
              'https://medicareapi.somee.com/Medicare_Api/Utilizador/Login',
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  username: usuario,
                  email: usuario,      // usa mesmo valor
                  senhaString: senha
                }),
              }
            );
      
            // Se der erro HTTP (400, 500...) cai no catch
            if (!response.ok) {
              throw new Error(`Erro de login: ${response.status}`);
            }
      
            // Converte o JSON
            const json = await response.json();
            console.log("Resposta completa da API:", json);
      
            // Só navega se vier token válido
            if (json.token && typeof json.token === "string" && json.token.length > 0) {
              console.log("Token recebido:", json.token);
              router.replace("./home");
            } else {
              // Sem token: mostra alerta
              setAlertaVisivel(true);
            }
      
          } catch (error) {
            // Erro de rede ou HTTP >=400
            console.error("Erro na requisição:", error);
            setAlertaVisivel(true);
          }
    }

    return (
        <View style={styles.containerPai}>

            <SemiTopBar />

            <View style={styles.container}>

                <View style={styles.containerInputs}>

                    <InputTexto borderColor={borderColor1} onChangeText={setUsuario} secureTextEntry={false} texto={"E-mail ou CPF"} />

                    <View style={styles.inputSenha}>

                        <InputTexto borderColor={borderColor2} onChangeText={setSenha} secureTextEntry={true} texto={"Senha"} />
                        <View style={styles.containerEsqueceuSenha}><Text style={styles.esqueceuSenha}> Esqueceu sua senha? </Text></View>

                    </View>

                </View>

                <View style={styles.containerBotao}> <Botao texto="Próximo" onPress={login} width={150} /> </View>

            </View>

            <AlertCustomizado visivel={alertaVisivel} onPress={() => setAlertaVisivel(false)} />

        </View>
    )
}