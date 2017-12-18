import React, { Component } from "react"
import UserCard             from "../../../UserCard"

export default class UsersSearch extends Component {
  render() {
    const { users } = this.props
    return (
      <div className="users">
        {users.length > 0 ? (
          users.map(user => (
            <UserCard key={user.id} {...user} />
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
