import { Slot } from "expo-router";
import { FormProvider } from "../context/FormContext";
import { PosologiaProvider } from "../context/PosologiaContext";
import { AuthProvider } from "../context/AuthContext";
import { use, useState } from "react";
import { MenuProvider } from "../context/menuContext";
export default function Layout() {

  return (
    <AuthProvider>
      <FormProvider>
        <PosologiaProvider>
          <MenuProvider>
          <Slot />
          </MenuProvider>
        </PosologiaProvider>
      </FormProvider>
    </AuthProvider>
  );
}
