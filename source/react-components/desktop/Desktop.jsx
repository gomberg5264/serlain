/*
 * 2020 Tarpeeksi Hyvae Soft
 *
 * Software: Serlain
 * 
 */

"use strict";

import {panic_if_not_type} from "../../assert.js";
import {Taskbar} from "./taskbar/Taskbar.js";

export function Desktop(props = {})
{
    Desktop.validate_props(props);
 
    return <div className="Desktop">

               <Taskbar/>

           </div>
}

Desktop.validate_props = function(props = {})
{
    panic_if_not_type("object", props);

    return;
}
