import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function VotacoesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Votação em Leis</Text>
      <Text style={styles.subtitle}>Funcionalidade em desenvolvimento...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001f3f',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    color: '#ccc',
    fontSize: 16,
  },
});