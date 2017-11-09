export const types = (onload) => {
  const baseInstrument = ({ name, attack, release }) => (
    [{
      E2: "e2.mp3",
      E3: "e3.mp3",
      E4: "e4.mp3",
      E5: "e5.mp3"
    }, {
      attack: attack || 0,
      release: release || 0.5,
      baseUrl: `/assets/audios/${name}/`,
      onload
    }]
  )
  return {
    Piano:   baseInstrument({ name: "piano" }),
    Guitar:  baseInstrument({ name: "guitar" }),
    Strings: baseInstrument({ name: "strings", release: 1 })
  }
}

export const click = {
  oscillator: {
    type: "square"
  },
  envelope: {
    attack:  0.005,
    decay:   0.2,
    sustain: 0.4,
    release: 0.4,
  },
  filterEnvelope: {
    attack:  0.005,
    decay:   0.1,
    sustain: 0.05,
    release: 0.4,
    baseFrequency: 300,
    octaves: 4
  }
}
