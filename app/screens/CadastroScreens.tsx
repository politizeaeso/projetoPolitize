import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router'; // Hook para navegação entre telas

export default function CadastroScreen() {
  const router = useRouter(); // Inicializa o roteador do Expo Router

  // Estados para armazenar os dados do formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erroSenha, setErroSenha] = useState('');

  // Função chamada ao pressionar o botão "Cadastrar"
  const handleCadastro = async () => {
    setErroSenha(''); // Limpa erro anterior de senha

    // Verifica se todos os campos estão preenchidos
    if (!nome || !email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    // Valida a senha: tamanho entre 8 e 10 e exatamente 1 caractere especial
    const caracteresEspeciais = senha.match(/[^A-Za-z0-9]/g) || [];
    const qtdEspeciais = caracteresEspeciais.length;
    const tamanhoValido = senha.length >= 8 && senha.length <= 10;

    if (!tamanhoValido) {
      setErroSenha('A senha deve ter entre 8 e 10 caracteres.');
      return;
    }

    if (qtdEspeciais !== 1) {
      setErroSenha('A senha deve conter exatamente 1 caractere especial.');
      return;
    }

    // Envia os dados para a API usando fetch
    try {
      const response = await fetch('https://8a1e-2804-d49-667e-c900-3124-b25-2995-f204.ngrok-free.app/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          email,
          senha,
        }),
      });

      // Se a resposta não for OK, exibe erro
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erro do servidor:', errorData);
        Alert.alert('Erro', errorData.mensagem || 'Erro ao cadastrar usuário.');
        return;
      }

      const data = await response.json();
      console.log('Resposta do servidor:', data);

      // Cadastro bem-sucedido
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');

      // Redireciona para a tela principal (ex: /menu)
      router.push('/home');
    } catch (error) {
      console.error('Erro na requisição:', error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    }
  };

  // Interface da tela de cadastro
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Cadastro de Usuário</Text>

        {/* Campo Nome */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Nome</Text>
          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
            placeholder="Digite seu nome"
          />
        </View>

        {/* Campo Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Digite seu email"
            keyboardType="email-address"
          />
        </View>

        {/* Campo Senha */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Senha</Text>
          <TextInput
            style={styles.input}
            value={senha}
            onChangeText={setSenha}
            placeholder="Digite sua senha"
            secureTextEntry
          />
          {/* Exibe mensagem de erro se a senha for inválida */}
          {erroSenha ? <Text style={styles.erroTexto}>{erroSenha}</Text> : null}
          <Text style={styles.dicaSenha}>
            A senha deve conter entre 8 e 10 caracteres e exatamente 1 caractere especial.
          </Text>
        </View>

        {/* Botão de cadastro */}
        <TouchableOpacity style={styles.submitButton} onPress={handleCadastro}>
          <Text style={styles.submitButtonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Estilos da tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001f3f', // Azul escuro
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
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
  erroTexto: {
    color: 'red',
    fontSize: 13,
    marginTop: 4,
  },
  dicaSenha: {
    color: '#555',
    fontSize: 12,
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: '#FF851B', // Laranja
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
    marginTop: 20,
    width: '100%',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
