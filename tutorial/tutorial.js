document.addEventListener('DOMContentLoaded', () => {

    // --- Audio Elements ---
    const bionicSound = new Audio('../assets/audio/bionic-transition.mp3');
    const typingSound = new Audio('../assets/audio/typing-sound.mp3');
    bionicSound.volume = 0.3;
    typingSound.volume = 0.4;
    // Flag per prevenire la riproduzione audio prima dell'interazione dell'utente, come richiesto dai browser
    let canPlaySound = false;
    document.body.addEventListener('click', () => { canPlaySound = true; }, { once: true });


    // --- Dati del Tutorial (Nuova versione più dinamica) ---
    const tutorialSteps = [
        {
            message: "Ciao! Sono il tuo assistente Pharmabot.<strong> Ti mostro un trucco.</strong>.. Inserisci i tuoi dati <span class=\"highlight-green\">una sola volta</span>.. Mai più un modulo da ricompilare.. <em>Sicuro e veloce.</em>",
            video: "#mascot-video-1",
            effect: () => {
                const checkmark = document.createElement('div');
                checkmark.className = 'effect-element effect-checkmark-icon';
                checkmark.innerHTML = `<svg viewBox="0 0 52 52"><path fill="none" stroke="#14b8a6" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" d="M14 27l5.917 4.917L38 18"/></svg>`;
                return [checkmark];
            }
        },
        {
            message: "Ora le ricette.<strong> Scrivi, incolla, o scatta una foto.</strong>.. È questione di un attimo.. Pochi tap e sono già pronte per la <span class=\"highlight-green\">tua farmacia</span>.",
            video: "#mascot-video-2",
            effect: () => {
                const icon1 = document.createElement('div');
                icon1.className = 'effect-element effect-recipe-icon';
                icon1.style.cssText = 'top: 65%; left: 15%; animation-delay: 1.5s;';
                icon1.innerHTML = `<svg width="32" height="32" fill="none" stroke="#0d9488" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>`; // Pen

                const icon2 = document.createElement('div');
                icon2.className = 'effect-element effect-recipe-icon';
                icon2.style.cssText = 'top: 65%; left: 50%; transform: translateX(-50%); animation-delay: 1.7s;';
                icon2.innerHTML = `<svg width="32" height="32" fill="none" stroke="#0d9488" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>`; // Paste

                const icon3 = document.createElement('div');
                icon3.className = 'effect-element effect-recipe-icon';
                icon3.style.cssText = 'top: 65%; right: 15%; animation-delay: 1.9s;';
                icon3.innerHTML = `<svg width="32" height="32" fill="none" stroke="#0d9488" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>`; // Camera

                return [icon1, icon2, icon3];
            }
        },
        {
            message: "Quale farmacia preferisci?.<strong> Sceglila dalla mappa.</strong>.. Hai delle richieste?. Scrivi una <span class=\"highlight-green\">nota per il farmacista</span>.. <em>Chiedi un generico, se vuoi.</em>",
            video: "#mascot-video-3",
            effect: () => {
                const pin = document.createElement('div');
                pin.className = 'effect-element effect-map-pin';
                pin.innerHTML = `<svg width="60" height="60" viewBox="0 0 24 24" fill="#ef4444"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`;
                return [pin];
            }
        },
        {
            message: "Ci siamo quasi!.<strong> Controlla il riepilogo.</strong>.. Se è tutto ok, <span class=\"highlight-green\">invia</span>.. La farmacia riceve l'ordine all'istante.. E io? Ti avviso quando i farmaci sono pronti. <em>Semplice, no?</em>",
            video: "#mascot-video-4",
            effect: () => {
                const glow = document.createElement('div');
                glow.className = 'effect-element effect-send-button-glow';

                const swoosh = document.createElement('div');
                swoosh.className = 'effect-element effect-send-swoosh';
                swoosh.innerHTML = `<svg width="50" height="50" fill="none" stroke="#14b8a6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 20-6z"/></svg>`; // Paper plane

                return [glow, swoosh];
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
    let isTyping = false;

    // --- Funzione Typewriter ---
    function typewriter(element, text, duration, callback) {
        isTyping = true;
        element.innerHTML = '';
        text = text.replace(/\.\./g, '.<br>'); // Interpreta .. come punto, pausa e a capo

        const visibleTextLength = text.replace(/<[^>]*>/g, '').length;
        const charSpeed = duration / visibleTextLength; // Calcola la velocità dinamicamente
        const sentencePause = 500; // ms

        let i = 0;

        function type() {
            if (i >= text.length) {
                isTyping = false;
                if (callback) callback();
                return;
            }

            let char = text.charAt(i);
            let timeout = charSpeed;

            if (char === '<') {
                let tag = '';
                while (i < text.length && text.charAt(i) !== '>') {
                    tag += text.charAt(i++);
                }
                tag += '>';
                element.innerHTML += tag;
                timeout = 0; // Nessun ritardo per i tag
            } else {
                element.innerHTML += char;
                if (char !== ' ' && canPlaySound) {
                    typingSound.currentTime = 0;
                    typingSound.play().catch(() => {});
                }
            }

            if (char === '.' || char === '?' || char === '!') {
                 timeout = sentencePause;
            }

            i++;
            setTimeout(type, timeout);
        }
        type();
    }

    // --- Funzione Principale di Aggiornamento ---
    function updateTutorialStep(stepIndex) {
        if (isTyping) return; // Non cambiare step mentre sta scrivendo

        const oldStepIndex = currentStep;
        currentStep = stepIndex;

        const stepData = tutorialSteps[stepIndex];
        const oldStepData = tutorialSteps[oldStepIndex] || tutorialSteps[0];

        if (canPlaySound) {
            bionicSound.currentTime = 0;
            bionicSound.play().catch(() => {});
        }

        // Gestione video (transizione fluida)
        const currentVideo = document.querySelector(stepData.video);
        const oldVideo = document.querySelector(oldStepData.video);
        if (currentVideo !== oldVideo) {
            oldVideo.classList.remove('active');
            // Ritarda la pausa per una transizione migliore
            setTimeout(() => {
                oldVideo.pause(); oldVideo.currentTime = 0;
            }, 400);
        }
        currentVideo.classList.add('active');
        currentVideo.play().catch(() => {});

        // Gestione effetti (saranno rivisti nel prossimo step)
        const oldEffects = phoneScreenContainer.querySelectorAll('.effect-element');
        oldEffects.forEach(el => el.remove());
        const newEffects = stepData.effect();
        newEffects.forEach(el => phoneScreenContainer.appendChild(el));

        // Gestione messaggio con typewriter
        tutorialMessage.style.opacity = 1; // Assicura che sia visibile
        typewriter(tutorialMessage, stepData.message, 3000, null); // 3000ms = 3 secondi

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
