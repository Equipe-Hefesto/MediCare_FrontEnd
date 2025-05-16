import { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { styles } from "./styles";
import { TopBar } from "../../components/topBar";
import { MenuInferior } from "../../components/menuInferior";
import { ProgressBar } from "@/src/components/progressBar";
import { Botao } from "@/src/components/botao";

type Item = string;

export default function CadastroRemedio2() {
    const [query, setQuery] = useState<string>('');
    const [filteredItems, setFilteredItems] = useState<Item[]>([]);
    const [selectedValue, setSelectedValue] = useState<Item | null>(null);
    const [remedios, setRemedios] = useState<Item[]>([]);

    useEffect(() => {
        const fetchRemedios = async () => {
            try {
                const response = await fetch('https://medicareapi.somee.com/Medicare_Api/Remedio/GetNomes',//tem fzr um get nome list
                    {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                    }) 
                const data: Item[] = await response.json();
                setRemedios(data);
            } catch (error) {
                console.error('Erro ao buscar remédios:', error);
            }
        };

        fetchRemedios();
    }, []);

    const handleSearch = (text: string) => {
        setQuery(text);
        const filtered = remedios.filter((item) =>
            item.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredItems(filtered);
    };

    const handleSelect = (item: Item) => {
        setQuery(item);
        setSelectedValue(item);
        setFilteredItems([]);
    };

    return (
        <View style={styles.containerPai}>
            <TopBar />

            <View style={styles.paiFilho}>
                <View style={styles.containerFilho}>
                    <Text style={styles.titulo}>Adicionar Remédio</Text>

                    <View style={styles.containerBarra}>
                        <ProgressBar variant="default" currentStep={1} />
                    </View>

                    <View style={styles.container}>
                            <Text style={styles.texto}>Nome Remédio</Text>

                        <View style={styles.inputWrapper}>
                            <TextInput
                                value={query}
                                onChangeText={handleSearch}
                                placeholder="Digite ou escolha..."
                                style={styles.input}
                            />
                            <Ionicons name="search" size={20} color="#666" />
                        </View>

                        {filteredItems.length > 0 && (
                            <FlatList
                                data={filteredItems}
                                keyExtractor={(item) => item}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => handleSelect(item)} style={styles.item}>
                                        <Text>{item}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        )}

                        {selectedValue && (
                            <Text style={styles.selected}>Selecionado: {selectedValue}</Text>
                        )}
                    </View>

                    <View style={styles.containerBotao}>
                        <Botao texto="Próximo" width={150} onPress={() => router.replace('./cadastroRemedio3')} />
                    </View>
                </View>
            </View>

            <MenuInferior cor1="#fff" cor2="#fff" cor3="#ACE1F5" cor4="#fff" />
        </View>
    );
}
