import requests
import json

from models import Deputado, db
def lista_deputados():
    url = 'https://dadosabertos.camara.leg.br/api/v2/deputados'
    response = requests.get(url)
    
    if response.status_code == 200:
        dados_json = response.json()['dados']  # <- Corrigido aqui!
        for deputado in dados_json:
            novo_deputado = Deputado(
                deputado_id=deputado['id'],
                deputado_nome=deputado['nome'],
                deputado_partido=deputado['siglaPartido'],
                deputado_estado=deputado['siglaUf'],
                deputado_foto=deputado['urlFoto']
            )
            db.session.add(novo_deputado)
        
        db.session.commit()  # Mova para fora do loop para performance!
    else:
        print(f"Erro na requisição: {response.status_code}")
