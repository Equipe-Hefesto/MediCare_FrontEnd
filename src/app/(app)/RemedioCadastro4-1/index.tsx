import { View, KeyboardAvoidingView, Platform, Text, Keyboard } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "expo-router";
import { Botao } from "../../../components/botao";
import { ProgressBar } from "@/src/components/progressBar";
import { styles } from "./styles";
import { MenuInferior } from "@/src/components/menuInferior";
import { TopBar } from "@/src/components/topBar";
import { PosologiaContext } from "@/src/context/PosologiaContext";
import { DateRangeInput } from "@/src/components/inputRangeDate";
import { MultiTimePicker } from "@/src/components/multiTimePicker";
import { MenuLateral } from "@/src/components/menuLateral";
import { useMenu } from "@/src/context/menuContext";

export default function RemedioCadastro4_1() {
  const router = useRouter();
  const { state, dispatch } = useContext(PosologiaContext);
  const [dataInicio, setDataInicio] = useState(state.dataInicio);
  const [dataFim, setDataFim] = useState(state.dataFim);
  const [horarios, setHorarios] = useState(state.horarios);
  const [erro, setErro] = useState(false);
  const [dataErro, setDataErro] = useState(false);
    const { menuAberto } = useMenu();


  function handleChangeInicio(novaData: string) {
    setDataInicio(novaData);

    const [diaInicio, mesInicio, anoInicio] = novaData.split("/").map(Number);
    const [diaFim, mesFim, anoFim] = dataFim?.split("/")?.map(Number) || [];

    const dataInicioObj = new Date(anoInicio, mesInicio - 1, diaInicio);
    const dataFimObj = new Date(anoFim, mesFim - 1, diaFim);

    if (dataFim && dataFimObj >= dataInicioObj) {
      dispatch({ campo: "dataInicio", valor: dataInicioObj.toISOString() });
      dispatch({ campo: "dataFim", valor: dataFimObj.toISOString() });
      setDataErro(false);
    } else if (dataFim) {
      setDataErro(true);
    }
  }

 function handleChangeFim(novaData: string) {
  setDataFim(novaData);

  const [diaFim, mesFim, anoFim] = novaData.split("/").map(Number);
  const [diaInicio, mesInicio, anoInicio] = dataInicio?.split("/")?.map(Number) || [];

  const dataFimObj = new Date(anoFim, mesFim - 1, diaFim, 23, 59);
  const dataInicioObj = new Date(anoInicio, mesInicio - 1, diaInicio);

  if (dataInicio && dataFimObj >= dataInicioObj) {
    dispatch({ campo: "dataInicio", valor: dataInicioObj.toISOString() });
    dispatch({ campo: "dataFim", valor: dataFimObj.toISOString() });
    setDataErro(false);
  } else if (dataInicio) {
    setDataErro(true);
  }
}


  function handleChangeHorarios(novosHorarios: string[]) {
    setHorarios(novosHorarios);
    dispatch({ campo: "horarios", valor: novosHorarios });

    if (novosHorarios.length > 0) {
      setErro(false);
    }
  }


  const [tecladoVisivel, setTecladoVisivel] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => setTecladoVisivel(true));
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => setTecladoVisivel(false));
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);


  async function proximo() {
    const horariosValidos = Array.isArray(horarios) && horarios.length > 0;
    let valido = true
    // Expressão regular para validar "HH:mm"
    const regexHorario = /^([01]\d|2[0-3]):([0-5]\d)$/;
    const todosFormatosCorretos = horariosValidos && horarios.every(h => regexHorario.test(h));

    if (!horariosValidos || !todosFormatosCorretos) {
      setErro(true);
      valido = false
    }
    if (!state.dataInicio || !state.dataInicio) {
      setDataErro(true);
      valido = false
    }



    if (valido) {
      const requestBody = await {
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
        diasUso: Number(state.diasUso) || 0,
        diasPausa: Number(state.diasPausa) || 0,
      };
      console.log("📦 Corpo da requisição:", requestBody);
      try {
        const response = await fetch('http://medicareapi.somee.com/Medicare_Api/Posologia', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });



        if (!response.ok) {
          const texto = await response.text(); 
          console.error("Erro na requisição:", texto);
          return;
        }

        const data = await response.json();



        router.replace('/Remedio')


      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    }

  }

  console.log("State: ", state)
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
            onChangeInicio={handleChangeInicio}
            onChangeFim={handleChangeFim}
            visivel={dataErro}
          />

          {erro && (<Text style={styles.errorText}>Adicione pelo menos 1 horário.</Text>)}

          <MultiTimePicker horarios={horarios} onChange={handleChangeHorarios} />
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
