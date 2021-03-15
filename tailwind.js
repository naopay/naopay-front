module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        darker: '#1a1a2e',
        dark: '#16213e',
        light: '#0f3460',
        lighter: '#F2ECFF',
        confirm: '#00C896',
        cancel: '#e94560',
        selected: '#2c476d',
        unselected: '#213552'
      },
    },
  },
  variants: {
    extend: {
      scale: ['active'],
      opacity: ['disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
