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

export default function UtilizadorCadastro2() {
    const router = useRouter();
    const { state, dispatch } = useContext(FormContext);

    const [alertaVisivel, setAlertaVisivel] = useState(false);
    const [email, setEmail] = useState(state.email);
    const [confirmarEmail, setConfirmarEmail] = useState("");
    const [telefone, setTelefone] = useState(state.telefone);

    const [emailErro, setEmailErro] = useState(false);
    const [confirmarEmailErro, setConfirmarEmailErro] = useState(false);
    const [telefoneErro, setTelefoneErro] = useState(false);


    const handleEmailChange = (text: string) => {
        setEmail(text);
        dispatch({ campo: 'email', valor: text });
        setEmailErro(false);
    };
    const handleConfirmarEmailChange = (text: string) => {
        setConfirmarEmail(text);
        setConfirmarEmailErro(false);
    };

    const handleTelefoneChange = (text: string) => {
        const telefoneLimpo = text.replace(/\D/g, '');
        setTelefone(text);
        dispatch({ campo: 'telefone', valor: telefoneLimpo });
        setTelefoneErro(false)
    };

    const validarEmail = (email: string) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim());

    const validarConfirmarEmail = (confirmarEmail: string) => {
        return confirmarEmail.trim() !== '' && confirmarEmail === email;
    };
    const validarTelefone = (telefone: string) => {
        const cleaned = telefone.replace(/\D/g, '');
        return cleaned.length === 11;
    };

    function proximo() {
        let valido = true;

        if (!validarEmail(email)) {
            setEmailErro(true);
            valido = false;
        }

        if (!validarConfirmarEmail(confirmarEmail)) {
            setConfirmarEmailErro(true);
            valido = false;
        }

        if (!validarTelefone(telefone)) {
            setTelefoneErro(true);
            valido = false;
        }

        if (valido) {
            router.push("./UtilizadorCadastro3");
        } else {
            setAlertaVisivel(true);
        }
    }

    useEffect(() => {
        setEmail(state.email);
        setTelefone(state.telefone)
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
                    <ProgressBar variant="mixed" currentStep={2} />
                </View>
                <Text style={styles.titulo}>Informações de contato</Text>

                <ScrollView
                    style={styles.scrollContainer}
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >

                    <InputTexto
                        texto="E-mail"
                        value={email}
                        onChangeText={handleEmailChange}
                        keyboardType="email-address"
                        visivel={emailErro}
                        mensagemErro="Email inválido."
                        placeholder="Digite seu email"
                    />

                    <InputTexto
                        texto="Confirmar E-mail"
                        value={confirmarEmail}
                        onChangeText={handleConfirmarEmailChange}
                        keyboardType="email-address"
                        visivel={confirmarEmailErro}
                        mensagemErro="Email diferente."
                        placeholder="Digite novamente seu email"

                    />

                    <InputTexto
                        texto="Telefone"
                        value={telefone}
                        onChangeText={handleTelefoneChange}
                        keyboardType="phone-pad"
                        maskType="cel-phone"
                        visivel={telefoneErro}
                        mensagemErro="Telefone inválido."
                        placeholder="Digite seu número"

                    />
                </ScrollView>

                {!tecladoVisivel && (<View style={styles.containerBotao}>
                    <Botao texto="Voltar" width={150} onPress={() => router.replace("./UtilizadorCadastro1")} tipo="outlined" />
                    <Botao texto="Próximo" width={150} onPress={proximo} />
                </View>)}
            </KeyboardAvoidingView>

            <AlertCustomizado visivel={alertaVisivel} onPress={() => setAlertaVisivel(false)} />
        </View>
    );
}