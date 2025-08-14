document.addEventListener('DOMContentLoaded', () => {

    // Seleziona tutti gli elementi necessari dal DOM
    const steps = document.querySelectorAll('.step-content');
    const phoneScreen = document.getElementById('phone-screen');
    const phoneColumn = document.querySelector('.phone-column');

    // Funzione per gestire l'aggiornamento dello stato attivo
    function setActiveStep(activeIndex) {
        steps.forEach((step, index) => {
            if (index === activeIndex) {
                // Aggiunge la classe 'is-active' allo step corrente
                step.classList.add('is-active');
                
                // Cambia l'immagine nel mockup del telefono
                // L'attributo 'data-image' contiene il percorso dell'immagine per quello step
                const newImage = step.dataset.image;
                if (phoneScreen.src !== newImage) {
                    phoneScreen.style.opacity = 0; // Dissolvenza in uscita
                    setTimeout(() => {
                        phoneScreen.src = newImage;
                        phoneScreen.style.opacity = 1; // Dissolvenza in entrata
                    }, 300); // La durata deve corrispondere alla transizione CSS
                }
            } else {
                // Rimuove la classe 'is-active' dagli altri step
                step.classList.remove('is-active');
            }
        });
    }

    // Controlla se il browser supporta l'Intersection Observer
    if ('IntersectionObserver' in window) {
        
        // Crea un nuovo Intersection Observer
        // Questo observer controllerà quando un elemento 'step' entra o esce dalla vista
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // Se un elemento è visibile (isIntersecting)
                if (entry.isIntersecting) {
                    // Trova l'indice dello step visibile
                    const stepIndex = Array.from(steps).indexOf(entry.target);
                    // Aggiorna lo stato attivo
                    setActiveStep(stepIndex);
                }
            });
        }, { 
            rootMargin: '-50% 0px -50% 0px', // Attiva lo step quando è al centro verticale dello schermo
            threshold: 0 // Si attiva non appena un pixel è visibile con quel margine
        });

        // "Osserva" ogni step
        steps.forEach(step => {
            observer.observe(step);
        });

    } else {
        // Fallback per browser molto vecchi che non supportano IntersectionObserver
        // In questo caso, rendiamo tutti gli step visibili di default.
        console.warn('IntersectionObserver non è supportato. Il tutorial interattivo potrebbe non funzionare come previsto.');
        steps.forEach(step => step.classList.add('is-active'));
    }

    // Logica per mostrare il telefono solo su schermi larghi
    // per evitare di attivare la logica su mobile dove il telefono è nascosto
    function handleResize() {
        if (window.innerWidth < 768) { // 768px è il breakpoint 'md' di Tailwind
            phoneColumn.style.display = 'none';
        } else {
            phoneColumn.style.display = 'block';
        }
    }

    // Esegui al caricamento e al ridimensionamento della finestra
    window.addEventListener('resize', handleResize);
    handleResize();
});
