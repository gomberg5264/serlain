"use strict";

import { panic_if_not_type } from "../../assert.js";
import { BrowserView } from "./parts/BrowserView.js";
import { Taskbar } from "./parts/Taskbar.js";
export function Desktop(props = {}) {
  Desktop.validate_props(props);
  return React.createElement("div", {
    className: "Desktop"
  }, React.createElement(BrowserView, {
    availableBrowsers: props.availableBrowsers
  }), React.createElement(Taskbar, null));
}

Desktop.validate_props = function (props = {}) {
  panic_if_not_type("object", props);
  panic_if_not_type("array", props.availableBrowsers);
  return;
};