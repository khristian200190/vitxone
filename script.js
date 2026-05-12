const form = document.querySelector('.contact-form');

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('¡Gracias! Tu mensaje ha sido enviado. Nos pondremos en contacto contigo pronto.');
    form.reset();
  });
}
