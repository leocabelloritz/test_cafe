let temporizadorActual = null;

function iniciarTemporizador() {
    // 1. Si ya existe, lo eliminamos totalmente
    if (temporizadorActual) {
        clearInterval(temporizadorActual);
    }

    // 2. Desactivamos el botón para evitar pulsaciones múltiples
    const boton = document.querySelector('button');
    boton.disabled = true;

    const selector = document.getElementById('metodo');
    let segundos = parseInt(selector.value); 
    const display = document.getElementById('temporizador');
    
    // 3. Iniciamos el nuevo intervalo
    temporizadorActual = setInterval(() => {
        let min = Math.floor(segundos / 60);
        let seg = segundos % 60;
        
        display.innerHTML = `${min}:${seg < 10 ? '0' : ''}${seg}`;
        
        if (segundos <= 0) {
            clearInterval(temporizadorActual);
            temporizadorActual = null; // Reiniciamos
            boton.disabled = false;    // Reactivamos el botón
            alert("¡Tu café está listo!");
            navigator.vibrate([1000, 500, 1000]);
        }
        segundos--;
    }, 1000);
}
// Detectar cambios en el menú desplegable
document.getElementById('metodo').addEventListener('change', function() {
    const infoMolienda = document.getElementById('info-molienda');
    const valor = this.value;

    if (valor === "180") {
        infoMolienda.innerText = "Molienda: Media-Fina (como sal de mesa)";
    } else if (valor === "240") {
        infoMolienda.innerText = "Molienda: Gruesa (como sal marina)";
    } else if (valor === "90") {
        infoMolienda.innerText = "Molienda: Fina (como azúcar glass)";
    }
});
