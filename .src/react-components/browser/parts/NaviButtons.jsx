/*
 * 2019 Tarpeeksi Hyvae Soft
 *
 * Software: Serlain
 * 
 */

"use strict";

import {panic_if_not_type} from "../../../assert.js";

export function NaviButtons(props = {})
{
    NaviButtons.validate_props(props);

    return <div className="NaviButtons"
                onClick={(event)=>handle_button_click(event.target.classList.item(1))}>
               {props.buttons}
           </div>

    function handle_button_click(button)
    {
        switch (button)
        {
            case "reload":
            {
                props.callbackButtonReload();
                break;
            }
            default: break;
        }

        return;
    }
}

NaviButtons.validate_props = function(props = {})
{
    panic_if_not_type("object", props, props.buttons);
    panic_if_not_type("function", props.callbackButtonReload);

    return;
}
