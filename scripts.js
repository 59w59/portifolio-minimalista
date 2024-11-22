// 1. Interatividade das Habilidades (Hard Skills)
const hardSkillRatings = document.querySelectorAll('.rating span');

hardSkillRatings.forEach((span, index, allSpans) => {
  span.addEventListener('click', () => {
    allSpans.forEach((s, i) => {
      if (i <= index) {
        s.classList.add('filled'); // Preenche até o índice clicado
      } else {
        s.classList.remove('filled'); // Remove preenchimento depois do índice
      }
    });
  });
});

// 2. Animação ao Rolar a Página
const animatedElements = document.querySelectorAll('.animate-on-scroll');

const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

const handleScrollAnimation = () => {
  animatedElements.forEach((element) => {
    if (isInViewport(element)) {
      element.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', handleScrollAnimation);

// 3. Filtro de Categorias no Portfólio
const categoryFilters = document.querySelectorAll('.filter');
const portfolioItems = document.querySelectorAll('.portfolio-item');

categoryFilters.forEach((filter) => {
  filter.addEventListener('click', () => {
    // Remover a classe "active" de todos os botões
    categoryFilters.forEach((btn) => btn.classList.remove('active'));
    // Adicionar a classe "active" ao botão clicado
    filter.classList.add('active');

    // Filtrar os itens do portfólio
    const filterCategory = filter.getAttribute('data-filter');
    portfolioItems.forEach((item) => {
      if (filterCategory === 'all' || item.getAttribute('data-category') === filterCategory) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// 4. Efeito de Scroll Suave para âncoras
const anchorLinks = document.querySelectorAll('a[href^="#"]');

anchorLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 50, // Ajuste para o espaçamento do cabeçalho fixo
        behavior: 'smooth',
      });
    }
  });
});

document.querySelector('.contact-form').addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Enviar os dados para o backend na Vercel
  fetch("api/send-email.js", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, message }),
  })
    .then((response) => {
      if (response.ok) {
        console.log('Mensagem enviada com sucesso!');
        const notification = document.getElementById('notification');
        notification.classList.add('visible');
        setTimeout(() => {
          notification.classList.remove('visible');
        }, 3000);
      } else {
        console.error('Erro ao enviar mensagem.');
      }
    })
    .catch((error) => console.error('Erro:', error));

  // Reseta o formulário
  event.target.reset();
});
