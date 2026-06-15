from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup
import json
import os
import time

def rodar_scraper():
    print("Iniciando o navegador para interagir com os elementos...")
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        url = "https://viacaoplaneta-es.com.br/destinos-e-horarios/"
        print(f"Navegando até: {url}")
        
        try:
            page.goto(url, wait_until="networkidle")
            print("Página carregada!")
            
            select_selector = "select" 
            
            # Aguarda o elemento select estar visível na tela
            page.wait_for_selector(select_selector)
            
            # 2. Executa um JS no navegador para pegar o value e o texto de todas as opções válidas
            print("Mapeando opções do combobox...")
            lista_rotas = page.evaluate("""
                () => {
                    const options = Array.from(document.querySelectorAll('select option'));
                    return options
                        .map(opt => ({ value: opt.value, nome_rota: opt.textContent.trim() }))
                        .filter(opt => opt.value && opt.value !== "");
                }
            """)
            
            # Filtra no Python para garantir que só fiquem as cidades que nos interessam
            lista_rotas = [
                r for r in lista_rotas 
                if any(cidade in r['nome_rota'].lower() for cidade in ['vitoria', 'piuma', 'anchieta', 'guarapari', 'marataizes'])
            ]
            
            print(f"Encontradas {len(lista_rotas)} rotas relevantes para raspar.")
            
            dados_finais = []
            
            # 3. Loop de Interação (O restante do código continua igual abaixo)
            for index, rota in enumerate(lista_rotas):
                print(f"[{index + 1}/{len(lista_rotas)}] Selecionando: {rota['nome_rota']}")
                
                # Faz o Playwright selecionar a opção no combobox pelo 'value'
                page.select_option(select_selector, value=rota['value'])
                
                # Espera um tempinho curto para o JavaScript do site renderizar os horários na tela
                time.sleep(1.5)
                
                # Captura o HTML atualizado do bloco onde os horários aparecem
                html_atualizado = page.content()
                soup_dinamico = BeautifulSoup(html_atualizado, 'html.parser')
                
                # Vamos extrair o texto limpo da página após a seleção
                texto_pagina = soup_dinamico.get_text()
                linhas = [l.strip() for l in texto_pagina.split('\n') if l.strip()]
                
                horarios_encontrados = []
                dias_funcionamento = "Não identificado"
                
                # Varre o texto procurando o bloco de horários que apareceu
                for idx, linha in enumerate(linhas):
                    linha_minuscula = linha.lower()
                    
                    if "segunda" in linha_minuscula or "diariamente" in linha_minuscula or "sábado" in linha_minuscula:
                        dias_funcionamento = linha
                        
                        # Vamos pegar as próximas 11 linhas para caçar padrões de hora
                        for k in range(1, 12):
                            if idx + k < len(linhas):
                                possivel_horario = linhas[idx + k]
                                # Verifica se a linha tem formato de hora (ex: 06:40 ou 18:30)
                                if ":" in possivel_horario and len(possivel_horario) <= 8:
                                    horarios_encontrados.append(possivel_horario)
                        break
                
                dados_finais.append({
                    "rota": rota['nome_rota'],
                    "dias": dias_funcionamento,
                    "horarios": horarios_encontrados
                })
            
            # 4. Salva tudo estruturado no JSON
            caminho_json = os.path.join(os.path.dirname(__file__), 'horarios_planeta.json')
            with open(caminho_json, 'w', encoding='utf-8') as f:
                json.dump(dados_finais, f, ensure_ascii=False, indent=4)
                
            print(f"\n[SUCESSO] O arquivo JSON foi alimentado com os cliques! Salvo em: {caminho_json}")
            
        except Exception as e:
            print(f"Erro durante a automação de cliques: {e}")
        finally:
            browser.close()
            print("\nNavegador fechado.")

if __name__ == "__main__":
    run_code = rodar_scraper()