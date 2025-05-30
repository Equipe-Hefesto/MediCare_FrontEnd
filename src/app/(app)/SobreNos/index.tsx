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

export default function SobreNos() {
  const router = useRouter();
  const { menuAberto } = useMenu();

  const [tecladoVisivel, setTecladoVisivel] = useState(false);



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

        <Text style={styles.titulo}> Sobre Nós </Text>

        <View style={styles.scrollContainer}>

          
        </View>

      </KeyboardAvoidingView>

      {!tecladoVisivel && (
        <MenuInferior cor1="#fff" cor2="#fff" cor3="#ACE1F5" cor4="#fff" />
      )}
    </View>
  );
}
