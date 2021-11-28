import { Track, NoteEvent, Writer } from "midi-writer-js";
import { specialNotes } from "../constants/regex";

const specialNoteRegex = new RegExp(`${specialNotes.join("|")}`, "g");

/**
 * @returns Array<{ notes: string[], duration: string, wait: string | null }>
 */
const scoreToMidi = (score) => {
  return score.reduce((acc, {notes, duration}, idx) => {
    const prevNote = score[idx - 1]
    const prevMidi = acc[acc.length - 1]

    if (prevMidi && notes === '%') {
      acc.push({ ...prevMidi, wait: '0'})
      return acc
    } else if (specialNoteRegex.test(notes)) {
      return acc
    }

    let wait = '0'
    if (prevNote && prevNote.notes.length === 0) {
      // 直前のnoteが休符のとき、休符note分のwaitを入れる
      wait = prevNote.duration
    }

    acc.push({notes, duration, wait})

    return acc
  }, [])
}

export default (score, { tempo }) => {
  const track = new Track();
  const midiScore = scoreToMidi(score);
  track.setTempo(tempo);

  console.log({score, midiScore})

  track.addEvent(
    midiScore.map(
      ({notes, duration, wait}) => {
        return new NoteEvent({ pitch: notes, duration, wait })
      }
    )
  );

  const writer = new Writer(track);
  return writer.buildFile();
};
