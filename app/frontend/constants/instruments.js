export const types = (onload) => {
  const getParams = ({ name, attack, release, volume }) => (
    [{
      E2: "e2.mp3",
      E3: "e3.mp3",
      E4: "e4.mp3",
      E5: "e5.mp3"
    }, {
      attack:  attack || 0,
      release: release || 0.5,
      baseUrl: `/assets/audios/${name}/`,
      volume:  volume || 0,
      onload
    }]
  )
  return {
    "A.Piano":   getParams({ name: "a_piano" }),
    "E.Piano":   getParams({ name: "e_piano" }),
    "A.Guitar1": getParams({ name: "a_guitar1" }),
    "A.Guitar2": getParams({ name: "a_guitar2", attack: 0.2, volume: 5 }),
    "E.Guitar1": getParams({ name: "e_guitar1" }),
    "E.Guitar2": getParams({ name: "e_guitar2", volume: -10 }),
    "E.Guitar3": getParams({ name: "e_guitar3", volume: -10 }),
    Strings:     getParams({ name: "strings", release: 1 }),
    Accordion:   getParams({ name: "accordion" }),
    Choir:       getParams({ name: "choir", release: 1, volume: 5 }),
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
