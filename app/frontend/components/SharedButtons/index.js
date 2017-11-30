import React, { PureComponent } from "react"
import { ShareButtons }         from "react-share"
import classNames               from "classnames"
import ShareIcon                from "./ShareIcon"

export default class SharedButtons extends PureComponent {
  render() {
    const { url, title, asShow } = this.props
    const buttonsClass = classNames("shared-buttons", { "as-show": asShow })
    const {
      TwitterShareButton,
      FacebookShareButton,
      GooglePlusShareButton,
      TumblrShareButton,
      EmailShareButton,
    } = ShareButtons

    return (
      <div className={buttonsClass}>
        <span className="icon shared-button">
          <TwitterShareButton
            url={url}
            title={`${title} | rechord`}
            hashtags={["rechord"]}
          >
            <ShareIcon icon="twitter" color="#00aced" large={!asShow} />
          </TwitterShareButton>
        </span>
        <span className="icon shared-button">
          <FacebookShareButton url={url}>
            <ShareIcon icon="facebook" color="#3b5998" large={!asShow} />
          </FacebookShareButton>
        </span>
        <span className="icon shared-button">
          <GooglePlusShareButton url={url} >
            <ShareIcon icon="google-plus" color="#dd4b39" large={!asShow} />
          </GooglePlusShareButton>
        </span>
        <span className="icon shared-button">
          <TumblrShareButton
            url={url}
            title={`${title} | rechord`}
            tags={["rechord"]}
          >
            <ShareIcon icon="tumblr" color="#2c4762" large={!asShow} />
          </TumblrShareButton>
        </span>
        <span className="icon shared-button">
          <EmailShareButton
            url={url}
            subject={`${title} | rechord`}
            body={url}
          >
            <ShareIcon icon="envelope" color="#7f7f7f" large={!asShow} />
          </EmailShareButton>
        </span>
      </div>
    )
  }
}
