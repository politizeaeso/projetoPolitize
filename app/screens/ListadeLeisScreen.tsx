import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const leisMock = [
  {
    id: '1',
    titulo: 'Lei da Transparência',
    resumo: 'Estabelece normas de acesso à informação pública.',
    detalhes: 'A Lei da Transparência (Lei nº 12.527/2011) garante que qualquer cidadão pode solicitar dados públicos...',
  },
  {
    id: '2',
    titulo: 'Lei Maria da Penha',
    resumo: 'Cria mecanismos para coibir a violência doméstica e familiar contra a mulher.',
    detalhes: 'A Lei nº 11.340/2006, conhecida como Maria da Penha, visa proteger mulheres em situação de violência...',
  },
  {
    id: '3',
    titulo: 'Lei do Marco Civil da Internet',
    resumo: 'Estabelece direitos e deveres no uso da Internet no Brasil.',
    detalhes: 'A Lei nº 12.965/2014 define princípios, garantias, direitos e deveres para o uso da internet...',
  },
];

const ListaDeLeisScreen = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.titulo}>{item.titulo}</Text>
      <Text style={styles.resumo}>{item.resumo}</Text>
      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('DetalhesDaLei', { lei: item })}
      >
        <Text style={styles.textoBotao}>Ver Detalhes</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={leisMock}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
};

export default ListaDeLeisScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001F3F',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  resumo: {
    fontSize: 14,
    color: '#666',
  },
  botao: {
    marginTop: 12,
    backgroundColor: '#4B7BE5',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
