import React, { Component } from "react"

import Slider                     from "../../shared/Slider"
import { MIN_VOLUME, MAX_VOLUME } from "../../../constants"

export default class VolumeControl extends Component {
  render() {
    const { volume, handleChange } = this.props
    return (
      <div className="volume-control">
        <span className="icon">
          <i className="fa fa-volume-off" />
        </span>
        <Slider
          min={MIN_VOLUME}
          max={MAX_VOLUME}
          isFullwidth
          value={volume}
          onChange={handleChange}
        />
        <span className="icon">
          <i className="fa fa-volume-up" />
        </span>
      </div>
    )
  }
}
