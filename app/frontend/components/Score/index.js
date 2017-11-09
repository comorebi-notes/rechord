import React, { PureComponent } from "react"
import classNames               from "classnames"

export default class Score extends PureComponent {
  render() {
    const { text } = this.props
    const chordClass = (chord) => chord.replace(/#/, "s")
    return (
      <div className="score">
        {text.map((line, i) => (
          line[0] ? (
            <div key={`${line}${i}`}>
              {line.map((chords, j) => (
                <div className="chords" key={`${chords}${j}`}>
                  {chords.map((chord, k) => (
                    <span className="chord" key={`${chord}${k}`}>
                      <span className={classNames("root", chordClass(chord[0]))}>
                        {chord[0]}
                      </span>
                      <span className="type">
                        {chord[1]}
                      </span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <p className="comment" key={i} />
          )
        ))}
      </div>
    )
  }
}
