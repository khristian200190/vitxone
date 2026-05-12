document.addEventListener('DOMContentLoaded', () => {
  const rotatingWords = ['integrales', 'seguras', 'escalables', 'inteligentes'];
  const wordElement = document.getElementById('dynamic-word');
  let wordIndex = 0;

  if (wordElement) {
    setInterval(() => {
      wordElement.classList.add('opacity-0');
      setTimeout(() => {
        wordIndex = (wordIndex + 1) % rotatingWords.length;
        wordElement.textContent = rotatingWords[wordIndex];
        wordElement.classList.remove('opacity-0');
      }, 250);
    }, 3200);
  }

  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('opacity-0', 'translate-y-8');
        entry.target.classList.add('opacity-100');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  revealElements.forEach((element) => revealObserver.observe(element));

  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const target = document.querySelector(targetId);
        if (target) {
          event.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  const progressBar = document.querySelector('.scroll-progress');
  const updateProgress = () => {
    if (!progressBar) return;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  };
  window.addEventListener('scroll', updateProgress);
  updateProgress();

  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const targetNumber = parseInt(counter.dataset.target, 10) || 0;
        let startTime = null;

        const animateCounter = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / 1600, 1);
          counter.textContent = Math.floor(progress * targetNumber);
          if (progress < 1) {
            requestAnimationFrame(animateCounter);
          } else {
            counter.textContent = targetNumber;
          }
        };

        requestAnimationFrame(animateCounter);
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach((counter) => counterObserver.observe(counter));

  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const nameInput = form.querySelector('[name="name"]');
      const emailInput = form.querySelector('[name="email"]');
      const messageInput = form.querySelector('[name="message"]');

      if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        alert('Por favor completa todos los campos antes de enviar.');
        return;
      }

      const phoneNumber = '51966363263';
      const message = `Hola, soy ${encodeURIComponent(nameInput.value.trim())}. Estoy interesado en sus servicios. Mi correo es ${encodeURIComponent(emailInput.value.trim())}. Mensaje: ${encodeURIComponent(messageInput.value.trim())}`;
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
      window.open(whatsappUrl, '_blank');
      form.reset();
    });
  }
});
