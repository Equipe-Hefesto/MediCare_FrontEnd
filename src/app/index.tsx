import { useContext } from "react";
import { Redirect } from "expo-router";
import { AuthContext } from "@/src/context/AuthContext";

export default function Index() {
  const auth = useContext(AuthContext);

  if (!auth || auth.loading) return null;

  if (auth.token) {
    return <Redirect href="/(app)/UtilizadorPerfil" />;
  }

  return <Redirect href="/Inicial" />;
}
