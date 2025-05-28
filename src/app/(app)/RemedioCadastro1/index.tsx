import { View, KeyboardAvoidingView, Platform, Text, Keyboard } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "expo-router";
import { Botao } from "../../../components/botao";
import { ProgressBar } from "@/src/components/progressBar";
import { FormContext } from "../../../context/FormContext";
import { styles } from "./styles";
import { MenuInferior } from "@/src/components/menuInferior";
import { SearchPicker } from "@/src/components/inputSearch";
import { TopBar } from "@/src/components/topBar";
import { PosologiaContext } from "@/src/context/PosologiaContext";
import { AuthContext } from "@/src/context/AuthContext";
import { MenuLateral } from "@/src/components/menuLateral";
import { useMenu } from "@/src/context/menuContext";

type Remedio = {
    idRemedio: number;
    nome: string;
};

export default function RemedioCadastro1() {
    const router = useRouter();
    const { state, dispatch } = useContext(PosologiaContext);
    const { id } = useContext(AuthContext)!;
    const [remedios, setRemedios] = useState<Remedio[]>([]);
    const [remedio, setRemedio] = useState("");
    const [remedioId, setRemedioId] = useState(state.idRemedio);
    const [remedioErro, setRemedioErro] = useState(false);
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
        useEffect(() => {
  if (id !== null) {
    dispatch({ campo: "idUtilizador", valor: id });
  }
}, [id]);

    useEffect(() => {
        const fetchRemedios = async () => {
            try {
                const response = await fetch("https://medicareapi.somee.com/Medicare_Api/Remedio", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                const data: Remedio[] = await response.json();

                const ordenados = data.sort((a, b) =>
                    a.nome.localeCompare(b.nome, "pt", { sensitivity: "base" })
                );

                setRemedios(ordenados);
            } catch (error) {
                console.error("Erro ao buscar remédios:", error);
            }
        };

        fetchRemedios();
    }, []);

    const validarRemedio = (nome: string) =>
        /^[A-Za-zÀ-ÿ\s]{2,}$/.test(nome.trim());

    const handleRemedioChange = (text: string) => {
        setRemedio(text);
        setRemedioErro(false);

        const remedioSelecionado = remedios.find(
            (r) => r.nome.toLowerCase() === text.trim().toLowerCase()
        );

        if (remedioSelecionado) {
            setRemedioId(remedioSelecionado.idRemedio);
            dispatch({ campo: "idRemedio", valor: remedioSelecionado.idRemedio }); // usa valor correto aqui
        } else {
            setRemedioId(0);
            dispatch({ campo: "idRemedio", valor: 0 });
        }
    };



    async function proximo() {
        if (!validarRemedio(remedio)) {
            setRemedioErro(true);
            return;
        }

        if (remedioId === 0) {
            try {
                const response = await fetch("https://medicareapi.somee.com/Medicare_Api/Remedio", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nome: remedio.trim() }),
                });

                if (!response.ok) {
                    console.error("Erro ao cadastrar remédio:", await response.text());
                    return;
                }

                const data = await response.json();
                const novoIdRemedio = data.idRemedio;

                dispatch({ campo: "idRemedio", valor: novoIdRemedio });
            } catch (error) {
                console.error("Erro de rede ao cadastrar remédio:", error);
                return;
            }
        } else {
            router.replace("./RemedioCadastro2");
        }

    }
    useEffect(() => {
        setRemedioId(state.idRemedio);

    }, [state]);
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
                    <ProgressBar variant="default" currentStep={1} />
                </View>

                <Text style={styles.titulo}>Cadastrar remédio</Text>

                <View style={styles.scrollContainer}>
                    <SearchPicker
                        label={"Nome Remédio"}
                        value={remedio}
                        onChange={handleRemedioChange}
                        items={remedios.map((r) => r.nome)}
                        mensagemErro="Insira um nome de remédio válido."
                        visivel={remedioErro}
                        placeholder="Digite ou procure um remédio... "
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
