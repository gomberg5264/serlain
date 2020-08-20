/*
 * 2019 Tarpeeksi Hyvae Soft
 *
 * Software: Serlain
 * 
 */

"use strict";

import {panic_if_not_type} from "../../../assert.js";

// Manages the user-clickable buttons in a WaybackBrowser window.
//
// The buttons should be provided as an array of Button components via props.buttons.
//
// Callback functions for when the user clicks on the buttons should likewise be provided
// as props.
//
export function Buttons(props = {})
{
    Buttons.validate_props(props);

    return <div className="Buttons"
                onClick={(event)=>handle_button_click(event.target.classList.item(1))}>
               {props.buttons}
           </div>

    function handle_button_click(button)
    {
        switch (button)
        {
            case "reload": props.callbackButtonReload(); break;
            case "stop": props.callbackButtonStop(); break;
            case "back": props.callbackButtonBack(); break;
            case "forward": props.callbackButtonForward(); break;
            case "home": props.callbackButtonHome(); break;
            default: break;
        }

        return;
    }
}

Buttons.validate_props = function(props = {})
{
    panic_if_not_type("object", props, props.buttons);
    panic_if_not_type("function", props.callbackButtonReload,
                                  props.callbackButtonStop,
                                  props.callbackButtonBack,
                                  props.callbackButtonForward,
                                  props.callbackButtonHome);

    return;
}
