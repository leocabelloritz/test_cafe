let temporizadorActual = null;

function iniciarTemporizador()
    const metodo = document.getElementById('metodo').value;
    const display = document.getElementById('temporizador');
    const boton = document.querySelector('button');

    // 1. Si es Moka, solo avisamos y salimos
    if (metodo === 'moka') {
        alert("¡Atención! Observa el flujo. Saca del fuego antes de que salga con violencia.");
        return;
    }

    // 2. Limpiamos cualquier temporizador previo antes de empezar
    if (temporizadorActual) {
        clearInterval(temporizadorActual);
    }

    // 3. Definimos pasos
    let pasos = [];
    if (metodo === 'francesa') {
        pasos = [{nombre: "Bloom", tiempo: 30}, {nombre: "Vertido", tiempo: 210}];
    } else if (metodo === 'v60') {
        pasos = [{nombre: "Infusión", tiempo: 180}];
    } else {
        pasos = [{nombre: "Infusión", tiempo: 90}]; // AeroPress
    }
    
    let pasoActual = 0;
    boton.disabled = true;

    // 4. Función de ejecución directa
    function ejecutarPaso() {
        if (pasoActual >= pasos.length) {
            boton.disabled = false;
            display.innerHTML = "0:00";
            return;
        }

        let paso = pasos[pasoActual];
        let segundos = paso.tiempo;
        
        temporizadorActual = setInterval(() => {
            let min = Math.floor(segundos / 60);
            let seg = segundos % 60;
            display.innerHTML = `${paso.nombre}: ${min}:${seg < 10 ? '0' : ''}${seg}`;

            if (segundos <= 0) {
                clearInterval(temporizadorActual);
                pasoActual++;
                if (pasoActual < pasos.length) {
                    alert(`¡${paso.nombre} terminado! Prepárate para el siguiente.`);
                    ejecutarPaso(); 
                } else {
                    boton.disabled = false;
                    alert("¡Café listo para servir!");
                    display.innerHTML = "0:00";
                }
            }
            segundos--;
        }, 1000);
    }

    ejecutarPaso();
}
}

// Función para calcular el agua
function calcularAgua() {
    const gramos = document.getElementById('gramos').value || 0;
    const ratio = document.getElementById('ratio').value || 16;
    const resultado = document.getElementById('resultado-agua');
    if (resultado) {
        resultado.innerText = `Agua necesaria: ${gramos * ratio}ml`;
    }
}

// Mostrar opciones solo si es francesa
function mostrarOpciones() {
    const metodo = document.getElementById('metodo').value;
    const divFrancesa = document.getElementById('opciones-francesa');
    if (divFrancesa) {
        divFrancesa.style.display = (metodo === 'francesa') ? 'block' : 'none';
    }
}

// Actualizar texto de molienda
function actualizarMolienda() {
    const infoMolienda = document.getElementById('info-molienda');
    const tipo = document.getElementById('molino').value;
    if (infoMolienda) {
        infoMolienda.innerText = (tipo === 'manual') ? "Molienda: Manual (10-11)" : "Molienda: Eléctrico (30-35)";
    }
}

// Inicialización al cargar la página
window.onload = function() {
    mostrarOpciones();
    actualizarMolienda();
};
