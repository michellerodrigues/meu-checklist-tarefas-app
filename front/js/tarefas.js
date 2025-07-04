document.addEventListener("DOMContentLoaded", function() {
    console.log("O documento está pronto! scripts tarefas");

    // Abrir modal
    document.getElementById('openModal').onclick = function() {
        document.getElementById('taskModal').style.display = 'block';
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
    
    // Simular carregamento de categorias (substitua por chamada AJAX real)
    document.addEventListener('DOMContentLoaded', function() {
        // Simulando categorias do banco de dados
        const categories = [
            {id: 1, name: 'Trabalho'},
            {id: 2, name: 'Estudo'},
            {id: 3, name: 'Casa'},
            {id: 4, name: 'Lazer'},
            {id: 5, name: 'Plantas'}
        ];
        
        const categorySelect = document.getElementById('category');
        categories.forEach(function(category) {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });
    });
    
    // Manipular envio do formulário
    document.getElementById('taskForm').onsubmit = function(e) {
        e.preventDefault();
        
        // Capturar valores do formulário
        const taskName = document.getElementById('taskName').value;
        const recurrence = document.getElementById('recurrence').value;
        const categoryId = document.getElementById('category').value;
        
        // Aqui você faria a chamada AJAX para salvar no banco de dados
        console.log('Tarefa a ser salva:', {
            descricao: taskName,
            recorrencia: recurrence,
            categoria_id: categoryId
        });
        
        // Fechar modal e limpar formulário
        document.getElementById('taskModal').style.display = 'none';
        this.reset();
        
        // Mostrar mensagem de sucesso (opcional)
        alert('Tarefa salva com sucesso!');
    };

});