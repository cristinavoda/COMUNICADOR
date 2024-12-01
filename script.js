// Función para esperar a que las voces estén disponibles
function loadVoices() {
    return new Promise((resolve) => {
        const synth = window.speechSynthesis;
        let voices = synth.getVoices();

        if (voices.length > 0) {
            resolve(voices);
        } else {
            synth.onvoiceschanged = () => {
                voices = synth.getVoices();
                resolve(voices);
            };
        }
    });
}

// Función para reproducir texto, manejando cancelaciones previas
async function speak(text) {
    const synth = window.speechSynthesis;
    const voices = await loadVoices();

    if (voices.length === 0) {
        alert('No se encontraron voces disponibles.');
        return;
    }

    // Cancelar cualquier discurso previo
    synth.cancel();

    // Configurar el mensaje
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.voice = voices.find((voice) => voice.lang === 'es-ES') || voices[0];

    // Esperar un momento antes de hablar para garantizar fluidez
    setTimeout(() => synth.speak(utterance), 100);
}

// Manejar clic en botones
document.getElementById('no-button').addEventListener('click', () => {
    speak('No');
});

document.getElementById('si-button').addEventListener('click', () => {
    speak('Sí');
});document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const text = button.getAttribute('data-text');
        const msg = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(msg);
    });
});

