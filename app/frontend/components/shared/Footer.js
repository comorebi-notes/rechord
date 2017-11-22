import React, { PureComponent } from "react"

export default class Footer extends PureComponent {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <div className="content has-text-centered">
            <p>
              <small>
                Copyright &copy; 2017 comorebi notes All Rights Reserved.
              </small>
            </p>
          </div>
        </div>
      </footer>
    )
  }
}
