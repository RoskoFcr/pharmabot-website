document.addEventListener('DOMContentLoaded', () => {

    // --- Dati del Tutorial (v5 - Final Logic) ---
    const tutorialSteps = [
        {
            message: "<strong>Salva i dati una volta, usali per sempre.</strong><br><br>Dimentica di dover ridigitare tutto ogni volta. Inserisci i tuoi dati anagrafici una sola volta. Pharmabot li ricorderà per te, <em>in totale sicurezza.</em>",
            video: "#mascot-video-1",
            effect: () => {
                const h1 = document.createElement('div'); h1.className = 'effect-element effect-step-1-highlight';
                h1.style.cssText = 'top: 22.5%; animation-delay: 0.5s;';
                const h2 = document.createElement('div'); h2.className = 'effect-element effect-step-1-highlight';
                h2.style.cssText = 'top: 33.5%; animation-delay: 1.0s;';
                return [h1, h2];
            }
        },
        {
            message: "Invia le ricette, <strong>come vuoi tu.</strong><br><br>Digita, incolla o <em>scatta una foto.</em> Bastano pochi secondi per aggiungere i codici delle tue ricette elettroniche.",
            video: "#mascot-video-2",
            effect: () => {
                const h1 = document.createElement('div'); h1.className = 'effect-element effect-step-2-icon-highlight';
                h1.style.cssText = 'top: 65%; left: 9%; width: 40%; height: 8%; animation-delay: 0.5s;';
                const h2 = document.createElement('div'); h2.className = 'effect-element effect-step-2-icon-highlight';
                h2.style.cssText = 'top: 65%; left: 51%; width: 40%; height: 8%; animation-delay: 1.0s;';
                return [h1, h2];
            }
        },
        {
            message: "<strong>Scegli la tua farmacia</strong> e personalizza.<br><br>Seleziona la tua farmacia di fiducia dall'elenco. Hai bisogno di un <em>farmaco generico</em> o hai altre preferenze? Aggiungi una nota.",
            video: "#mascot-video-3",
            effect: () => {
                const h1 = document.createElement('div'); h1.className = 'effect-element effect-step-3-selector-highlight';
                h1.style.cssText = 'top: 36.5%; left: 8.5%; width: 83%; height: 8.5%; animation-delay: 0.5s;';
                const h2 = document.createElement('div'); h2.className = 'effect-element';
                h2.style.cssText = 'top: 50.5%; left: 8.5%; width: 83%; height: 15%;';
                const text = document.createElement('div'); text.className = 'effect-step-3-notes-text';
                text.textContent = 'NOTE PER IL FARMACISTA'; text.style.animationDelay = '1.5s';
                h2.appendChild(text);
                return [h1, h2];
            }
        },
        {
            message: "<strong>Un ultimo controllo e via!</strong><br><br>Rivedi il riepilogo della tua richiesta. È tutto corretto? Con un semplice tocco, la tua farmacia riceverà l'ordine. Ti avviseremo noi <em>quando sarà tutto pronto.</em>",
            video: "#mascot-video-4",
            effect: () => {
                const h1 = document.createElement('div'); h1.className = 'effect-element effect-step-4-button-highlight';
                h1.style.cssText = 'top: 88%; left: 8.5%; width: 83%; height: 9.5%;';
                return [h1];
            }
        }
    ];

    // --- Selezione Elementi DOM ---
    const mascotContainer = document.getElementById('mascot-container');
    const tutorialMessage = document.getElementById('tutorial-message');
    const phoneScreen = document.getElementById('phone-screen');
    const phoneScreenContainer = document.getElementById('phone-screen-container');
    const prevButton = document.getElementById('prev-step');
    const nextButton = document.getElementById('next-step');
    const currentStepNumber = document.getElementById('current-step-number');

    let currentStep = 0;

    // --- Funzione Principale di Aggiornamento ---
    function updateTutorialStep(stepIndex) {
        const oldStepIndex = currentStep;
        currentStep = stepIndex;

        const stepData = tutorialSteps[stepIndex];
        const oldStepData = tutorialSteps[oldStepIndex] || tutorialSteps[0];

        // Gestione video
        const currentVideo = document.querySelector(stepData.video);
        const oldVideo = document.querySelector(oldStepData.video);
        if (currentVideo !== oldVideo) {
            oldVideo.classList.remove('active');
            oldVideo.pause(); oldVideo.currentTime = 0;
        }
        currentVideo.classList.add('active');
        currentVideo.play().catch(() => {});

        // Gestione effetti
        const oldEffects = phoneScreenContainer.querySelectorAll('.effect-element');
        oldEffects.forEach(el => el.remove());
        const newEffects = stepData.effect();
        newEffects.forEach(el => phoneScreenContainer.appendChild(el));

        // Gestione messaggio con fade-in
        tutorialMessage.classList.remove('active');
        void tutorialMessage.offsetWidth;
        tutorialMessage.innerHTML = stepData.message;
        tutorialMessage.classList.add('active');

        // Gestione immagine telefono
        const imageMap = { 1: 'dati anagrafici', 2: 'dati ricette', 3: 'note e preferenze', 4: 'riepilogo' };
        const imageIndex = stepData.video.charAt(stepData.video.length - 1);
        phoneScreen.src = `../assets/images/${imageMap[imageIndex]}.jpg`;

        // Gestione UI navigazione
        currentStepNumber.innerText = stepIndex + 1;
        prevButton.disabled = stepIndex === 0;
        nextButton.disabled = stepIndex === tutorialSteps.length - 1;
    }

    function goToNextStep() {
        if (currentStep < tutorialSteps.length - 1) {
            updateTutorialStep(currentStep + 1);
        }
    }

    function goToPrevStep() {
        if (currentStep > 0) {
            updateTutorialStep(currentStep - 1);
        }
    }

    // --- Event Listeners ---
    nextButton.addEventListener('click', goToNextStep);
    prevButton.addEventListener('click', goToPrevStep);
    mascotContainer.addEventListener('click', goToNextStep);

    // --- Inizializzazione ---
    updateTutorialStep(0);
});
