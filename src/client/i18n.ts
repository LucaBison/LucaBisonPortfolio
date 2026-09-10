import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const resources = {
    it: {
        translation: {
            nav: { games: 'Game Developer', modelling: 'Modellazione 3D', cv: 'Curriculum Vitae', recommendation: 'Recommendation Letter' },
            hero: { title: 'CIAO! SONO LUCA', role: 'Game Developer & 3D artist', first: 'Tramite il design, la modellazione e lo sviluppo di siti 3D, videogames o render 3D, voglio creare prodotti efficienti e originali.', second: 'Creare esperienze nuove e coinvolgenti, sia nel game design che nel mondo della comunicazione, è ciò che mi spinge ogni giorno a migliorare.', rotate: 'Rotate Me!', headphonesAlt: 'Modello 3D interattivo di cuffie' },
            projects: {
                zen: { eyebrow: 'Game Developer', title: 'ZEN GARDEN MICROVERSE', description: 'Ho sviluppato un microverso 3D durante il mio tirocinio presso <company>Rising Pixel</company>, tramite React e React Three Fiber, affinando tecniche di gamification, game design e sviluppo.', imageAlt: 'Zen Garden Microverse', link: 'Zen Garden Microverse' },
                museum: { title: 'VIRTUAL MUSEUM', description: 'Ho creato un museo interattivo 3D utilizzando Unity e Blender. Il museo è implementato sul sito del museo stesso con una build WebGL, visitabile da desktop e smartphone.', link: 'Sicily Virtual Museum', videoAlt: 'Virtual Museum' },
                sicula: { title: 'SICULA IMMOBILIARE APP', description: "Ho sviluppato un'applicazione in <engine>Unreal Engine</engine> per la visualizzazione di case in 3D, con l'obiettivo di offrire un'esperienza immersiva e realistica. L'applicazione è scaricabile su desktop e smartphone.", imageAlt: 'Render Sicula Immobiliare', windows: 'Download per Windows' },
                farmtron: { title: 'ON GOING - FARMTRON-XR', description: 'Con l’associazione <association>Bluezona</association> sto sviluppando un <game>serious game VR in Unity</game> per la formazione e la sicurezza sul lavoro nel settore agricolo. Il progetto è in fase di sviluppo per il bando europeo <program>Master XR</program>.', showcaseAlt: 'Showcase Farmtron XR', teaserAlt: 'Teaser Farmtron XR', imageAlt: 'Farmtron XR' },
                xr4ed: { eyebrow: 'Modellazione 3D', titleSuffix: ' - EUROPEAN PROJECT', description: 'In collaborazione con <association>Bluezona</association> ho realizzato il modello di un’ape mellifera nei suoi tre stadi: larva, pupa e adulta. Ho poi realizzato tre video sferici 360, visionabili da visore, in Blender.', imageAlt: 'Ape mellifera 3D', tag: 'Game Assets - Ape' },
                ready: { title: 'CREAZIONE DI SCENARI GAME READY', hut: 'Palafitta low poly', forge: 'Forgia nanica', forgeTextured: 'Forgia nanica texturizzata', hutTag: 'Low Poly - Palafitta', forgeTag: 'Game Assets - Forgia Nanica', forgeTexturedTag: 'Game Assets - Forgia Nanica Textured' },
                highPoly: { title: 'HIGH POLY MESH', description: 'Progetto personale: ricreare il mio fedele aiutante in tutti questi anni, il mio PC, anche se ormai ne rimangono pochi pezzi originali.', imageAlt: 'PC gaming high poly', tag: 'High Poly - PC da gaming' },
                materials: { title: 'MATERIALI', description: 'Progetto personale: creazione di materiali custom per realizzare in modo ancora più personalizzato e fedele i miei progetti.', imageAlt: 'Test di materiali', tag: 'Materials Test - Plastica, Tessuto, Vernice, Vetro' },
                photo: { title: 'PHOTOREALISTIC', description: 'Progetto personale: creazione di scene e oggetti fotorealistici, integrando modelli dettagliati con luci, materiali e ambientazioni curate.', furniture: 'Arredo fotorealistico', bathroom: 'Toilette fotorealistica', watch: 'Orologio fotorealistico', furnitureTag: 'Arredo', bathroomTag: 'Toilette', watchTag: 'Orologio' },
            },
            modal: { enlarge: 'Ingrandisci {{name}}', label: 'Immagine ingrandita' },
            footer: { cv: 'Download my CV' },
        },
    },
    en: {
        translation: {
            nav: { games: 'Game Developer', modelling: '3D Modelling', cv: 'Curriculum Vitae', recommendation: 'Recommendation Letter' },
            hero: { title: 'HI! I’M LUCA', role: 'Game Developer & 3D Artist', first: 'Through design, modelling and the development of 3D websites, video games and 3D renders, I want to create efficient, original products.', second: 'Creating new, engaging experiences in both game design and communication is what drives me to improve every day.', rotate: 'Rotate Me!', headphonesAlt: 'Interactive 3D headphones model' },
            projects: {
                zen: { eyebrow: 'Game Developer', title: 'ZEN GARDEN MICROVERSE', description: 'I developed a 3D microverse during my internship at <company>Rising Pixel</company>, using React and React Three Fiber while strengthening my gamification, game design and development skills.', imageAlt: 'Zen Garden Microverse', link: 'Zen Garden Microverse' },
                museum: { title: 'VIRTUAL MUSEUM', description: 'I created an interactive 3D museum using Unity and Blender. It is embedded on the museum website as a WebGL build and can be visited from desktop and smartphone.', link: 'Sicily Virtual Museum', videoAlt: 'Virtual Museum' },
                sicula: { title: 'SICULA IMMOBILIARE APP', description: 'I developed an application in <engine>Unreal Engine</engine> for viewing 3D homes, with the goal of giving users an immersive, realistic experience. The app is available on desktop and smartphone.', imageAlt: 'Sicula Immobiliare render', windows: 'Download for Windows' },
                farmtron: { title: 'IN PROGRESS - FARMTRON-XR', description: 'With <association>Bluezona</association>, I am developing a <game>serious VR game in Unity</game> for agricultural workplace training and safety. The project is currently being developed for the <program>Master XR</program> European call.', showcaseAlt: 'Farmtron XR showcase', teaserAlt: 'Farmtron XR teaser', imageAlt: 'Farmtron XR' },
                xr4ed: { eyebrow: '3D Modelling', titleSuffix: ' - EUROPEAN PROJECT', description: 'In collaboration with <association>Bluezona</association>, I created a honey bee model at three stages of its life: larva, pupa and adult. I also created three 360-degree videos designed for headset viewing in Blender.', imageAlt: '3D honey bee', tag: 'Game Assets - Bee' },
                ready: { title: 'GAME-READY ENVIRONMENT CREATION', hut: 'Low-poly stilt house', forge: 'Dwarven forge', forgeTextured: 'Textured dwarven forge', hutTag: 'Low Poly - Stilt House', forgeTag: 'Game Assets - Dwarven Forge', forgeTexturedTag: 'Game Assets - Textured Dwarven Forge' },
                highPoly: { title: 'HIGH POLY MESH', description: 'Personal project: recreating my trusty companion over the years, my PC, even though few original parts remain.', imageAlt: 'High-poly gaming PC', tag: 'High Poly - Gaming PC' },
                materials: { title: 'MATERIALS', description: 'Personal project: creating custom materials to make my projects more personal and faithful to the original.', imageAlt: 'Material tests', tag: 'Material Tests - Plastic, Fabric, Paint, Glass' },
                photo: { title: 'PHOTOREALISTIC', description: 'Personal project: creating photorealistic scenes and objects by combining detailed models with carefully crafted lighting, materials and environments.', furniture: 'Photorealistic furniture', bathroom: 'Photorealistic bathroom', watch: 'Photorealistic watch', furnitureTag: 'Furniture', bathroomTag: 'Bathroom', watchTag: 'Watch' },
            },
            modal: { enlarge: 'Enlarge {{name}}', label: 'Enlarged image' },
            footer: { cv: 'Download my CV' },
        },
    },
} as const;

i18n.use(initReactI18next).init({
    resources,
    lng: navigator.language.toLowerCase().startsWith('en') ? 'en' : 'it',
    fallbackLng: 'it',
    interpolation: { escapeValue: false },
});

export default i18n;
