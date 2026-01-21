/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            colors: {
                border: "hsl(var(--color-border) / <alpha-value>)",
                input: "hsl(var(--color-input) / <alpha-value>)",
                ring: "hsl(var(--color-ring) / <alpha-value>)",
                background: "hsl(var(--color-background) / <alpha-value>)",
                foreground: "hsl(var(--color-foreground) / <alpha-value>)",
                primary: {
                    DEFAULT: "hsl(var(--color-primary) / <alpha-value>)",
                    foreground: "hsl(var(--color-primary-foreground) / <alpha-value>)",
                },
                secondary: {
                    DEFAULT: "hsl(var(--color-secondary) / <alpha-value>)",
                    foreground: "hsl(var(--color-secondary-foreground) / <alpha-value>)",
                },
                accent: {
                    DEFAULT: "hsl(var(--color-accent) / <alpha-value>)",
                    foreground: "hsl(var(--color-accent-foreground) / <alpha-value>)",
                },
                muted: {
                    DEFAULT: "hsl(var(--color-muted) / <alpha-value>)",
                    foreground: "hsl(var(--color-muted-foreground) / <alpha-value>)",
                },
                card: {
                    DEFAULT: "hsl(var(--color-card) / <alpha-value>)",
                    foreground: "hsl(var(--color-card-foreground) / <alpha-value>)",
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
                arabic: ['Noto Sans Arabic', 'Arial', 'sans-serif'],
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "fade-in": {
                    "0%": { opacity: "0", transform: "translateY(10px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "fade-in-up": {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "float": {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                "pulse-soft": {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0.8" },
                },
            },
            animation: {
                "fade-in": "fade-in 0.5s ease-out",
                "fade-in-up": "fade-in-up 0.6s ease-out",
                "float": "float 3s ease-in-out infinite",
                "pulse-soft": "pulse-soft 2s ease-in-out infinite",
            },
        },
    },
};
