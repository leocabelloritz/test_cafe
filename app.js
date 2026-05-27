let temporizadorActual = null;

function iniciarTemporizador() {
    const selector = document.getElementById('metodo');
    const valor = parseInt(selector.value);
    const display = document.getElementById('temporizador');
    const boton = document.querySelector('button');

    // Solo para Prensa Francesa, haremos dos pasos: 30s y el resto
    let pasos = (valor === 240) ? [30, 210] : [valor]; 
    let pasoActual = 0;

    boton.disabled = true;

    function ejecutarPaso() {
        if (pasoActual >= pasos.length) {
            boton.disabled = false;
            alert("¡Café listo para servir!");
            return;
        }

        let segundos = pasos[pasoActual];
        
        temporizadorActual = setInterval(() => {
            let min = Math.floor(segundos / 60);
            let seg = segundos % 60;
            display.innerHTML = `Paso ${pasoActual + 1}: ${min}:${seg < 10 ? '0' : ''}${seg}`;

            if (segundos <= 0) {
                clearInterval(temporizadorActual);
                pasoActual++;
                if (pasoActual < pasos.length) {
                    alert("¡Tiempo de espera terminado! Ahora completa con el agua.");
                    ejecutarPaso(); // Inicia el siguiente paso
                } else {
                    boton.disabled = false;
                    alert("¡Tu café está listo!");
                }
            }
            segundos--;
        }, 1000);
    }

    ejecutarPaso();
}
