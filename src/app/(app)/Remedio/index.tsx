import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { MenuInferior } from "../../../components/menuInferior";
import { TopBar } from "../../../components/topBar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import { styles2 } from "./styles2";
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { MenuLateral } from "@/src/components/menuLateral";
import { useMenu } from "@/src/context/menuContext";
import Icon from "react-native-vector-icons/Feather";
import { AuthContext } from "@/src/context/AuthContext";
    
type Posologia = {
    idPosologia: number;
    idUtilizador: number;
    idRemedio: number;
};

type Remedio = {
    idRemedio: number;
    nome: string;
};

export default function Remedio() {
    const [posologia, setPosologia] = useState<Posologia[]>([]);
    const [remedios, setRemedios] = useState<Remedio[]>([]);
    const [loading, setLoading] = useState(true);
    const { menuAberto } = useMenu();
    const [clicado, setClicado] = useState(false);
    const [nome, setNome] = useState("");
    const [descricaoAlarme, setDescricaoAlarme] = useState("");
    const [dataHoraAlarme, setDataHoraAlarme] = useState("");
    const { id } = useContext(AuthContext)!;


    const idUtilizador = id;

    useEffect(() => {
        fetchPosologia();
    }, []);

    const fetchPosologia = async () => {
        try {
            const posologiaRes = await fetch('https://medicareapi.somee.com/Medicare_Api/Posologia');
            const posologiaData: Posologia[] = await posologiaRes.json();

            const remediosRes = await fetch('https://medicareapi.somee.com/Medicare_Api/Remedio');
            const remediosData: Remedio[] = await remediosRes.json();

            const posologiaFiltrada = posologiaData.filter(p => p.idUtilizador === idUtilizador);

            setPosologia(posologiaFiltrada);
            setRemedios(remediosData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAlarme = async (idPosologia: number) => {
        try {
            const res = await fetch(`https://medicareapi.somee.com/Medicare_Api/Alarme`);
            const data = await res.json();

            const agora = new Date();

            const alarmesFuturos = data
                .filter((a: any) =>
                    a.idPosologia === idPosologia &&
                    a.status === "A" &&
                    new Date(a.dataHora) > agora
                )
                .sort((a: any, b: any) => new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime());

            if (alarmesFuturos.length > 0) {
                const proximo = alarmesFuturos[0];
                setDescricaoAlarme(proximo.descricao);
                setDataHoraAlarme(proximo.dataHora);
            } else {
                setDescricaoAlarme("Sem alarmes futuros");
                setDataHoraAlarme("");
            }
        } catch (err) {
            console.error("Erro ao buscar alarme:", err);
            setDescricaoAlarme("Erro ao carregar alarme");
            setDataHoraAlarme("");
        }
    };

    const getNomeRemedio = (idRemedio: number) => {
        const remedio = remedios.find(r => r.idRemedio === idRemedio);
        return remedio ? remedio.nome : 'Remédio desconhecido';
    };

    const handlePress = (item: Posologia) => {
        setClicado(true);
        const nomeRemedio = getNomeRemedio(item.idRemedio);
        setNome(nomeRemedio);
        fetchAlarme(item.idPosologia);
    };

    if (loading) {
        return (
            <View style={styles.containerPai}>
                <TopBar />
                {menuAberto && <MenuLateral />}
                <View style={styles2.card}>
                    <Text style={{ alignSelf: "center" }}>Carregando...</Text>
                </View>
                <MenuInferior cor1="#fff" cor2="#ACE1F5" cor3="#fff" cor4="#fff" />
            </View>
        );
    }

    return (
        posologia.length > 0 ? (
            <View style={styles2.containerPai}>
                <TopBar />
                {menuAberto && <MenuLateral />}

                {
                    !clicado ? (
                        <View style={styles2.card}>
                            <Text style={styles2.titulo}>Remédios ativos</Text>
                            <FlatList
                                data={posologia}
                                keyExtractor={item => item.idPosologia.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        onPress={() => handlePress(item)}
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            borderBottomWidth: 2,
                                            padding: 12,
                                            marginBottom: 10,
                                            marginHorizontal: 16,
                                            borderStyle: "dotted",
                                            borderColor: "#267797",
                                        }}
                                    >
                                        <MaterialCommunityIcons name="pill" size={32} color="#007C91" style={{ marginRight: 12 }} />
                                        <View>
                                            <Text style={{ fontWeight: "bold", fontSize: 16 }}>{getNomeRemedio(item.idRemedio)}</Text>
                                            <Text style={{ color: "#555" }}>teste</Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />
                            <TouchableOpacity
                                style={styles2.botaoFlutuante}
                                onPress={() => router.replace("/RemedioCadastro1")}
                            >
                                <MaterialCommunityIcons name="plus" size={32} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles2.card}>
                            <View style={styles.fundo}>
                                <TouchableOpacity onPress={() => setClicado(false)} style={styles.icon}>
                                    <Icon name="x" size={40} color="#3B82A0" />
                                </TouchableOpacity>
                                <Text style={styles.textoHeader}>{nome}</Text>

                            </View>
                            <View style={{margin:24}}>
                            <Text style={{ fontSize: 16, marginTop: 8, fontWeight:"800" , color:"#004059"}}>Dose</Text>
                            <Text style={{ fontSize: 16, color: "#666" }}>{descricaoAlarme}</Text>

                            <Text style={{ fontSize: 16, marginTop: 24, fontWeight:"800" ,color:"#004059"}}>Próximo alarme</Text>
                            <Text style={{ fontSize: 16, color: "#666" }}>
                                {dataHoraAlarme ? new Date(dataHoraAlarme).toLocaleString() : "-"}
                            </Text>
                            </View>
                        </View>
                    )
                }

                <MenuInferior cor1="#fff" cor2="#fff" cor3="#ACE1F5" cor4="#fff" />
            </View>
        ) : (
            <View style={styles.containerPai}>
                <TopBar />
                <View style={styles.paiFilho}>
                    <View style={styles.containerFilho}>
                        <Text style={styles.titulo}> Clique para adicionar seu remédio </Text>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => router.replace('./RemedioCadastro1')}
                            style={styles.containerBotao}
                        >
                            <MaterialCommunityIcons name="plus" style={styles.icone} />
                        </TouchableOpacity>
                    </View>
                </View>
                <MenuInferior cor1={"#fff"} cor2={"#fff"} cor3={"#ACE1F5"} cor4={"#fff"} />
            </View>
        )
    );
}
