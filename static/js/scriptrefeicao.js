// Variável global para armazenar as refeições
let refeicoes = [];

// Função para carregar e exibir as refeições
async function carregarRefeicoes() {
  try {
    // Carrega os dados da API Flask
    const response = await fetch('/obterRefeicoes');
    if(!response.ok){
      throw new Error("Erro ao carregar refeições: " + response.statusText);
    }
    
    refeicoes = await response.json();
    console.log('Dados recebidos:', refeicoes);
    // Preenche o select box com as categorias
    preencherCategorias();

    // Exibe todas as refeições inicialmente
    exibirRefeicoes(refeicoes);

    // Adiciona evento de mudança ao select box
    document.getElementById('categoria').addEventListener('change', filtrarPorCategoria);
  } catch (error) {
    console.error('Erro ao carregar as refeições:', error);
  }
}

// Função para preencher o select box com as categorias
function preencherCategorias() {
  const selectCategoria = document.getElementById('categoria');

  // Obtém todas as categorias únicas
  const categorias = [...new Set(refeicoes.map(refeicao => refeicao.Categoria))];

  // Adiciona as opções ao select box
  categorias.forEach(categoria => {
    const option = document.createElement('option');
    option.value = categoria;
    option.textContent = categoria;
    selectCategoria.appendChild(option);
  });
}

// Função para exibir as refeições
function exibirRefeicoes(refeicoesExibidas) {
  const refeicoesContainer = document.getElementById('refeicoes-container');
  refeicoesContainer.innerHTML = ''; // Limpa o container

  // Itera sobre cada refeição e cria um card para ela
  refeicoesExibidas.forEach(refeicao => {
    const card = document.createElement('div');
    card.className = 'col-md-4 mb-4'; // Classes do Bootstrap para layout

    card.innerHTML = `
      <div class="card">
        <img src="${refeicao.url_foto}" class="card-img-top" alt="${refeicao.Nome}">
        <div class="card-body">
          <h5 class="card-title">${refeicao.nome}</h5>
          <p class="card-text">${refeicao.descricao}</p>
          <p class="card-text"><strong>R$ ${refeicao.preco}</strong></p>
          <button class="btn btn-primary btn-adicionar" data-id="${refeicao.id_refeicao}">Adicionar ao Carrinho</button>
        </div>
      </div>
    `;

    refeicoesContainer.appendChild(card);
  });
}

// Função para filtrar as refeições por categoria
function filtrarPorCategoria() {
  const categoriaSelecionada = document.getElementById('categoria').value;

  if (categoriaSelecionada === 'Todas') {
    exibirRefeicoes(refeicoes); // Exibe todas as refeições
  } else {
    // Filtra as refeições pela categoria selecionada
    const refeicoesFiltradas = refeicoes.filter(refeicao => refeicao.Categoria === categoriaSelecionada);
    exibirRefeicoes(refeicoesFiltradas);
  }
}

// Chama a função para carregar as refeições quando a página carregar
document.addEventListener('DOMContentLoaded', carregarRefeicoes);