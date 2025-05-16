import React, { useState } from 'react';
import Icon from "react-native-vector-icons/Feather";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { InputTexto } from '../inputTexto';

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  visivel?: boolean;
  mensagemErro?: string;
  placeholder?: string;
  items: string[];
};

export const SearchPicker = ({
  label,
  value,
  onChange,
  visivel,
  mensagemErro,
  placeholder,
  items,
}: Props) => {
  const [filteredItems, setFilteredItems] = useState<string[]>([]);
  const [focused, setFocused] = useState(false);

  const handleSearch = (text: string) => {
    const filtered = items.filter((item) =>
      item.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleSelect = (item: string) => {
    onChange(item);
    setFilteredItems([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <InputTexto
          texto={label}
          value={value}
          visivel={visivel}
          placeholder={placeholder}
          mensagemErro={mensagemErro}
          onFocus={() => setFocused(true)}
          onChangeText={(text) => {
            onChange(text);
            handleSearch(text);
          }}
          marginBottom={4}
        />
        <TouchableOpacity style={styles.icon}>
          <Icon name="search" size={23} color="#3B82A0" />
        </TouchableOpacity>
      </View>

      {focused && filteredItems.length > 0 && (
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.itemTouchable}
              onPress={() => handleSelect(item)}
            >
              <Text style={styles.itemText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  wrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
    right: 0,
    top: 33,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    padding: 8,
    zIndex: 2,
  },
  itemTouchable: {
    backgroundColor: '#f0f9ff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 4,
    marginHorizontal: 1,
    borderRadius: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  itemText: {
    fontSize: 16,
    color: '#267797',
    fontWeight: '500',
  },
});
