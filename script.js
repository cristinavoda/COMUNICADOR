
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


async function speak(text) {
    const synth = window.speechSynthesis;
    const voices = await loadVoices();

    if (voices.length === 0) {
        alert('No se encontraron voces disponibles.');
        return;
    }

    
    synth.cancel();

    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.voice = voices.find((voice) => voice.lang === 'es-ES') || voices[0];

    
    setTimeout(() => synth.speak(utterance), 100);
}


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

