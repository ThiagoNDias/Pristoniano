// app.js

// 1. Função para carregar Navbar e Footer
function carregarComponentes() {
    // Usamos caminhos sem a barra inicial para o GitHub Pages entender que é na mesma pasta
    fetch('navbar.html')
        .then(response => {
            if (!response.ok) throw new Error("Erro ao carregar navbar");
            return response.text();
        })
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
            marcarLinkAtivo(); // Destaca a página atual
            
            // Após carregar a navbar, garante que o ícone do tema esteja correto
            const temaAtual = localStorage.getItem('theme') || 'dark';
            updateIcon(temaAtual);
        })
        .catch(err => console.error("Falha na Navbar:", err));

    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(err => console.error("Falha no Footer:", err));
}

// 2. Função para marcar qual página está aberta no menu
function marcarLinkAtivo() {
    // Pega o nome do arquivo atual (ex: habilidades.html)
    let path = window.location.pathname.split("/").pop();
    
    // Se estiver na raiz (vazio), assume index.html
    if (path === "") path = "index.html";

    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        // Verifica se o href do link contém o nome da página atual
        if (link.getAttribute('href') === path || link.getAttribute('href').includes(path)) {
            link.classList.add('active');
            link.classList.add('fw-bold');
        }
    });
}

// 3. Funções de Tema (Globais)
window.alternarTema = function() {
    const htmlElement = document.documentElement;
    const currentTheme = htmlElement.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
};

function updateIcon(theme) {
    const themeIcon = document.getElementById('themeIcon');
    const themeToggle = document.getElementById('themeToggle');
    
    // Se o componente ainda não foi carregado pelo fetch, sai da função
    if (!themeIcon || !themeToggle) return;

    if (theme === 'dark') {
        themeIcon.className = 'bi bi-sun-fill';
        themeToggle.style.color = '#ffc107';
    } else {
        themeIcon.className = 'bi bi-moon-stars-fill';
        themeToggle.style.color = '#4e342e';
    }
}

// 4. Inicia tudo ao abrir a página
document.addEventListener('DOMContentLoaded', () => {
    // Corrigido: definimos a variável e aplicamos o tema imediatamente
    const temaParaAplicar = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-bs-theme', temaParaAplicar);
    
    carregarComponentes();
});