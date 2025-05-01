import { Cadastro0Login } from "../app/cadastro0Login";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TelaInicial from './home/index';
import CadastroRemedio from './cadastroRemedio/index';

type RootStackParamList = {
    Home: undefined;
    Medicamentos: undefined;
  };

  const Stack = createStackNavigator<RootStackParamList>();

export default function Index(){
    return (
        
    <Cadastro0Login />)
}