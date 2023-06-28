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
    // Corrige o retorno para a página padrão já que o botão se encontra dentro do formulário.
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


class Cart {
  constructor() {
    this.cartItems = [];
    this.cartBody = document.getElementById('cartBody');
    this.checkoutButton = document.getElementById('checkoutButton');
    this.removeButton = document.getElementById('removeButton');
    this.initialize();
  }

  initialize() {
    const addToCartButtons = document.getElementsByClassName('addToCartButton');
    for (const button of addToCartButtons) {
      button.addEventListener('click', () => this.addToCart(button.parentElement, true));
    }

    this.checkoutButton.addEventListener('click', () => this.checkout());
    this.removeButton.addEventListener('click', () => this.removeSelectedItems());
  }

  addToCart(item) {
    const itemName = item.querySelector('h3').textContent;
    const itemPrice = item.querySelector('h6').textContent;

    const newRow = this.cartBody.insertRow();

    const nameCell = newRow.insertCell();
    const priceCell = newRow.insertCell();
    const checkboxCell = newRow.insertCell();

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'productCheckbox';
    checkboxCell.appendChild(checkbox);

    nameCell.innerHTML = itemName;
    priceCell.innerHTML = itemPrice;

    const cartItem = {
      name: itemName,
      price: itemPrice,
      row: newRow // Armazena a referência da linha na tabela para remover posteriormente
    };

    this.cartItems.push(cartItem);
  }

  renderCartItem(cartItem) {
    const cartRow = document.createElement('tr');
    const itemNameCell = document.createElement('td');
    const itemPriceCell = document.createElement('td');
    const checkboxCell = document.createElement('td');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'productCheckbox';
    checkboxCell.appendChild(checkbox);

    itemNameCell.textContent = cartItem.name;
    itemPriceCell.textContent = cartItem.price;

    cartRow.appendChild(itemNameCell);
    cartRow.appendChild(itemPriceCell);
    cartRow.appendChild(checkboxCell);

    cartItem.row = cartRow; // Armazena a referência da linha na tabela para remover posteriormente

    this.cartBody.appendChild(cartRow);
  }

  checkout() {
    let message = 'Olá, estou interessado nos seguintes itens: \n\n';

    const cartItems = Array.from(this.cartBody.getElementsByTagName('tr'));

    cartItems.forEach(function(cartItem) {
      const itemName = cartItem.querySelector('td:first-child').textContent;
      const itemPrice = cartItem.querySelector('td:nth-child(2)').textContent;

      message += itemName + ' - ' + itemPrice + '\n';
    });

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = 'https://api.whatsapp.com/send?phone=5513991559353&text=' + encodedMessage;

    window.open(whatsappURL);
  }

  removeSelectedItems() {
    const checkboxes = document.getElementsByClassName('productCheckbox');
    const checkboxesArray = Array.from(checkboxes);
    const selectedItems = [];

    checkboxesArray.forEach(function(checkbox, index) {
      if (checkbox.checked) {
        selectedItems.push(index);
      }
    });

    selectedItems.reverse().forEach((index) => {
      const cartItem = this.cartItems[index];
      this.cartItems.splice(index, 1);
      cartItem.row.remove();
    });
  }
}

const cart = new Cart();
