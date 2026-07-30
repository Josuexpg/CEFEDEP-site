// Variables de estado
let preguntasActuales = [];
let indiceActual = 0;
let tiempoRestante = 7200; // 2 horas en segundos

function iniciarSimulador() {
    // 1. Mezclar todas las preguntas del banco
    preguntasActuales = bancoPreguntas.sort(() => 0.5 - Math.random());
    
    // 2. Seleccionar las primeras 100 (opcional, puedes usar las 1500)
    preguntasActuales = preguntasActuales.slice(0, 100);
    
    mostrarPregunta();
    iniciarReloj();
}

function mostrarPregunta() {
    const data = preguntasActuales[indiceActual];
    const qContainer = document.getElementById('question');
    const oContainer = document.getElementById('options');
    const meta = document.getElementById('meta');

    // Actualizar Meta datos
    meta.innerText = `PREGUNTA ${indiceActual + 1} DE ${preguntasActuales.length}`;

    // Mostrar Texto
    qContainer.innerText = data.pregunta;

    // Limpiar y mostrar opciones
    oContainer.innerHTML = '';
    data.opciones.forEach((opt, index) => {
        const div = document.createElement('div');
        div.className = 'option';
        div.innerText = `${String.fromCharCode(65 + index)}) ${opt}`;
        div.onclick = () => seleccionarOpcion(div);
        oContainer.appendChild(div);
    });
}

function seleccionarOpcion(elemento) {
    document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
    elemento.classList.add('selected');
}

function nextQuestion() {
    if (indiceActual < preguntasActuales.length - 1) {
        indiceActual++;
        mostrarPregunta();
    } else {
        alert("Has llegado al final del simulador.");
    }
}

function prevQuestion() {
    if (indiceActual > 0) {
        indiceActual--;
        mostrarPregunta();
    }
}

function iniciarReloj() {
    const clock = document.getElementById('clock');
    const interval = setInterval(() => {
        let horas = Math.floor(tiempoRestante / 3600);
        let minutos = Math.floor((tiempoRestante % 3600) / 60);
        let segundos = tiempoRestante % 60;

        clock.innerText = `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
        
        if (tiempoRestante <= 0) {
            clearInterval(interval);
            alert("Tiempo agotado");
        }
        tiempoRestante--;
    }, 1000);
}

// Arrancar cuando cargue la página
window.onload = iniciarSimulador;