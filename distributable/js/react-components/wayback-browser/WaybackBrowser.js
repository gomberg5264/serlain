"use strict";

import { panic_if_not_type } from "../../assert.js";
import { BrowserWindow } from "./parts/BrowserWindow.js";
import { make_element_draggable } from "../../make-draggable.js";
export function WaybackBrowser(props = {}) {
  WaybackBrowser.validate_props(props);
  const domElement = React.useRef();
  React.useEffect(() => {
    make_element_draggable(domElement.current);
  }, [domElement]);
  return React.createElement("div", {
    className: "WaybackBrowser",
    ref: domElement,
    style: {
      zIndex: props.zIndex
    },
    onMouseDown: props.makeTopmost
  }, React.createElement(BrowserWindow, {
    buttons: props.buttons,
    browsingYear: props.browsingYear,
    browserClassName: props.browserClassName,
    messageBarStrings: props.messageBarStrings
  }));
}

WaybackBrowser.validate_props = function (props = {}) {
  panic_if_not_type("object", props, props.buttons);
  panic_if_not_type("string", props.browserClassName);
  panic_if_not_type("function", props.makeTopmost);
  panic_if_not_type("number", props.browsingYear, props.zIndex);
  panic_if_not_type("object", props.messageBarStrings);
  panic_if_not_type("function", props.messageBarStrings.fetching_page_url, props.messageBarStrings.loading_page, props.messageBarStrings.page_load_finished, props.messageBarStrings.page_load_failed);
  return;
};