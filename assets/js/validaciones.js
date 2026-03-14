// Nuvia_frontend-main/assets/js/validaciones.js

document.addEventListener("DOMContentLoaded", function() {
    
    // VALIDACIÓN FORMULARIO DE CONTACTO
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            let isValid = true;
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();

            // Expresión regular para validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (nombre === '') {
                alert('Por favor, introduce tu nombre.');
                isValid = false;
            } else if (!emailRegex.test(email)) {
                alert('Por favor, introduce un correo electrónico válido.');
                isValid = false;
            } else if (mensaje === '') {
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
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
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
