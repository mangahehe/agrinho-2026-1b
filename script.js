// ===========================
// MENU RESPONSIVO
// ===========================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Abrir/fechar menu ao clicar no hamburger
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('ativo');
    hamburger.classList.toggle('ativo');
});

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('ativo');
        hamburger.classList.remove('ativo');
    });
});

// ===========================
// BOTÃO VOLTAR AO TOPO
// ===========================

const voltarTopoBtn = document.getElementById('voltarTopo');

// Mostrar/ocultar botão ao fazer scroll
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        voltarTopoBtn.classList.add('ativo');
    } else {
        voltarTopoBtn.classList.remove('ativo');
    }
});

// Voltar ao topo ao clicar no botão
voltarTopoBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===========================
// NAVEGAÇÃO SUAVE
// ===========================

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ===========================
// FORMULÁRIO DE CONTATO
// ===========================

const formContato = document.getElementById('formContato');
const mensagemSucesso = document.getElementById('mensagemSucesso');

formContato.addEventListener('submit', (e) => {
    e.preventDefault();

    // Obter valores do formulário
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const escola = document.getElementById('escola').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    // Validação básica
    if (!nome || !email || !mensagem) {
        alert('Por favor, preencha todos os campos obrigatórios!');
        return;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um email válido!');
        return;
    }

    // Simular envio (em um projeto real, isso seria enviado para um servidor)
    console.log('Formulário enviado:', {
        nome,
        email,
        escola,
        mensagem,
        data: new Date().toLocaleString('pt-BR')
    });

    // Limpar formulário
    formContato.reset();

    // Mostrar mensagem de sucesso
    mensagemSucesso.style.display = 'flex';

    // Ocultar mensagem após 5 segundos
    setTimeout(() => {
        mensagemSucesso.style.display = 'none';
    }, 5000);

    // Scroll para a mensagem de sucesso
    mensagemSucesso.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
    });
});

// ===========================
// ANIMAÇÕES AO FAZER SCROLL
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar cards
document.querySelectorAll('.sobre-card, .stat-card, .produto-item, .pratica-card, .desafio-card, .importancia-card, .contato-card').forEach(card => {
    observer.observe(card);
});

// ===========================
// CONTADOR DE ESTATÍSTICAS
// ===========================

function animarNumero(elemento, numeroFinal, duracao = 2000) {
    const numeroInicial = 0;
    const incremento = numeroFinal / (duracao / 16);
    let numeroAtual = numeroInicial;

    const intervalo = setInterval(() => {
        numeroAtual += incremento;
        if (numeroAtual >= numeroFinal) {
            numeroAtual = numeroFinal;
            clearInterval(intervalo);
        }
        elemento.textContent = Math.floor(numeroAtual).toLocaleString('pt-BR');
    }, 16);
}

// Animar números quando a seção de dados fica visível
const secaoDados = document.querySelector('.dados');
let numerosAnimados = false;

const observerDados = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !numerosAnimados) {
            numerosAnimados = true;
            
            // Animar números dos stats
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const texto = stat.textContent;
                const numero = parseInt(texto.replace(/\D/g, ''));
                if (!isNaN(numero)) {
                    animarNumero(stat, numero);
                }
            });

            // Animar números dos atendimentos
            const atendNumbers = document.querySelectorAll('.atend-number');
            atendNumbers.forEach(atend => {
                const numero = parseInt(atend.textContent.replace(/\D/g, ''));
                if (!isNaN(numero)) {
                    animarNumero(atend, numero);
                }
            });

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

if (secaoDados) {
    observerDados.observe(secaoDados);
}

// ===========================
// EFEITOS DE HOVER NOS CARDS
// ===========================

const cards = document.querySelectorAll('.sobre-card, .stat-card, .pratica-card, .desafio-card, .importancia-card, .contato-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ===========================
// DARK MODE (OPCIONAL)
// ===========================

// Verificar se o usuário prefere dark mode
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Você pode adicionar um toggle de dark mode aqui se desejar
// Por enquanto, o site usa o esquema de cores claro

// ===========================
// CARREGAMENTO DA PÁGINA
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Site Agricultura Familiar - Agrinho 2026 carregado com sucesso!');
    
    // Adicionar classe de carregamento ao body
    document.body.classList.add('carregado');
});

// ===========================
// FUNÇÕES UTILITÁRIAS
// ===========================

// Função para copiar texto para a área de transferência
function copiarParaAreaTransferencia(texto) {
    navigator.clipboard.writeText(texto).then(() => {
        alert('Texto copiado para a área de transferência!');
    }).catch(() => {
        alert('Erro ao copiar texto.');
    });
}

// Função para abrir links em nova aba
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', (e) => {
        // O navegador já abre em nova aba por padrão
    });
});

// ===========================
// RASTREAMENTO DE EVENTOS (OPCIONAL)
// ===========================

// Você pode adicionar Google Analytics ou outro serviço de rastreamento aqui
// Exemplo:
// gtag('event', 'page_view', {
//     'page_title': 'Agricultura Familiar',
//     'page_path': '/'
// });

// ===========================
// VALIDAÇÃO DE FORMULÁRIO AVANÇADA
// ===========================

const inputNome = document.getElementById('nome');
const inputEmail = document.getElementById('email');
const inputEscola = document.getElementById('escola');
const inputMensagem = document.getElementById('mensagem');

// Validar nome em tempo real
inputNome.addEventListener('blur', () => {
    if (inputNome.value.trim().length < 3) {
        inputNome.style.borderColor = '#d32f2f';
    } else {
        inputNome.style.borderColor = '#ddd';
    }
});

// Validar email em tempo real
inputEmail.addEventListener('blur', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputEmail.value)) {
        inputEmail.style.borderColor = '#d32f2f';
    } else {
        inputEmail.style.borderColor = '#ddd';
    }
});

// Validar mensagem em tempo real
inputMensagem.addEventListener('blur', () => {
    if (inputMensagem.value.trim().length < 10) {
        inputMensagem.style.borderColor = '#d32f2f';
    } else {
        inputMensagem.style.borderColor = '#ddd';
    }
});

// ===========================
// MODO ACESSIBILIDADE
// ===========================

// Aumentar tamanho da fonte com Ctrl + (ou Cmd + no Mac)
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === '+') {
        e.preventDefault();
        const fontSize = parseFloat(window.getComputedStyle(document.body).fontSize);
        document.body.style.fontSize = (fontSize + 2) + 'px';
    }
});

// Diminuir tamanho da fonte com Ctrl - (ou Cmd - no Mac)
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === '-') {
        e.preventDefault();
        const fontSize = parseFloat(window.getComputedStyle(document.body).fontSize);
        if (fontSize > 12) {
            document.body.style.fontSize = (fontSize - 2) + 'px';
        }
    }
});

// ===========================
// SUPORTE A TECLADO
// ===========================

// Permitir navegação com Tab e Enter
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const activeElement = document.activeElement;
        if (activeElement.classList.contains('btn')) {
            activeElement.click();
        }
    }
});

// ===========================
// DETECÇÃO DE CONEXÃO
// ===========================

// Verificar se o usuário está online
window.addEventListener('online', () => {
    console.log('Conexão restaurada!');
});

window.addEventListener('offline', () => {
    console.log('Conexão perdida!');
    alert('Você está offline. Algumas funcionalidades podem não estar disponíveis.');
});

// ===========================
// PERFORMANCE
// ===========================

// Lazy loading de imagens (se houver)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('carregada');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===========================
// INICIALIZAÇÃO
// ===========================

console.log('JavaScript carregado e pronto para uso!');
console.log('Tema: Agro forte, futuro sustentável: equilíbrio entre produção e meio ambiente');
