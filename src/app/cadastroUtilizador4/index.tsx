import { Alert, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "../cadastroUtilizador4/styles"
import { SemiTopBar } from "../../components/semiTopBar";
import { InputTexto } from "../../components/inputTexto";
import { Botao } from "../../components/botao";
import { AlertCustomizado } from "../../components/alertCustomizado";
import { useState, useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FormContext } from '../../context/FormContext';
import { idTipo } from '../cadastro1/index'


export default function CadastroUtilizador4() {

    const router = useRouter();
    const [alertaVisivel, setAlertaVisivel] = useState(false);

    const [cpfResponsavel, setCpfResponsavel] = useState("");
    const [cpfCuidador, setCpfCuidador] = useState("");

    const { state, dispatch } = useContext(FormContext);





    /*async function proximo() {
        try {
            //  Chama a API
            const response = await fetch('http://medicareapi.somee.com/Medicare_Api/Utilizador/SingUp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cpf: '33263165852',
                    nome: 'marcia',
                    sobrenome: 'xavier',
                    dtNascimento: "2006-05-23T07:32:05.169Z",
                    email: 'marcia@email.com',
                    telefone: '11979728100',
                    username: 'maxavier',
                    senhaString: '12345'
                }),  // Corpo da requisição com os dados do formulário
            });

            // Se der erro HTTP (400, 500...) cai no catch
            if (!response.ok) {
                throw new Error(`Erro de login: ${response.status}`);
            }
            alert("Cadastro realizado!");

            router.replace("./home");


        } catch (error) {
            // Erro de rede ou HTTP >=400
            console.error("Erro na requisição:", error);
            setAlertaVisivel(true);
        }




    }*/
    console.log("Contexto atual:", state);
    console.log("id tipo :", idTipo)


    async function proximo() {
        const requestBody = {
            cpf: state.cpf,
            nome: state.nome,
            sobrenome: state.sobrenome,
            dtNascimento: state.dtNascimento,
            email: state.email,
            telefone: state.telefone,
            username: state.username,
            senhaString: state.senhaString,
            cpfResponsavel,
            cpfCuidador
        };

        try {
            const response = await fetch('http://medicareapi.somee.com/Medicare_Api/Utilizador/SingUp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error(`Erro de cadastro: ${response.status}`);
            }
            const data = await response.json(); // Obtendo a resposta com o id do usuário
            const novoUsuarioId = data.idUtilizador; // O id do novo usuário
            console.log("id utilizador  :", novoUsuarioId)


            // Agora, após criar o usuário, enviar o segundo POST para associar o tipo de usuário
            const tipoUsuarioPostBody = {
                "idUtilizador": novoUsuarioId,
                "idTipoUtilizador": idTipo
            };

            // Enviar o segundo POST para associar o tipo de usuário
            const responseTipoUsuario = await fetch('http://medicareapi.somee.com/Medicare_Api/UtilizadorTipoUtilizador', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tipoUsuarioPostBody),
            });

            if (!responseTipoUsuario.ok) {
                throw new Error(`Erro ao associar tipo de usuário: ${responseTipoUsuario.status}`);
            }

            Alert.alert('Cadastro realizado!', 'Você foi cadastrado com sucesso!', [
                { text: 'OK', onPress: () => router.replace('./home') },
            ]);
        } catch (error) {
            console.error("Erro na requisição:", error);
            setAlertaVisivel(true);
        }
    }

    return (
        <View style={styles.containerPai}>

            <SemiTopBar />

            <View style={styles.container}>

                <View style={styles.containerBarra}>

                    <View style={styles.containerCirculoFeito}>

                        <View style={styles.containerTexto}> <MaterialCommunityIcons style={styles.numero} name="check" color={"#fff"} /> </View>

                    </View>

                    <View style={styles.linha}> </View>

                    <View style={styles.containerCirculoFeito}>

                        <View style={styles.containerTexto}> <MaterialCommunityIcons style={styles.numero} name="check" color={"#fff"} /> </View>

                    </View>

                    <View style={styles.linha}> </View>

                    <View style={styles.containerCirculoFeito}>

                        <View style={styles.containerTexto}> <MaterialCommunityIcons style={styles.numero} name="check" color={"#fff"} /> </View>

                    </View>

                    <View style={styles.linha}> </View>

                    <View style={styles.containerCirculoFeito}>

                        <View style={styles.containerTexto}> <Text style={styles.numeroAtual}> 4 </Text> </View>

                    </View>

                </View>

                <View style={styles.containerInputs}>

                    <View style={styles.containerInput}> <InputTexto keyboardType={"numeric"} texto={"Se você tem um responsável, informe o CPF"} onChangeText={setCpfResponsavel} secureTextEntry={false} /> </View>

                    <View style={styles.containerInput}> <InputTexto keyboardType={"numeric"} texto={"Se você tem um Cuidador, informe o CPF"} onChangeText={setCpfCuidador} secureTextEntry={false} /> </View>
                </View>

                <View style={styles.containerBotao}> <Botao texto={"Próximo"} width={150} onPress={proximo} /> </View>

            </View>

            <AlertCustomizado visivel={alertaVisivel} onPress={() => setAlertaVisivel(false)} />

        </View>
    );
}