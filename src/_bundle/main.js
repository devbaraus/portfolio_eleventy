// ICONS
import './devicons.font.js'
import './feather.font.js'

// CSS
import './main.pcss'

// JS
import FlashMessage from './modules/flashmessage'
import './modules/glide'
import './modules/scrollreveal'
import ovrly from './modules/ovrly'

window.ovrly = ovrly

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

const flashMessage = new FlashMessage('#copy-message')

document.querySelectorAll('.prose pre').forEach((el) => {
	el.addEventListener('click', () => {
		navigator.clipboard.writeText(el.textContent)
		flashMessage.open('Código copiado!', true)
	})
})

document.querySelector('#form-contact').addEventListener('submit', ($event) => {
	event.preventDefault()
	const formData = new FormData(event.target)

	fetch('https://formspree.io/f/mwkrddvn', {
		method: 'POST',
		body: formData,
	})
		.then((response) => flashMessage.open('Email enviado!', true))
		.catch((error) => flashMessage.open('Email não enviado!', false))
})

window.addEventListener('scroll', () => {
	let winScroll = document.body.scrollTop || document.documentElement.scrollTop
	let height =
		document.documentElement.scrollHeight -
		document.documentElement.clientHeight
	let scrolled = (winScroll / height) * 100
	document.querySelector('#scrolled').style.width = scrolled + '%'
})

if ('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('/sw.js')
		.then((res) => console.log('service worker registered'))
		.catch((err) => console.log('service worker not registered', err))
}
