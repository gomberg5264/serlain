"use strict";

import { panic_if_not_type } from "../../../assert.js";
export function MessageBar(props = {}) {
  MessageBar.validate_props(props);
  return React.createElement("div", {
    className: "MessageBar"
  }, props.message);
}

MessageBar.validate_props = function (props = {}) {
  panic_if_not_type("object", props);
  panic_if_not_type("string", props.message);
  return;
};