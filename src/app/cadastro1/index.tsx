import { View, Text } from "react-native";
import { styles } from "../cadastro1/styles";
import { SemiTopBar } from "../../components/semiTopBar";
import { BarraProgresso } from "../../components/barraProgresso";
import { AlertCustomizado } from "../../components/alertCustomizado";
import { Botao } from "../../components/botao";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Cadastro1(){

    const router = useRouter();

    const [alertaVisivel, setAlertaVisivel] = useState(false);
    const [tipoUsuario, setTipoUsuario] = useState("utilizador");

    function proximo(){
        if (tipoUsuario == "utilizador")
        {
            router.push("./cadastroUtilizador2")
        }
        else if (tipoUsuario == "responsavel")
        {
            router.push("./cadastroResponsavel2")
        }
        else if (tipoUsuario == "cuidador")
        {

        }
        else
        {
            setAlertaVisivel(true);
        }
    }

    return (
        <View style={styles.containerPai}>

            <SemiTopBar />

            <View style={styles.container}>

                <BarraProgresso />

                <Text style={styles.titulo}> Vamos Começar! </Text>

                <View style={styles.containerTextoPicker}>

                    <Text style={styles.textoPicker}> Informe seu tipo de usuário: </Text>
                    
                    <View style={styles.containerPicker}> 
                        <Picker selectedValue={tipoUsuario} onValueChange={(tipoUsuarioSelecionado) => setTipoUsuario(tipoUsuarioSelecionado)} style={styles.picker}>
                            <Picker.Item label="Utilizador Comum" value="utilizador" />
                            <Picker.Item label="Responsável" value="responsavel" />
                            <Picker.Item label="Cuidador" value="cuidador" />
                        </Picker>
                    </View>

                </View>

                <View style={styles.containerBotao}> <Botao texto="Próximo" onPress={proximo} width={150}/> </View>
            
            </View>

            <AlertCustomizado visivel={alertaVisivel} onPress={() => setAlertaVisivel(false)}/>

        </View>
    );
}