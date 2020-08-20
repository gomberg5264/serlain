"use strict";

import { panic_if_not_type } from "../../../assert.js";
export function TitleBar(props = {}) {
  TitleBar.validate_props(props);
  return React.createElement("div", {
    className: "TitleBar"
  }, "Serlain");
}

TitleBar.validate_props = function (props = {}) {
  panic_if_not_type("object", props);
  return;
};