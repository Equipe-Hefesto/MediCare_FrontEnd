import { View, KeyboardAvoidingView, Platform, Text, Keyboard } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "expo-router";
import { Botao } from "../../components/botao";
import { ProgressBar } from "@/src/components/progressBar";
import { styles } from "./styles";
import { MenuInferior } from "@/src/components/menuInferior";
import { TopBar } from "@/src/components/topBar";
import { PosologiaContext } from "@/src/context/PosologiaContext";
import { DateInput } from "@/src/components/inputDate";

export default function RemedioCadastro1() {
  const router = useRouter();
  const { state, dispatch } = useContext(PosologiaContext);
  const [dtNascimento, setDtNascimento] = useState(""); 
      const [dtNascimentoErro, setDtNascimentoErro] = useState(false);

  const [tecladoVisivel, setTecladoVisivel] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => setTecladoVisivel(true));
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => setTecladoVisivel(false));
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  const handleDtNascimentoChange = (text: string) => {
        setDtNascimento(text);
        setDtNascimentoErro(false);

        // Converte o texto dd/MM/yyyy para um objeto Date
        const [day, month, year] = text.split('/').map(Number);
        const date = new Date(year, month - 1, day);

        // Formata a data para o formato ISO
        const isoDate = date.toISOString();

        // Envia a data no formato ISO para o dispatch
        dispatch({ campo: 'dataInicio', valor: isoDate });
    };

   const formatDate = (isoDate: string) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };


  return (
    <View style={styles.containerPai}>
      <TopBar />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={[
          styles.card,
          tecladoVisivel ? { marginBottom: 16 } : { marginBottom: 91 },
        ]}
      >
        <View style={styles.progressBar}>
          <ProgressBar variant="mixed" currentStep={4} />
        </View>

        <Text style={styles.titulo}>Definir dose</Text>

        <View style={styles.scrollContainer}>
          <DateInput
            label="Data de Nascimento"
            value={formatDate(dtNascimento)}  // Formata a data para dd/MM/yyyy
            onChange={handleDtNascimentoChange}
            visivel={dtNascimentoErro}
            mensagemErro="Data inválida."
          />
          <DateInput
            label="Data de Nascimento"
            value={formatDate(dtNascimento)}  // Formata a data para dd/MM/yyyy
            onChange={handleDtNascimentoChange}
            visivel={dtNascimentoErro}
            mensagemErro="Data inválida."
          />
        </View>

        {!tecladoVisivel && (
          <View style={styles.containerBotao}>
            <Botao texto="Próximo" width={150} onPress={() => router.replace("/cadastroRemedio")} />
          </View>
        )}
      </KeyboardAvoidingView>

      {!tecladoVisivel && (
        <MenuInferior cor1="#fff" cor2="#fff" cor3="#ACE1F5" cor4="#fff" />
      )}
    </View>
  );
}
