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

// Función para inicializar el menú móvil
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileColorBtn = document.getElementById('mobileColorBtn');
    const mobileColorMenu = document.getElementById('mobileColorMenu');

    if (mobileMenuBtn && mobileMenu) {
        // Toggle menú móvil
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            // Cerrar menú de colores si está abierto
            if (mobileColorMenu) {
                mobileColorMenu.classList.add('hidden');
            }
        });

        // Cerrar menú al hacer clic en enlaces
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });

        // Toggle menú de colores móvil
        if (mobileColorBtn && mobileColorMenu) {
            mobileColorBtn.addEventListener('click', (e) => {
                e.preventDefault();
                mobileColorMenu.classList.toggle('hidden');
            });
        }
    }
}

// Función para inicializar el menú de colores
function initColorMenu() {
    // Desktop color menu
    const desktopColorBtn = document.getElementById('desktopColorBtn');
    const desktopColorMenu = document.getElementById('desktopColorMenu');
    const desktopChangeBgBtn = document.getElementById('desktopChangeBgBtn');
    const desktopChangeTextBtn = document.getElementById('desktopChangeTextBtn');

    // Mobile color menu
    const mobileChangeBgBtn = document.getElementById('mobileChangeBgBtn');
    const mobileChangeTextBtn = document.getElementById('mobileChangeTextBtn');

    // Función para cambiar color de fondo
    function changeBackgroundColor() {
        const newColor = getRandomColor();
        document.body.style.backgroundColor = newColor;
        // Cerrar menús de colores
        if (desktopColorMenu) desktopColorMenu.classList.add('hidden');
        if (mobileColorMenu) mobileColorMenu.classList.add('hidden');
    }

    // Función para cambiar color de texto
    function changeTextColor() {
        const currentBg = window.getComputedStyle(document.body).backgroundColor;
        const newTextColor = getContrastColor(rgbToHex(currentBg));
        
        const textElements = document.querySelectorAll('h1, h2, h3, p, li, a, button, input, textarea');
        textElements.forEach(element => {
            element.style.color = newTextColor;
        });
        
        // Cerrar menús de colores
        if (desktopColorMenu) desktopColorMenu.classList.add('hidden');
        if (mobileColorMenu) mobileColorMenu.classList.add('hidden');
    }

    // Desktop color menu handlers
    if (desktopColorBtn && desktopColorMenu) {
        desktopColorBtn.addEventListener('click', (e) => {
            e.preventDefault();
            desktopColorMenu.classList.toggle('hidden');
        });

        if (desktopChangeBgBtn) {
            desktopChangeBgBtn.addEventListener('click', changeBackgroundColor);
        }

        if (desktopChangeTextBtn) {
            desktopChangeTextBtn.addEventListener('click', changeTextColor);
        }
    }

    // Mobile color menu handlers
    if (mobileChangeBgBtn) {
        mobileChangeBgBtn.addEventListener('click', changeBackgroundColor);
    }

    if (mobileChangeTextBtn) {
        mobileChangeTextBtn.addEventListener('click', changeTextColor);
    }

    // Cerrar menús al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (desktopColorMenu && !desktopColorBtn.contains(e.target) && !desktopColorMenu.contains(e.target)) {
            desktopColorMenu.classList.add('hidden');
        }
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
                    name: `${formData.get('name')} ${formData.get('lastname')}`,
                    email: email,
                    phone: formData.get('phone'),
                    message: formData.get('message'),
                    reply_to: email
                };

                // Datos para el correo de confirmación al usuario
                const dataToUser = {
                    name: formData.get('name'),
                    email: email,
                    message: `Gracias por contactarnos ${formData.get('name')}. Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.`
                };
                
                try {
                    // Enviar correo a ti
                    const response1 = await emailjs.send(
                        'service_a6xn1lb',
                        'template_yjbevse',
                        dataToYou,
                        "4WCAuPotcl23Zl9V4"
                    );

                    // Enviar correo de confirmación al usuario
                    const response2 = await emailjs.send(
                        'service_a6xn1lb',
                        'template_c6mdiyf',
                        dataToUser,
                        "4WCAuPotcl23Zl9V4"
                    );
                    
                    if (response1.status === 200 && response2.status === 200) {
                        alert('Mensaje enviado con éxito');
                        this.reset();
                    } else {
                        alert('Error al enviar el mensaje');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('Error al enviar el mensaje');
                }
            });
        }
    }
}

// Inicializar todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initColorMenu();
    initializeEmailJS();
});
