// CSS
import './main.pcss'
import './devicons.font.js'
import './feather.font.js'

// JS
import 'turbolinks'
import Turbolinks from 'turbolinks'

Turbolinks.start()

class FlashMessage {
	constructor(element) {
		this.element = document.querySelector(element)
		this.element.addEventListener('click', () => this.close())
		this.t = null
	}

	close() {
		this.element.classList.remove('top-0')
		this.element.classList.add('-top-24')
		clearTimeout(this.t)
	}

	open(message, status, duration = 3000) {
		clearTimeout(this.t)
		this.element.innerHTML =
			"<div class='flash-message text-primary flex items-center'>" +
			(status
				? "<i class='feather feather-check text-xl mr-1'></i>"
				: "<i class='feather feather-x text-xl mr-1'></i>") +
			'<p>' +
			message +
			'</p></div>'

		this.element.classList.remove('-top-24')
		this.element.classList.add('top-0')
		this.t = setTimeout(() => {
			this.close()
		}, duration)
	}
}

window.FlashMessage = FlashMessage

document.addEventListener('turbolinks:render', () => {
	const copyMessage = new FlashMessage('#copy-message')

	document.querySelectorAll('.prose pre').forEach((el) => {
		el.addEventListener('click', () => {
			navigator.clipboard.writeText(el.textContent)
			copyMessage.open('Código copiado!', true)
		})
	})
})
