let segundos = 180; // Ejemplo: 3 minutos para tu café

function iniciarTemporizador() {
    const display = document.getElementById('temporizador');
    let intervalo = setInterval(() => {
        let min = Math.floor(segundos / 60);
        let seg = segundos % 60;
        display.innerHTML = `${min}:${seg < 10 ? '0' : ''}${seg}`;
        
        if (segundos <= 0) {
            clearInterval(intervalo);
            alert("¡Tu café está listo!");
            navigator.vibrate([1000, 500, 1000]); // Vibración de aviso
        }
        segundos--;
    }, 1000);
}
