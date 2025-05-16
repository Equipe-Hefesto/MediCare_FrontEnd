import { View, Text, KeyboardAvoidingView, ScrollView, Platform, Alert, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { SemiTopBar } from "../../components/semiTopBar";
import { Botao } from "../../components/botao";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "@/src/context/AuthContext";

export default function UtilizadorPerfil() {
    const router = useRouter();

    const handlePress = () => {
        router.replace("./home")
    };

  const auth = useContext(AuthContext);

if (!auth) {
  console.log("Deu erro auth")
  return null;
}

const { token, saveToken, removeToken, loading } = auth;
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
                        <TouchableOpacity style={styles.container} onPress={handlePress}>
                            <Image source={require('../../../assets/images/UtilizadorPerfil.jpg')} style={styles.image} />
                            <Text style={styles.text}>Comum</Text>
                        </TouchableOpacity>
                    )}
                    {roles.includes('RESPONSAVEL') && (
                        <TouchableOpacity style={styles.container} onPress={handlePress}>
                            <Image source={require('../../../assets/images/Responsavel.jpg')} style={styles.image} />
                            <Text style={styles.text}>Responsável</Text>
                        </TouchableOpacity>
                    )}
                    {roles.includes('CUIDADOR') && (
                        <TouchableOpacity style={styles.container} onPress={handlePress}>
                            <Image source={require('../../../assets/images/Cuidador.jpg')} style={styles.image} />
                            <Text style={styles.text}>Cuidador</Text>
                        </TouchableOpacity>
                    )}

                </ScrollView>

                <View style={styles.containerBotao}>
                    <Botao texto="Voltar" width={150} onPress={() => router.replace("./Login")} tipo="outlined" />
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}
