import React, { Component } from "react"
import UserCard             from "../../../UserCard"

export default class UsersResult extends Component {
  render() {
    const { users, word } = this.props
    return (
      <div className="users result">
        {users.length > 0 ? (
          users.map(user => (
            <UserCard key={user.id} highlightWords={word} {...user} />
          ))
        ) : (
          <div className="box no-user">
            <div className="media-content">
              <div className="content">
                No users.
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}
