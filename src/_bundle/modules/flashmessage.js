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

	open(message, status, statusPrefix, duration = 3000) {
		clearTimeout(this.t)
		this.element.innerHTML =
			"<div class='flash-message text-primary flex items-center'>" +
			(status
				? statusPrefix || "<i class='feather feather-check text-xl mr-1'></i>"
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

export default FlashMessage
