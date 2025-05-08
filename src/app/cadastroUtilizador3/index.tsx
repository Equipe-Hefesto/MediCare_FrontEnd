import { Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "../cadastroUtilizador3/styles";
import { SemiTopBar } from "../../components/semiTopBar";
import { InputTexto } from "../../components/inputTexto";
import { Botao } from "../../components/botao";
import { AlertCustomizado } from "../../components/alertCustomizado";
import { useState, useContext, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FormContext } from '../../context/FormContext';
import { format } from "date-fns";

export default function CadastroUtilizador3() {
    const router = useRouter();
    const [alertaVisivel, setAlertaVisivel] = useState(false);
    const { state, dispatch } = useContext(FormContext);

    // Local states
    const [email, setEmail] = useState(state.email);
    const [telefone, setTelefone] = useState(state.telefone);
    const [senha, setSenha] = useState(state.senhaString);
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [dataNascimento, setDataNascimento] = useState<Date | null>(
        state.dtNascimento ? new Date(state.dtNascimento) : null
    );
    const [showPicker, setShowPicker] = useState(false);

    const [borderColor1, setBorderColor1] = useState("#267797");
    const [borderColor2, setBorderColor2] = useState("#267797");
    const [borderColor3, setBorderColor3] = useState("#267797");
    const [borderColor4, setBorderColor4] = useState("#267797");

    const handleDateChange = (event: any, date?: Date) => {
        setShowPicker(false);
        if (date) {
            setDataNascimento(date);
            dispatch({ campo: 'dtNascimento', valor: date.toISOString() });
        }
    };

    const handleEmailChange = (text: string) => {
        setEmail(text);
        dispatch({ campo: 'email', valor: text });
    };

    const handleTelefoneChange = (text: string) => {
        const telefoneLimpo = text.replace(/\D/g, ''); // Remove tudo que não for número
        setTelefone(text); // Mostra o texto com máscara no input
        dispatch({ campo: 'telefone', valor: telefoneLimpo }); // Salva no contexto sem máscara
    };
    

    const handleSenhaChange = (text: string) => {
        setSenha(text);
        dispatch({ campo: 'senhaString', valor: text });
    };

    const handleConfirmarSenhaChange = (text: string) => {
        setConfirmarSenha(text);
    };

    // Validações
    const validarEmail = (email: string) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim());

    const validarTelefone = (telefone: string) => {
        const cleaned = telefone.replace(/\D/g, '');
        return cleaned.length === 11;  // Considerando formato de telefone celular no Brasil
    };

    const validarSenha = (senha: string) => senha.length >= 6;

    const validarConfirmarSenha = (confirmarSenha: string) => confirmarSenha === senha;

    function proximo() {
        let valido = true;

        if (!validarEmail(email)) {
            setBorderColor1("red");
            valido = false;
        } else {
            setBorderColor1("#267797");
        }

        if (!validarTelefone(telefone)) {
            setBorderColor2("red");
            valido = false;
        } else {
            setBorderColor2("#267797");
        }

        if (!validarSenha(senha)) {
            setBorderColor3("red");
            valido = false;
        } else {
            setBorderColor3("#267797");
        }

        if (!validarConfirmarSenha(confirmarSenha)) {
            setBorderColor4("red");
            valido = false;
        } else {
            setBorderColor4("#267797");
        }

        if (valido) {
            router.push("./cadastroUtilizador4");
        } else {
            setAlertaVisivel(true);
        }
    }

    useEffect(() => {
        setEmail(state.email);
        setTelefone(state.telefone);
        setSenha(state.senhaString);
        setDataNascimento(state.dtNascimento ? new Date(state.dtNascimento) : null);
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
                            <MaterialCommunityIcons style={styles.numero} name="check" color={"#fff"} />
                        </View>
                    </View>
                    <View style={styles.linha}></View>
                    <View style={styles.containerCirculoFeito}>
                        <View style={styles.containerTexto}>
                            <Text style={styles.numeroAtual}> 3 </Text>
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

                    {/* Input de Data de Nascimento */}
                    <View style={styles.containerInput}>
                        <InputTexto
                            borderColor={borderColor1}
                            texto={"Data de Nascimento"}
                            value={dataNascimento ? format(dataNascimento, "dd/MM/yyyy") : "Selecionar data"}
                            onFocus={() => setShowPicker(true)}
                            secureTextEntry={false}
                            onChangeText={() => { }} 
                        />
                    </View>

                    {showPicker && (
                        <DateTimePicker
                            value={dataNascimento ?? new Date()}
                            mode="date"
                            display="calendar"
                            onChange={handleDateChange}
                        />
                    )}

                    {/* Outros campos */}
                    <View style={styles.containerInput}>
                        <InputTexto
                            keyboardType={"email-address"}
                            borderColor={borderColor1}
                            texto={"E-mail"}
                            value={email}
                            onChangeText={handleEmailChange}
                            secureTextEntry={false}
                        />
                    </View>

                    <View style={styles.containerInput}>
                        <InputTexto
                            keyboardType={"phone-pad"}
                            borderColor={borderColor2}
                            maskType="cel-phone"  
                            texto={"Telefone"}
                            value={telefone}
                            onChangeText={handleTelefoneChange}
                            secureTextEntry={false}
                        />
                    </View>

                    <View style={styles.containerInput}>
                        <InputTexto
                            borderColor={borderColor3}
                            texto={"Crie uma senha"}
                            value={senha}
                            onChangeText={handleSenhaChange}
                            secureTextEntry={true}
                        />
                    </View>

                    <View style={styles.containerInput}>
                        <InputTexto
                            borderColor={borderColor4}
                            texto={"Confirme sua senha"}
                            value={confirmarSenha}
                            onChangeText={handleConfirmarSenhaChange}
                            secureTextEntry={true}
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
