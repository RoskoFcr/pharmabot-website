document.addEventListener('DOMContentLoaded', () => {

    // --- Audio Elements ---
    const bionicSound = new Audio('../assets/audio/bionic-transition.mp3');
    const typingSound = new Audio('../assets/audio/typing-sound.mp3');
    bionicSound.volume = 0.3;
    typingSound.volume = 0.4;
    let canPlaySound = true;

    // Funzione per abilitare l'audio al primo tocco/click
    function enableAudio() {
        canPlaySound = true;
        document.body.removeEventListener('click', enableAudio);
        document.body.removeEventListener('touchstart', enableAudio);
    }
    document.body.addEventListener('click', enableAudio, { once: true });
    document.body.addEventListener('touchstart', enableAudio, { once: true });

    // --- Dati del Tutorial (Testi aggiornati e formattati) ---
    const tutorialSteps = [
        {
            message: "Ciao, sono <strong>l'app PHARMABOT!</strong><br> Con me puoi inviare le tue <strong>ricette in farmacia</strong>, direttamente dal tuo smartphone!<strong><br>Non dovrai più attendere e fare lunghe file.</strong><br>Sarò io ad avvisarti quando potrai andare a ritirare i tuoi farmaci!<br><em>Premi su di me e ti mostro come fare!</em><br> ",
            video: "#mascot-video-1",
            effect: () => []
        },
        {
            message: "Inserisci i tuoi <strong>dati anagrafici.</strong><br>Se non ricordi il codice fiscale posso calcolarlo io per te!<br><strong>Puoi anche salvare il profilo per usarlo la prossima volta.</strong><br>Scegli la tua <strong>farmacia preferita.</strong><br><span class='highlight-green'>Semplice, no?</span><br> ",
            video: "#mascot-video-2",
            effect: () => []
        },
        {
            message: "Ora inserisci i <strong>codici delle ricette.</strong><br><strong>Puoi copiare l'SMS ricevito dal tuo dottore</strong>, oppure <strong>scattare una foto o inviarmi un immagine</strong> del codice.<br>Puoi dirmi se preferisci farmaci <strong>originali o generici</strong> e se desideri la <strong>consegna a domicilio!</strong><br> ",
            video: "#mascot-video-3",
            effect: () => []
        },
        {
            message: "Ci siamo quasi!<br><strong>Controlla il riepilogo dei dati,</strong> se è tutto corretto, <strong>invia la richiesta!</strong><br>La farmacia riceverà subito il tuo ordine e io ti avviserò quando potrai andare a ritirare i tuoi farmaci.<br><em>Scarica subito PHARMABOT!</em><br> ",
            video: "#mascot-video-4",
            effect: () => []
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

        const visibleTextLength = text.replace(/<[^>]*>/g, '').length;
        const charSpeed = duration / visibleTextLength;
        const sentencePause = 400; // Pausa ridotta per un flusso migliore

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
                timeout = 0;
            } else {
                element.innerHTML += char;
                if (char !== ' ' && canPlaySound) {
                    typingSound.currentTime = 0;
                    typingSound.play().catch(() => {}); // Ignora errori se l'audio non può partire
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
        if (isTyping) return;

        const oldStepIndex = currentStep;
        currentStep = stepIndex;

        const stepData = tutorialSteps[stepIndex];
        const oldStepData = tutorialSteps[oldStepIndex] || tutorialSteps[0];

        if (canPlaySound) {
            bionicSound.currentTime = 0;
            bionicSound.play().catch(() => {}); // Ignora errori se l'audio non può partire
        }

        // Gestione video
        const currentVideo = document.querySelector(stepData.video);
        const oldVideo = document.querySelector(oldStepData.video);
        if (currentVideo !== oldVideo) {
            oldVideo.classList.remove('active');
            setTimeout(() => {
                oldVideo.pause(); oldVideo.currentTime = 0;
            }, 400);
        }
        currentVideo.classList.add('active');
        currentVideo.play().catch(() => {});

        // Gestione effetti (rimossi)
        const oldEffects = phoneScreenContainer.querySelectorAll('.effect-element');
        oldEffects.forEach(el => el.remove());

        // Gestione messaggio con typewriter
        tutorialMessage.style.opacity = 1;
        typewriter(tutorialMessage, stepData.message, 3000, null);

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
