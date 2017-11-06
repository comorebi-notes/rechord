export const synths = [{
  oscillator: {
    type: "triangle12"
  },
  envelope: {
    attack:  0.005,
    decay:   8,
    sustain: 0.01,
    release: 1
  }
}]

export const clicks = [{
  oscillator: {
    type: "square"
  },
  envelope: {
    attack:  0.005,
    decay:   0.2,
    sustain: 0.4,
    release: 1.4,
  },
  filterEnvelope: {
    attack:  0.005,
    decay:   0.1,
    sustain: 0.05,
    release: 0.8,
    baseFrequency: 300,
    octaves: 4
  }
}]

export const piano = [{
  C4: "c4.[mp3|ogg]"
}, {
  release: 0.5,
  baseUrl: "/assets/audios/piano/"
}]
