/*
 * 2020 Tarpeeksi Hyvae Soft
 *
 * Software: Serlain
 * 
 */

"use strict";

import {panic_if_not_type} from "../../assert.js";
import {BrowserView} from "./parts/BrowserView.js";
import {Taskbar} from "./parts/Taskbar.js";

export function Desktop(props = {})
{
    Desktop.validate_props(props);

    const [activeBrowser, setActiveBrowser] = React.useState(undefined);

    return <div className="Desktop">

               <BrowserView availableBrowsers={props.availableBrowsers}
                            setActiveBrowser={(browser)=>setActiveBrowser(browser)}/>

               <Taskbar browsingYear={activeBrowser? activeBrowser.browsingYear : (new Date().getFullYear())}/>

           </div>
}

Desktop.validate_props = function(props = {})
{
    panic_if_not_type("object", props);
    panic_if_not_type("array", props.availableBrowsers);

    return;
}
