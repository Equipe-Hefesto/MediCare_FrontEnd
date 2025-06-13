import { View, KeyboardAvoidingView, Platform, Text, Linking, Keyboard, TouchableOpacity } from "react-native";
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

        <Text style={styles.texto}>Olá! Somos 6 estudantes da ETEC Profº Horácio Augusto da Silveira. 
          Com esforço desenvolvemos esse aplicativo para auxiliar toda e qualquer pessoa
          que necessita do uso constante de remédios. Conheça um pouco mais de nós: </Text>

          <View style={styles.botoes}>
            <TouchableOpacity style={styles.botao} onPress={() => Linking.openURL("https://www.instagram.com/enzo.n.freitas/")}>
              <Text style={styles.textoBotao}> Enzo </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botao} onPress={() => Linking.openURL("https://www.instagram.com/felipe._fbastos/")}>
              <Text style={styles.textoBotao}> Felipe </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.botoes}>
            <TouchableOpacity style={styles.botao} onPress={() => Linking.openURL("https://www.instagram.com/h_gustavo.7/")}>
              <Text style={styles.textoBotao}> Gustavo </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botao} onPress={() => Linking.openURL("https://www.instagram.com/isaxavierz/")}>
              <Text style={styles.textoBotao}> Isabelly </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.botoes}>
            <TouchableOpacity style={styles.botao} onPress={() => Linking.openURL("https://github.com/Pedro-Ruan")}>
              <Text style={styles.textoBotao}> Pedro </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botao} onPress={() => Linking.openURL("https://www.instagram.com/vitor_barsil/")}>
              <Text style={styles.textoBotao}> Vitor </Text>
            </TouchableOpacity>
          </View>

        <View style={styles.scrollContainer}>
          
        </View>

      </KeyboardAvoidingView>

      {!tecladoVisivel && (
        <MenuInferior cor1="#fff" cor2="#fff" cor3="#fff" cor4="#fff" />
      )}
    </View>
  );
}
