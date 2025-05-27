import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { styles } from "./styles";
import { MenuInferior } from "@/src/components/menuInferior";
import { TopBar } from "@/src/components/topBar";
import Calendar from "@/src/components/calendario";
import { MenuLateral } from "@/src/components/menuLateral";
import { useMenu } from "@/src/context/menuContext";
import dayjs from "dayjs";
import { AuthContext } from "@/src/context/AuthContext";

interface Alarme {
    idAlarme: number;
    idPosologia: number;
    dataHora: string;
    descricao: string;
    status: string; // Ex: 'A' (ativo), 'C' (concluído)
    posologia: any;
}

interface Posologia {
    idPosologia: number;
    idUtilizador: number;

}

export default function Calendario() {
    const router = useRouter();
    const { menuAberto } = useMenu();
    const [alarmes, setAlarmes] = useState<Alarme[]>([]);
    const [posologia, setPosologia] = useState<Posologia[]>([]);
    const [loading, setLoading] = useState(true);
    const { id } = useContext(AuthContext)!;


    const idUtilizador = id;

    useEffect(() => {
        const fetchData = async () => {
            try {

                const posologiaRes = await fetch('https://medicareapi.somee.com/Medicare_Api/Posologia');
                const posologiaData: Posologia[] = await posologiaRes.json();

                const alarmeRes = await fetch('https://medicareapi.somee.com/Medicare_Api/Alarme');
                const alarmeData: Alarme[] = await alarmeRes.json();

                const posologiaFiltrada = posologiaData.filter(p => p.idUtilizador === idUtilizador);
                const idsPosologia = posologiaFiltrada.map(p => p.idPosologia);
                const alarmeFiltrada = alarmeData.filter(a => idsPosologia.includes(a.idPosologia));

                setPosologia(posologiaFiltrada);
                setAlarmes(alarmeFiltrada);

            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <View style={styles.containerPai}>
                <TopBar />
                {menuAberto && <MenuLateral />}
                <View style={styles.card}>
                    <Text style={{ alignSelf: "center" }}>Carregando...</Text>
                </View>
                <MenuInferior cor1="#fff" cor2="#ACE1F5" cor3="#fff" cor4="#fff" />
            </View>)
    }


    return (
        <View style={styles.containerPai}>
            <TopBar />
            {menuAberto && <MenuLateral />}
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={[styles.card]}
            >
                <View style={{ flex: 1 }}>
                    <Calendar
                        alarmes={alarmes}
                    />
                </View>

            </KeyboardAvoidingView>


            <MenuInferior cor1="#fff" cor2="#ACE1F5" cor3="#fff" cor4="#fff" />

        </View>
    );
}
