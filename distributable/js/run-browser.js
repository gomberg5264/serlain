"use strict";

import { panic_if_not_type, panic_if } from "./assert.js";
export function run_browser(browser, container) {
  panic_if_not_type("object", browser);
  panic_if(!(container instanceof HTMLElement));
  ReactDOM.unmountComponentAtNode(container);
  ReactDOM.render(browser, container);
  return;
}