// Funciones de utilidad para colores
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getContrastColor(hexColor) {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    
    const lightColors = [
        '#000000', // Negro
        '#1a237e', // Azul oscuro
        '#4a148c', // Púrpura oscuro
        '#b71c1c', // Rojo oscuro
        '#1b5e20', // Verde oscuro
        '#880e4f'  // Rosa oscuro
    ];
    
    const darkColors = [
        '#ffffff', // Blanco
        '#e3f2fd', // Azul claro
        '#f3e5f5', // Púrpura claro
        '#ffebee', // Rojo claro
        '#e8f5e9', // Verde claro
        '#fce4ec'  // Rosa claro
    ];
    
    return brightness > 128 ? 
        lightColors[Math.floor(Math.random() * lightColors.length)] : 
        darkColors[Math.floor(Math.random() * darkColors.length)];
}

function rgbToHex(rgb) {
    const rgbValues = rgb.match(/\d+/g);
    return '#' + rgbValues.map(x => {
        const hex = parseInt(x).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
}

// Funciones para el menú móvil
function initializeMobileMenu() {
    const menuButton = document.getElementById('menuButton');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Funciones para el cambio de colores
function initializeColorChanger() {
    const changeColorBtn = document.getElementById('changeColor');
    const colorMenu = document.getElementById('colorMenu');
    const changeBgBtn = document.getElementById('changeBgBtn');
    const changeTextBtn = document.getElementById('changeTextBtn');

    if (!changeColorBtn || !colorMenu || !changeBgBtn || !changeTextBtn) return;

    // Mostrar/ocultar menú al hacer clic en el botón de configuración
    changeColorBtn.addEventListener('click', (e) => {
        e.preventDefault();
        colorMenu.classList.toggle('hidden');
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!changeColorBtn.contains(e.target)) {
            colorMenu.classList.add('hidden');
        }
    });

    // Cambiar solo el fondo al hacer clic en el botón
    changeBgBtn.addEventListener('click', () => {
        const newBgColor = getRandomColor();
        document.body.style.backgroundColor = newBgColor;
        colorMenu.classList.add('hidden');
    });

    // Cambiar solo el color del texto al hacer clic en el botón
    changeTextBtn.addEventListener('click', () => {
        const currentBgColor = window.getComputedStyle(document.body).backgroundColor;
        const newTextColor = getContrastColor(rgbToHex(currentBgColor));
        
        const textElements = document.querySelectorAll('h1, h2, h3, p, li, a, button, input, textarea');
        textElements.forEach(element => {
            element.style.color = newTextColor;
        });
        
        colorMenu.classList.add('hidden');
    });
}

// Inicialización de EmailJS (solo para About.html)
function initializeEmailJS() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init("4WCAuPotcl23Zl9V4");
        
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                const formData = new FormData(this);
                const email = formData.get('email');
                
                // Datos para el correo que recibirás tú
                const dataToYou = {
                    from_name: `${formData.get('name')} ${formData.get('lastname')}`,
                    from_email: email,
                    phone: formData.get('phone'),
                    message: formData.get('message'),
                    to_name: "Admin", // Nombre del destinatario
                    to_email: "tu_correo@ejemplo.com" // Reemplaza con tu correo real
                };

                // Datos para el correo de confirmación al usuario
                const dataToUser = {
                    to_name: formData.get('name'),
                    to_email: email,
                    from_name: "Admin",
                    from_email: "gerjack92@gmail.com", // Reemplaza con tu correo real
                    message: `Gracias por contactarnos ${formData.get('name')}. Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.`
                };
                
                try {
                    // Enviar correo a ti
                    const response1 = await emailjs.send(
                        'service_a6xn1lb',
                        'template_yjbevse',
                        dataToYou
                    );

                    // Enviar correo de confirmación al usuario
                    const response2 = await emailjs.send(
                        'service_a6xn1lb',
                        'template_c6mdiyf',
                        dataToUser
                    );
                    
                    if (response1.status === 200 && response2.status === 200) {
                        alert('Mensaje enviado con éxito');
                        this.reset();
                    } else {
                        alert('Error al enviar el mensaje');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('Error al enviar el mensaje: ' + error.text);
                }
            });
        }
    }
}

// Inicializar todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    initializeMobileMenu();
    initializeColorChanger();
    initializeEmailJS();
});
