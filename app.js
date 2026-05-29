// --- VARIABLES GLOBALES ---
let temporizadorActual = null;
let wakeLock = null;
let esTemporizadorCorriendo = false; 

// --- FUNCIONES DE SOPORTE ---
async function solicitarWakeLock() {
    try { if ('wakeLock' in navigator) wakeLock = await navigator.wakeLock.request('screen'); } catch (err) { console.error(err); }
}

function dispararAlerta() {
    if ("vibrate" in navigator) navigator.vibrate([1000, 500, 1000]);
    if (Notification.permission === "granted") {
        new Notification("Barista Umbra", { body: "Paso terminado.", icon: "icon.png" });
    }
}

// --- LÓGICA DEL TEMPORIZADOR ---

function iniciarTemporizador() {
    const boton = document.getElementById('btn-iniciar');
    if (esTemporizadorCorriendo) { cancelarTemporizador(); return; }

    const metodo = document.getElementById('metodo').value;
    if (metodo === 'moka') {
        alert("¡Atención! Observa el flujo. Saca del fuego antes de que salga con violencia.");
        return;
    }

    if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen();
    
    esTemporizadorCorriendo = true;
    boton.innerText = "Cancelar Infusión";
    boton.style.backgroundColor = "#B22222"; 
    solicitarWakeLock();

    let pasos = CONFIG[metodo].pasos;
    let pasoActual = 0;

    function ejecutarPaso() {
        if (!esTemporizadorCorriendo) return;
        
        // Definición de display para actualizar el DOM
        const display = document.getElementById('temporizador');

        const paso = pasos[pasoActual];
        const tiempoFinal = Date.now() + (paso.tiempo * 1000);

        temporizadorActual = setInterval(() => {
            if (!esTemporizadorCorriendo) { clearInterval(temporizadorActual); return; }

            const restante = tiempoFinal - Date.now();

            if (restante <= 0) {
                clearInterval(temporizadorActual);
                dispararAlerta();
                
                // Transición con confirmación
                if (paso.nombre === "Bloom") {
                    if (!confirm("Bloom terminado, preparate para el vertido.")) { 
                        cancelarTemporizador(); 
                        return; 
                    }
                }

                pasoActual++;
                if (pasoActual < pasos.length) {
                    ejecutarPaso(); 
                } else {
                    finalizarTemporizador();
                    alert("¡Café listo para servir!");
                }
            } else {
                const seg = Math.floor((restante / 1000) % 60);
                const min = Math.floor((restante / 1000 / 60) % 60);
                // Formateo con clases CSS para evitar saltos de texto
                display.innerHTML = `<span class="nombre-paso">${paso.nombre}:</span> <span class="valor-tiempo">${min}:${seg < 10 ? '0' : ''}${seg}</span>`;
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
    if (wakeLock !== null) wakeLock.release();
    document.getElementById('btn-iniciar').innerText = "Iniciar Infusión";
    document.getElementById('btn-iniciar').style.backgroundColor = "#3B3330";
    document.getElementById('temporizador').innerHTML = "0:00";
}

// --- OTRAS FUNCIONES ---
function calcularAgua() {
    const gramos = document.getElementById('gramos').value || 0;
    const ratio = document.getElementById('ratio').value || 16;
    const res = document.getElementById('resultado-agua');
    if (res) res.innerText = `Agua necesaria: ${gramos * ratio}ml`;
}

function mostrarOpciones() {
    const metodo = document.getElementById('metodo').value;
    const div = document.getElementById('op
