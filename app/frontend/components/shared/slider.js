import React, { PureComponent } from "react"
import classNames               from "classnames"

export default class Slider extends PureComponent {
  render() {
    const { size, isFullwidth, step, min, max, value, onChange } = this.props
    const sliderClass = classNames("slider", {
      "is-fullwidth": isFullwidth,
      [`is-${size}`]: size
    })
    return (
      <input
        className={sliderClass}
        step={step || 1}
        min={min || 0}
        max={max || 100}
        value={value}
        onChange={onChange}
        type="range"
      />
    )
  }
}
