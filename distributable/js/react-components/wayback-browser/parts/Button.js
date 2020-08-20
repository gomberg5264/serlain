"use strict";

import { panic_if_not_type } from "../../../assert.js";
export function Button(props = {}) {
  Button.validate_props(props);
  return React.createElement("div", {
    className: `Button ${props.buttonName}`
  });
}

Button.validate_props = function (props = {}) {
  panic_if_not_type("object", props);
  panic_if_not_type("string", props.buttonName);
  return;
};