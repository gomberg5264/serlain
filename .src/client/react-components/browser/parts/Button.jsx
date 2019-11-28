/*
 * 2019 Tarpeeksi Hyvae Soft
 *
 * Software: Serlain
 * 
 */

"use strict";

import {panic_if_not_type} from "../../../assert.js";

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
