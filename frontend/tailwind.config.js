/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        './pages/**/*.{js,jsx}',
        './components/**/*.{js,jsx}',
        './app/**/*.{js,jsx}',
        './src/**/*.{js,jsx}',
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },

                'primary-100': '#2f2f2f',
                'primary-200': '#262626',
                'primary-300': '#1e1e1e',
                'primary-400': '#171717',
                'primary-500': '#101010',
                'second-100': '#f1edf2',
                'second-200': '#dedadf',
                'second-300': '#ccc8cd',
                'second-400': '#b9b5ba',
                'second-500': '#a6a2a7',

            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
            fontFamily: {
                mont: ['Montserrat', 'sans-serif'],
                gold: ['Goldman', 'sans-serif'],
                kanit: ['Kanit', 'sans-serif']
            },
            backgroundColor: {
                'primary-100': '#2f2f2f',
                'primary-200': '#262626',
                'primary-300': '#1e1e1e',
                'primary-400': '#171717',
                'primary-500': '#101010',
                'second-100': '#f1edf2',
                'second-200': '#dedadf',
                'second-300': '#ccc8cd',
                'second-400': '#b9b5ba',
                'second-500': '#a6a2a7',
                'thirth-400': '#314F8C',
                'thirth-500': '#1C2F53'
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
}