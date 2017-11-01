import Tone from "tone"
import chords from "../constants/chords"

const synth = new Tone.PolySynth(6, Tone.AMSynth).toMaster()
// const reverb = new Tone.Freeverb().toMaster()
// synth.connect(reverb)
Tone.Transport.bpm.value = 160
Tone.Transport.start()

const setPlay = (time, note) => {
  synth.triggerAttackRelease(note, "2n + 4n", time)
}

export const basicSound = () => {
  const melody = new Tone.Part(
    setPlay,
    [
      ["0:0:0", chords.D69],
      ["1:0:0", chords.Aadd9],
      ["2:0:0", chords.E],
      ["3:0:0", chords["F#m7(11)"]],
      ["4:0:0", chords.D69],
      ["5:0:0", chords.Aadd9],
      ["6:0:0", chords.E],
      ["7:0:0", chords["F#m7(11)"]]
    ]
  )
  melody.start()
}

export default basicSound
