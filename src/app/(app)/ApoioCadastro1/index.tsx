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
import { tipo } from "../Apoio";
type Usuario = {
  id: number;
  nome: string;
};
export let idUtilizador2 = 0
export default function ApoioCadastro1() {
  const router = useRouter();
  const { id, token } = useContext(AuthContext)!;
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuarioNome, setUsuarioNome] = useState("");
  const [usuarioId, setUsuarioId] = useState<number | null>(null);
  const [erroUsuario, setErroUsuario] = useState(false);
  const [tecladoVisivel, setTecladoVisivel] = useState(false);
  const { menuAberto } = useMenu();

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


  // Função genérica para fetch com token e validação da resposta
  async function fetchComToken(url: string, token: string) {
    const resp = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!resp.ok) {
      throw new Error(`Erro HTTP ${resp.status} ao acessar ${url}`);
    }

    const texto = await resp.text();

    if (!texto) {
      throw new Error(`Resposta vazia de ${url}`);
    }

    try {
      return JSON.parse(texto);
    } catch {
      throw new Error(`Resposta inválida de ${url}: não é JSON`);
    }
  }

  useEffect(() => {
    async function buscarUsernamesTipo3() {
      if (!token) return;

      try {
        // 1. Buscar relacionamentos idUtilizador + idTipoUtilizador
        const relacoes = await fetchComToken(
          "https://medicareapi.somee.com/Medicare_Api/UtilizadorTipoUtilizador",
          token
        );

        // Filtra só os usuários com idTipoUtilizador = 3
        const idsTipo3 = relacoes
          .filter((r: any) => r.idTipoUtilizador === tipo)
          .map((r: any) => r.idUtilizador);

        // 2. Buscar todos os usuários
        const todosUsuarios = await fetchComToken(
          "https://medicareapi.somee.com/Medicare_Api/Utilizador/GetAll",
          token
        );

        // Filtra só os usuários que têm idTipoUtilizador 3
        const usuariosTipo3 = todosUsuarios
          .filter((u: any) => idsTipo3.includes(u.idUtilizador))
          .map((u: any) => ({
            id: u.idUtilizador,
            nome: u.username,
          }));

        setUsuarios(usuariosTipo3);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    }

    buscarUsernamesTipo3();
  }, [token]);

  function handleUsuarioChange(novoNome: string) {
    setUsuarioNome(novoNome);
    const selecionado = usuarios.find((u) => u.nome === novoNome);

    if (selecionado) {
      setErroUsuario(false);
      setUsuarioId(selecionado.id);
    } else {
      setUsuarioId(null);
    }
  }

  function proximo() {
    if (!usuarioId) {
      setErroUsuario(true);
      return;
    }
    idUtilizador2 = usuarioId
    router.replace("./ApoioCadastro2");
  }

  return (
    <View style={styles.containerPai}>
      <TopBar />
      {menuAberto && <MenuLateral />}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={[styles.card, tecladoVisivel ? { marginBottom: 16 } : { marginBottom: 91 }]}
      >
        <View style={styles.progressBar}>
          <ProgressBar currentStep={1} variant="default" stepsCount={2} />
        </View>

        <Text style={styles.titulo}>Cadastrar Apoio</Text>

        <View style={styles.scrollContainer}>
          <SearchPicker
            label={"Nome do Usuário"}
            value={usuarioNome}
            onChange={handleUsuarioChange}
            items={usuarios.map((u) => u.nome)}
            mensagemErro="Insira um nome de usuário válido."
            visivel={erroUsuario}
            placeholder="Digite ou procure um usuário..."
          />
        </View>

        {!tecladoVisivel && (<View style={styles.containerBotao}>
                            <Botao texto="Voltar" width={150} onPress={() => router.replace("./Apoio")} tipo="outlined"/>
                            <Botao texto="Próximo" width={150} onPress={proximo} />
                        </View>)}
      </KeyboardAvoidingView>

      {!tecladoVisivel && <MenuInferior cor1="#fff" cor2="#fff" cor3="#fff" cor4="#ACE1F5" />}
    </View>
  );
}
