// --- VARIABLES GLOBALES ---
let temporizadorActual = null;
let wakeLock = null;
let esTemporizadorCorriendo = false; 

// --- FUNCIONES DE SOPORTE ---

async function solicitarWakeLock() {
    try {
        if ('wakeLock' in navigator) {
            wakeLock = await navigator.wakeLock.request('screen');
        }
    } catch (err) {
        console.error(`${err.name}, ${err.message}`);
    }
}

function dispararAlerta() {
    if ("vibrate" in navigator) navigator.vibrate([1000, 500, 1000]);
    if (Notification.permission === "granted") {
        new Notification("Barista Umbra", {
            body: "¡El café está listo! Toca para descartar.",
            icon: "icon.png",
            requireInteraction: true,
            silent: false
        });
    }
}

// --- LÓGICA DEL TEMPORIZADOR ---

function iniciarTemporizador() {
    const boton = document.getElementById('btn-iniciar');
    
    if (esTemporizadorCorriendo) {
        cancelarTemporizador();
        return;
    }

    if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen();
    
    const metodo = document.getElementById('metodo').value;
    const configMetodo = CONFIG[metodo];
    const display = document.getElementById('temporizador');

    if (metodo === 'moka') {
        alert("¡Atención! Observa el flujo. Saca del fuego antes de que salga con violencia.");
        return;
    }

    esTemporizadorCorriendo = true;
    boton.innerText = "Cancelar Infusión";
    boton.style.backgroundColor = "#B22222"; 

    solicitarWakeLock();

    let pasos = configMetodo.pasos;
    let pasoActual = 0;

    function ejecutarPaso() {
        if (!esTemporizadorCorriendo) return;

        if (pasoActual >= pasos.length) {
            finalizarTemporizador();
            alert("¡Café listo para servir!");
            return;
        }

        const paso = pasos[pasoActual];
        const duracionMs = paso.tiempo * 1000;
        const tiempoFinal = Date.now() + duracionMs;

        temporizadorActual = setInterval(() => {
            if (!esTemporizadorCorriendo) {
                clearInterval(temporizadorActual);
                return;
            }

            const restante = tiempoFinal - Date.now();

            if (restante <= 0) {
                clearInterval(temporizadorActual);
                dispararAlerta();
                pasoActual++;
                
                if (pasoActual < pasos.length) {
                    alert(`¡${paso.nombre} terminado!`);
                    ejecutarPaso(); 
                } else {
                    finalizarTemporizador();
                    alert("¡Café listo para servir!");
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

function cancelarTemporizador() {
    esTemporizadorCorriendo = false;
    if (temporizadorActual) clearInterval(temporizadorActual);
    if (wakeLock !== null) wakeLock.release();
    
    document.getElementById('btn-iniciar').innerText = "Iniciar Infusión";
    document.getElementById('btn-iniciar').style.backgroundColor = "#3B3330";
    document.getElementById('temporizador').innerHTML = "0:00";
}

function finalizarTemporizador() {
    esTemporizadorCorriendo = false;
    document.getElementById('btn-iniciar').innerText = "Iniciar Infusión";
    document.getElementById('btn-iniciar').style.backgroundColor = "#3B3330";
    document.getElementById('temporizador').innerHTML = "0:00";
    if (wakeLock !== null) wakeLock.release();
}

// --- OTRAS FUNCIONES ---

function calcularAgua() {
    const gramos = document.getElementById('gramos').value || 0;
    const ratio = document.getElementById('ratio').value || 16;
    const resultado = document.getElementById('resultado-agua');
    if (resultado) resultado.innerText = `Agua necesaria: ${gramos * ratio}ml`;
}

function mostrarOpciones() {
    const metodo = document.getElementById('metodo').value;
    const divFrancesa = document.getElementById('opciones-francesa');
    if (divFrancesa) divFrancesa.style.display = (metodo === 'francesa') ? 'block' : 'none';
}

function toggleMenu() {
    const menu = document.getElementById('menu-lateral');
    const overlay = document.getElementById('overlay');
    menu.classList.toggle('abierto');
    overlay.style.display = menu.classList.contains('abierto') ? 'block' : 'none';
}

window.onload = () => {
    if ("Notification" in window && Notification.permission !== "granted") Notification.requestPermission();
    mostrarOpciones();
};
