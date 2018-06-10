import React, { Component } from "react"

export default class ErrorBoundary extends Component {
  constructor() {
    super()
    this.state = { hasError: false }
  }
  componentDidCatch = (error) => console.log(error)
  render () {
    const { hasError } = this.state
    const { children } = this.props
    return hasError ? <span /> : children
  }
}
