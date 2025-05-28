import { View, KeyboardAvoidingView, Platform, Text, Keyboard } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "expo-router";
import { Botao } from "../../../components/botao";
import { ProgressBar } from "@/src/components/progressBar";
import { styles } from "./styles";
import { MenuInferior } from "@/src/components/menuInferior";
import { TopBar } from "@/src/components/topBar";
import { PosologiaContext } from "@/src/context/PosologiaContext";
import { DateInput } from "@/src/components/inputDate";
import { DateRangeInput } from "@/src/components/inputRangeDate";
import { MenuLateral } from "@/src/components/menuLateral";
import { useMenu } from "@/src/context/menuContext";
import { InputTexto } from "@/src/components/inputTexto";

export default function RemedioCadastro4_4() {
  const router = useRouter();
  const { state, dispatch } = useContext(PosologiaContext);
  const [dataInicio, setDataInicio] = useState(state.dataInicio);
  const [dataFim, setDataFim] = useState(state.dataFim);
  const { menuAberto } = useMenu();
  const [uso, setUso] = useState(state.diasUso);
  const [pausa, setPausa] = useState(state.diasPausa);

  const [usoErro, setUsoErro] = useState(false);
  const [pausaErro, setPausaErro] = useState(false);


  useEffect(() => {
    if (dataInicio && dataFim) {
      const [diaInicio, mesInicio, anoInicio] = dataInicio.split("/").map(Number);
      const [diaFim, mesFim, anoFim] = dataFim.split("/").map(Number);

      const dataInicioObj = new Date(anoInicio, mesInicio - 1, diaInicio);
      const dataFimObj = new Date(anoFim, mesFim - 1, diaFim);

      // Só salva se a data final for igual ou depois da inicial
      if (dataFimObj >= dataInicioObj) {
        const isoInicio = dataInicioObj.toISOString();
        const isoFim = dataFimObj.toISOString();

        dispatch({ campo: "dataInicio", valor: isoInicio });
        dispatch({ campo: "dataFim", valor: isoFim });
      }
    }
  }, [dataInicio, dataFim]);
  const [tecladoVisivel, setTecladoVisivel] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => setTecladoVisivel(true));
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => setTecladoVisivel(false));
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleUsoChange = (text: string) => {
    setUso(text);
    dispatch({ campo: 'diasUso', valor: text });
    setUsoErro(false);
  };
  const handlePausaChange = (text: string) => {
    setPausa(text);
    dispatch({ campo: 'diasPausa', valor: text });
    setPausaErro(false);
  };

  console.log("State: ", state)
  async function proximo() {
    let valido = true;

    if (!uso || isNaN(Number(uso))) {
      setUsoErro(true);
      valido = false;
    }

    if (!pausa || isNaN(Number(pausa))) {
      setPausaErro(true);
      valido = false;
    }

    if (!valido) return;

    const requestBody = {
      idRemedio: state.idRemedio,
      idUtilizador: state.idUtilizador,
      quantidade: Number(state.quantidade),
      idTipoFarmaceutico: state.idTipoFarmaceutico,
      quantidadeDose: Number(state.quantidadeDose),
      idTipoGrandeza: state.idTipoGrandeza,
      idTipoAgendamento: state.idTipoAgendamento,
      horarios: state.horarios,
      dataInicio: state.dataInicio,
      dataFim: state.dataFim,
      intervalo: state.intervalo,
      diasSemana: state.diasSemana,
      diasUso: Number(uso),
      diasPausa: Number(pausa),
    };

    try {
      const response = await fetch('http://medicareapi.somee.com/Medicare_Api/Posologia', {
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
      router.replace('/cadastroRemedio');

    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  }



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
          <ProgressBar variant="mixed" currentStep={4} />
        </View>

        <Text style={styles.titulo}>Definir frequencia</Text>

        <View style={styles.scrollContainer}>
          <DateRangeInput
            dataInicio={dataInicio}
            dataFim={dataFim}
            onChangeInicio={setDataInicio}
            onChangeFim={setDataFim}
            visivel={false} />

          
            <InputTexto
              texto="Dias de Uso"
              value={uso}
              onChangeText={handleUsoChange}
              keyboardType="number-pad"
              visivel={usoErro}
              mensagemErro="Quantidade inválida."
            />
            <InputTexto
              texto="Dias de pausa"
              value={pausa}
              onChangeText={handlePausaChange}
              keyboardType="number-pad"
              visivel={pausaErro}
              mensagemErro="Quantidade inválida."
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
