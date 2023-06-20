// Aguarda o evento 'DOMContentLoaded' antes de executar o código
document.addEventListener('DOMContentLoaded', function() {
    // Obtém a referência do elemento HTML da barra de pesquisa
    const searchInput = document.getElementById('searchInput');
    // Obtém a referência do elemento HTML do botão "Procurar"
    const searchButton = document.getElementById('searchBut');
    // Obtém a referência do elemento HTML da galeria
    const gallery = document.getElementById('gallery');
    // Obtém os itens originais da galeria como um array
    const originalItems = Array.from(gallery.getElementsByClassName('content'));
  
    // Função para filtrar os itens
    function filterItems() {
        // Corrige o retorno para a pagina padrão já que o botão se encontra dentro do formulario.
        event.preventDefault();
      // Obtém o termo de pesquisa digitado pelo usuário e converte para minúsculas
      const searchTerm = searchInput.value.toLowerCase();
      
      // Filtra os itens originais com base no termo de pesquisa
      const filteredItems = originalItems.filter(function(item) {
        // Obtém o nome do item (conteúdo do primeiro elemento h3 dentro do item)
        const itemName = item.getElementsByTagName('h3')[0].textContent.toLowerCase();
        // Verifica se o nome do item contém o termo de pesquisa
        return itemName.includes(searchTerm);
      });
  
      // Remove todos os itens da galeria
      while (gallery.firstChild) {
        gallery.removeChild(gallery.firstChild);
      }
  
      // Adiciona os itens filtrados de volta à galeria
      filteredItems.forEach(function(item) {
        gallery.appendChild(item);
      });
    }
  
    // Adiciona um ouvinte de eventos ao botão "Procurar" para acionar a função de filtragem quando clicado
    searchButton.addEventListener('click', filterItems);
  });
