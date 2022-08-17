const locales = ['en', 'nl'];

// VERANDER DIT NIET DIRECT!
const target = {locale: null};
let doneFetching = false;

const proxy = new Proxy(target, {
    set(target, prop, value) {
        if(typeof value !== 'string') return false;
        if(!locales.includes(value.toLowerCase())) return false;

        target[prop] = value.toLowerCase();

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
}

async function getTranslationFile(filePath) {
    const response = await fetch(filePath);

    if(response.ok) {  
        let json = await response.json();
        return Promise.resolve(json);
    }
        
    else return Promise.reject("Localization file not found!");
}

let localeFile = null;
getTranslationFile(filePath)
    .then(response => {
        localeFile = response;
        doneFetching = true;
        updatePage();
    }).catch(console.error);

// Eerst pakken we de talen die de user heeft ingesteld.
const userLanguages = navigator.languages.map(language => language.split('-')[0]);

// De eerste die we vinden die supported is stellen we in.
for(let language of userLanguages) {
    if(!locales.includes(language)) continue;
    proxy.locale = language;
    break;
}

// Als locale nogsteeds null is dan defaulten we naar engels.
if(proxy.locale === null) proxy.locale = 'en';

// Als er een url parameter is voor language kunnen we die gebruiken.
const param = new URLSearchParams(window.location.search).get('lang');

if(param != null) proxy.locale = param;