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
            message: "Ciao! Sono PHARMABOT e questa è la mia app!<strong> Posso aiutarti ad inviare le tue ricette in farmacia...</strong> Così prepareranno i tuoi farmaci <span class=\"highlight-green\">e tu non avrai più il peso di attese e file stressanti.</span>sarò io ad avvisarti quando potrai andare in farmacia a ritirare i tuoi farmaci!<em>PREMI SU DI ME E TI MOSTRO COME FARE!</em>",
            video: "#mascot-video-1",
            effect: () => [] // Effetti rimossi come da richiesta
        },
        {
            message: "Per prima cosa inserisci i tuoi dati anagrafici, posso calcolare io il codice fiscale se non lo ricordi!<strong> Se vuoi puoi salvare il tuo profilo come sto facendo io, così la prossima volta sarà ancora più veloce inserire queste informazioni!</strong> Poi seleziona la tua farmacia preferita tra quelle nell'elenco...<span class=\"highlight-green\">SEMPLICE, NON TROVI?</span>.",
            video: "#mascot-video-2",
            effect: () => [] // Effetti rimossi come da richiesta
        },
        {
            message: "Adesso è il momento di inserire i codici delle ricette...<strong> Niente paura, puoi copiare ed incollare quelle ricevute via SMS, oppure scatta una foto al codice della ricetta o scegli un immagine in cui è ben visibile, ad inserirlo ci penserò io!</strong>Poi dimmi se preferisci farmaci originali o generici,<span class=\"highlight-green\">se hai una nota per il farmacista</span>.. <em> e se desideri una consegna a domicilio!</em>",
            video: "#mascot-video-3",
            effect: () => [] // Effetti rimossi come da richiesta
        },
        {
            message: "Ci siamo quasi!.<strong> Controlla il riepilogo dei dati che hai inserito.</strong>.. Se è tutto ok, <span class=\"highlight-green\">Invia la tua richiesta!</span> La farmacia ricevera subito il tuo ordine... E io ti avviserò quando i farmaci sono pronti per il ritiro. <em>Semplice, no? SARICA SUBITO PHARMABOT! SCORDA PER SEMPRE LO STRESS DELL'ATTESA E DELLA FILA!</em>",
            video: "#mascot-video-4",
            effect: () => [] // Effetti rimossi come da richiesta
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
                    // console.log(`Typing sound for character: ${char}`); // Decommenta per un debug molto verboso
                    typingSound.currentTime = 0;
                    typingSound.play().catch((e) => console.error("Typing sound failed to play:", e));
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
            console.log("Attempting to play bionic sound...");
            bionicSound.currentTime = 0;
            bionicSound.play().catch((e) => console.error("Bionic sound failed to play:", e));
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
