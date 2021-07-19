import galleryItems from './app.js';

const refs = {
    galleryEl: document.querySelector('.js-gallery'),
    ligtboxEl: document.querySelector('.js-lightbox'),
    jsLightboxImageEl: document.querySelector('.js-lightbox__image'),
    modalCloseBtn: document.querySelector('[data-action="close-lightbox"]'),
    backdropEl: document.querySelector('.lightbox__overlay'),
    galleryItem: document.querySelector('.js-gallery__image'),
};

const makeGallerymarkup = galleryItems.map(makeElementOfGallery).join('');
refs.galleryEl.insertAdjacentHTML('afterbegin', makeGallerymarkup);

function makeElementOfGallery({ preview, original, description }) {
    return `<li class="gallery__item js-gallery__item">
        <a
            class="gallery__link"
            href="${original}"
        >
            <img
                class="gallery__image js-gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
            />
        </a>
    </li>`;
}

refs.galleryEl.addEventListener('click', onGalleryClick);
refs.modalCloseBtn.addEventListener('click', onCloseBtnClick);
refs.backdropEl.addEventListener('click', onBackdropClick);

function onGalleryClick(e) {
    if (!e.target.classList.contains('js-gallery__image')) {
        return;
    }
    e.preventDefault();
    refs.ligtboxEl.classList.add('is-open');
    refs.jsLightboxImageEl.src = e.target.dataset.source;
    refs.jsLightboxImageEl.alt = e.target.alt;
    window.addEventListener('keydown', onEscKeyPress);
}

function onCloseBtnClick(e) {
    refs.ligtboxEl.classList.remove('is-open');
    refs.jsLightboxImageEl.src = '';
    refs.jsLightboxImageEl.alt = '';
    window.removeEventListener('keydown', onEscKeyPress);
}

function onBackdropClick(e) {
    if (e.currentTarget === e.target) {
        onCloseBtnClick();
    }
}

function onEscKeyPress(e) {
    if (e.code === 'Escape') {
        onCloseBtnClick();
    }
}
