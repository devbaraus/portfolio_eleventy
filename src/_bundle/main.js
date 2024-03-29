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

window.mobileCheck = function () {
	let check = false;
	(function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
	return check;
};

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
	el.title = 'Clique para copiar 📝'

	el.addEventListener('click', () => {
		navigator.clipboard.writeText(el.textContent)
		flashMessage.open('Código copiado!', true, `<i class='feather feather-clipboard text-xl mr-1'></i>`)
	})
})

document.querySelector('#contact').addEventListener('submit', ($event) => {
	event.preventDefault()
	const formData = new FormData(event.target)

	fetch('https://formspree.io/f/mwkrddvn', {
		method: 'POST',
		body: formData,
		headers: {
			'Accept': 'application/json'
		}
	})
		.then((response) => { flashMessage.open('Email enviado!', true); document.querySelector('#contact').reset(); })
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

function changeTheme() {
	const currentTheme = localStorage.getItem('theme')
	const nextTheme = currentTheme === 'light' ? 'dark' : 'light'
	const statusIcon = nextTheme === 'light' ? 'sun' : 'moon'
	flashMessage.open(`Modo ${nextTheme === 'light' ? 'diurno' : 'noturno'}`, true, `<i class='feather feather-${statusIcon} text-xl mr-1'></i>`)
	if (nextTheme == 'light' && document.querySelector('html').classList.contains('dark')) {
		document.querySelector('html').classList.remove('dark')
	} else {
		document.querySelector('html').classList.add('dark')
	}
	localStorage.setItem('theme', nextTheme)
}

window.addEventListener('click', (e) => {
	// DOUBLE CLICK
	e.detail == 2 && changeTheme();
})

function suggestTheme() {
	if (!localStorage.getItem('theme')) {
		if (window.mobileCheck()) {
			flashMessage.open(`Toque duas vezes!`, true, `<i class='feather feather-moon text-xl mr-1'></i>`, 5000)
		} else {
			flashMessage.open(`Clique duas vezes!`, true, `<i class='feather feather-moon text-xl mr-1'></i>`, 5000)
		}
	}
}

function checkTheme() {
	const currentTheme = localStorage.getItem('theme')
	if (currentTheme == 'light' && document.querySelector('html').classList.contains('dark')) {
		document.querySelector('html').classList.remove('dark')
	} else if (currentTheme == 'dark' && !document.querySelector('html').classList.contains('dark')) {
		document.querySelector('html').classList.add('dark')
	}
}

window.onload = () => {
	suggestTheme()
}

checkTheme()

/* It's a way to register a service worker. */
// if ('serviceWorker' in navigator) {
// 	navigator.serviceWorker
// 		.register('/sw.js')
// 		.then((res) => console.log('service worker registered'))
// 		.catch((err) => console.log('service worker not registered', err))
// }
