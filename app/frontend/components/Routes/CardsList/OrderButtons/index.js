import React, { Component } from "react"
import classNames           from "classnames"

export default class OrderButtons extends Component {
  render() {
    const { currentOrder, handleChangeOrder } = this.props
    const buttonClass = (target) => classNames("button", {
      "is-info":      currentOrder === target,
      "is-selected:": currentOrder === target
    })
    const orderButton = ({ order, label, icon }) => (
      <button
        className={buttonClass(order)}
        onClick={() => handleChangeOrder(order)}
        key={order}
      >
        <span className="icon">
          <i className={classNames("fa", `fa-${icon}`)} />
        </span>
        <span>{label}</span>
      </button>
    )
    const order = [
      { order: "asc",  label: "昇順", icon: "caret-up fa-lg" },
      { order: "desc", label: "降順", icon: "caret-down fa-lg" }
    ]
    return (
      <div className="buttons has-addons">
        {order.map(orderButton)}
      </div>
    )
  }
}
