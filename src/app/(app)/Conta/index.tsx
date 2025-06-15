import { View, TextInput, KeyboardAvoidingView, Platform, Text, Linking, Keyboard, TouchableOpacity } from "react-native";
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
import { Ionicons } from '@expo/vector-icons';
import { FormContext } from '../../../context/FormContext';

export default function Conta() {
  const router = useRouter();
  const { menuAberto } = useMenu();

  const { state, dispatch } = useContext(FormContext);

  const [tecladoVisivel, setTecladoVisivel] = useState(false);

    const handleTelefoneChange = (text: string) => {
      const telefoneLimpo = text.replace(/\D/g, ''); // Remove caracteres não numéricos
      let telefoneFormatado = telefoneLimpo;

      if (telefoneLimpo.length <= 10) {
        telefoneFormatado = telefoneLimpo.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
      } else {
        telefoneFormatado = telefoneLimpo.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
      }

      setTelefone(telefoneFormatado); // Mostra o telefone formatado
      dispatch({ campo: 'telefone', valor: telefoneLimpo }); // Salva o telefone limpo
    };

    const handleEmailChange = (text: string) => {
      const emailLimpo = text.trim(); // Remove espaços extras no início/fim
      setEmail(emailLimpo);           // Atualiza o valor visível no input
      dispatch({ campo: 'email', valor: emailLimpo }); // Salva no estado global
    };

    const validarEmail = (email: string) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };

    const handleCpfChange = (text: string) => {
      const cpfLimpo = text.replace(/\D/g, ''); // Remove tudo que não for número
      let cpfFormatado = cpfLimpo;

      // Aplica a máscara: 000.000.000-00
      if (cpfLimpo.length <= 11) {
        cpfFormatado = cpfLimpo
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      }

      setCpf(cpfFormatado); // Mostra o CPF formatado para o usuário
      dispatch({ campo: 'cpf', valor: cpfLimpo }); // Salva apenas os números
    };

  const [nome, setNome] = useState('Nome');
  const [isEditing1, setIsEditing1] = useState(false);
  const [telefone, setTelefone] = useState('99999999999');
  const [isEditing2, setIsEditing2] = useState(false);
  const [email, setEmail] = useState('email@dominio.com.br');
  const [isEditing3, setIsEditing3] = useState(false);
  const [cpf, setCpf] = useState('12345678910');
  const [isEditing4, setIsEditing4] = useState(false);

  



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

        <Text style={styles.titulo}> Conta </Text>

        <View style={styles.containerTexto}>
          <Text style={styles.categoria}> Nome </Text>
          {isEditing1 ? (
            <TextInput
              style={styles.input}
              value={nome}
              onChangeText={setNome}
              onBlur={() => setIsEditing1(false)}
              autoFocus
            />
          ) : (
            <View style={styles.containerEditavel}>
              <Text style={styles.textoEditavel}>{nome}</Text>
              <TouchableOpacity onPress={() => setIsEditing1(true)}>
                <Ionicons name="pencil" size={25} color="#004059" />
              </TouchableOpacity>
            </View>
          )}
      </View>

      <View style={styles.containerTexto}>
          <Text style={styles.categoria}> Número </Text>
          {isEditing2 ? (
            <TextInput
              style={styles.input}
              value={telefone}
              onChangeText={handleTelefoneChange}
              onBlur={() => setIsEditing2(false)}
              keyboardType="phone-pad"
              autoFocus
            />
          ) : (
            <View style={styles.containerEditavel}>
              <Text style={styles.textoEditavel}>{telefone}</Text>
              <TouchableOpacity onPress={() => setIsEditing2(true)}>
                <Ionicons name="pencil" size={25} color="#004059" />
              </TouchableOpacity>
            </View>
          )}
      </View>

      <View style={styles.containerTexto}>
          <Text style={styles.categoria}> Email </Text>
          {isEditing3 ? (
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={handleEmailChange}
              onBlur={() => setIsEditing3(false)}
              keyboardType="email-address"
              autoFocus
            />
          ) : (
            <View style={styles.containerEditavel}>
              <Text style={styles.textoEditavel}>{email}</Text>
              <TouchableOpacity onPress={() => setIsEditing3(true)}>
                <Ionicons name="pencil" size={25} color="#004059" />
              </TouchableOpacity>
            </View>
          )}
      </View>

      <View style={styles.containerTexto}>
          <Text style={styles.categoria}> CPF </Text>
          {isEditing4 ? (
            <TextInput
              style={styles.input}
              value={cpf}
              onChangeText={handleCpfChange}
              onBlur={() => setIsEditing4(false)}
              keyboardType="numeric"
              autoFocus
            />
          ) : (
            <View style={styles.containerEditavel}>
              <Text style={styles.textoEditavel}>{cpf}</Text>
              <TouchableOpacity onPress={() => setIsEditing4(true)}>
                <Ionicons name="pencil" size={25} color="#004059" />
              </TouchableOpacity>
            </View>
          )}
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
