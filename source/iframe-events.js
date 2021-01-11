/*
 * 2021 Tarpeeksi Hyvae Soft
 *
 * Software: Serlain
 * 
 */

"use strict";

// Used to propagate events from inside the browser iframe to Serlain.
//
// Usage:
//
//   1. Register an event listener:
//
//      const listenerId = .register_listener("eventName", ()=>{called when the event fires});
//
//   2. Remember to unregister the listener when you no longer need it:
//
//      .unregister_listener(listenerId);
//
var __serlainIframeEvents = {

    // Count kept so that each new event listener can be given a unique id from it.
    alltimeNumListenersRegistered: 0,

    recognizedEvents: [
        "clickedLink",
    ],

    register_listener: function(eventName = "", callback = ()=>{})
    {
        if (!this.recognizedEvents.includes(eventName))
        {
            throw new Error("There is no event by this name.");
        }

        const newListener = {
            eventName,
            callback,
            id: this.alltimeNumListenersRegistered++,
        };

        this.listeners.push(newListener);

        return newListener.id;
    },

    unregister_listener: function(listenerId)
    {
        this.listeners = this.listeners.filter(e=>(e.id != listenerId));
    },

    fire: function(eventName = "", args = [])
    {
        if (!this.recognizedEvents.includes(eventName))
        {
            throw new Error("There is no event by this name.");
        }

        this.listeners.filter(l=>(l.eventName == eventName))
                        .forEach(l=>l.callback(...args));
    },

    listeners: [],
};
