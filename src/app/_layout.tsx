import { Slot } from "expo-router";
import { FormProvider } from "../context/FormContext";
import { PosologiaProvider } from "../context/PosologiaContext";
import { AuthProvider } from "../context/AuthContext";

export default function Layout() {
  return (
    <AuthProvider>
      <FormProvider>
        <PosologiaProvider>
          <Slot />
        </PosologiaProvider>
      </FormProvider>
    </AuthProvider>
  );
}
