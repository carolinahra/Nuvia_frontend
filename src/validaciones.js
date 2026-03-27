// Nuvia_frontend-main/assets/js/validaciones.js

document.addEventListener("DOMContentLoaded", function() {

    // VALIDACIÓN FORMULARIO DE CONTACTO
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            let isValid = true;
            const name = document.getElementById('contact-name-field').value.trim();
            const email = document.getElementById('contact-email-field').value.trim();
            const subject = document.getElementById('contact-subject-field').value.trim();
            const message = document.getElementById('contact-message-field').value.trim();

            // Expresión regular para validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (name.length < 2) {
                alert('Por favor, introduce tu nombre (mínimo 2 caracteres).');
                isValid = false;
            }
            if (!emailRegex.test(email)) {
                alert('Por favor, introduce un correo electrónico válido.');
                isValid = false;
            }
            if (subject.length < 3) {
                alert('Por favor, introduce un asunto (mínimo 3 caracteres).');
                isValid = false;
            }
            if (message.length < 10) {
                alert('El mensaje debe tener al menos 10 caracteres.');
                isValid = false;
            }

            if (!isValid) {
                e.preventDefault(); // Detiene el envío del formulario si hay errores
            }
        });
    }

    // VALIDACIÓN FORMULARIO DE LOGIN
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            let isValid = true;
            const email = document.getElementById('login-email-field').value.trim();
            const password = document.getElementById('login-password-field').value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email)) {
                alert('Por favor, introduce un correo electrónico válido.');
                isValid = false;
            }
            if (password.length < 6) {
                alert('La contraseña debe tener al menos 6 caracteres.');
                isValid = false;
            }

            if (!isValid) {
                e.preventDefault();
            }
        });
    }
});
