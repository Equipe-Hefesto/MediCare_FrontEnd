import {
    Keyboard,
    KeyboardAvoidingView,
    StyleSheet,
    Platform,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    Modal,
    TouchableWithoutFeedback,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { TopBar } from "../../components/topBar";
import { MenuInferior } from "../../components/menuInferior";
import { MenuLateral } from "@/src/components/menuLateral";
import { useMenu } from "@/src/context/menuContext";
import { AuthContext } from "@/src/context/AuthContext";
import { styles } from "./styles";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

type Cuidador = {
    idCuidador: Number
    user: string
};

export let tipo = 0;
export default function Apoio() {
    const { menuAberto } = useMenu();
    const [cuidadores, setCuidadores] = useState<Cuidador[]>([]);
    const { id } = useContext(AuthContext)!;
    const [tecladoVisivel, setTecladoVisivel] = useState(false);
    const [solicitacoes, setSolicitacoes] = useState<any[]>([]);
    const [menuFlutuanteAberto, setMenuFlutuanteAberto] = useState(false);
    const [modalVisivel, setModalVisivel] = useState(false);

    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () =>
            setTecladoVisivel(true)
        );
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () =>
            setTecladoVisivel(false)
        );

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    const toggleMenuFlutuante = () => {
        setMenuFlutuanteAberto((prev) => !prev);
    };

    function addCuidador() {
        tipo = 4;
        router.replace("/ApoioCadastro1");
    }

    function addResponsavel() {
        tipo = 3;
        router.replace("/ApoioCadastro1");
    }

    function aceitarSolicitacao(id: number) {
        setSolicitacoes((prev) => prev.filter((s) => s.id !== id));
    }

    function recusarSolicitacao(id: number) {
        setSolicitacoes((prev) => prev.filter((s) => s.id !== id));
    }

    useEffect(() => {
        const mockSolicitacoes = [
            { id: 1, nome: "Solicitação 1" },
            { id: 2, nome: "Solicitação 2" },
        ];
        setSolicitacoes(mockSolicitacoes);
    }, []);

    return (
        <View style={styles.containerPai}>
            <TopBar />
            {menuAberto && <MenuLateral />}

            <View
                style={[styles.card, tecladoVisivel ? { marginBottom: 16 } : { marginBottom: 91 }]}
            >
                <TouchableOpacity style={styles.solicitacaoBotao} onPress={() => setModalVisivel(true)}>
                    <View style={styles.icon}>
                        <MaterialCommunityIcons name="bell" size={32} color="#fff" />
                    </View>
                    <Text style={styles.solicitacaoTexto}> Solicitações </Text>
                    <View style={styles.solicitacaoBadge}>
                        <Text style={styles.solicitacaoBadgeTexto}>{solicitacoes.length}</Text>
                    </View>
                </TouchableOpacity>

                <Text style={styles.titulo}>Relacionamentos ativos</Text>
                <Text style={styles.texto}>Cuidadores</Text>
                <Text style={styles.texto}>Responsáveis</Text>
            </View>

            {!tecladoVisivel && (
                <>
                    {menuFlutuanteAberto && (
<View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.3)" }} />
                    )}

                    <View style={{ position: "absolute", bottom: 100, right: 20 }}>
                        {menuFlutuanteAberto && (
                            <View style={{ alignItems: "flex-end", position: "absolute", bottom: 90, right: 26 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
                                    <Text style={{ color: "#fff", marginRight: 8 }}>Adicionar Cuidador</Text>
                                    <TouchableOpacity style={styles.botaoFlutuante2} onPress={addCuidador}>
                                        <MaterialCommunityIcons name="heart" size={32} color="#fff" />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text style={{ color: "#fff", marginRight: 8 }}>Adicionar Responsável</Text>
                                    <TouchableOpacity style={styles.botaoFlutuante3} onPress={addResponsavel}>
                                        <MaterialCommunityIcons name="shield" size={32} color="#fff" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}

                        <TouchableOpacity
                            style={styles.botaoFlutuante}
                            onPress={toggleMenuFlutuante}
                        >
                            <Ionicons name={menuFlutuanteAberto ? "close" : "add"} size={32} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </>
            )}

            {!tecladoVisivel && (
                <MenuInferior cor1="#fff" cor2="#fff" cor3="#fff" cor4="#ACE1F5"  temSolicitacoes={solicitacoes.length > 0}/>
            )}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisivel}
                onRequestClose={() => setModalVisivel(false)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisivel(false)}>
                    <View style={styles.modalOverlay} />
                </TouchableWithoutFeedback>

                <View style={styles.modalContent}>
                    <Text style={styles.modalTitulo}>Solicitações Pendentes</Text>

                    {solicitacoes.length === 0 ? (
                        <Text style={styles.modalTexto}>Nenhuma solicitação no momento.</Text>
                    ) : (
                        solicitacoes.map((s) => (
                            <View key={s.id} style={styles.modalItem}>
                                <Text style={styles.modalTexto}>{s.nome}</Text>
                                <View style={styles.modalBotoes}>
                                    <TouchableOpacity
                                        style={styles.modalBotaoAceitar}
                                        onPress={() => aceitarSolicitacao(s.id)}
                                    >
                                        <Text style={styles.modalBotaoTexto}>Aceitar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.modalBotaoRecusar}
                                        onPress={() => recusarSolicitacao(s.id)}
                                    >
                                        <Text style={styles.modalBotaoTexto}>Recusar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                    )}
                </View>
            </Modal>
        </View>
    );
}