let temporizadorActual = null;

function iniciarTemporizador() {
    const metodo = document.getElementById('metodo').value;
    const display = document.getElementById('temporizador');
    const boton = document.querySelector('button');

    // 1. Definimos los pasos según el método
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

    // 2. Función interna que ejecuta la secuencia
    function ejecutarPaso() {
        if (pasoActual >= pasos.length) {
            boton.disabled = false;
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
                }
            }
            segundos--;
        }, 1000);
    }

    ejecutarPaso();
}

// Función para calcular el agua según el ratio
function calcularAgua() {
    const gramos = document.getElementById('gramos').value;
    const ratio = document.getElementById('ratio').value;
    const resultado = document.getElementById('resultado-agua');
    const aguaTotal = gramos * ratio;
    
    resultado.innerText = `Agua necesaria: ${aguaTotal}ml`;
}

// Actualizar molienda (solo si el elemento existe)
const selectorMolino = document.getElementById('molino');
if (selectorMolino) {
    selectorMolino.addEventListener('change', function() {
        const infoMolienda = document.getElementById('info-molienda');
        const tipo = this.value;
        infoMolienda.innerText = (tipo === 'manual') ? "Molienda: Manual (10-11)" : "Molienda: Eléctrico (30-35)";
    });
}
function mostrarOpciones() {
    const metodo = document.getElementById('metodo').value;
    const divFrancesa = document.getElementById('opciones-francesa');
    
    // Si elegimos francesa, mostramos el div; si no, lo ocultamos
    if (metodo === 'francesa') {
        divFrancesa.style.display = 'block';
    } else {
        divFrancesa.style.display = 'none';
    }
}
