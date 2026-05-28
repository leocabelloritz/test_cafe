let temporizadorActual = null;

function iniciarTemporizador() {
    const metodo = document.getElementById('metodo').value;
    const display = document.getElementById('temporizador');
    const boton = document.querySelector('button');

    if (metodo === 'moka') {
        alert("¡Atención! Observa el flujo. Saca del fuego antes de que salga con violencia.");
        return;
    }

    if (temporizadorActual) {
        clearInterval(temporizadorActual);
    }

    let pasos = [];
    if (metodo === 'francesa') {
        pasos = [{nombre: "Bloom", tiempo: 30}, {nombre: "Vertido", tiempo: 240}];
    } else if (metodo === 'v60') {
        pasos = [{nombre: "Infusión", tiempo: 180}];
    } else {
        pasos = [{nombre: "Infusión", tiempo: 90}]; 
    }
    
    let pasoActual = 0;
    boton.disabled = true;

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
} // Aquí termina correctamente

// Ahora las otras funciones funcionarán porque están fuera de la anterior
function calcularAgua() {
    const gramos = document.getElementById('gramos').value || 0;
    const ratio = document.getElementById('ratio').value || 16;
    const resultado = document.getElementById('resultado-agua');
    if (resultado) {
        resultado.innerText = `Agua necesaria: ${gramos * ratio}ml`;
    }
}

// Función única y corregida para mostrar opciones y temperatura
function mostrarOpciones() {
    const metodo = document.getElementById('metodo').value;
    const divFrancesa = document.getElementById('opciones-francesa');
    const tempDisplay = document.getElementById('info-temperatura');
    
    // 1. Manejo de visibilidad de las opciones extra
    if (divFrancesa) {
        divFrancesa.style.display = (metodo === 'francesa') ? 'block' : 'none';
    }
    
    // 2. Actualización de temperatura sin errores
    if (tempDisplay) {
        tempDisplay.innerText = `Temperatura ideal: ${obtenerTemperatura(metodo)}`;
    }
}

// Función auxiliar para obtener los valores
function obtenerTemperatura(metodo) {
    const temps = {
        'francesa': '92°C - 94°C',
        'v60': '90°C - 93°C',
        'aeropress': '85°C - 90°C',
        'moka': '80°C (Agua precalentada)'
    };
    return temps[metodo] || '90°C'; 
}

window.onload = function() {
    mostrarOpciones();
};
