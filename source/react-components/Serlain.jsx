/*
 * 2020 Tarpeeksi Hyvae Soft
 *
 * Software: Serlain
 * 
 */

"use strict";

import {panic_if_not_type} from "../assert.js";
import {Desktop} from "./desktop/Desktop.js";

export function Serlain(props = {})
{
    Serlain.validate_props(props);

    return <div className="Serlain">

               <Desktop availableBrowsers={props.availableBrowsers}/>

           </div>
}

Serlain.validate_props = function(props = {})
{
    panic_if_not_type("object", props);
    panic_if_not_type("array", props.availableBrowsers);

    return;
}
