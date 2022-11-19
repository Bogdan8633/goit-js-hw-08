// Add imports above this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';
// Change code below this line

const lightbox = new SimpleLightbox('.gallery a', {
  /* options */
});

const ulListEl = document.querySelector('.gallery');
const addMarkup = createGalleryMarkup(galleryItems);
ulListEl.insertAdjacentHTML('beforeend', addMarkup);

function createGalleryMarkup(images) {
  return images
    .map(({ preview, original, description }) => {
      return `<a class="gallery__item" href="${original}" rel="nofollow">
  <img class="gallery__image" src="${preview}" alt="${description}" />
  </a>`;
    })
    .join('');
}

new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
