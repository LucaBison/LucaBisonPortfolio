import { ReactNode, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { Trans, useTranslation } from 'react-i18next';

type Variant = 'dark' | 'light';
type MediaItem = {
    alt: string;
    kind?: 'image' | 'video';
    src: string;
    tag?: string;
};

type ProjectSectionProps = {
    children: ReactNode;
    className?: string;
    eyebrow?: string;
    id?: string;
    title: ReactNode;
    variant?: Variant;
};

const assets = {
    image: (name: string) => `images/${name}`,
    video: (name: string) => `videos/${name}`,
};

function ExternalLink({ children, href, download = false }: { children?: ReactNode; href: string; download?: boolean }) {
    return <a href={href} target={download ? undefined : '_blank'} rel={download ? undefined : 'noreferrer'} download={download}>{children}</a>;
}

function Tag({ children, variant = 'dark' }: { children: ReactNode; variant?: Variant }) {
    return <p className={`tag tag--${variant}`}>{children}</p>;
}

function MediaGallery({ items, layout = 'grid', onImageClick }: { items: MediaItem[]; layout?: 'grid' | 'scroll'; onImageClick?: (item: MediaItem) => void }) {
    const { t } = useTranslation();
    return (
        <div className={`media-gallery media-gallery--${layout}`}>
            {items.map((item) => (
                <figure className="media-gallery__item" key={item.src}>
                    {item.kind === 'video' ? (
                        <video className="media-gallery__media" controls muted><source src={item.src} type="video/mp4" /></video>
                    ) : (
                        <button className="media-gallery__image-button" type="button" onClick={() => onImageClick?.(item)} aria-label={t('modal.enlarge', { name: item.alt })}>
                            <img className="media-gallery__media" src={item.src} alt={item.alt} />
                        </button>
                    )}
                    {item.tag && <Tag variant="dark">{item.tag}</Tag>}
                </figure>
            ))}
        </div>
    );
}

function ProjectSection({ children, className = '', eyebrow, id, title, variant = 'light' }: ProjectSectionProps) {
    return (
        <section id={id} className={`project-section project-section--${variant} ${className}`}>
            <div className="project-section__content">
                {eyebrow && <p className="project-section__eyebrow">{eyebrow}</p>}
                <h2 className="project-section__title">{title}</h2>
                {children}
            </div>
        </section>
    );
}

function HeadphonesCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { t } = useTranslation();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        camera.position.set(0.6, 0.5, 0.6);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.enablePan = false;
        controls.minDistance = 0.5;
        controls.maxDistance = 2;
        controls.target.set(0, 0.5, 0);

        scene.add(new THREE.DirectionalLight(0xffffff, 3).translateY(1).translateZ(1));
        scene.add(new THREE.AmbientLight(0xffffff, 0.5));

        let model: THREE.Object3D | undefined;
        new FBXLoader().load('models/cuffie.fbx', (object) => {
            model = object;
            model.scale.setScalar(0.01);
            const blackPlastic = new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.5 });
            const leather = new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.5, metalness: 0.1 });
            const meshes = model.children.filter((child): child is THREE.Mesh => child instanceof THREE.Mesh);
            if (meshes[0]) meshes[0].material = blackPlastic;
            if (meshes[1]) meshes[1].material = leather;
            model.position.set(0, 0.2, 0);
            scene.add(model);
        });

        const resize = () => {
            const { clientWidth: width, clientHeight: height } = canvas;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height, false);
        };
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(canvas);
        resize();

        let frameId = 0;
        const render = () => {
            if (model) model.rotation.y -= 0.01;
            controls.update();
            renderer.render(scene, camera);
            frameId = requestAnimationFrame(render);
        };
        render();

        return () => {
            cancelAnimationFrame(frameId);
            resizeObserver.disconnect();
            controls.dispose();
            renderer.dispose();
        };
    }, []);

    return <canvas ref={canvasRef} className="hero__canvas" aria-label={t('hero.headphonesAlt')} />;
}

export function App() {
    const { i18n, t } = useTranslation();
    const [enlargedImage, setEnlargedImage] = useState<MediaItem | null>(null);
    const [isHeaderVisible, setHeaderVisible] = useState(true);
    const lastScrollY = useRef(0);
    const cvHref = i18n.resolvedLanguage === 'en' ? 'CV_ENG.pdf' : 'CV_ITA.pdf';
    const gameReadyAssets: MediaItem[] = [
        { src: assets.image('palafitta.png'), alt: t('projects.ready.hut'), tag: t('projects.ready.hutTag') },
        { src: assets.image('forgeWorkbench.jpg'), alt: t('projects.ready.forge'), tag: t('projects.ready.forgeTag') },
        { src: assets.image('forgeCyc.jpg'), alt: t('projects.ready.forgeTextured'), tag: t('projects.ready.forgeTexturedTag') },
    ];
    const photorealisticAssets: MediaItem[] = [
        { src: assets.image('furniture.jpg'), alt: t('projects.photo.furniture'), tag: t('projects.photo.furnitureTag') },
        { src: assets.image('bathroom.jpg'), alt: t('projects.photo.bathroom'), tag: t('projects.photo.bathroomTag') },
        { src: assets.image('rolexDef.jpg'), alt: t('projects.photo.watch'), tag: t('projects.photo.watchTag') },
    ];
    const pcImages: MediaItem[] = ['PC3-HR.jpg', 'pc.jpg', 'pc2.jpg'].map((src) => ({ src: assets.image(src), alt: t('projects.highPoly.imageAlt') }));

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const delta = currentScrollY - lastScrollY.current;

            if (currentScrollY < 24) {
                setHeaderVisible(true);
            } else if (delta > 8) {
                setHeaderVisible(false);
            } else if (delta < -8) {
                setHeaderVisible(true);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header className={`site-header ${isHeaderVisible ? '' : 'site-header--hidden'}`}>
                <p>Portfolio | Luca Bison<br /><br /><a href="#games">{t('nav.games')}</a><br /><a href="#modelling">{t('nav.modelling')}</a></p>
                <div className="site-header__contact"><p>lucabison.lb@gmail.com<br />+39 340 214 89 19<br /><ExternalLink href={cvHref} download>{t('nav.cv')}</ExternalLink><br /><ExternalLink href="recommendationLetter.pdf" download>{t('nav.recommendation')}</ExternalLink></p><div className="language-switcher" aria-label="Language selector"><button type="button" className={i18n.language === 'it' ? 'is-active' : ''} onClick={() => i18n.changeLanguage('it')}>IT</button><button type="button" className={i18n.language === 'en' ? 'is-active' : ''} onClick={() => i18n.changeLanguage('en')}>EN</button></div></div>
            </header>
            <main>
                <section className="hero">
                    <div className="hero__copy"><h1>{t('hero.title')}</h1><p className="hero__role">{t('hero.role')}</p><p>{t('hero.first')}</p><p>{t('hero.second')}</p></div>
                    <div className="hero__model"><HeadphonesCanvas /><img src={assets.image('rotation.png')} alt="" /><p>{t('hero.rotate')}</p></div>
                </section>

                <ProjectSection id="games" variant="dark" eyebrow={t('projects.zen.eyebrow')} title={t('projects.zen.title')}>
                    <p><Trans i18nKey="projects.zen.description" components={{ company: <ExternalLink href="https://www.risingpixel.com/it/" /> }} /></p>
                    <img className="project-section__feature-image" src={assets.image('zengarden.png')} alt={t('projects.zen.imageAlt')} />
                    <ExternalLink href="https://zengardenmicroverse.netlify.app/">{t('projects.zen.link')}</ExternalLink>
                </ProjectSection>

                <ProjectSection title={t('projects.museum.title')}>
                    <p>{t('projects.museum.description')}</p>
                    <MediaGallery items={['stanzauno.mp4', 'stanzadue.mp4', 'stanzatre.mp4'].map((src) => ({ src: assets.video(src), alt: t('projects.museum.videoAlt'), kind: 'video' }))} />
                    <ExternalLink href="https://www.sicilyvirtualmuseum.it/">{t('projects.museum.link')}</ExternalLink>
                </ProjectSection>

                <ProjectSection variant="dark" title={t('projects.sicula.title')}>
                    <p><Trans i18nKey="projects.sicula.description" components={{ engine: <strong /> }} /></p>
                    <MediaGallery items={['render1.png', 'render2.png', 'render3.png'].map((src) => ({ src: assets.image(src), alt: t('projects.sicula.imageAlt') }))} />
                    <div className="store-links"><ExternalLink href="https://play.google.com/store/apps/details?id=com.SiculaImmobiliare"><img src={assets.image('android.png')} alt="Google Play" /></ExternalLink><ExternalLink href="https://apps.apple.com/it/app/sicula-immobiliare/id6751596919?l=en-GB"><img src={assets.image('app-store.png')} alt="App Store" /></ExternalLink><ExternalLink href="https://drive.google.com/drive/folders/1qmWSmz-hdMILlIfK_0Vii1siKZKX7ciC?usp=drive_link"><img src={assets.image('windows.png')} alt={t('projects.sicula.windows')} /></ExternalLink></div>
                </ProjectSection>

                <ProjectSection title={t('projects.farmtron.title')}>
                    <p><Trans i18nKey="projects.farmtron.description" components={{ association: <ExternalLink href="https://www.instagram.com/associazionebluezona/" />, game: <strong />, program: <ExternalLink href="https://www.master-xr.eu/open-calls/open-call-2/" /> }} /></p>
                    <MediaGallery items={[{ src: assets.video('ShowcaseRobot.mp4'), alt: t('projects.farmtron.showcaseAlt'), kind: 'video' }, { src: assets.video('Farmtron XR Teaser.mp4'), alt: t('projects.farmtron.teaserAlt'), kind: 'video' }, { src: assets.image('colored.png'), alt: t('projects.farmtron.imageAlt') }]} />
                </ProjectSection>

                <ProjectSection id="modelling" variant="dark" eyebrow={t('projects.xr4ed.eyebrow')} title={<><ExternalLink href="https://xr4ed.eu/">XR4ED</ExternalLink>{t('projects.xr4ed.titleSuffix')}</>}>
                    <p><Trans i18nKey="projects.xr4ed.description" components={{ association: <ExternalLink href="https://www.instagram.com/associazionebluezona/" /> }} /></p>
                    <img className="project-section__feature-image" src={assets.image('bee2.png')} alt={t('projects.xr4ed.imageAlt')} />
                    <Tag variant="light">{t('projects.xr4ed.tag')}</Tag>
                </ProjectSection>

                <ProjectSection title={t('projects.ready.title')}><MediaGallery items={gameReadyAssets} layout="scroll" /></ProjectSection>

                <ProjectSection variant="dark" title={t('projects.highPoly.title')}>
                    <p>{t('projects.highPoly.description')}</p>
                    <MediaGallery items={pcImages} onImageClick={setEnlargedImage} />
                    <Tag variant="light">{t('projects.highPoly.tag')}</Tag>
                </ProjectSection>

                <ProjectSection title={t('projects.materials.title')}>
                    <div className="materials-layout">
                        <img className="materials-layout__image" src={assets.image('materials.png')} alt={t('projects.materials.imageAlt')} />
                        <div className="materials-layout__copy">
                            <p>{t('projects.materials.description')}</p>
                            <Tag>{t('projects.materials.tag')}</Tag>
                        </div>
                    </div>
                </ProjectSection>
                <ProjectSection variant="dark" title={t('projects.photo.title')}><p>{t('projects.photo.description')}</p><MediaGallery items={photorealisticAssets} /></ProjectSection>
            </main>
            <footer className="site-footer"><ExternalLink href={cvHref} download>{t('footer.cv')}</ExternalLink><p>© 2026 Luca Bison</p></footer>
            {enlargedImage && <div className="image-modal" role="dialog" aria-modal="true" aria-label={t('modal.label')} onClick={() => setEnlargedImage(null)}><img src={enlargedImage.src} alt={enlargedImage.alt} /></div>}
        </>
    );
}
