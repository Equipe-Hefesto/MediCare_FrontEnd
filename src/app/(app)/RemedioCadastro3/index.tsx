import { View, KeyboardAvoidingView, Platform, Text, Keyboard, ScrollView } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "expo-router";
import { Botao } from "../../../components/botao";
import { ProgressBar } from "@/src/components/progressBar";
import { styles } from "./styles";
import { MenuInferior } from "@/src/components/menuInferior";
import { TopBar } from "@/src/components/topBar";
import { PosologiaContext } from "@/src/context/PosologiaContext";
import { RadioCard } from "@/src/components/radioCard";
import { MenuLateral } from "@/src/components/menuLateral";
import { useMenu } from "@/src/context/menuContext";

export default function RemedioCadastro1() {
  const router = useRouter();
  const { state, dispatch } = useContext(PosologiaContext);
      const { menuAberto } = useMenu();
  

  const [tecladoVisivel, setTecladoVisivel] = useState(false);
  const [tipoAgendamento, setTipoAgendamento] = useState("");
  const [tipoAgendamentoErro, setTipoAgendamentoErro] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => setTecladoVisivel(true));
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => setTecladoVisivel(false));
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const proximo = () => {
    switch (tipoAgendamento) {
      case "hora":
        dispatch({ campo: "idTipoAgendamento", valor: 1 });
        router.replace("./RemedioCadastro4-1");
        break;
      case "intervalo":
        dispatch({ campo: "idTipoAgendamento", valor: 2 });
        router.replace("./RemedioCadastro4-2");
        break;
      case "diaSemana":
        dispatch({ campo: "idTipoAgendamento", valor: 3 });
        router.replace("./RemedioCadastro4-3");
        break;
      case "ciclo":
        dispatch({ campo: "idTipoAgendamento", valor: 4 });
        router.replace("./RemedioCadastro4-4");
        break;
      default:
        setTipoAgendamentoErro(true);
        return;
    }
  };



  console.log("INFO: ", state)

  return (
    <View style={styles.containerPai}>
      <TopBar />
                  {menuAberto && <MenuLateral />}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={[
          styles.card,
          tecladoVisivel ? { marginBottom: 16 } : { marginBottom: 91 },
        ]}
      >
        <View style={styles.progressBar}>
          <ProgressBar variant="mixed" currentStep={3} />
        </View>

        <Text style={styles.titulo}>Qual frequência você toma?</Text>
        {tipoAgendamentoErro && (
          <Text style={styles.errorText}>Selecione uma opção.</Text>
        )}

        <View style={styles.scrollContainer}>

          <RadioCard
            title="Hora"
            description="Agendamento baseado em horários fixos ao longo do dia."
            subtitle="Escolha horários específicos para tomar a medicação."
            selected={tipoAgendamento === "hora"}
            onPress={() => setTipoAgendamento("hora")}
          />

          <RadioCard
            title="Intervalo"
            description="Tome o medicamento em intervalos regulares de tempo."
            subtitle="Ideal para remédios que precisam ser tomados a cada X horas."
            selected={tipoAgendamento === "intervalo"}
            onPress={() => setTipoAgendamento("intervalo")}
          />

          <RadioCard
            title="Dia da Semana"
            description="Agende a medicação com base nos dias da semana."
            subtitle="Use para medicamentos tomados só em dias específicos."
            selected={tipoAgendamento === "diaSemana"}
            onPress={() => setTipoAgendamento("diaSemana")}
          />

          <RadioCard
            title="Ciclo"
            description="Agendamento cíclico com intervalos de dias entre doses."
            subtitle="Exemplo: tomar por 5 dias e pausar por 2 dias."
            selected={tipoAgendamento === "ciclo"}
            onPress={() => setTipoAgendamento("ciclo")}
          />
        </View>

        {!tecladoVisivel && (
          <View style={styles.containerBotao}>
            <Botao texto="Próximo" width={150} onPress={proximo} />
          </View>
        )}
      </KeyboardAvoidingView>

      {!tecladoVisivel && (
        <MenuInferior cor1="#fff" cor2="#fff" cor3="#ACE1F5" cor4="#fff" />
      )}
    </View>
  );
}
