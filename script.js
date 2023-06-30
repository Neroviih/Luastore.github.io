// Script.js
$(document).ready(function() {
  // ... (código existente)
  
  // Função para filtrar os itens
  function filterItems() {
    const searchValue = $("#searchInput").val().toLowerCase();
    const items = $(".content");
    
    // Esconde todos os itens
    items.hide();
    
    // Filtra os itens que correspondem à pesquisa
    const filteredItems = items.filter(function() {
      const itemName = $(this).find("h3").text().toLowerCase();
      return itemName.includes(searchValue);
    });
    
    // Mostra os itens filtrados
    filteredItems.show();
    
    // Esconde o carrinho e mostra o botão "Voltar para todos os itens"
    $("#cartIcon").show();
    $("#cartContent").hide();
    $("#filteredItems").show();
  }
  
  // Evento de clique no botão de procurar
  $("#searchBut").on("click", function(event) {
    event.preventDefault();
    filterItems();
  });
  
  // Evento de clique no botão "Voltar para todos os itens"
  $("#backToAllItemsButton").on("click", function() {
    // Limpa o campo de pesquisa
    $("#searchInput").val("");
    // Reexibe todos os itens e oculta o botão "Voltar para todos os itens"
    $(".content").show();
    $("#filteredItems").hide();
  });  
});

// Função para adicionar um item ao carrinho
function addToCart(item) {
  const cartBody = document.getElementById("cartBody");

  // Cria uma nova linha na tabela do carrinho
  const newRow = document.createElement("tr");

  // Cria as células para o item, o preço e a checkbox
  const itemCell = document.createElement("td");
  const priceCell = document.createElement("td");
  const checkboxCell = document.createElement("td");

  // Define o conteúdo das células
  itemCell.textContent = item.name;
  priceCell.textContent = "R$" + item.price.toFixed(2);

  // Cria a checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  // Adiciona a checkbox à célula
  checkboxCell.appendChild(checkbox);

  // Adiciona as células à linha
  newRow.appendChild(itemCell);
  newRow.appendChild(priceCell);
  newRow.appendChild(checkboxCell);

  // Adiciona a linha à tabela do carrinho
  cartBody.appendChild(newRow);
}

// Função para remover itens selecionados do carrinho
function removeSelectedItems() {
  const cartBody = document.getElementById("cartBody");

  // Obtém todas as linhas da tabela do carrinho
  const rows = cartBody.getElementsByTagName("tr");

  // Percorre as linhas em ordem reversa para evitar problemas com a remoção
  for (let i = rows.length - 1; i >= 0; i--) {
    const row = rows[i];

    // Verifica se a checkbox da linha está selecionada
    const checkbox = row.getElementsByTagName("input")[0];
    if (checkbox.checked) {
      // Remove a linha
      cartBody.removeChild(row);
    }
  }
}

// Função para finalizar a compra
function checkout() {
  const cartBody = document.getElementById("cartBody");

  // Verifica se há itens no carrinho
  if (cartBody.hasChildNodes()) {
    alert("Compra finalizada. Obrigado!");
    // Limpa o carrinho
    while (cartBody.firstChild) {
      cartBody.removeChild(cartBody.firstChild);
    }
    
    // Redirecionar para o WhatsApp
    window.location.href = "https://api.whatsapp.com/send?phone=5513991559353";
  } else {
    alert("O carrinho está vazio. Adicione itens antes de finalizar a compra.");
  }
}

// Função para fechar o carrinho
function closeCart() {
  const cartContent = document.getElementById("cartContent");
  cartContent.style.display = "none";
}

// Função para exibir o carrinho
function showCart() {
  const cartContent = document.getElementById("cartContent");
  cartContent.style.display = "block";
}

// Obtém os botões relevantes e adiciona os eventos
document.addEventListener("DOMContentLoaded", function() {
  const addToCartButtons = document.getElementsByClassName("addToCartButton");
  const removeButton = document.getElementById("removeButton");
  const checkoutButton = document.getElementById("checkoutButton");
  const cartCloseButton = document.getElementById("cartCloseButton");
  const cartIcon = document.getElementById("cartIcon");

  for (let i = 0; i < addToCartButtons.length; i++) {
    const button = addToCartButtons[i];
    button.addEventListener("click", function() {
      const item = {
        name: this.parentNode.getElementsByTagName("h3")[0].textContent,
        price: parseFloat(this.parentNode.getElementsByTagName("h6")[0].textContent.replace("R$", ""))
      };
      addToCart(item);
    });
  }

  removeButton.addEventListener("click", removeSelectedItems);
  checkoutButton.addEventListener("click", checkout);
  cartCloseButton.addEventListener("click", closeCart);
  cartIcon.addEventListener("click", showCart);
});
