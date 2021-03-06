module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        darker: '#1a1a2e',
        dark: '#16213e',
        light: '#0f3460',
        lighter: '#f2ecff',
        confirm: '#00c896',
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
      backgroundColor: ['active'],
      backgroundOpacity: ['active']
    },
  }
}
