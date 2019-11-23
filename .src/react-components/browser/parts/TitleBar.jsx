/*
 * 2019 Tarpeeksi Hyvae Soft
 *
 * Software: Serlain
 * 
 */

"use strict";

import {panic_if_not_type} from "../../../assert.js";

export function TitleBar(props = {})
{
    TitleBar.validate_props(props);

    return <div className="TitleBar">Serlain</div>
}

TitleBar.validate_props = function(props = {})
{
    panic_if_not_type("object", props);

    return;
}
