import React, { PureComponent } from "react"
import { Timeline }             from "react-twitter-widgets"
import { document }             from "../../utils/browser-dependencies"

const customizeTwitterWidget = (data) => {
  const { style, timeoutLength } = data

  const embedCss = (doc) => {
    const element = doc.createElement("style")
    const head = doc.getElementsByTagName("head")[0]
    element.type = "text/css"
    element.innerText = style
    head.appendChild(element)
  }

  setTimeout(() => {
    const widget = document.getElementsByClassName("twitter-tl")[0].children[0].children[0]
    if (widget) {
      embedCss(widget.contentWindow.document, data.url)
    } else {
      setTimeout(() => customizeTwitterWidget(data), timeoutLength)
    }
  }, timeoutLength)
}

const data = {
  style: `
  @import url("https://fonts.googleapis.com/css?family=Ubuntu:400,700");
    * {
      font-family: "Ubuntu", 'ヒラギノ角ゴシック Pro', 'Hiragino Kaku Gothic Pro', メイリオ,
      Meiryo, 游ゴシック体, 'Yu Gothic', YuGothic, Osaka, 'ＭＳ Ｐゴシック', 'MS PGothic', sans-serif;
    }
    .timeline-Header-title a {
      font-weight: bold;
    }
    .timeline-Header-title:after {
      content: "in Twitter";
      font-size: .75em;
      margin-left: .5em;
    }
    .timeline-Tweet-author {
      height: 32px;
      display: flex;
      align-items: center;
    }
    .env-bp-430 .timeline-Tweet-text {
      font-size: 12px !important; 
      line-height: 18px !important;
    }
  `,
  timeoutLength: 300
}
customizeTwitterWidget(data)

export default class TwitterTL extends PureComponent {
  render() {
    return (
      <Timeline
        dataSource={{
          sourceType: "widget",
          widgetId:   "941709873326129152"
        }}
        options={{
          username:  "rechord_cc",
          height:    "520",
          linkColor: "#177fcb"
        }}
      />
    )
  }
}
