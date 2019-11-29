/*
 * 2019 Tarpeeksi Hyvae Soft
 *
 * Software: Serlain
 * 
 */

"use strict";

import {panic_if_not_type} from "../../../assert.js";

// The message/status bar of a WaybackBrowser. Displays a given message to the user.
//
// The message to be displayed should be provided as a string via props.message.
//
export function MessageBar(props = {})
{
    MessageBar.validate_props(props);

    return <div className="MessageBar">

               {props.message}

           </div>
}

MessageBar.validate_props = function(props = {})
{
    panic_if_not_type("object", props);
    panic_if_not_type("string", props.message);

    return;
}
