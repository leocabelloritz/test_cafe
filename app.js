let temporizadorActual = null;

function iniciarTemporizador() {
    const selector = document.getElementById('metodo');
    const valor = parseInt(selector.value);
    const display = document.getElementById('temporizador');
    const boton = document.querySelector('button');

    // Definimos los pasos con nombre y tiempo (en segundos)
    let pasos = (valor === 240) 
        ? [{nombre: "Bloom", tiempo: 30}, {nombre: "Vertido", tiempo: 210}] 
        : [{nombre: "Infusión", tiempo: valor}];
    
    let pasoActual = 0;
    boton.disabled = true;

    function ejecutarPaso() {
        if (pasoActual >= pasos.length) {
            boton.disabled = false;
            alert("¡Tu café está listo!");
            return;
        }

        let paso = pasos[pasoActual];
        let segundos = paso.tiempo;
        
        temporizadorActual = setInterval(() => {
            let min = Math.floor(segundos / 60);
            let seg = segundos % 60;
            // Mostramos el nombre del paso en lugar de "Paso 1"
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

// Actualizar molienda cuando cambie el molino
document.getElementById('molino').addEventListener('change', function() {
    const infoMolienda = document.getElementById('info-molienda');
    const tipo = this.value;
    
    if (tipo === 'manual') {
        infoMolienda.innerText = "Molienda Prensa: Ajuste Manual a 10-11";
    } else {
        infoMolienda.innerText = "Molienda Prensa: Ajuste Eléctrico a 30-35";
    }
});
