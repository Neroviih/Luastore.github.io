// obtem a referencia dos elementos HTML
const searchInput = document.getElementById('searchInput');
const gallery = document.getElementById('gallery');

//Obtém os itens originais da lista
const originalItems = Array.from(gallery.getElementsByClassName('content'));

//Adiciona um evento de input á barra de pesquisa
searchInput.addEventListener('input', function(){
    const searchTerm = searchInput.value.toLowerCase();;

    //Filtra os itens com base no termo de pesquisa
    const filteredItems = originalItems.filter(function(item){
        const itemName = item.getElementsByTagName('h3')[0].textContent.toLowerCase();
        return itemName.includes(searchTerm);
    });

    //Remove todos os itens da galeria 
    while(gallery.firstChild) {
        gallery.removeChild(gallery.firstChild);
    }

    //Adiciona os itens filtrados à galeria
    filteredItems.forEach(function(item){
        gallery.appendChild(item);
    });

});

