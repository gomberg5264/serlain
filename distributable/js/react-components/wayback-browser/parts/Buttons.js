"use strict";

import { panic_if_not_type } from "../../../assert.js";
import { Button } from "./Button.js";
export function Buttons(props = {}) {
  Buttons.validate_props(props);
  return React.createElement("div", {
    className: "Buttons",
    onClick: event => handle_button_click(event.target.classList.item(1))
  }, props.buttons.map((name, idx) => React.createElement(Button, {
    buttonName: name,
    key: idx
  })));

  function handle_button_click(button) {
    switch (button) {
      case "reload":
        props.callbackButtonReload();
        break;

      case "stop":
        props.callbackButtonStop();
        break;

      case "back":
        props.callbackButtonBack();
        break;

      case "forward":
        props.callbackButtonForward();
        break;

      case "home":
        props.callbackButtonHome();
        break;

      default:
        break;
    }

    return;
  }
}

Buttons.validate_props = function (props = {}) {
  panic_if_not_type("object", props, props.buttons);
  panic_if_not_type("function", props.callbackButtonReload, props.callbackButtonStop, props.callbackButtonBack, props.callbackButtonForward, props.callbackButtonHome);
  return;
};