"use strict";

import { panic_if_not_type } from "../../../assert.js";
export function Taskbar(props = {}) {
  Taskbar.validate_props(props);
  const [clockString, setClockString] = React.useState(current_time_string());
  React.useEffect(() => {
    let interval;
    const msUntilFirstFullMinute = 60000 - Date.now() % 60000 + 50;
    const timeout = setTimeout(() => {
      update_clock_string();
      interval = setInterval(update_clock_string, 60000);
    }, msUntilFirstFullMinute);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };

    function update_clock_string() {
      setClockString(current_time_string());
    }
  }, []);
  return React.createElement("div", {
    className: "Taskbar"
  }, React.createElement("div", {
    className: "right-side-container"
  }, React.createElement("div", {
    className: "icon-row"
  }, React.createElement("i", {
    className: "fas fa-fw fa-network-wired"
  }), React.createElement("i", {
    className: "fas fa-fw fa-window-maximize"
  }), React.createElement("i", {
    className: "fas fa-fw fa-chart-pie"
  })), React.createElement("div", {
    className: "time-display"
  }, clockString, ", ", props.browsingYear)));

  function current_time_string() {
    return new Date().toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true
    });
  }
}

Taskbar.validate_props = function (props = {}) {
  panic_if_not_type("object", props);
  return;
};