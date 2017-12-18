import React, { Component } from "react"
import classNames           from "classnames"

export default class OrderButtons extends Component {
  render() {
    const { currentOrder, handleChangeOrder } = this.props
    const buttonClass = (target) => classNames("button", {
      "is-info":      currentOrder === target,
      "is-selected:": currentOrder === target
    })
    const orderButton = ({ order, icon }) => (
      <button
        className={buttonClass(order)}
        onClick={() => handleChangeOrder(order)}
        key={order}
      >
        <span className="icon">
          <i className={classNames("fa", `fa-${icon}`)} />
        </span>
      </button>
    )
    const order = [
      { order: "asc",  icon: "caret-up fa-lg" },
      { order: "desc", icon: "caret-down fa-lg" }
    ]
    return (
      <div className="buttons has-addons">
        {order.map(orderButton)}
      </div>
    )
  }
}
