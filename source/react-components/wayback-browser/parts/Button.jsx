/*
 * 2019 Tarpeeksi Hyvae Soft
 *
 * Software: Serlain
 * 
 */

"use strict";

import {panic_if_not_type} from "../../../assert.js";

// A clickable button in a WaybackBrowser window (e.g. "reload", "forward", etc.).
//
// The button's type name should be given as a string via props.buttonName. It will
// be appended as-is into the component's class list, and can thus be used to style
// the component in CSS. But it also serves a purpose in identifying the button,
// which then determines what happens when the user clicks on the button.
//
// The following button type names are available (subject to change):
//
//   TYPE NAME        FUNCTION
//   reload           Reloads the page.
//   stop             Stops loading the page.
//   back             Moves back in the browsing history.
//   forward          Moves forward in the browsing history.
//   home             Loads the default home page.
//
export function Button(props = {})
{
    Button.validate_props(props);

    return <div className={`Button ${props.buttonName}`}>
           </div>
}

Button.validate_props = function(props = {})
{
    panic_if_not_type("object", props);
    panic_if_not_type("string", props.buttonName);

    return;
}
