// Importa os módulos necessários
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Platform,
  ToastAndroid,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

export default function PerfilScreen() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [profileImage, setProfileImage] = useState<string>('');

  // Recupera dados ao montar
  useEffect(() => {
    const getDados = async () => {
      try {
        const nomeStorage = await AsyncStorage.getItem('nome');
        const imageStorage = await AsyncStorage.getItem('profileImage');
        if (nomeStorage) setNome(nomeStorage);
        if (imageStorage) setProfileImage(imageStorage);
      } catch (error) {
        console.error('Erro ao recuperar os dados', error);
      }
    };

    getDados();
  }, []);

  // Escolher imagem
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permissão negada',
        'Você precisa permitir acesso à galeria para alterar a foto de perfil.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setProfileImage(uri);
      await AsyncStorage.setItem('profileImage', uri);
    }
  };

  // Remover imagem
  const removerImagem = async () => {
    Alert.alert(
      'Remover Foto',
      'Deseja remover a foto de perfil?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Remover',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('profileImage');
              setProfileImage('');

              // Mostra um feedback após remoção
              if (Platform.OS === 'android') {
                ToastAndroid.show('Foto removida com sucesso!', ToastAndroid.SHORT);
              } else {
                Alert.alert('Foto removida com sucesso!');
              }
            } catch (error) {
              console.error('Erro ao remover imagem:', error);
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.modalContainer}>
        {/* Título */}
        <Text style={styles.title}>Perfil de Usuário</Text>

        {/* Imagem de Perfil */}
        <View style={styles.profileImageContainer}>
          <Image
            source={{
              uri:
                profileImage && profileImage.trim() !== ''
                  ? profileImage
                  : 'https://www.example.com/user.jpg',
            }}
            style={styles.profileImage}
          />

          {/* Botão de alterar imagem */}
          <TouchableOpacity style={styles.changeImageButton} onPress={pickImage}>
            <Ionicons name="camera" size={24} color="#fff" />
            <Text style={styles.changeImageText}>Alterar Foto</Text>
          </TouchableOpacity>
        </View>

        {/* Botão de remover imagem */}
        {profileImage && profileImage.trim() !== '' && (
          <TouchableOpacity style={styles.removeImageButton} onPress={removerImagem}>
            <Text style={styles.removeImageText}>Remover Foto</Text>
          </TouchableOpacity>
        )}

        {/* Nome */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Nome</Text>
          <Text style={styles.input}>{nome || ''}</Text>
        </View>

        {/* Alterar dados */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => router.push('/alterardados')}
        >
          <Text style={styles.editText}>Alterar Email e Senha</Text>
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => router.push('/login')}
        >
          <Ionicons name="exit-outline" size={32} color="#FF4136" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001f3f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#001f3f',
    marginBottom: 20,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#0074D9',
  },
  changeImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#0074D9',
    padding: 8,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeImageText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 14,
  },
  removeImageButton: {
    marginTop: 10,
    padding: 8,
    backgroundColor: '#FF4136',
    borderRadius: 20,
  },
  removeImageText: {
    color: '#fff',
    fontSize: 14,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#333',
  },
  editButton: {
    backgroundColor: '#FF851B',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
    marginTop: 20,
  },
  editText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#FF4136',
    alignItems: 'center',
    flex: 1,
  },
});
