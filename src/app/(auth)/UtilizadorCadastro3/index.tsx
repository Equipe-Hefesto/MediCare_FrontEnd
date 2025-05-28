import { View, ScrollView, KeyboardAvoidingView, Platform, Text, Keyboard } from "react-native";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "expo-router";
import { styles } from "./styles";
import { SemiTopBar } from "../../../components/semiTopBar";
import { InputTexto } from "../../../components/inputTexto";
import { Botao } from "../../../components/botao";
import { AlertCustomizado } from "../../../components/alertCustomizado";
import { ProgressBar } from "@/src/components/progressBar";
import { FormContext } from '../../../context/FormContext';
export let IdUtilizador = 0

export default function UtilizadorCadastro3() {
    const router = useRouter();
    const { state, dispatch } = useContext(FormContext);

    const [alertaVisivel, setAlertaVisivel] = useState(false);
    const [username, setUsername] = useState(state.username);
    const [senha, setSenha] = useState(state.senhaString);
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const [usernameErro, setUsernameErro] = useState(false);
    const [senhaErro, setSenhaErro] = useState(false);
    const [confirmarSenhaErro, setConfirmarSenhaErro] = useState(false);
    console.log("Contexto atual:", state);


    const handleUsernameChange = (text: string) => {
        setUsername(text);
        dispatch({ campo: 'username', valor: text });
        setUsernameErro(false);
    };
    const handleSenhaChange = (text: string) => {
        setSenha(text);
        setSenhaErro(false);
        dispatch({ campo: 'senhaString', valor: text });
    };

    const handleConfirmarSenhaChange = (text: string) => {
        setConfirmarSenha(text);
        setConfirmarSenhaErro(false);
    };

    const validarUsername = (username: string) => /^[a-zA-Z0-9_]{3,20}$/.test(username);

    const validarSenha = (senha: string) => senha.length >= 6;

    const validarConfirmarSenha = (confirmarSenha: string) => confirmarSenha === senha;

    async function proximo() {
        let valido = true;

        if (!validarUsername(username)) {
            setUsernameErro(true);
            valido = false;
        }

        if (!validarSenha(senha)) {
            setSenhaErro(true);
            valido = false;
        }

        if (!validarConfirmarSenha(confirmarSenha)) {
            setConfirmarSenhaErro(true);
            valido = false;
        }

        if (!valido) {
            setAlertaVisivel(true);
            return;
        }


        const requestBody = await {
            cpf: state.cpf,
            nome: state.nome,
            sobrenome: state.sobrenome,
            dtNascimento: state.dtNascimento,
            email: state.email,
            telefone: state.telefone,
            username: state.username,
            senhaString: senha,

        };

        try {
            const response = await fetch('http://medicareapi.somee.com/Medicare_Api/Utilizador/SingUp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok || response.status !== 201) {
                const errorData = await response.json();
                console.error('Detalhes do erro:', errorData);
                throw new Error(`Erro de cadastro: ${response.status}`);
            }
            const data = await response.json();
            IdUtilizador = data.idUtilizador;
            console.log("id utilizador  :", IdUtilizador)

            router.replace('/UtilizadorCadastro4')


        } catch (error) {
            console.error("Erro na requisição:", error);
            setAlertaVisivel(true);
        }

    }

    useEffect(() => {
        setUsername(state.username);
        setSenha(state.senhaString)
    }, [state]);


    const [tecladoVisivel, setTecladoVisivel] = useState(false);

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            setTecladoVisivel(true);
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setTecladoVisivel(false);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    return (
        <View style={styles.containerPai}>
            <SemiTopBar />

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={styles.card}
            >
                <View style={styles.progressBar}>
                    <ProgressBar variant="mixed" currentStep={3} />
                </View>
                <Text style={styles.titulo}>Informações de entrada</Text>


                <ScrollView
                    style={styles.scrollContainer}
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >

                    <InputTexto
                        texto="Informe um nome de Usuário"
                        value={username}
                        onChangeText={handleUsernameChange}
                        visivel={usernameErro}
                        mensagemErro="Username inválido. Deve conter entre 3 a 20 caracteres."
                    />

                    <InputTexto
                        texto={"Crie uma senha"}
                        value={senha}
                        secureTextEntry={true}
                        onChangeText={handleSenhaChange}
                        visivel={senhaErro}
                        mensagemErro="Senha inválida."
                    />

                    <InputTexto
                        texto={"Crie uma senha"}
                        value={confirmarSenha}
                        secureTextEntry={true}
                        onChangeText={handleConfirmarSenhaChange}
                        visivel={confirmarSenhaErro}
                        mensagemErro="Senha inválida."
                    />
                </ScrollView>

                {!tecladoVisivel && (<View style={styles.containerBotao}>
                    <Botao texto="Voltar" width={150} onPress={() => router.replace("./UtilizadorCadastro2")} tipo="outlined" />
                    <Botao texto="Próximo" width={150} onPress={proximo} />
                </View>)}
            </KeyboardAvoidingView>

            <AlertCustomizado visivel={alertaVisivel} onPress={() => setAlertaVisivel(false)} />
        </View>
    );
}