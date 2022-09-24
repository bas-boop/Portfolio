const langButton = document.getElementById('language-button');
const locales = ['NL', 'EN'];

// VERANDER DIT NIET DIRECT!
const target = {locale: null};
let doneFetching = false;
let localeFile = null;

const proxy = new Proxy(target, {
    set(target, prop, value) {
        if(typeof value !== 'string') return false;
        if(!locales.includes(value.toUpperCase())) return false;

        target[prop] = value.toUpperCase();

        langButton.innerText = value.toUpperCase();

        // Als we de language file nog niet hebben gefetched kunnen we de pagina nog niet updaten en wordt het door de loader gedaan.
        if(!doneFetching) return true;

        updatePage();
        return true;
}});

function updatePage() {
    Array.from(document.getElementsByClassName('locale-target')).forEach(element => {
        let localizedText = localeFile[proxy.locale][element.id]
        element.innerHTML = (localizedText !== undefined) ? localizedText : `Missing translation for ${element.id} for '${proxy.locale}' locale.`;
    });

    // TODO: button updaten!
}

// json fetchen :)
fetch(filePath).then(value => {
    value.json().then(value => {
        localeFile = value;
        doneFetching = true;
        updatePage();
    });
});

// Eerst pakken we de talen die de user heeft ingesteld.
const userLanguages = navigator.languages.map(language => language.split('-')[0]);

// De eerste die we vinden die supported is stellen we in.
for(let language of userLanguages) {
    if(!locales.includes(language)) continue;
    proxy.locale = language;
    break;
}

// Als er een url parameter is voor language kunnen we die gebruiken.
const param = new URLSearchParams(window.location.search).get('lang');

if(param != null) proxy.locale = param;

// Als locale nogsteeds null is dan defaulten we naar engels.
if(proxy.locale === null) proxy.locale = 'EN';

// TODO: button handler.

langButton.addEventListener('click', () => {
    let index = locales.findIndex(locale => locale == langButton.innerText) + 1;
    if(index == locales.length) index = 0;
    
    proxy.locale = locales[index];
});