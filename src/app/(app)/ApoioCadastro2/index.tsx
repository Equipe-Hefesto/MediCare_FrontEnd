import { View, KeyboardAvoidingView, Platform, Text, Keyboard } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "expo-router";
import { Botao } from "../../../components/botao";
import { ProgressBar } from "@/src/components/progressBar";
import { styles } from "./styles";
import { MenuInferior } from "@/src/components/menuInferior";
import { SearchPicker } from "@/src/components/inputSearch";
import { TopBar } from "@/src/components/topBar";
import { PosologiaContext } from "@/src/context/PosologiaContext";
import { AuthContext } from "@/src/context/AuthContext";
import { MenuLateral } from "@/src/components/menuLateral";
import { useMenu } from "@/src/context/menuContext";
import { idUtilizador2 } from "../ApoioCadastro1";
import { tipo } from "../Apoio";
import InputPicker from "@/src/components/inputPicker";
import { DateRangeInput } from "@/src/components/inputRangeDate";

export default function ApoioCadastro2() {
  const router = useRouter();
  const { id, token } = useContext(AuthContext)!;
  const [tpParentesco, setTpParentesco] = useState('');
  const [itensTpParentesco, setItensTpParentesco] = useState([]);

  const [erroTpParentesco, setErroTpParentesco] = useState(false);
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
 const [dataIniciof, setDataIniciof] = useState("");
  const [dataFimf, setDataFimf] = useState("");
  const [tecladoVisivel, setTecladoVisivel] = useState(false);
  const { menuAberto } = useMenu();
   const [dataErro, setDataErro] = useState(false);

function handleChangeInicio(novaData: string) {
    setDataInicio(novaData);

    const [diaInicio, mesInicio, anoInicio] = novaData.split("/").map(Number);
    const [diaFim, mesFim, anoFim] = dataFim?.split("/")?.map(Number) || [];

    const dataInicioObj = new Date(anoInicio, mesInicio - 1, diaInicio);
    const dataFimObj = new Date(anoFim, mesFim - 1, diaFim);

    if (dataFim && dataFimObj >= dataInicioObj) {
      setDataIniciof(dataInicioObj.toISOString())
      setDataFimf(dataFimObj.toISOString() )
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
    setDataIniciof(dataInicioObj.toISOString())
      setDataFimf(dataFimObj.toISOString() )
    setDataErro(false);
  } else if (dataInicio) {
    setDataErro(true);
  }
}


  const handleTpParentescoChange = (value: string) => {
    setTpParentesco(value);
  };
  useEffect(() => {
    async function carregarItens() {
      try {
        const resposta = await fetch('https://medicareapi.somee.com/Medicare_Api/TipoParentesco');
        const data = await resposta.json();
        const formatado = data.map((item: any) => ({
          label: item.descricao,
          value: item.idTipoParentesco,
        }));
        setItensTpParentesco(formatado);

      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }

    carregarItens();
  }, []);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setTecladoVisivel(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setTecladoVisivel(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);


  function proximo() {

    router.replace("./Apoio");
  }

  return (
    tipo == 3 ? (
      <View style={styles.containerPai}>
        <TopBar />
        {menuAberto && <MenuLateral />}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={[styles.card, tecladoVisivel ? { marginBottom: 16 } : { marginBottom: 91 }]}
        >
          <View style={styles.progressBar}>
            <ProgressBar currentStep={2} variant="mixed" stepsCount={2} />
          </View>

          <Text style={styles.titulo}>Cadastrar Apoio</Text>

          <View style={styles.scrollContainer}>
            <InputPicker
              texto="Tipo de Parentesco"
              value={tpParentesco}
              onChangeText={handleTpParentescoChange}
              visivel={erroTpParentesco}
              mensagemErro="Campo obrigatório"
              itens={itensTpParentesco}
              zIndex={3000}
            />
          </View>

          {!tecladoVisivel && (
            <View style={styles.containerBotao}>
              <Botao texto="Próximo" width={150} onPress={proximo} />
            </View>
          )}
        </KeyboardAvoidingView>

        {!tecladoVisivel && <MenuInferior cor1="#fff" cor2="#fff" cor3="#fff" cor4="#ACE1F5" />}
      </View>) : (


      <View style={styles.containerPai}>
        <TopBar />
        {menuAberto && <MenuLateral />}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={[styles.card, tecladoVisivel ? { marginBottom: 16 } : { marginBottom: 91 }]}
        >
          <View style={styles.progressBar}>
            <ProgressBar currentStep={2} variant="mixed" stepsCount={2} />
          </View>

          <Text style={styles.titulo}>Cadastrar Apoio</Text>

          <View style={styles.scrollContainer}>
            <DateRangeInput
              dataInicio={dataInicio}
              dataFim={dataFim}
              onChangeInicio={handleChangeInicio}
              onChangeFim={handleChangeFim}
              visivel={dataErro}
            />
          </View>

          {!tecladoVisivel && (<View style={styles.containerBotao}>
                              <Botao texto="Voltar" width={150} onPress={() => router.replace("./ApoioCadastro1")} tipo="outlined"/>
                              <Botao texto="Próximo" width={150} onPress={proximo} />
                          </View>)}
        </KeyboardAvoidingView>

        {!tecladoVisivel && <MenuInferior cor1="#fff" cor2="#fff" cor3="#fff" cor4="#ACE1F5" />}
      </View>)

  );
}
