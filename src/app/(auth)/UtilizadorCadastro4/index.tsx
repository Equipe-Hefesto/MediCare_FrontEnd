import { View, Text, KeyboardAvoidingView, ScrollView, Platform, Alert, Keyboard } from "react-native";
import { styles } from "./styles";
import { SemiTopBar } from "../../../components/semiTopBar";
import { AlertCustomizado } from "../../../components/alertCustomizado";
import { Botao } from "../../../components/botao";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { ProgressBar } from "@/src/components/progressBar";
import { RadioCard } from "@/src/components/radioCard";

import { IdUtilizador } from "../UtilizadorCadastro3";

export default function UtilizadorCadastro4() {
    const router = useRouter();
    const [alertaVisivel, setAlertaVisivel] = useState(false);
    const [tipoUsuario, setTipoUsuario] = useState("");
    let idTipo = 0;
    const [tipoUsuarioErro, setTipoUsuarioErro] = useState(false);


    async function proximo() {
        switch (tipoUsuario) {
            case "utilizador":
                idTipo = 2;
                break;
            case "responsavel":
                idTipo = 3;
                break;
            case "cuidador":
                idTipo = 4;
                break;
            default:
                setTipoUsuarioErro(true);
                return;
        }

        try {
            const tipoUsuarioPostBody = {
                "idUtilizador": IdUtilizador,
                "idTipoUtilizador": idTipo
            };

            // Enviar a requisição POST
            const responseTipoUsuario = await fetch('http://medicareapi.somee.com/Medicare_Api/UtilizadorTipoUtilizador', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tipoUsuarioPostBody),
            });

            if (!responseTipoUsuario.ok) {
                throw new Error(`Erro ao associar tipo de usuário: ${responseTipoUsuario.status}`);
            }


            Alert.alert('Cadastro realizado!', 'Você foi cadastrado com sucesso!', [
                { text: 'OK', onPress: () => router.replace('./Login') },
            ]);
        } catch (error) {
            console.error("Erro na requisição:", error);
            setAlertaVisivel(true);
        }
    };

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
                    <ProgressBar variant="allCheck" currentStep={4} />
                </View>

                <Text style={styles.titulo}> Informe seu tipo de usuário: </Text>
                {tipoUsuarioErro && tipoUsuario === "" && (
                    <Text style={{ color: 'red', marginTop: 2, fontSize: 10, alignSelf: "center", }}>
                        Você precisa selecionar um tipo de usuário antes de continuar.
                    </Text>
                )}
                <ScrollView
                    style={styles.scrollContainer}
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >

                    <RadioCard
                        title="Utilizador Comum"
                        description="Ideal para quem deseja monitorar sua própria medicação."
                        subtitle="Você pode também adicionar um cuidador ou responsável para ajudar no acompanhamento."
                        selected={tipoUsuario === "utilizador"}
                        onPress={() => setTipoUsuario("utilizador")}
                    />

                    <RadioCard
                        title="Responsável"
                        description="Perfeito para familiares que querem acompanhar a medicação de um ente querido."
                        subtitle="Você terá acesso às informações e lembretes dos remédios deles."
                        selected={tipoUsuario === "responsavel"}
                        onPress={() => setTipoUsuario("responsavel")}
                    />
                    <RadioCard
                        title="Cuidador"
                        description="Voltado para profissionais ou pessoas que auxiliam pacientes no controle de medicamentos."
                        subtitle="Você poderá visualizar e gerenciar a rotina medicamentosa de quem estiver sob seus cuidados."
                        selected={tipoUsuario === "cuidador"}
                        onPress={() => setTipoUsuario("cuidador")}
                    />

                </ScrollView>

                <View style={styles.containerBotao}>
                    <Botao texto="Voltar" width={150} onPress={() => router.replace("./UtilizadorCadastro3")} tipo="outlined" />
                    <Botao texto="Próximo" width={150} onPress={proximo} />
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}
