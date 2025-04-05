
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'playfair': ['Playfair Display', 'serif'],
				'sans': ['Inter', 'sans-serif'],
				'handwriting': ['Caveat', 'cursive'],
				'comic': ['Comic Neue', 'cursive'],
				'cursive': ['Dancing Script', 'cursive'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				ink: {
					DEFAULT: '#1A1F2C',
					light: '#403E43',
					dark: '#0B0F1A',
					splash: '#1A1F2C20',
				},
				parchment: {
					DEFAULT: '#F6F5F0',
					dark: '#ECEAE0',
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'ink-spread': {
					'0%': { transform: 'scale(0)', opacity: '0' },
					'50%': { opacity: '0.3' },
					'100%': { transform: 'scale(1)', opacity: '0' },
				},
				'quill-write': {
					'0%': { width: '0%' },
					'100%': { width: '100%' },
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'page-flip': {
					'0%': { transform: 'rotateY(0deg)', transformOrigin: 'left center' },
					'100%': { transform: 'rotateY(-180deg)', transformOrigin: 'left center' },
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'fly': {
					'0%': { transform: 'translateY(0) translateX(0) rotate(0deg)' },
					'25%': { transform: 'translateY(-15px) translateX(5px) rotate(2deg)' },
					'50%': { transform: 'translateY(-5px) translateX(10px) rotate(-1deg)' },
					'75%': { transform: 'translateY(-10px) translateX(-5px) rotate(1deg)' },
					'100%': { transform: 'translateY(0) translateX(0) rotate(0deg)' },
				},
				'cursor-blink': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0' },
				},
				'ink-drop': {
					'0%': { transform: 'scale(0)', opacity: '1' },
					'100%': { transform: 'scale(20)', opacity: '0' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'ink-spread': 'ink-spread 2s ease-out',
				'quill-write': 'quill-write 1.5s ease-out forwards',
				'fade-in': 'fade-in 0.5s ease-out',
				'page-flip': 'page-flip 1.5s ease-in-out',
				'float': 'float 6s ease-in-out infinite',
				'fly': 'fly 8s ease-in-out infinite',
				'cursor': 'cursor-blink 0.8s step-end infinite',
				'ink-drop': 'ink-drop 0.5s ease-out forwards',
			},
			cursor: {
				'ink-drop': 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 16 16\'><circle cx=\'8\' cy=\'8\' r=\'4\' fill=\'%231A1F2C\'/></svg>") 8 8, auto',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
