import { View, KeyboardAvoidingView, Platform, Text, Keyboard, Alert } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "expo-router";
import { Botao } from "../../components/botao";
import { ProgressBar } from "@/src/components/progressBar";
import { FormContext } from "../../context/FormContext";
import { styles } from "./styles";
import { MenuInferior } from "@/src/components/menuInferior";
import { SearchPicker } from "@/src/components/inputSearch";
import { TopBar } from "@/src/components/topBar";
import { PosologiaContext } from "@/src/context/PosologiaContext";
import Calendar from "@/src/components/calendario";
import { Dayjs } from "dayjs";



export default function Calendario() {
    const router = useRouter();
    const reminders = [
        { date: '2025-05-16', note: 'Tomar remédio A' , situacao :"atrasado"},
        { date: '2025-05-20', note: 'Consulta médica' , situacao : "pendente"},
    ];

   

    return (
        <View style={styles.containerPai}>
            <TopBar />

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={[styles.card]}
            >
                <View style={{ flex: 1 }}>
                    <Calendar reminders={reminders}  />
                </View>

            </KeyboardAvoidingView>


            <MenuInferior cor1="#fff" cor2="#ACE1F5" cor3="#fff" cor4="#fff" />

        </View>
    );
}
