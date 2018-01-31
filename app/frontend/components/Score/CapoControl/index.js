import React, { Component } from "react"

import HorizontalField        from "../../commons/HorizontalField"
import { MIN_CAPO, MAX_CAPO } from "../../../constants"
import * as utils             from "../../../utils"

export default class CapoControl extends Component {
  handleChangeCapo = (e) => {
    this.props.handleSetState({ capo: utils.valueInRange(e.target.value, MIN_CAPO, MAX_CAPO) })
  }
  render() {
    const { capo } = this.props
    return (
      <HorizontalField label="capo">
        <input
          type="number"
          min={MIN_CAPO}
          max={MAX_CAPO}
          className="input"
          value={capo}
          onChange={this.handleChangeCapo}
        />
      </HorizontalField>
    )
  }
}
