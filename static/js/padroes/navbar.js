document.write(`
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-dark" id="mainNav">
      <div class="container">
        <a class="navbar-brand" href="index.html"></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive"
          aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          Menu
          <i class="fas fa-bars ms-1"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="#" onclick="irParaAreaUsuario()">Área Usuario</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" onclick="irParaCardapio()">Cardapio</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" onclick="irParaCarrinho()">Carrinho</a>
            </li>
            <li class = "nav-item">
              <a class = "nav-link" href = "#" onclick = "irParaCadastroRefeicao()">Cadastro Refeição</a>
            </li>
            <li class = "nav-item">
              <a class = "nav-link" href = "#" onclick = "irParaCadastroCupom()">Cadastro Cupom</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `);
