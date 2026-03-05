// 1. Função para carregar Navbar e Footer
function carregarComponentes() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
            marcarLinkAtivo(); // Chama a função de acender o link
            const temaSalvo = localStorage.getItem('theme') || 'dark';
            updateIcon(temaSalvo); // Garante que o ícone sol/lua esteja certo
        });

    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });
}

// 2. Função para marcar qual página está aberta no menu
function marcarLinkAtivo() {
    const path = window.location.pathname.split("/").pop() || "index.html";
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        if (link.getAttribute('href') === path) {
            link.classList.add('active');
            link.classList.add('fw-bold');
        }
    });
}

// 3. Funções de Tema (Globais para serem vistas pelo navbar.html)
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
    if (!themeIcon) return;

    if (theme === 'dark') {
        themeIcon.className = 'bi bi-sun-fill';
        themeToggle.style.color = '#ffc107';
    } else {
        themeIcon.className = 'bi bi-moon-stars-fill';
        themeToggle.style.color = '#4e342e';
    }
}

// Inicia tudo ao abrir a página
document.addEventListener('DOMContentLoaded', () => {
    const temaInicial = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-bs-theme', temaInitial);
    carregarComponentes();
});