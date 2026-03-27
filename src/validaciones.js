// Nuvia_frontend-main/assets/js/validaciones.js

document.addEventListener("DOMContentLoaded", function() {
    
    // VALIDACIÓN FORMULARIO DE CONTACTO
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            let isValid = true;
            const name = document.getElementById('contact-name-field').value.trim();
            const email = document.getElementById('contact-email-field').value.trim();
            const message = document.getElementById('contact-message-field').value.trim();
            const subject = document.getElementById('contact-subject-field').value.trim();

            // Expresión regular para validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (name === '') {
                alert('Por favor, introduce tu nombre.');
                isValid = false;
            } else if (!emailRegex.test(email)) {
                alert('Por favor, introduce un correo electrónico válido.');
                isValid = false;
            }else if(subject === ''){
                alert('El asunto no puede estar vacío');
                isValid = false;
            } else if (message === '') {
                alert('El mensaje no puede estar vacío.');
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
            } else if (password.length < 6) {
                alert('La contraseña debe tener al menos 6 caracteres.');
                isValid = false;
            }

            if (!isValid) {
                e.preventDefault();
            }
        });
    }
});
