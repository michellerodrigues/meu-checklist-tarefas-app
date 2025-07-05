import { carregarTarefasUsuario } from './scripts.js';
import { carregarRecorrenciaTarefas } from './scripts.js';
import { carregarCategoriasParaNovaTarefa } from './scripts.js';


document.addEventListener("DOMContentLoaded", function() {
    console.log("O documento está pronto: painel Usuário!");
    carregarTarefasUsuario(); 

    document.getElementById('logoutBtn').addEventListener('click', function() {
        window.location.href = '.././index.html';      
    });

    //Tarefas.js ==> modularizar se der tempo
    document.getElementById('abrirModalNovaTarefa').onclick = function() {
        document.getElementById('taskModal').style.display = 'block';
        carregarRecorrenciaTarefas();
    }

     // Fechar modal
    document.getElementsByClassName('close')[0].onclick = function() {
        document.getElementById('taskModal').style.display = 'none';
    }
    
    // Fechar modal ao clicar fora
    window.onclick = function(event) {
        if (event.target == document.getElementById('taskModal')) {
            document.getElementById('taskModal').style.display = 'none';
        }
    }
    
    const taskNameInput = document.getElementById('taskName');

    taskNameInput.addEventListener('blur', function(event) {

        const nomeTarefa = this.value.trim()

        if (nomeTarefa !== '') {
            console.log('usuário acabou de preencher a tarefa',nomeTarefa);            
            carregarCategoriasParaNovaTarefa(nomeTarefa)
        }
    });

    try{
        // Manipular envio do formulário
        document.getElementById('taskForm').onsubmit = async function(e) {
                e.preventDefault();        
                // Capturar valores do formulário
                const nomeTarefa = document.getElementById('taskName').value;
                const recorrenciaIdTarefa = document.getElementById('recorrenciaSelect').value;
                const categoriaIdSelecionada = document.getElementById('categoriaSelect').value;

                //TODO: futuramenta associar ao banco as hashtags do usuário, uma vez que ele não precisou responder ao questionário para criar a mesma
                const tagsTarefa = '["#criadaPeloUsuario"]' 

                console.log('Tarefa a ser salva:', {
                    descricao: nomeTarefa,
                    recorrencia: recorrenciaIdTarefa,
                    categoria_id: categoriaIdSelecionada
                });

                const responseTarefaCriada = await fetch('http://127.0.0.1:8002/api/tarefas', {
                    mode: 'cors', 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        descricao: nomeTarefa,
                        categoria_id: categoriaIdSelecionada,
                        recorrencia_id: recorrenciaIdTarefa,
                        tags: tagsTarefa
                    })

                    //TODO: criei uma pergunta "Usuário deseja criar novas tarefas?" (1)
                    //Se ele disser sim (opção 39), vamos incluir a hashtag ['#CriadaPeloUsuario']
                    //ao receber uma nova tarefa, teremos que adicionar ao questionário respondido dele essa resposta
                    //A opção "Sim" opção 39 da pergunta 1 
                    //Assim, a nova tarefa dele vai aparecer na cagegoria certinha
                    //TODO: recarregar o painel do usuário depois de uma nova inserção de tarefa
                });

                if (responseTarefaCriada.ok) {
                    alert('Tarefa criada com sucesso!');
                                       
                    // Fechar modal e limpar formulário             
                    document.getElementById('taskModal').style.display = 'none';
                    this.reset();                
                    window.location.href = '.././painelUsuario.html';
                } else {
                    throw new Error('Falha ao enviar respostas');
                }
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao enviar suas respostas. Tente novamente.');
        }
      //fim tarefa.js
});