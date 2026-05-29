let temporizadorActual = null;
let wakeLock = null;

// Función para solicitar que la pantalla no se apague
async function solicitarWakeLock() {
    try {
        if ('wakeLock' in navigator) {
            wakeLock = await navigator.wakeLock.request('screen');
            console.log('Wake Lock activado');
        }
    } catch (err) {
        console.error(`${err.name}, ${err.message}`);
    }
}

function dispararAlerta() {
    // 1. Intentamos vibrar (Android lo hará, iOS lo ignorará silenciosamente)
    if ("vibrate" in navigator) {
        navigator.vibrate([1000, 500, 1000]);
    }
    
    // 2. Notificación persistente
    if (Notification.permission === "granted") {
        new Notification("Barista Umbra", {
            body: "¡El café está listo! Toca para descartar.",
            icon: "icon.png", // Asegúrate de tener este archivo en la raíz
            requireInteraction: true, // La clave: no desaparece sola
            silent: false // Permite que el sistema use el sonido por defecto
        });
    }
}

function iniciarTemporizador() {
    // Solicitar pantalla completa al iniciar
if (document.documentElement.requestFullscreen){
    document.documentElement.requestFullscreen();
    }
    const metodo = document.getElementById('metodo').value;
    const configMetodo = CONFIG[metodo];
    const display = document.getElementById('temporizador');
    const boton = document.querySelector('button');

    if (metodo === 'moka') {
        alert("¡Atención! Observa el flujo. Saca del fuego antes de que salga con violencia.");
        return;
    }

    if (temporizadorActual) clearInterval(temporizadorActual);
    
    solicitarWakeLock(); // Evita que la pantalla se apague

    let pasos = configMetodo.pasos;
    let pasoActual = 0;
    boton.disabled = true;

    function ejecutarPaso() {
        if (pasoActual >= pasos.length) {
            boton.disabled = false;
            display.innerHTML = "0:00";
            if (wakeLock !== null) wakeLock.release();
            return;
        }

        const paso = pasos[pasoActual];
        const duracionMs = paso.tiempo * 1000;
        const tiempoInicio = Date.now();
        const tiempoFinal = tiempoInicio + duracionMs;

        temporizadorActual = setInterval(() => {
            const ahora = Date.now();
            const restante = tiempoFinal - ahora;

            if (restante <= 0) {
                clearInterval(temporizadorActual);
                dispararAlerta();
                pasoActual++;
                
                if (pasoActual < pasos.length) {
                    alert(`¡${paso.nombre} terminado!`);
                    ejecutarPaso(); 
                } else {
                    boton.disabled = false;
                    alert("¡Café listo para servir!");
                    display.innerHTML = "0:00";
                    if (wakeLock !== null) wakeLock.release();
                }
            } else {
                const min = Math.floor((restante / 1000 / 60) % 60);
                const seg = Math.floor((restante / 1000) % 60);
                display.innerHTML = `${paso.nombre}: ${min}:${seg < 10 ? '0' : ''}${seg}`;
            }
        }, 500);
    }

    ejecutarPaso();
}

function calcularAgua() {
    const gramos = document.getElementById('gramos').value || 0;
    const ratio = document.getElementById('ratio').value || 16;
    const resultado = document.getElementById('resultado-agua');
    if (resultado) resultado.innerText = `Agua necesaria: ${gramos * ratio}ml`;
}

function mostrarOpciones() {
    const metodo = document.getElementById('metodo').value;
    const divFrancesa = document.getElementById('opciones-francesa');
    const tempDisplay = document.getElementById('info-temperatura');
    
    if (divFrancesa) {
        divFrancesa.style.display = (metodo === 'francesa') ? 'block' : 'none';
    }
    
    const config = CONFIG[metodo];
    if (tempDisplay && config) {
        tempDisplay.innerText = `Temperatura ideal: ${config.temp}`;
    }
}
function actualizarMolienda() {
    // Por ahora, solo es una función vacía para evitar errores
    console.log("Molienda actualizada");
}
function toggleMenu() {
    const menu = document.getElementById('menu-lateral');
    const overlay = document.getElementById('overlay');
    menu.classList.toggle('abierto');
    overlay.style.display = menu.classList.contains('abierto') ? 'block' : 'none';
}

function abrirSeccion(seccion) {
    console.log("Navegando a: " + seccion);
    toggleMenu(); // Cierra el menú tras seleccionar
    // Aquí luego ocultaremos los divs que no corresponden y mostraremos el de la sección
}
window.onload = () => {
    // 1. Pedir permisos de notificación
    if ("Notification" in window && Notification.permission !== "granted") {
        Notification.requestPermission();
    }
    // 2. Mostrar opciones iniciales
    mostrarOpciones();
};

