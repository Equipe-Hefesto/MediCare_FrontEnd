import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { SemiTopBar } from "../../../components/semiTopBar";
import { InputTexto } from "../../../components/inputTexto";
import { AlertCustomizado } from "../../../components/alertCustomizado";
import { Botao } from "../../../components/botao";
import { styles } from "./styles";
import { useContext, useState } from "react";
import { useRouter } from 'expo-router';
import { AuthContext } from "@/src/context/AuthContext";

export default function Login() {

  const [alertaVisivel, setAlertaVisivel] = useState(false);

  const router = useRouter();
  const [credencial, setCredencial] = useState("");
  const [senha, setSenha] = useState("");

  const [credencialErro, setCredencialErro] = useState(false);
  const [senhaErro, setSenhaErro] = useState(false);
  const auth = useContext(AuthContext);

  if (!auth) {
    console.log("Deu erro auth")
    return null;
  }

  const { saveToken } = auth;
  async function proximo() {
    if (credencial == "") {
      setCredencialErro(true)
    } else setCredencialErro(false)
    if (senha == "") {
      setSenhaErro(true)
    } else setSenhaErro(false)


    try {
      //  Chama a API
      const response = await fetch(
        'https://medicareapi.somee.com/Medicare_Api/Utilizador/Login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: credencial,
            email: credencial,
            senhaString: senha
          }),
        }
      );
      const contentType = response.headers.get("content-type");

      // Se der erro HTTP (400, 500...) cai no catch
      if (!response.ok) {
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          console.error("Erro no servidor:", errorData);
        } else {
          const errorText = await response.text();
          console.error("Erro no servidor (texto):", errorText);
        }
        throw new Error(`Erro de login: ${response.status}`);
      }

      // Converte o JSON
      const json = await response.json();
      console.log("Resposta completa da API:", json);

      // Só navega se vier token válido
      if (json.token && typeof json.token === "string" && json.token.length > 0) {
        console.log("Token recebido:", json.token);
        await saveToken(json.token);  
        router.replace("/(app)/UtilizadorPerfil");  
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

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.card}
      >

        <View><Text style={styles.titulo}>Entrar</Text></View>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >

          <InputTexto
            texto="Nome de usuário ou email"
            onChangeText={setCredencial}
            visivel={credencialErro}
            mensagemErro="Credencial inválida."
          />

          <InputTexto
            texto="Senha"
            onChangeText={setSenha}
            secureTextEntry={true}
            visivel={senhaErro}
            mensagemErro="Senha inválida."
          />
          <View style={styles.containerEsqueceuSenha}>
            <Text style={styles.esqueceuSenha}>
              Esqueceu sua senha?
            </Text>
          </View>


        </ScrollView>
        (<View style={styles.containerBotao}>
          <Botao texto="Voltar" width={150} onPress={() => router.replace("./Inicial")} tipo="outlined" />
          <Botao texto="Próximo" width={150} onPress={proximo} />
        </View>)


        <AlertCustomizado visivel={alertaVisivel} onPress={() => setAlertaVisivel(false)} />
      </KeyboardAvoidingView>
    </View>
  )
}