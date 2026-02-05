import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx}"],
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Gaming-inspired colors
        gaming: {
          dark: "hsl(var(--gaming-dark))",
          darker: "hsl(var(--gaming-darker))",
          purple: "hsl(var(--gaming-purple))",
          blue: "hsl(var(--gaming-blue))",
          cyan: "hsl(var(--gaming-cyan))",
          silver: "hsl(var(--gaming-silver))",
          gold: "hsl(var(--gaming-gold))",
          green: "hsl(var(--gaming-green))",
          red: "hsl(var(--gaming-red))",
        },
        strength: "hsl(var(--strength))",
        intelligence: "hsl(var(--intelligence))",
        discipline: "hsl(var(--discipline))",
        magic: "hsl(var(--magic))",
        luck: "hsl(var(--luck))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        glow: {
          "0%, 100%": {
            opacity: "1",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "0.8",
            transform: "scale(1.05)",
          },
        },
        pulse: {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0.5",
          },
        },
        shimmer: {
          "0%": {
            backgroundPosition: "-200% 0",
          },
          "100%": {
            backgroundPosition: "200% 0",
          },
        },
        levelUp: {
          "0%": {
            transform: "scale(1) rotate(0deg)",
            opacity: "0",
          },
          "50%": {
            transform: "scale(1.2) rotate(180deg)",
            opacity: "1",
          },
          "100%": {
            transform: "scale(1) rotate(360deg)",
            opacity: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        glow: "glow 2s ease-in-out infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2s linear infinite",
        levelUp: "levelUp 1s ease-in-out",
      },
      boxShadow: {
        neon: "0 0 5px theme('colors.gaming.cyan'), 0 0 20px theme('colors.gaming.cyan'), 0 0 35px theme('colors.gaming.cyan'), 0 0 50px theme('colors.gaming.cyan')",
        "neon-purple": "0 0 5px theme('colors.gaming.purple'), 0 0 20px theme('colors.gaming.purple'), 0 0 35px theme('colors.gaming.purple')",
        "neon-blue": "0 0 5px theme('colors.gaming.blue'), 0 0 20px theme('colors.gaming.blue'), 0 0 35px theme('colors.gaming.blue')",
        "neon-gold": "0 0 5px theme('colors.gaming.gold'), 0 0 20px theme('colors.gaming.gold'), 0 0 35px theme('colors.gaming.gold')",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
