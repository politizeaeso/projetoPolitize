import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreens() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Botão de perfil no canto superior direito */}
      <TouchableOpacity style={styles.profileButton} onPress={() => router.push('/perfil')}>
        <Ionicons name="person-circle-outline" size={36} color="#fff" />
      </TouchableOpacity>

      {/* Menu centralizado */}
      <View style={styles.menuContainer}>
        <Text style={styles.title}>Menu Principal</Text>

        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/deputado')}>
          <Ionicons name="people-outline" size={28} color="#0074D9" style={styles.icon} />
          <Text style={styles.menuText}>Lista de Deputados</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/votacoes')}>
          <Ionicons name="document-text-outline" size={28} color="#2ECC40" style={styles.icon} />
          <Text style={styles.menuText}>Votar em Leis</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/ranking')}>
          <Ionicons name="stats-chart-outline" size={28} color="#FF851B" style={styles.icon} />
          <Text style={styles.menuText}>Ranking de Afinidade</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001f3f',
    paddingTop: 40,
    paddingHorizontal: 24,
  },
  profileButton: {
    position: 'absolute',
    top: 40,
    right: 24,
    zIndex: 10,
  },
  menuContainer: {
    flex: 1,
    justifyContent: 'center', // Centraliza verticalmente
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
    textAlign: 'center',
    letterSpacing: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 18,
    paddingHorizontal: 22,
    borderRadius: 16,
    marginBottom: 24,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  icon: {
    marginRight: 14,
  },
  menuText: {
    color: '#111',
    fontSize: 17,
    fontWeight: '600',
  },
});
