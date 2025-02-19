// Seleciona os botões
const btnUsuario = document.getElementById('btn-usuario');
const btnAdmin = document.getElementById('btn-admin');

// Redireciona para a página do usuário
btnUsuario.addEventListener('click', () => {
  window.location.href = 'loginUsu.html'; // Substitua pelo caminho da página do usuário
});

// Redireciona para a página do administrador
btnAdmin.addEventListener('click', () => {
  window.location.href = 'loginAdm.html'; // Substitua pelo caminho da página do administrador
});