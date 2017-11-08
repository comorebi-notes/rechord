// export const synths = [{
//   oscillator: {
//     type: "triangle12"
//   },
//   envelope: {
//     attack:  0.005,
//     decay:   8,
//     sustain: 0.01,
//     release: 1
//   }
// }]

export const types = {
  Piano: [{
    E2: "e2.mp3",
    E3: "e3.mp3",
    E4: "e4.mp3",
    E5: "e5.mp3"
  }, {
    release: 0.5,
    baseUrl: "/assets/audios/piano/",
    onload:  () => console.log("Piano")
  }],
  Guitar: [{
    E2: "e2.mp3",
    E3: "e3.mp3",
    E4: "e4.mp3",
    E5: "e5.mp3"
  }, {
    release: 0.5,
    baseUrl: "/assets/audios/guitar/",
    onload:  () => console.log("Guitar")
  }],
  Strings: [{
    E2: "e2.mp3",
    E3: "e3.mp3",
    E4: "e4.mp3",
    E5: "e5.mp3"
  }, {
    release: 1,
    baseUrl: "/assets/audios/strings/",
    onload:  () => console.log("Strings")
  }]
}

export const click = {
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
}
