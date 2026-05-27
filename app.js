// Variable global para guardar el ID del temporizador
let temporizadorActual = null;

function iniciarTemporizador() {
    // 1. Si ya había un temporizador corriendo, lo apagamos
    if (temporizadorActual !== null) {
        clearInterval(temporizadorActual);
    }

    const selector = document.getElementById('metodo');
    let segundos = parseInt(selector.value); 
    const display = document.getElementById('temporizador');
    
    // 2. Guardamos el nuevo intervalo en nuestra variable global
    temporizadorActual = setInterval(() => {
        let min = Math.floor(segundos / 60);
        let seg = segundos % 60;
        
        display.innerHTML = `${min}:${seg < 10 ? '0' : ''}${seg}`;
        
        if (segundos <= 0) {
            clearInterval(temporizadorActual);
            temporizadorActual = null; // Reiniciamos el estado
            alert("¡Tu café está listo!");
            navigator.vibrate([1000, 500, 1000]);
        }
        segundos--;
    }, 1000);
}
