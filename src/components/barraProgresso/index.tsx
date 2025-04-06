import React from 'react';
import { View, Text } from "react-native";
import { styles } from "../barraProgresso/styles"
import { usePathname } from "expo-router";
import { useRouter } from "expo-router";
import { useState } from "react";

export function BarraProgresso(){

    return (

        <View style={styles.containerPai}>
            
            <View style={styles.containerCirculo}>
                
                <View style={styles.containerTexto}> <Text style={styles.numero}> 1 </Text> </View>
            
            </View>

            <View style={styles.linha}> </View>

            <View style={styles.containerCirculo}>
                
                <View style={styles.containerTexto}> <Text style={styles.numero}> 2 </Text> </View>
            
            </View>

            <View style={styles.linha}> </View>

            <View style={styles.containerCirculo}>
                
                <View style={styles.containerTexto}> <Text style={styles.numero}> 3 </Text> </View>
            
            </View>

            <View style={styles.linha}> </View>

            <View style={styles.containerCirculo}>
                
                <View style={styles.containerTexto}> <Text style={styles.numero}> 4 </Text> </View>
            
            </View>

        </View>
    );
}