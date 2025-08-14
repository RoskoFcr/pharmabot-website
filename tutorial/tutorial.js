document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DEFINIZIONE DATI DEL TUTORIAL ---
    const tutorialSteps = [
        {
            message: "Salva i dati una volta, usali per sempre. Dimentica di dover ridigitare tutto ogni volta. Inserisci i tuoi dati anagrafici (o quelli dei tuoi familiari) una sola volta. Pharmabot li ricorderà per te, in totale sicurezza.",
            image: "../assets/images/dati anagrafici.jpg",
            video: "../assets/videos/pt 1 di 4.mp4",
            effect: () => {
                // Evidenziazione animata in sequenza dei campi
                const highlight1 = document.createElement('div');
                highlight1.className = 'effect-element effect-step-1-highlight';
                highlight1.style.top = '13.5%'; // Posizione del primo campo (es. Nome)
                highlight1.style.animationDelay = '0.5s';

                const highlight2 = document.createElement('div');
                highlight2.className = 'effect-element effect-step-1-highlight';
                highlight2.style.top = '22%'; // Posizione del secondo campo (es. Cognome)
                highlight2.style.animationDelay = '1s';

                // Simulazione della pressione del checkbox
                const checkboxPress = document.createElement('div');
                checkboxPress.className = 'effect-element effect-step-1-checkbox-press';

                const checkmarkSymbol = document.createElement('div');
                checkmarkSymbol.className = 'checkmark-symbol';
                checkboxPress.appendChild(checkmarkSymbol);

                return [highlight1, highlight2, checkboxPress];
            }
        },
        {
            message: "Invia le ricette, come vuoi tu. Digita, incolla o scatta una foto. Bastano pochi secondi per aggiungere i codici delle tue ricette elettroniche. L'errore di trascrizione è solo un lontano ricordo.",
            image: "../assets/images/dati ricette.jpg",
            video: "../assets/videos/pt 2 di 4.mp4",
            effect: () => {
                // Evidenziazione per l'icona della fotocamera
                const cameraHighlight = document.createElement('div');
                cameraHighlight.className = 'effect-element effect-step-2-icon-highlight effect-step-2-camera-highlight';
                cameraHighlight.style.animationDelay = '0.5s';

                // Evidenziazione per l'icona della galleria
                const galleryHighlight = document.createElement('div');
                galleryHighlight.className = 'effect-element effect-step-2-icon-highlight effect-step-2-gallery-highlight';
                galleryHighlight.style.animationDelay = '1s';

                return [cameraHighlight, galleryHighlight];
            }
        },
        {
            message: "Scegli la tua farmacia e personalizza. Seleziona la tua farmacia di fiducia dall'elenco. Hai bisogno di un farmaco generico o hai altre preferenze? Aggiungi una nota. Hai il pieno controllo.",
            image: "../assets/images/note e preferenze.jpg",
            video: "../assets/videos/pt 3 di 4.mp4",
            effect: () => {
                // Animazione per il selettore "Generici/Originali"
                const selectorHighlight = document.createElement('div');
                selectorHighlight.className = 'effect-element effect-step-3-selector-highlight';

                // Contenitore per l'animazione di testo
                const notesContainer = document.createElement('div');
                notesContainer.className = 'effect-element effect-step-3-notes-container';

                // Il testo che si animerà con l'effetto macchina da scrivere
                const notesText = document.createElement('div');
                notesText.className = 'effect-step-3-notes-text';
                notesText.textContent = 'NOTE PER IL FARMACISTA';

                notesContainer.appendChild(notesText);

                return [selectorHighlight, notesContainer];
            }
        },
        {
            message: "Un ultimo controllo e via! Rivedi il riepilogo della tua richiesta. È tutto corretto? Con un semplice tocco, la tua farmacia riceverà l'ordine. Ti avviseremo noi quando sarà tutto pronto.",
            image: "../assets/images/riepilogo.jpg",
            video: "../assets/videos/pt 4 di 4.mp4",
            effect: () => {
                // Evidenziazione animata per il pulsante finale
                const buttonHighlight = document.createElement('div');
                buttonHighlight.className = 'effect-element effect-step-4-button-highlight';

                return [buttonHighlight]; // Ritorna solo l'evidenziazione, senza emoji
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
            // Usiamo textContent e uno spazio non divisibile (\u00A0) per garantire la spaziatura
            wordSpan.textContent = word + '\u00A0';
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
