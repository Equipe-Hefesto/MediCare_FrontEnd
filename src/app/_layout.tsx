import { Slot, useRouter, useSegments } from "expo-router";
import { AuthProvider, AuthContext } from "../context/AuthContext";
import { FormProvider } from "../context/FormContext";
import { PosologiaProvider } from "../context/PosologiaContext";
import { MenuProvider } from "../context/menuContext";
import { SolicitacoesProvider } from "../context/SolicitacaoContext";
import { useContext, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

function InnerLayout() {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (!auth || auth.loading) return;

    const inAuthGroup = segments.length > 0 && segments[0] === "(auth)";

    if (auth.token && inAuthGroup) {
      router.replace("/UtilizadorPerfil");
    } else if (!auth.token && !inAuthGroup) {
      router.replace("/Inicial");  // Altere para a rota pública correta
    }
  }, [auth?.token, auth?.loading]);

  if (!auth || auth.loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Slot />;
}

export default function Layout() {
  return (
    <AuthProvider>
      <FormProvider>
        <PosologiaProvider>
          <SolicitacoesProvider>
            <MenuProvider>
              <InnerLayout />
            </MenuProvider>
          </SolicitacoesProvider>
        </PosologiaProvider>
      </FormProvider>
    </AuthProvider>
  );
}
