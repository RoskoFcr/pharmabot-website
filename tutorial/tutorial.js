document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DEFINIZIONE DATI DEL TUTORIAL (v3 - Final) ---
    const tutorialSteps = [
        {
            message: "<strong>Salva i dati una volta, usali per sempre.</strong> Dimentica di dover ridigitare tutto ogni volta. Inserisci i tuoi dati anagrafici una sola volta. Pharmabot li ricorderà per te, <em>in totale sicurezza.</em>",
            image: "../assets/images/dati anagrafici.jpg",
            video: "../assets/videos/pt 1 di 4.mp4",
            effect: () => {
                const highlightNome = document.createElement('div');
                highlightNome.className = 'effect-element effect-step-1-highlight';
                highlightNome.style.top = '22.5%';
                highlightNome.style.animationDelay = '0.5s';

                const highlightCognome = document.createElement('div');
                highlightCognome.className = 'effect-element effect-step-1-highlight';
                highlightCognome.style.top = '33.5%';
                highlightCognome.style.animationDelay = '1.0s';

                // Checkbox animation removed as it was problematic.
                return [highlightNome, highlightCognome];
            }
        },
        {
            message: "Invia le ricette, <strong>come vuoi tu.</strong> Digita, incolla o <em>scatta una foto.</em> Bastano pochi secondi per aggiungere i codici delle tue ricette elettroniche. L'errore di trascrizione è solo un lontano ricordo.",
            image: "../assets/images/dati ricette.jpg",
            video: "../assets/videos/pt 2 di 4.mp4",
            effect: () => {
                const cameraHighlight = document.createElement('div');
                cameraHighlight.className = 'effect-element effect-step-2-icon-highlight';
                cameraHighlight.style.cssText = 'top: 65%; left: 9%; width: 40%; height: 8%; animation-delay: 0.5s;';

                const galleryHighlight = document.createElement('div');
                galleryHighlight.className = 'effect-element effect-step-2-icon-highlight';
                galleryHighlight.style.cssText = 'top: 65%; left: 51%; width: 40%; height: 8%; animation-delay: 1.0s;';

                return [cameraHighlight, galleryHighlight];
            }
        },
        {
            message: "<strong>Scegli la tua farmacia</strong> e personalizza. Seleziona la tua farmacia di fiducia dall'elenco. Hai bisogno di un <em>farmaco generico</em> o hai altre preferenze? Aggiungi una nota. Hai il pieno controllo.",
            image: "../assets/images/note e preferenze.jpg",
            video: "../assets/videos/pt 3 di 4.mp4",
            effect: () => {
                const selectorHighlight = document.createElement('div');
                selectorHighlight.className = 'effect-element effect-step-3-selector-highlight';
                selectorHighlight.style.cssText = 'top: 36.5%; left: 8.5%; width: 83%; height: 8.5%; animation-delay: 0.5s;';

                const notesContainer = document.createElement('div');
                notesContainer.className = 'effect-element';
                notesContainer.style.cssText = 'top: 50.5%; left: 8.5%; width: 83%; height: 15%;';

                const notesText = document.createElement('div');
                notesText.className = 'effect-step-3-notes-text';
                notesText.textContent = 'NOTE PER IL FARMACISTA';
                notesText.style.animationDelay = '1.5s';

                notesContainer.appendChild(notesText);

                return [selectorHighlight, notesContainer];
            }
        },
        {
            message: "<strong>Un ultimo controllo e via!</strong> Rivedi il riepilogo della tua richiesta. È tutto corretto? Con un semplice tocco, la tua farmacia riceverà l'ordine. Ti avviseremo noi <em>quando sarà tutto pronto.</em>",
            image: "../assets/images/riepilogo.jpg",
            video: "../assets/videos/pt 4 di 4.mp4",
            effect: () => {
                const buttonHighlight = document.createElement('div');
                buttonHighlight.className = 'effect-element effect-step-4-button-highlight';
                buttonHighlight.style.cssText = 'top: 88%; left: 8.5%; width: 83%; height: 9.5%;';

                return [buttonHighlight];
            }
        }
    ];

    // --- 2. SELEZIONE ELEMENTI DEL DOM ---
    const mascotVideo = document.getElementById('mascot-video');
    const tutorialMessage = document.getElementById('tutorial-message');
    const phoneScreen = document.getElementById('phone-screen');
    const phoneScreenContainer = document.getElementById('phone-screen-container');

    const prevButton = document.getElementById('prev-step');
    const nextButton = document.getElementById('next-step');
    const currentStepNumber = document.getElementById('current-step-number');

    let currentStep = 0;

    // --- 3. FUNZIONE PRINCIPALE PER AGGIORNARE LA VISTA ---
    function updateTutorialStep(stepIndex) {
        // Pulisce gli effetti precedenti
        const oldEffects = phoneScreenContainer.querySelectorAll('.effect-element');
        oldEffects.forEach(el => el.remove());

        // Prende i dati dello step corrente
        const stepData = tutorialSteps[stepIndex];

        // Aggiorna il messaggio del fumetto con un'animazione parola per parola
        tutorialMessage.innerHTML = ''; // Svuota il contenitore
        const words = stepData.message.split(' ');
        words.forEach((word, index) => {
            const wordSpan = document.createElement('span');
            // Usiamo innerHTML per renderizzare i tag <strong>, <em>, etc.
            wordSpan.innerHTML = word + '\u00A0'; // Aggiungiamo uno spazio non divisibile
            wordSpan.className = 'animated-word';
            wordSpan.style.animationDelay = `${index * 0.04}s`;
            tutorialMessage.appendChild(wordSpan);
        });

        // Aggiorna l'immagine dello smartphone
        phoneScreen.src = stepData.image;

        // Aggiorna e riproduce il video della mascotte
        mascotVideo.src = stepData.video;
        mascotVideo.play();

        // Applica i nuovi effetti
        const newEffects = stepData.effect();
        newEffects.forEach(el => phoneScreenContainer.appendChild(el));

        // Aggiorna l'indicatore di passo
        currentStepNumber.innerText = stepIndex + 1;

        // Aggiorna lo stato dei bottoni di navigazione
        prevButton.disabled = stepIndex === 0;
        nextButton.disabled = stepIndex === tutorialSteps.length - 1;
    }

    // --- 4. GESTIONE EVENTI ---
    nextButton.addEventListener('click', () => {
        if (currentStep < tutorialSteps.length - 1) {
            currentStep++;
            updateTutorialStep(currentStep);
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentStep > 0) {
            currentStep--;
            updateTutorialStep(currentStep);
        }
    });

    // --- 5. INIZIALIZZAZIONE ---
    // Carica il primo step al caricamento della pagina
    updateTutorialStep(0);
});
