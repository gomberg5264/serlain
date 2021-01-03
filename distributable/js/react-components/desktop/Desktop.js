"use strict";

import { panic_if_not_type } from "../../assert.js";
import { Taskbar } from "./taskbar/Taskbar.js";
export function Desktop(props = {}) {
  Desktop.validate_props(props);
  return React.createElement("div", {
    className: "Desktop"
  }, React.createElement(Taskbar, null));
}

Desktop.validate_props = function (props = {}) {
  panic_if_not_type("object", props);
  return;
};