"use strict";

import { panic_if_not_type } from "../assert.js";
import { Desktop } from "./desktop/Desktop.js";
export function Serlain(props = {}) {
  Serlain.validate_props(props);
  return React.createElement("div", {
    className: "Serlain"
  }, React.createElement(Desktop, {
    availableBrowsers: props.availableBrowsers
  }));
}

Serlain.validate_props = function (props = {}) {
  panic_if_not_type("object", props);
  panic_if_not_type("array", props.availableBrowsers);
  return;
};