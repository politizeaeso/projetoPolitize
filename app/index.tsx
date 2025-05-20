// app/index.tsx
import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';
import { router } from 'expo-router';

export default function SplashScreen() {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Aguarda 1 segundo, depois inicia o fade-out
    const timeout = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1000, // transição suave
        useNativeDriver: true,
      }).start(() => {
        router.replace('/login'); // troca de tela só após o fade
      });
    }, 900); // splash visível por ~1 segundo antes do fade

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Image
        source={require('../assets/images/politize.jpg')}
        style={styles.logo}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002244', // mesma cor da tela de login
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 180,
    height: 180,
    borderRadius: 90,
    resizeMode: 'contain',
  },
});
