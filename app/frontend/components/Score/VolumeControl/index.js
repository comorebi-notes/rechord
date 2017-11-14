import React, { Component } from "react"

import Slider                     from "../../shared/Slider"
import { MIN_VOLUME, MAX_VOLUME } from "../../../constants"
import * as utils                 from "../../../utils"

export default class VolumeControl extends Component {
  handleChangeVolume = (e) => {
    this.props.handleSetState({ volume: utils.valueInRange(e.target.value, MIN_VOLUME, MAX_VOLUME) })
  }
  render() {
    const { volume } = this.props
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
          onChange={this.handleChangeVolume}
        />
        <span className="icon">
          <i className="fa fa-volume-up" />
        </span>
      </div>
    )
  }
}
