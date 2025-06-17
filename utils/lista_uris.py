import requests
from datetime import datetime, date

def lista_uris():
    params = {
        "dataFim": "2025-05-15",
        "codSituacao": 1303,
        "itens": 100,
        "ordem": "DESC",
        "ordenarPor": "id",
        "siglaTipo": "PL,PEC,PLP,MPV",
        "ano": "2025"
    }

    url = 'https://dadosabertos.camara.leg.br/api/v2/proposicoes'
    response = requests.get(url, params=params)
    lista_proposicoes_uris = []
    if response.status_code == 200:
        leis = response.json()
        for lei in leis['dados']:
            lista_proposicoes_uris.append(lei['uri'])
    else:
        print(f"Erro na requisição: {response.status_code}")
    
    return lista_proposicoes_uris

def filtrar_data():
    uris = lista_uris()
    lista_url_na_data = []
    data_hoje = date(2025, 5, 13)#datetime.now().date()  # Pega apenas a data (sem hora)

    for uri in uris:
        response = requests.get(uri)
        if response.status_code == 200:
            lei = response.json()
            data_api_str = lei['dados'].get('dataApresentacao')
            if data_api_str:
                try:
                    data_api = datetime.fromisoformat(data_api_str).date()
                    if data_api == data_hoje:
                        url_inteiro_teor = lei['dados'].get('urlInteiroTeor')
                        if url_inteiro_teor:  # só adiciona se existir
                            lista_url_na_data.append(url_inteiro_teor)
                except ValueError as e:
                    print(f"Erro ao converter data: {data_api_str} -> {e}")
        else:
            print(f"Erro na requisição: {response.status_code}")

    return lista_url_na_data
