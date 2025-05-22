import {
    View, ScrollView, KeyboardAvoidingView, Platform, Text,
    TextInput,
    TouchableOpacity,
    Keyboard
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useRouter } from "expo-router";
import { styles } from "./styles";
import { SemiTopBar } from "../../components/semiTopBar";
import { InputTexto } from "../../components/inputTexto";
import { Botao } from "../../components/botao";
import { AlertCustomizado } from "../../components/alertCustomizado";
import { ProgressBar } from "@/src/components/progressBar";
import { FormContext } from '../../context/FormContext';
import { DateInput } from "@/src/components/inputDate";

export default function UtilizadorCadastro1() {
    const router = useRouter();
    const { state, dispatch } = useContext(FormContext);

    const [alertaVisivel, setAlertaVisivel] = useState(false);
    const [nome, setNome] = useState(state.nome);
    const [sobrenome, setSobrenome] = useState(state.sobrenome);
    const [cpf, setCPF] = useState(state.cpf);
    const [dtNascimento, setDtNascimento] = useState(""); 
    


    const [nomeErro, setNomeErro] = useState(false);
    const [sobrenomeErro, setSobrenomeErro] = useState(false);
    const [cpfErro, setCPFErro] = useState(false);
    const [dtNascimentoErro, setDtNascimentoErro] = useState(false);



    const handleNomeChange = (text: string) => {
        setNome(text);
        dispatch({ campo: 'nome', valor: text });
        setNomeErro(false);
    };

    const handleSobrenomeChange = (text: string) => {
        setSobrenome(text);
        dispatch({ campo: 'sobrenome', valor: text });
        setSobrenomeErro(false);
    };


    const handleCPFChange = (text: string) => {
        const cpfLimpo = text.replace(/\D/g, '');
        setCPF(cpfLimpo);
        dispatch({ campo: 'cpf', valor: cpfLimpo });
        setCPFErro(false);
    };
    const handleDtNascimentoChange = (text: string) => {
        setDtNascimento(text);
        setDtNascimentoErro(false);

        // Converte o texto dd/MM/yyyy para um objeto Date
        const [day, month, year] = text.split('/').map(Number);
        const date = new Date(year, month - 1, day);

       
        const isoDate = date.toISOString();

        // Envia a data no formato ISO para o dispatch
        dispatch({ campo: 'dtNascimento', valor: isoDate });
    };

    const formatDate = (isoDate: string) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    console.log("data  :", dtNascimento)
    console.log("data global :", state.dtNascimento)


    const validarNome = (nome: string) => /^[A-Za-zÀ-ÿ\s]{2,}$/.test(nome.trim());
    const validarCPF = (cpf: string) => {
        const cleaned = cpf.replace(/\D/g, '');
        if (cleaned.length !== 11 || /^(\d)\1+$/.test(cleaned)) return false;

        let soma = 0;
        for (let i = 0; i < 9; i++) soma += parseInt(cleaned[i]) * (10 - i);
        let resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cleaned[9])) return false;

        soma = 0;
        for (let i = 0; i < 10; i++) soma += parseInt(cleaned[i]) * (11 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        return resto === parseInt(cleaned[10]);
    };


    function proximo() {
        let valido = true;

        if (!validarNome(nome)) {
            setNomeErro(true);
            valido = false;
        }

        if (!validarNome(sobrenome)) {
            setSobrenomeErro(true);
            valido = false;
        }


        if (!validarCPF(cpf)) {
            setCPFErro(true);
            valido = false;
        }


        if (valido) {
            router.push("./UtilizadorCadastro2");
        } else {
            setAlertaVisivel(true);
        }
    }

    useEffect(() => {
        setNome(state.nome);
        setSobrenome(state.sobrenome);
        setCPF(state.cpf);
        setDtNascimento(state.dtNascimento);
    }, [state]);
    const [tecladoVisivel, setTecladoVisivel] = useState(false);

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            setTecladoVisivel(true);
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setTecladoVisivel(false);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    return (
        <View style={styles.containerPai}>
            <SemiTopBar />

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={styles.card}
            >
                <View style={styles.progressBar}>
                    <ProgressBar variant="default" currentStep={1} />
                </View>

                <Text style={styles.titulo}>Informações pessoais</Text>

                <ScrollView
                    style={styles.scrollContainer}
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <InputTexto
                        texto="Informe seu primeiro Nome"
                        value={nome}
                        onChangeText={handleNomeChange}
                        visivel={nomeErro}
                        mensagemErro="Nome inválido. Deve conter pelo menos 2 caracteres."
                    />

                    <InputTexto
                        texto="Informe seu Sobrenome"
                        value={sobrenome}
                        onChangeText={handleSobrenomeChange}
                        visivel={sobrenomeErro}
                        mensagemErro="Sobrenome inválido. Deve conter pelo menos 2 caracteres."
                    />


                    <InputTexto 
                        texto="Digite seu CPF"
                        value={cpf}
                        onChangeText={handleCPFChange}
                        maskType="cpf"
                        keyboardType="number-pad"
                        visivel={cpfErro}
                        mensagemErro="CPF inválido. Verifique o número e tente novamente."
                    />

                    <DateInput
                        label="Data de Nascimento"
                        value={formatDate(dtNascimento)}  // Formata a data para dd/MM/yyyy
                        onChange={handleDtNascimentoChange}
                        visivel={dtNascimentoErro}
                        mensagemErro="Data inválida."
                    />
                </ScrollView>

                {!tecladoVisivel && (<View style={styles.containerBotao}>
                    <Botao texto="Voltar" width={150} onPress={() => router.replace("./Inicial")} tipo="outlined"/>
                    <Botao texto="Próximo" width={150} onPress={proximo} />
                </View>)}
            </KeyboardAvoidingView>

        </View>
    );
}