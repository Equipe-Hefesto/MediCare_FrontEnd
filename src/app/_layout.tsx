import { Slot } from "expo-router";
import { FormProvider } from "../context/FormContext";

export default function Layout() {
  return (
    <FormProvider>
      <Slot />
    </FormProvider>
  );
}
