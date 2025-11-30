# meu-checklist-tarefas-mvp

4ª Entrega trabalho PUC-Rio, CCE Extensão - Engenharia de Software (Michelle Rodrigues - Matricula 10914039709)

Para entender o Contexto:
--colocar aqui a documentação da entrega md, dessa última entrega

Veja a apresentação do site em: <<VÍDEO APRESENTAÇÃO>>

instruções de uso:

Para a integração com a api externa de login do google, foi necessário instalar um certificado local, pois requer o uso de https na origem da requisição da api.
Sendo assim, é necessário executar localmente os passos a seguir

1 - Instalar o Chocolatey (Chocolatey é um gerenciador de pacotes para Windows, tipo "Play Store" para programas.)
Vantagens:

✅ Automático: Baixa e instala tudo corretamente
✅ Atualizações: Fácil atualizar depois
✅ PATH configurado: Programa fica disponível em qualquer terminal
✅ Seguro: Baixa da fonte oficial

1.1 - Para verificar se você já tem ele instalado
    Abra o cmd como admin: 
	> choco --version
	
1.2 - Caso vc não tenha ele instalado (executar no cmd, como admin)
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "[System.Net.ServicePointManager]::SecurityProtocol = 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"

(fique tranquilo, se vc já tiver instalado, esse comando não sobrescreverá a instalação existente)

2 - Criar Certificate Authority (CA) local com mkcert:

2.1 - Para verificar se você já tem o mkcert instalado

	> mkcert --version	
	
2.2 - Instalar o mkcert 
(O mkcert é uma ferramenta que cria certificados SSL/TLS válidos localmente para desenvolvimento. Ele basicamente "engana" seu navegador fazendo ele acreditar que https://localhost é um site seguro)

	> choco install mkcert
	
2.3 - Crie a Certificate Authority (CA) local:

	2.3.1 - abra o cmd como admin
	2.3.2 - navegue até a raiz do website
	
	> cd C:\Users\Mica Rodrigues\MICA\meu-checklist-tarefas\meu-checklist-tarefas-app
	> mkcert -install
	
	(mensagem de confirmação:The local CA is now installed in the system trust store! ⚡️)
	
2.3 - Gere o certificado para uso do https em localhost: 

	> mkcert localhost 127.0.0.1 ::1
	
	!!!Fique atento, pois como todo certificado tem uma validade, ao ser criado esse certificado o mkcert informará a validade. No meu caso, como estou fazendo essa documentação do zero em 29/11/2025, o meu vencerá em 29/02/2028)
	O Certificado criado: "./localhost+2.pem" e a chave: "./localhost+2-key.pem" na raiz do projeto

	2.3.1 - Para verificar a validade de um certificado:
	!!!Fique atento, pois como todo certificado tem uma validade, ao ser criado esse certificado o mkcert informará a validade. No meu caso, como estou fazendo essa documentação do zero em 29/11/2025, o meu vencerá em 29/02/2028)

		2.3.1.1 - Para verificar se você já tem o openssl instalado
			> openssl --version
		
		2.3.1.2 - Instalar o openssl 
			> choco openssl -install
		
		
		2.3.1.3 - Abrir o certificado criado pelo mkcert e ver a sua validade
			> openssl x509 -in "localhost+2.pem" -text -noout | findstr "Not"
		
		Você verá algo assim:
				Not Before: Nov 29 08:35:29 2025 GMT
				Not After : Feb 29 08:35:29 2028 GMT
			
		2.3.1.4 Para renovar:
			> mkcert -uninstall && mkcert -install && mkcert localhost 127.0.0.1 ::1
			
			
2.4 - Com o certificado criado, vamos usar um servidor local HTTPS, para isso, será necessário instalar 2 ferramentas:
      Node.js (para abir arquivos direto no 'computador', servidor local)
	  Express: uma biblioteca facilitadora para trabalar com servidores web
	
	  2.4.1 - Verificar a instalação do Node.js
			> node --version
			> npm --version
			
			2.4.1.1 - Caso necessite instalar:
				> choco install nodejs
				
	  2.4.2 - Verificar a instalação do Express
			> npm Express --version
						
			2.4.2.1 - Caso necessite instalar: (na pasta do projeto)
				> npm install express

	2.4.1 - Executar o servidor criado (server.js) [A PORTA LIBERADA DO LOGIN DO GOOGLE É 8000]
				> node server.js


2.5 - Executar o servidor https através do node
	
	2.5.1 - Navegue até a raiz do projeto, cmd
	
	> cd C:\Users\Mica Rodrigues\MICA\meu-checklist-tarefas\meu-checklist-tarefas-app

	2.5.1 - Para criar o package json (registro de dependências do o projeto node (com valores default))
	> npm init -y			

	2.5.2 - Instalar a ferramenta Express
	> npm install express
	
	
	2.5.2 - Executar servidor
	> node server.js
	
	
	














===============> revisar de acordo com as entregas anteriores, pois tivemos ideação etc...


## Apresentação Aplicativo

[MeuCheckLisTarefas-Apresentação.pptx](https://github.com/user-attachments/files/19722216/MeuCheckLisTarefas-Apresentacao.pptx)

## Telas Aplicativo (futuro)

![fluxo_completo](https://github.com/user-attachments/assets/beb3dc38-6277-4e82-adb0-34020c4abcc3)


## Expectativa x MVP (Frontend entregue - versão web)

1 - Tela de Login

![image](https://github.com/user-attachments/assets/14a04544-b879-4313-ae9b-ddd055b5ec07)

2 - Tela de Cadastro

![image](https://github.com/user-attachments/assets/50331b2b-1c65-4eee-abd9-7d54ca6ed842)

3 - Tela de Questionário

![image](https://github.com/user-attachments/assets/695a4bb0-f08a-40db-a35c-200f0d52e426)

4 - Painel do Usuário

![image](https://github.com/user-attachments/assets/9ce0493c-f579-4547-a79f-141c56a75b9e)


## Frontend entregue - versão web

1 - Para executar:
  ```
    > git clone https://github.com/michellerodrigues/meu-checklist-tarefas-app.git
    > cd meu-checklist-tarefas-app/front
    > python -m http.server 8005
  ```
    
    
2 - Estrutura de Pastas
```text
./front
├── cadastro.css
├── cadastro.html
├── index.css
├── index.html
├── painelUsuario.css
├── painelUsuario.html
├── questionario.css
├── questionario.html
├── readme.md
├── js/
│   ├── index.js
│   ├── painelUsuario.js
│   ├── questionario.js
│   ├── script-cadastro.js
│   ├── scripts.js


```



OBRIGADA POR LER ATÉ AQUI!!!! :)
