import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';

const deputados = [
  {
    id: '1',
    nome: 'Acácio Favacho',
    partido: 'MDB - AP',
    foto: 'https://www.camara.leg.br/internet/deputado/bandep/204379.jpgmaior.jpg',
  },
  {
    id: '2',
    nome: 'Adail Filho',
    partido: 'REPUBLICANOS - AM',
    foto: 'https://www.camara.leg.br/internet/deputado/bandep/220714.jpgmaior.jpg',
  },
  {
    id: '3',
    nome: 'Adilson Barroso',
    partido: 'PL - SP',
    foto: 'https://www.camara.leg.br/internet/deputado/bandep/221328.jpgmaior.jpg',
  },

  {
    id: '4',
    nome: 'Adolfo Viana',
    partido: 'REPUBLICANOS - AM',
    foto: 'https://www.camara.leg.br/internet/deputado/bandep/204560.jpgmaior.jpg',
  },

  {
    id: '5',
    nome: 'Adriana Ventura',
    partido: 'NOVO - SP',
    foto: 'https://www.camara.leg.br/internet/deputado/bandep/204528.jpgmaior.jpg',
  },

  {
    id: '6',
    nome: 'Adriano do Baldy',
    partido: 'PP - GO',
    foto: 'https://www.camara.leg.br/internet/deputado/bandep/121948.jpgmaior.jpg',
  },

  {
    id: '7',
    nome: 'Aécio Neves',
    partido: 'PSDB - MG',
    foto: 'https://www.camara.leg.br/internet/deputado/bandep/74646.jpgmaior.jpg',
  },

  {
    id: '8',
    nome: 'Afonso Hamm',
    partido: 'PP-RS',
    foto: 'https://www.camara.leg.br/internet/deputado/bandep/136811.jpgmaior.jpg',
  },

  {
    id: '9',
    nome: 'Afonso Motta',
    partido: 'PDT-RS',
    foto: 'https://www.camara.leg.br/internet/deputado/bandep/178835.jpgmaior.jpg',
  },

  {
    id: '10',
    nome: 'Aguinaldo Ribeiro',
    partido: 'PP-PB',
    foto: 'https://www.camara.leg.br/internet/deputado/bandep/160527.jpgmaior.jpg',
  },

  {
    id: '11',
    nome: 'Airton Faleiro',
    partido: 'PT-PA',
    foto: 'https://www.camara.leg.br/internet/deputado/bandep/204495.jpgmaior.jpg',
  },

  {
    id: '12',
    nome: 'AJ Albuquerque',
    partido: 'PP-CE',
    foto: 'https://www.camara.leg.br/internet/deputado/bandep/204549.jpgmaior.jpg',
  },

  {
    id: '13',
    nome: 'Alberto Fraga',
    partido: 'PL-DF',
    foto: 'https://www.camara.leg.br/internet/deputado/bandep/73579.jpgmaior.jpg',
  },

  {
    id: '14',
    nome: 'Albuquerque',
    partido: 'REPUBLICANOS-RR',
    foto: 'https://www.camara.leg.br/internet/deputado/bandep/220538.jpgmaior.jpg',
  }, 

  {
    id: '15',
    nome: 'Alceu Moreira',
    partido: 'MDB-RS',
    foto: 'https://www.camara.leg.br/internet/deputado/bandep/160559.jpgmaior.jpg',
  },

  {
    id: '16',
    nome: 'Alencar Santana',
    partido: 'PT-SP',
    foto: 'https://www.camara.leg.br/internet/deputado/bandep/204501.jpgmaior.jpg',
  }, 

  {
    id: '17',
    nome: 'Alex Manente',
    partido: 'CIDADANIA-SP',
    foto: 'https://www.camara.leg.br/internet/deputado/bandep/178972.jpgmaior.jpg',
  }, 
  {
    id: '18',
    nome: 'Alex Santana',
    partido: 'REPUBLICANOS-BA',
    foto: 'https://www.camara.leg.br/internet/deputado/bandep/204571.jpgmaior.jpg',
  }, 
  {
    id: '19',
    nome: 'Alexandre Guimarães',
    partido: 'MDB-TO',
    foto: 'https://www.camara.leg.br/internet/deputado/bandep/220542.jpgmaior.jpg',
  }, 
  {
    id: '20',
    nome: 'Alexandre Leite',
    partido: 'UNIAO-SP',
    foto: 'https://www.camara.leg.br/internet/deputado/bandep/160545.jpgmaior.jpg',
  }, 
  {
    id: '21',
    nome: 'Alexandre Lindenmeyer',
    partido: 'PT-RS',
    foto: 'https://www.camara.leg.br/internet/deputado/bandep/220554.jpgmaior.jpg',
  }, 
  {
    id: '22',
    nome: 'Alexandre Padilha',
    partido: 'PT-SP',
    foto: 'https://www.camara.leg.br/internet/deputado/bandep/204503.jpgmaior.jpg',
  }, 
  {
    id: '23',
    nome: 'Alfredinho',
    partido: 'PT-SP',
    foto: 'https://www.camara.leg.br/internet/deputado/bandep/221148.jpgmaior.jpg',
  }, 
  {
    id: '24',
    nome: 'Alfredo Gaspar',
    partido: 'UNIAO-AL',
    foto: 'https://www.camara.leg.br/internet/deputado/bandep/220576.jpgmaior.jpg',
  }, 
  {
    id: '25',
    nome: 'Alice Portugal',
    partido: 'PCdoB-BA',
    foto: 'https://www.camara.leg.br/internet/deputado/bandep/74057.jpgmaior.jpg',
  }, 
  
  {
    id: '26',
    nome: 'Aliel Machado',
    partido: 'PV-PR',
    foto: 'https://www.camara.leg.br/internet/deputado/bandep/178927.jpgmaior.jpg',
  }, 
  {
    id: '27',
    nome: 'Allan Garcês',
    partido: 'PP-MA',
    foto: 'https://www.camara.leg.br/internet/deputado/bandep/226708.jpgmaior.jpg',
  }, 
  {
    id: '28',
    nome: 'Altineu Côrtes',
    partido: 'PL-RJ',
    foto: 'https://www.camara.leg.br/internet/deputado/bandep/178937.jpgmaior.jpg',
  }, 
  {
    id: '29',
    nome: 'Aluisio Mendes',
    partido: 'REPUBLICANOS-MA',
    foto: 'https://www.camara.leg.br/internet/deputado/bandep/178881.jpgmaior.jpg',
  }, 
  // Adicione mais deputados aqui...
]; 

export default function DeputadosScreen() {
  // Ordena os deputados por nome em ordem alfabética
  const deputadosOrdenados = deputados.sort((a, b) => a.nome.localeCompare(b.nome));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deputados</Text>

      <FlatList
        data={deputadosOrdenados} // Passando a lista ordenada
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <View style={styles.fotoContainer}>
              <Image source={{ uri: item.foto }} style={styles.foto} />
            </View>
            <View>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.partido}>{item.partido}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001f3f',
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  fotoContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  foto: {
    width: 56,
    height: 60,
    borderRadius: 30,
  },
  nome: {
    color: '#222',
    fontSize: 16,
    fontWeight: 'bold',
  },
  partido: {
    color: '#555',
    fontSize: 14,
    marginTop: 4,
  },
});
