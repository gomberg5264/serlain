/*
 * 2019 Tarpeeksi Hyvae Soft
 *
 * Software: Serlain
 * 
 */

"use strict";

import {panic_if_not_type} from "../../assert.js";
import {BrowserWindow} from "./parts/BrowserWindow.js";

export function Browser(props = {})
{
    Browser.validate_props(props);
 
    return <div className="Browser">

               <BrowserWindow buttons={props.buttons}
                              browsingYear={props.browsingYear}
                              browserClassName={props.browserClassName}
                              messageBarStrings={props.messageBarStrings}/>

           </div>
}

Browser.validate_props = function(props = {})
{
    panic_if_not_type("object", props, props.buttons);
    panic_if_not_type("string", props.browserClassName);
    panic_if_not_type("number", props.browsingYear);

    panic_if_not_type("object", props.messageBarStrings);
    panic_if_not_type("function", props.messageBarStrings.fetching_page_url,
                                  props.messageBarStrings.loading_page,
                                  props.messageBarStrings.page_load_finished,
                                  props.messageBarStrings.page_load_failed);

    return;
}
