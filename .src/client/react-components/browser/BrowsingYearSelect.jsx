/*
 * 2019 Tarpeeksi Hyvae Soft
 *
 * Software: Serlain
 * 
 */

"use strict";

import {panic_if_not_type} from "../../assert.js";

export function BrowsingYearSelect(props = {})
{
    BrowsingYearSelect.validate_props(props);

    return <div></div>
}

BrowsingYearSelect.validate_props = function(props = {})
{
    panic_if_not_type("object", props);

    return;
}
