import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { DateInput } from "../inputDate";
import { parse, differenceInDays } from "date-fns";

export const PeriodoInput = () => {
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [periodo, setPeriodo] = useState<number | null>(null);

  useEffect(() => {
    if (dataInicio && dataFim) {
      // parse no formato dd/MM/yyyy
      const inicio = parse(dataInicio, "dd/MM/yyyy", new Date());
      const fim = parse(dataFim, "dd/MM/yyyy", new Date());

      if (fim >= inicio) {
        const diff = differenceInDays(fim, inicio) + 1; // +1 para incluir o dia inicial
        setPeriodo(diff);
      } else {
        setPeriodo(null); // fim antes do inicio não faz sentido
      }
    } else {
      setPeriodo(null);
    }
  }, [dataInicio, dataFim]);

  return (
    <View style={styles.container}>
      <View style={styles.inline}>
        <DateInput label="Início" value={dataInicio} onChange={setDataInicio} />
        <DateInput label="Fim" value={dataFim} onChange={setDataFim} />
      </View>

      <View style={styles.periodoContainer}>
        {periodo !== null ? (
          <Text style={styles.periodoText}>Período: {periodo} {periodo === 1 ? "dia" : "dias"}</Text>
        ) : (
          <Text style={styles.periodoText}>Informe datas válidas</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  inline: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  periodoContainer: {
    marginTop: 8,
    alignItems: "center",
  },
  periodoText: {
    fontSize: 16,
    color: "#333",
  },
});
