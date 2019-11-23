/*
 * 2019 Tarpeeksi Hyvae Soft
 *
 * Software: Serlain
 * 
 */

"use strict";

import {panic_if_not_type} from "../../../assert.js";

export function ButtonRow_Button(props = {})
{
    ButtonRow_Button.validate_props(props);

    return <div></div>
}

ButtonRow_Button.validate_props = function(props = {})
{
    panic_if_not_type("object", props);

    return;
}
