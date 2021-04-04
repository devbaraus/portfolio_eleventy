// ICONS
import './devicons.font.js'
import './feather.font.js'

// CSS
import './main.pcss'

// JS
import FlashMessage from './modules/flashmessage'
import './modules/glide'
import './modules/scrollreveal'

ScrollReveal.reveal('.reveal', {
	duration: 200,
	easing: 'ease-in',
	distance: '-20px',
})

if (document.querySelector('.glide')) {
	new Glide('.glide', {
		type: 'carousel',
		startAt: 0,
		perView: 1,
		autoplay: 3000,
	}).mount()
}

const copyMessage = new FlashMessage('#copy-message')

document.querySelectorAll('.prose pre').forEach((el) => {
	el.addEventListener('click', () => {
		navigator.clipboard.writeText(el.textContent)
		copyMessage.open('Código copiado!', true)
	})
})

if ('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('/sw.js')
		.then((res) => console.log('service worker registered'))
		.catch((err) => console.log('service worker not registered', err))
}
