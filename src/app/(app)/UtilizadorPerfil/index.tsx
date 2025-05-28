import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
  TouchableOpacity
} from "react-native";
import { styles } from "./styles";
import { SemiTopBar } from "../../../components/semiTopBar";
import { Botao } from "../../../components/botao";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from "@/src/context/AuthContext";

export default function UtilizadorPerfil() {
  const router = useRouter();
  const auth = useContext(AuthContext);

  if (!auth) {
    console.log("Deu erro auth");
    return null;
  }
const { removeToken } = auth;

const logout = async () => {
  await removeToken();
  router.replace("/Inicial");
};
  const { token, setPerfilSelecionado } = auth;
  const [roles, setRoles] = useState<string[]>([]);

  useEffect(() => {
    const fetchRoles = async () => {
      if (!token) return;
      const decoded: any = jwtDecode(token);
      const userRoles = Array.isArray(decoded.role) ? decoded.role : [decoded.role];
      setRoles(userRoles);
    };
    fetchRoles();
  }, []);

  const selecionarPerfil = (perfil: string) => {
    setPerfilSelecionado(perfil);
    router.replace("./home");
  };

  return (
    <View style={styles.containerPai}>
      <SemiTopBar />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.card}
      >
        <Text style={styles.titulo}>Selecione seu perfil</Text>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {roles.includes('AMIGO_MEDICARE') && (
            <TouchableOpacity
              style={styles.container}
              onPress={() =>
                selecionarPerfil(
                  'Comum'
                )
              }
            >
              <Image
                source={require('@/assets/images/UtilizadorPerfil.png')}
                style={styles.image}
              />
              <Text style={styles.text}>Comum</Text>
            </TouchableOpacity>
          )}

          {roles.includes('RESPONSAVEL') && (
            <TouchableOpacity
              style={styles.container}
              onPress={() =>
                selecionarPerfil(
                  'Responsável'
                )
              }
            >
              <Image
                source={require('@/assets/images/Responsavel.jpg')}
                style={styles.image}
              />
              <Text style={styles.text}>Responsável</Text>
            </TouchableOpacity>
          )}

          {roles.includes('CUIDADOR') && (
            <TouchableOpacity
              style={styles.container}
              onPress={() =>
                selecionarPerfil(
                  'Cuidador'
                )
              }
            >
              <Image
                source={require('@/assets/images/Cuidador.jpg')}
                style={styles.image}
              />
              <Text style={styles.text}>Cuidador</Text>
            </TouchableOpacity>
          )}
        </ScrollView>

        <View style={styles.containerBotao}>
          <Botao
            texto="Voltar"
            width={150}
            onPress={logout}
            tipo="outlined"
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
