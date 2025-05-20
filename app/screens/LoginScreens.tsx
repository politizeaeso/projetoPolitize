import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; 

export default function LoginScreen() {
  const router = useRouter(); // para navegação

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/politize.jpg')} style={styles.logo} />

      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={18} color="#666" style={styles.icon} />
        <TextInput
          placeholder="Digite seu email"
          placeholderTextColor="#666"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={18} color="#666" style={styles.icon} />
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#666"
          secureTextEntry
          style={styles.input}
        />
      </View>

      
<TouchableOpacity style={styles.forgotPasswordContainer} onPress={() => router.push('/esqueceu')}>
  <Text style={styles.link}>Esqueceu a senha?</Text>
</TouchableOpacity>




     
<TouchableOpacity style={styles.button} onPress={() => router.replace('/home')}>
  <Text style={styles.buttonText}>Acessar ➝</Text>
</TouchableOpacity>




{/* 
       <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Acessar ➝</Text>
      </TouchableOpacity>  */}


{/* <TouchableOpacity style={styles.button} onPress={() => router.push('/deputados')}>
  <Text style={styles.buttonText}>Acessar ➝</Text>
</TouchableOpacity> */}


      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Ainda não tem uma conta? </Text>
        <TouchableOpacity onPress={() => router.push('/cadastro')}>
          <Text style={styles.registerLink}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002244',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  logo: {
    width:120,
    height: 120,
    marginBottom: 50,
    resizeMode: 'contain',
    borderRadius: 60, 
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 12,
    width: '100%',
    height: 44,
    marginBottom: 18,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: '#000',
  },
  forgotPasswordContainer: {
    alignSelf: 'center',
    marginBottom: 28,
  },
  link: {
    color: '#bbb',
    fontSize: 13,
  },
  button: {
    backgroundColor: '#004080',
    paddingVertical: 14,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
    marginBottom: 35,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    color: '#aaa',
    fontSize: 13,
  },
  registerLink: {
    color: '#4ea5ff',
    fontSize: 13,
    marginLeft: 4,
    textDecorationLine: 'underline',
  },
});