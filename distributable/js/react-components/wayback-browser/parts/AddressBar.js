"use strict";

import { panic_if_not_type } from "../../../assert.js";
export function AddressBar(props = {}) {
  AddressBar.validate_props(props);
  const inputRef = React.useRef();
  let inputFieldHasFocus = false;
  return React.createElement("div", {
    className: "AddressBar"
  }, React.createElement("input", {
    type: "text",
    readOnly: props.readOnly ? true : false,
    ref: inputRef,
    key: props.initialUrl,
    defaultValue: props.initialUrl,
    onFocus: event => {
      if (props.readOnly) return;

      if (!inputFieldHasFocus) {
        event.target.select();
      }

      inputFieldHasFocus = true;
    },
    onBlur: event => {
      if (inputFieldHasFocus) {
        if (event.target.value == "") {
          event.target.value = props.initialUrl;
        }
      }

      inputFieldHasFocus = false;
    },
    onKeyDown: event => {
      if (props.readOnly) return;

      if (event.key === "Enter") {
        submit_url(event.target.value);
      }
    },
    autoComplete: "false",
    spellCheck: "false"
  }));

  async function submit_url(url) {
    panic_if_not_type("string", url);

    if (!url.length) {
      return;
    }

    url = url.toLowerCase();

    if (inputRef && inputRef.current) {
      inputRef.current.value = url;
      inputRef.current.blur();
    }

    props.callbackUrlSubmit(url);
    return;
  }
}

AddressBar.validate_props = function (props = {}) {
  panic_if_not_type("object", props);
  panic_if_not_type("function", props.callbackUrlSubmit);
  panic_if_not_type("boolean", props.readOnly);
  panic_if_not_type("string", props.initialUrl);
  return;
};