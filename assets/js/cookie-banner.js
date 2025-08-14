// Funzione per impostare un cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Funzione per ottenere un cookie
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Logica del banner dei cookie
document.addEventListener('DOMContentLoaded', () => {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptButton = document.getElementById('accept-cookie-consent');

    // Se il cookie di consenso non esiste, mostra il banner
    if (!getCookie('cookie_consent')) {
        if (cookieBanner) {
            cookieBanner.classList.remove('hidden');
        }
    }

    // Quando l'utente clicca su "Accetta"
    if (acceptButton) {
        acceptButton.addEventListener('click', () => {
            // Imposta un cookie per 1 anno per ricordare il consenso
            setCookie('cookie_consent', 'accepted', 365);
            // Nascondi il banner
            if (cookieBanner) {
                cookieBanner.classList.add('hidden');
            }
        });
    }
});
