export const themes = {
  purple_rain: {
    id: 'purple_rain',
    label: 'Purple Rain',
    artist: 'Prince',
    year: 1984,
    coverImage: '/albums/purple-rain.jpg',
    audioClip: '/audio/purple-rain-clip.mp3',
    tokens: {
      '--bg-primary': '#0d0010',
      '--bg-secondary': '#1a0020',
      '--bg-tile': '#1e0028',
      '--text-primary': '#f5e6ff',
      '--text-secondary': '#c9a8e0',
      '--text-accent': '#ffffff',
      '--accent': '#c724b1',
      '--accent-soft': '#7b2d8b',
      '--ticker-bg': '#0d0010',
      '--ticker-text': '#e066d4',
      '--border-color': 'rgba(199, 36, 177, 0.2)',
      '--font-primary': 'Georgia, serif',
      '--font-display': 'Georgia, serif',
      '--font-weight-display': '700',
      '--tile-bg': '#1e0028',
      '--tile-border': 'rgba(199, 36, 177, 0.15)',
      '--grain-opacity': '0.04',
    },
    layoutVariant: 'dark',
    tileStyle: 'dark-sleeve',
  },

  joshua_tree: {
    id: 'joshua_tree',
    label: 'The Joshua Tree',
    artist: 'U2',
    year: 1987,
    coverImage: '/albums/joshua-tree.jpg',
    audioClip: '/audio/joshua-tree-clip.mp3',
    tokens: {
      '--bg-primary': '#0a0a0a',
      '--bg-secondary': '#141414',
      '--bg-tile': '#1a1a1a',
      '--text-primary': '#e8e0d0',
      '--text-secondary': '#8a7f6e',
      '--text-accent': '#ffffff',
      '--accent': '#c4a45a',
      '--accent-soft': '#5a4a2a',
      '--ticker-bg': '#0a0a0a',
      '--ticker-text': '#c4a45a',
      '--border-color': 'rgba(196, 164, 90, 0.15)',
      '--font-primary': '"Georgia", serif',
      '--font-display': '"Georgia", serif',
      '--font-weight-display': '400',
      '--tile-bg': '#161410',
      '--tile-border': 'rgba(196, 164, 90, 0.12)',
      '--grain-opacity': '0.03',
    },
    layoutVariant: 'wide',
    tileStyle: 'desert-sleeve',
  },

  body_talk: {
    id: 'body_talk',
    label: 'Body Talk',
    artist: 'Robyn',
    year: 2010,
    coverImage: '/albums/body-talk.jpg',
    audioClip: '/audio/body-talk-clip.mp3',
    tokens: {
      '--bg-primary': '#f5f5f5',
      '--bg-secondary': '#ebebeb',
      '--bg-tile': '#ffffff',
      '--text-primary': '#111111',
      '--text-secondary': '#555555',
      '--text-accent': '#000000',
      '--accent': '#e31e24',
      '--accent-soft': '#f5c0c2',
      '--ticker-bg': '#111111',
      '--ticker-text': '#f5f5f5',
      '--border-color': 'rgba(0, 0, 0, 0.1)',
      '--font-primary': '"Inter", system-ui, sans-serif',
      '--font-display': '"Inter", system-ui, sans-serif',
      '--font-weight-display': '500',
      '--tile-bg': '#ffffff',
      '--tile-border': 'rgba(0, 0, 0, 0.08)',
      '--grain-opacity': '0',
    },
    layoutVariant: 'light',
    tileStyle: 'clean-sleeve',
  },
}

// Helper: get theme by id, fallback to first theme
export function getTheme(id) {
  return themes[id] ?? Object.values(themes)[0]
}

// Helper: get all themes as an array (for rendering the vinyl selector)
export function getAllThemes() {
  return Object.values(themes)
}
