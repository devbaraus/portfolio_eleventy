module.exports = {
	darkMode: false,
	theme: {
		container: {
			center: true,
			padding: '2rem',
		},
		extend: {
			borderWidth: {
				1: '1px',
			},
			fontFamily: {
				ubuntu: 'Ubuntu, sans-serif',
				consolas: 'Consolas, monospace',
				poppins: 'Poppins, sans-serif',
			},
			colors: {
				dark: '#31263e',
				light: '#44355b',
				gray: {
					light: '#f0f0f7',
				},
				primary: '#ee5622',
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						color: theme('colors.dark'),
						a: {
							color: 'inherit',
							'&:hover': {
								color: theme('colors.primary'),
								transitionProperty: theme('transitionProperty.colors'),
								transitionTimingFunction: theme('transitionTimingFunction.in'),
								transitionDuration: theme('transitionDuration.200'),
							},
						},
						p: {
							color: 'inherit',
						},
						h1: {
							color: 'inherit',
						},
						h2: {
							color: 'inherit',
						},
						h3: {
							color: 'inherit',
						},
						h4: {
							color: 'inherit',
						},
						h5: {
							color: 'inherit',
						},
						h6: {
							color: 'inherit',
						},
						strong: {
							color: 'inherit',
						},
						blockquote: {
							color: 'inherit',
						},
						code: {
							color: 'inherit',
						},
						pre: {
							backgroundColor: theme('colors.dark'),
						},
						table: {
							overflowX: 'auto',
							display: 'block',
						},
						thead: {
							color: 'inherit',
						},
						th: {
							color: 'inherit',
						},
						td: {
							color: 'inherit',
						},
					},
				},
			}),
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require('@tailwindcss/typography')],
	purge: {
		content: ['dist/**/*.html'],
		options: {
			safelist: [],
		},
	},
}
