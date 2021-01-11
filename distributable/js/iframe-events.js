"use strict";

var __serlainIframeEvents = {
  alltimeNumListenersRegistered: 0,
  recognizedEvents: ["clickedLink"],
  register_listener: function (eventName = "", callback = () => {}) {
    if (!this.recognizedEvents.includes(eventName)) {
      throw new Error("There is no event by this name.");
    }

    const newListener = {
      eventName,
      callback,
      id: this.alltimeNumListenersRegistered++
    };
    this.listeners.push(newListener);
    return newListener.id;
  },
  unregister_listener: function (listenerId) {
    this.listeners = this.listeners.filter(e => e.id != listenerId);
  },
  fire: function (eventName = "", args = []) {
    if (!this.recognizedEvents.includes(eventName)) {
      throw new Error("There is no event by this name.");
    }

    this.listeners.filter(l => l.eventName == eventName).forEach(l => l.callback(...args));
  },
  listeners: []
};