import React, { PureComponent }            from "react"
import { ShareButtons, generateShareIcon } from "react-share"

export default class SharedButtons extends PureComponent {
  render() {
    const { url, title } = this.props
    const iconSize = 40
    const {
      TwitterShareButton,
      FacebookShareButton,
      GooglePlusShareButton,
      TumblrShareButton,
      EmailShareButton,
    } = ShareButtons
    const TwitterIcon    = generateShareIcon("twitter")
    const FacebookIcon   = generateShareIcon("facebook")
    const GooglePlusIcon = generateShareIcon("google")
    const TumblrIcon     = generateShareIcon("tumblr")
    const EmailIcon      = generateShareIcon("email")
    return (
      <div className="shared-buttons">
        <span className="icon shared-button">
          <TwitterShareButton
            url={url}
            title={`${title} | rechord`}
            hashtags={["rechord"]}
          >
            <TwitterIcon size={iconSize} round />
          </TwitterShareButton>
        </span>
        <span className="icon shared-button">
          <FacebookShareButton
            url={url}
            hashtag="rechord"
          >
            <FacebookIcon size={iconSize} round />
          </FacebookShareButton>
        </span>
        <span className="icon shared-button">
          <GooglePlusShareButton url={url} >
            <GooglePlusIcon size={iconSize} round />
          </GooglePlusShareButton>
        </span>
        <span className="icon shared-button">
          <TumblrShareButton
            url={url}
            title={`${title} | rechord`}
            tags={["rechord"]}
          >
            <TumblrIcon size={iconSize} round />
          </TumblrShareButton>
        </span>
        <span className="icon shared-button">
          <EmailShareButton
            url={url}
            subject={`${title} | rechord`}
            body={url}
          >
            <EmailIcon size={iconSize} round />
          </EmailShareButton>
        </span>
      </div>
    )
  }
}
