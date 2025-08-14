document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DEFINIZIONE DATI DEL TUTORIAL ---
    const tutorialSteps = [
        {
            message: "Salva i dati una volta, usali per sempre. Dimentica di dover ridigitare tutto ogni volta. Inserisci i tuoi dati anagrafici (o quelli dei tuoi familiari) una sola volta. Pharmabot li ricorderà per te, in totale sicurezza.",
            image: "../assets/images/dati anagrafici.jpg",
            video: "../assets/videos/pt 1 di 4.mp4",
            effect: () => {
                // Crea due elementi per l'effetto di evidenziazione
                const highlight1 = document.createElement('div');
                highlight1.className = 'effect-element effect-step-1';

                const highlight2 = document.createElement('div');
                highlight2.className = 'effect-element effect-step-1-checkbox';

                return [highlight1, highlight2];
            }
        },
        {
            message: "Invia le ricette, come vuoi tu. Digita, incolla o scatta una foto. Bastano pochi secondi per aggiungere i codici delle tue ricette elettroniche. L'errore di trascrizione è solo un lontano ricordo.",
            image: "../assets/images/dati ricette.jpg",
            video: "../assets/videos/pt 2 di 4.mp4",
            effect: () => {
                // Crea due icone (emoji) per l'effetto pop-in
                const cameraIcon = document.createElement('div');
                cameraIcon.innerText = '📷';
                cameraIcon.className = 'effect-element effect-step-2-camera emoji-icon';

                const galleryIcon = document.createElement('div');
                galleryIcon.innerText = '🖼️';
                galleryIcon.className = 'effect-element effect-step-2-gallery emoji-icon';
                
                return [cameraIcon, galleryIcon];
            }
        },
        {
            message: "Scegli la tua farmacia e personalizza. Seleziona la tua farmacia di fiducia dall'elenco. Hai bisogno di un farmaco generico o hai altre preferenze? Aggiungi una nota. Hai il pieno controllo.",
            image: "../assets/images/note e preferenze.jpg",
            video: "../assets/videos/pt 3 di 4.mp4",
            effect: () => {
                const selector = document.createElement('div');
                selector.className = 'effect-element effect-step-3-selector';

                const notes = document.createElement('div');
                notes.className = 'effect-element effect-step-3-notes';

                return [selector, notes];
            }
        },
        {
            message: "Un ultimo controllo e via! Rivedi il riepilogo della tua richiesta. È tutto corretto? Con un semplice tocco, la tua farmacia riceverà l'ordine. Ti avviseremo noi quando sarà tutto pronto.",
            image: "../assets/images/riepilogo.jpg",
            video: "../assets/videos/pt 4 di 4.mp4",
            effect: () => {
                const button = document.createElement('div');
                button.className = 'effect-element effect-step-4-button';

                const checkmark = document.createElement('div');
                checkmark.innerText = '✅';
                checkmark.className = 'effect-element effect-step-4-checkmark emoji-icon';

                return [button, checkmark];
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

        // Aggiorna il messaggio del fumetto con una piccola animazione di fade
        tutorialMessage.style.opacity = 0;
        setTimeout(() => {
            tutorialMessage.innerText = stepData.message;
            tutorialMessage.style.opacity = 1;
        }, 200);

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
