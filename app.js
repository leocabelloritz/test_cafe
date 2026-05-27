function iniciarTemporizador() {
    // 1. Obtenemos el elemento del menú
    const selector = document.getElementById('metodo');
    
    // 2. Obtenemos los segundos elegidos (convertidos a número)
    let segundos = parseInt(selector.value); 
    
    const display = document.getElementById('temporizador');
    
    // 3. Iniciamos el contador
    let intervalo = setInterval(() => {
        let min = Math.floor(segundos / 60);
        let seg = segundos % 60;
        
        display.innerHTML = `${min}:${seg < 10 ? '0' : ''}${seg}`;
        
        if (segundos <= 0) {
            clearInterval(intervalo);
            alert("¡Tu café está listo!");
            navigator.vibrate([1000, 500, 1000]);
        }
        segundos--;
    }, 1000);
}
