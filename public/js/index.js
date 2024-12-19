 // Menu mobile
 const mobileMenuButton = document.querySelector('.mobile-menu');
 const navLinks = document.querySelector('.nav-links');
 
 mobileMenuButton.addEventListener('click', () => {
     navLinks.classList.toggle('active');
 });
 
 
         // Animação de fade in para cards
         const cards = document.querySelectorAll('.card');
         const observer = new IntersectionObserver(
             entries => {
                 entries.forEach(entry => {
                     if (entry.isIntersecting) {
                         entry.target.style.opacity = 1;
                         entry.target.style.transform = 'translateY(0)';
                     }
                 });
             },
             { threshold: 0.1 }
         );
 
         cards.forEach(card => {
             card.style.opacity = 0;
             card.style.transform = 'translateY(20px)';
             card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
             observer.observe(card);
         });
 
         //FUNÇÃO DO CARROSSEL DE parceiros
         document.addEventListener('DOMContentLoaded', function() {
     const logosSlide = document.querySelector('.logos-slide');
     
     // Função para clonar logos e garantir animação infinita
     function duplicateLogos() {
         const logos = logosSlide.children;
         const logosArray = Array.from(logos);
         
         logosArray.forEach(logo => {
             const clone = logo.cloneNode(true);
             logosSlide.appendChild(clone);
         });
     }
     
     // Inicializar o carrossel
     duplicateLogos();
     
     // Recalcular a animação se a janela for redimensionada
     window.addEventListener('resize', function() {
         logosSlide.style.animation = 'none';
         void logosSlide.offsetWidth; // Trigger reflow
         logosSlide.style.animation = null;
     });
 });
 
 
 //coleta seletiva função activedocument.addEventListener('DOMContentLoaded', function() {
     document.addEventListener('DOMContentLoaded', function() {
     const saibaMaisBtn = document.querySelector('.saiba-mais-btn');
     const textExpanded = document.querySelector('.text-expanded');
     
     saibaMaisBtn.addEventListener('click', function() {
         textExpanded.classList.toggle('show');
         this.classList.toggle('active');
         
         // Alternar texto do botão
         const btnText = this.querySelector('.btn-text');
         btnText.textContent = textExpanded.classList.contains('show') ? 'Mostrar Menos' : 'Saiba Mais';
         
         // Se o texto estiver expandido, role suavemente até o início da seção
         if (textExpanded.classList.contains('show')) {
             const section = document.querySelector('.expandable-section');
             section.scrollIntoView({ behavior: 'smooth' });
         }
     });
 });
 
 //função do carrossel com avaliações
 document.addEventListener('DOMContentLoaded', function() {
     const track = document.querySelector('.carousel-track');
     const cards = document.querySelectorAll('.avaliacao-card');
     const prevBtn = document.querySelector('.prev-btn');
     const nextBtn = document.querySelector('.next-btn');
     const dotsContainer = document.querySelector('.carousel-dots');
     
     let currentIndex = 0;
     
     // Criar dots
     cards.forEach((_, index) => {
         const dot = document.createElement('div');
         dot.classList.add('dot');
         if (index === 0) dot.classList.add('active');
         dot.addEventListener('click', () => goToSlide(index));
         dotsContainer.appendChild(dot);
     });
     
     const dots = document.querySelectorAll('.dot');
     
     // Atualizar navegação
     function updateNavigation() {
         prevBtn.disabled = currentIndex === 0;
         nextBtn.disabled = currentIndex === cards.length - 1;
         
         dots.forEach((dot, index) => {
             dot.classList.toggle('active', index === currentIndex);
         });
     }
     
     // Ir para slide específico
     function goToSlide(index) {
         currentIndex = index;
         const offset = -100 * currentIndex;
         track.style.transform = `translateX(${offset}%)`;
         updateNavigation();
     }
     
     // Event listeners para botões
     prevBtn.addEventListener('click', () => {
         if (currentIndex > 0) {
             goToSlide(currentIndex - 1);
         }
     });
     
     nextBtn.addEventListener('click', () => {
         if (currentIndex < cards.length - 1) {
             goToSlide(currentIndex + 1);
         }
     });
     
     // Autoplay
     let autoplayInterval;
     
     function startAutoplay() {
         autoplayInterval = setInterval(() => {
             if (currentIndex < cards.length - 1) {
                 goToSlide(currentIndex + 1);
             } else {
                 goToSlide(0);
             }
         }, 5000); // Muda a cada 5 segundos
     }
     
     function stopAutoplay() {
         clearInterval(autoplayInterval);
     }
     
     // Iniciar autoplay
     startAutoplay();
     
     // Parar autoplay ao interagir
     track.addEventListener('mouseenter', stopAutoplay);
     track.addEventListener('mouseleave', startAutoplay);
 });
 
 
 
 // função para contato
 document.addEventListener('DOMContentLoaded', function() {
             const form = document.getElementById('condominioForm');
             const trajetoRadios = document.getElementsByName('trajeto');
             const pontualSection = document.getElementById('pontualSection');
             
             // Mostrar/esconder seção de pontos de coleta
             trajetoRadios.forEach(radio => {
                 radio.addEventListener('change', function() {
                     pontualSection.style.display = this.value === 'pontual' ? 'block' : 'none';
                 });
             });
             
             form.addEventListener('submit', function(e) {
                 e.preventDefault();
                 
                 // Coleta de dados do formulário
                 const formData = new FormData(form);
                 const data = Object.fromEntries(formData.entries());
                 
                 // Validação básica
                 if (!validateForm(data)) return;
                 
                 // Envio de e-mail
                 sendEmail(data);
             });
             
             function validateForm(data) {
                 const requiredFields = [
                     'condominio', 'nome', 'telefone', 'email', 'endereco', 'unidades',
                     'asfaltada', 'ruas_estreitas', 'ladeiras', 'frequencia', 'trajeto', 
                     'movimento_comunitario'
                 ];
                 
                 for (let field of requiredFields) {
                     if (!data[field]) {
                         alert(`Por favor, preencha todos os campos obrigatórios: ${field}`);
                         return false;
                     }
                 }
                 
                 if (data['trajeto'] === 'pontual' && !data['pontos_coleta']) {
                     alert('Para coleta pontual, especifique a quantidade de pontos');
                     return false;
                 }
                 
                 return true;
             }
             
             function sendEmail(data) {
                 const emailBody = `
 Formulário de Coleta de Resíduos
 
 Condomínio: ${data.condominio}
 Nome do Solicitante: ${data.nome}
 Telefone: ${data.telefone}
 E-mail: ${data.email}
 Endereço do Condomínio: ${data.endereco}
 Número de Unidades: ${data.unidades}
 
 Ruas Asfaltadas: ${data.asfaltada}
 Ruas Estreitas: ${data.ruas_estreitas}
 Possui Ladeiras: ${data.ladeiras}
 
 Frequência de Coleta: ${data.frequencia === 'outro' ? data.frequencia_outro : data.frequencia}
 Tipo de Trajeto: ${data.trajeto}
 ${data.trajeto === 'pontual' ? `Pontos de Coleta: ${data.pontos_coleta}` : ''}
 
 Associado ao Movimento Comunitário: ${data.movimento_comunitario}
 
 Observações: ${data.observacoes}
                 `;
                 
                 // Nota: Este código de envio de e-mail é um exemplo. 
                 // Na prática, você precisaria de um backend para enviar e-mails
                 window.location.href = `mailto:cooperataivaecolimpodf@gmail.com?subject=Formulário de Coleta de Resíduos&body=${encodeURIComponent(emailBody)}`;
             }
         });