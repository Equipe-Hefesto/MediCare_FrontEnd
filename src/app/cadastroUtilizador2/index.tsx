import { Text, View } from "react-native";
import { styles } from "../cadastroUtilizador2/styles";
import { SemiTopBar } from "../../components/semiTopBar";
import { InputTexto } from "../../components/inputTexto";
import { useState, useContext, useEffect } from "react";
import { Botao } from "../../components/botao";
import { useRouter } from "expo-router";
import { AlertCustomizado } from "../../components/alertCustomizado";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FormContext } from '../../context/FormContext';

export default function CadastroUtilizador2() {
    const router = useRouter();
    const [alertaVisivel, setAlertaVisivel] = useState(false);

    const { state, dispatch } = useContext(FormContext);

    const [nome, setNome] = useState(state.nome);
    const [sobrenome, setSobrenome] = useState(state.sobrenome);
    const [cpf, setCPF] = useState(state.cpf);
    const [username, setUsername] = useState(state.username);

    const [borderColor1, setBorderColor1] = useState("#267797");
    const [borderColor2, setBorderColor2] = useState("#267797");
    const [borderColor3, setBorderColor3] = useState("#267797");
    const [borderColor4, setBorderColor4] = useState("#267797");

    const handleNomeChange = (text: string) => {
        setNome(text);
        dispatch({ campo: 'nome', valor: text });
    };

    const handleSobrenomeChange = (text: string) => {
        setSobrenome(text);
        dispatch({ campo: 'sobrenome', valor: text });
    };

    const handleUsernameChange = (text: string) => {
        setUsername(text);
        dispatch({ campo: 'username', valor: text });
    };

    const handleCPFChange = (text: string) => {
        const cpfLimpo = text.replace(/\D/g, '');  // Remove todos os caracteres não numéricos
        setCPF(cpfLimpo);
        dispatch({ campo: 'cpf', valor: cpfLimpo });  // Envia o CPF limpo para o contexto
    };


    const validarNome = (nome: string) => /^[A-Za-zÀ-ÿ\s]{2,}$/.test(nome.trim());

    const validarUsername = (username: string) => /^[a-zA-Z0-9_]{3,20}$/.test(username);

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
            setBorderColor1("red");
            valido = false;
        } else {
            setBorderColor1("#267797");
        }

        if (!validarNome(sobrenome)) {
            setBorderColor2("red");
            valido = false;
        } else {
            setBorderColor2("#267797");
        }

        if (!validarUsername(username)) {
            setBorderColor4("red");
            valido = false;
        } else {
            setBorderColor4("#267797");
        }

        if (!validarCPF(cpf)) {
            setBorderColor3("red");
            valido = false;
        } else {
            setBorderColor3("#267797");
        }

        if (valido) {
            router.push("./cadastroUtilizador3");
        } else {
            setAlertaVisivel(true);
        }
    }

    useEffect(() => {
        setNome(state.nome);
        setSobrenome(state.sobrenome);
        setUsername(state.username);
        setCPF(state.cpf);
    }, [state]);

    return (
        <View style={styles.containerPai}>
            <SemiTopBar />
            <View style={styles.container}>
                <View style={styles.containerBarra}>
                    <View style={styles.containerCirculoFeito}>
                        <View style={styles.containerTexto}>
                            <MaterialCommunityIcons style={styles.numero} name="check" color={"#fff"} />
                        </View>
                    </View>
                    <View style={styles.linha}></View>
                    <View style={styles.containerCirculoFeito}>
                        <View style={styles.containerTexto}>
                            <Text style={styles.numeroAtual}> 2 </Text>
                        </View>
                    </View>
                    <View style={styles.linha}></View>
                    <View style={styles.containerCirculo}>
                        <View style={styles.containerTexto}>
                            <Text style={styles.numero}> 3 </Text>
                        </View>
                    </View>
                    <View style={styles.linha}></View>
                    <View style={styles.containerCirculo}>
                        <View style={styles.containerTexto}>
                            <Text style={styles.numero}> 4 </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.containerInputs}>
                    <View style={styles.containerInput}>
                        <InputTexto
                            borderColor={borderColor1}
                            texto={"Informe seu primeiro Nome"}
                            value={nome}
                            onChangeText={handleNomeChange}
                            secureTextEntry={false}
                        />
                    </View>

                    <View style={styles.containerInput}>
                        <InputTexto
                            borderColor={borderColor2}
                            texto={"Informe seu Sobrenome"}
                            value={sobrenome}
                            onChangeText={handleSobrenomeChange}
                            secureTextEntry={false}
                        />
                    </View>

                    <View style={styles.containerInput}>
                        <InputTexto
                            borderColor={borderColor4}
                            texto={"Informe um nome de Usuário"}
                            value={username}
                            onChangeText={handleUsernameChange}
                            secureTextEntry={false}
                        />
                    </View>

                    <View style={styles.containerInput}>
                        <InputTexto
                            texto="Digite seu CPF"
                            secureTextEntry={false}
                            value={cpf}
                            onChangeText={handleCPFChange}
                            maskType="cpf"  // Usando a máscara 'cpf'
                            borderColor="#267797"
                            keyboardType="number-pad"
                        />
                    </View>
                </View>

                <View style={styles.containerBotao}>
                    <Botao texto={"Próximo"} width={150} onPress={proximo} />
                </View>
            </View>

            <AlertCustomizado visivel={alertaVisivel} onPress={() => setAlertaVisivel(false)} />
        </View>
    );
}
