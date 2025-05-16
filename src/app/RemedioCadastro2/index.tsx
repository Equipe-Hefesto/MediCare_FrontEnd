import { View, KeyboardAvoidingView, Platform, Text, Keyboard } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "expo-router";
import { Botao } from "../../components/botao";
import { ProgressBar } from "@/src/components/progressBar";
import { styles } from "./styles";
import { MenuInferior } from "@/src/components/menuInferior";
import { TopBar } from "@/src/components/topBar";
import { PosologiaContext } from "@/src/context/PosologiaContext";
import { InputTexto } from "@/src/components/inputTexto";
import InputPicker from "@/src/components/inputPicker";

export default function RemedioCadastro2() {
  const router = useRouter();
  const { state, dispatch } = useContext(PosologiaContext);

  const [tecladoVisivel, setTecladoVisivel] = useState(false);

  const [qtdeFarmaceutico, setQtdeFarmaceutico] = useState(state.quantidade);
  const [qtdeDose, setQtdeDose] = useState(state.quantidadeDose);

  const [qtdeFarmaceuticoErro, setQtdeFarmaceuticoErro] = useState(false);
  const [qtdeDoseErro, setQtdeDoseErro] = useState(false);

  const [tpFarmaceutico, setTpFarmaceutico] = useState(state.idTipoFarmaceutico || '');
  const [tpGrandeza, setTpGrandeza] = useState(state.idTipoGrandeza || '');

  const [itensTpFarmaceutico, setItensTpFarmaceutico] = useState([]);
  const [itensTpGrandeza, setItensTpGrandeza] = useState([]);

  const [erroVisivel, setErroVisivel] = useState(false);

  useEffect(() => {
    async function carregarItens() {
      try {
        const respostaF = await fetch('https://medicareapi.somee.com/Medicare_Api/TipoFarmaceutico');
        const dataF = await respostaF.json();
        const formatadoF = dataF.map((item: any) => ({
          label: item.descricao,
          value: item.idTipoFarmaceutico,
        }));
        setItensTpFarmaceutico(formatadoF);

        const respostaG = await fetch('https://medicareapi.somee.com/Medicare_Api/TipoGrandeza');
        const dataG = await respostaG.json();
        const formatadoG = dataG.map((item: any) => ({
          label: item.descricao,
          value: item.idTipoGrandeza,
        }));
        setItensTpGrandeza(formatadoG);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }

    carregarItens();
  }, []);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => setTecladoVisivel(true));
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => setTecladoVisivel(false));
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleQtdeFarmaceuticoChange = (text: string) => {
    setQtdeFarmaceutico(text);
    dispatch({ campo: 'quantidade', valor: text });
    setQtdeFarmaceuticoErro(false);
  };

  const handleQtdeDoseChange = (text: string) => {
    setQtdeDose(text);
    dispatch({ campo: 'quantidadeDose', valor: text });
    setQtdeDoseErro(false);
  };

  const handleTpFarmaceuticoChange = (value: string) => {
    setTpFarmaceutico(value);
    dispatch({ campo: 'idTipoFarmaceutico', valor: value });
  };

  const handleTpGrandezaChange = (value: string) => {
    setTpGrandeza(value);
    dispatch({ campo: 'idTipoGrandeza', valor: value });
  };

  const proximo = () => {
    if (!qtdeFarmaceutico || !qtdeDose || !tpFarmaceutico || !tpGrandeza) {
      setErroVisivel(true);
      if (!qtdeFarmaceutico) setQtdeFarmaceuticoErro(true);
      if (!qtdeDose) setQtdeDoseErro(true);
      return;
    }
    router.replace("./RemedioCadastro3");
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
          <ProgressBar variant="mixed" currentStep={2} />
        </View>

        <Text style={styles.titulo}>Definir dose</Text>

        <View style={styles.scrollContainer}>
          <View style={styles.containerLinha}>
            <InputTexto
              texto="Quantidade"
              value={qtdeFarmaceutico}
              onChangeText={handleQtdeFarmaceuticoChange}
              keyboardType="number-pad"
              visivel={qtdeFarmaceuticoErro}
              mensagemErro="Quantidade inválida."
            />

            <InputPicker
              texto="Tipo Farmacêutico"
              value={tpFarmaceutico}
              onChangeText={handleTpFarmaceuticoChange}
              visivel={erroVisivel && !tpFarmaceutico}
              mensagemErro="Campo obrigatório"
              itens={itensTpFarmaceutico}
              zIndex={3000}
            />
          </View>

          <View style={styles.containerLinha}>
            <InputTexto
              texto="Quantidade"
              value={qtdeDose}
              onChangeText={handleQtdeDoseChange}
              keyboardType="number-pad"
              visivel={qtdeDoseErro}
              mensagemErro="Quantidade inválida."
            />

            <InputPicker
              texto="Grandeza"
              value={tpGrandeza}
              onChangeText={handleTpGrandezaChange}
              visivel={erroVisivel && !tpGrandeza}
              mensagemErro="Campo obrigatório"
              itens={itensTpGrandeza}
              zIndex={2000}
            />
          </View>
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
