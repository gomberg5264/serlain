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

    const [activeBrowser, setActiveBrowser] = React.useState(props.availableBrowsers[5]);

    const themeClassName = activeBrowser
                           ? activeBrowser.operatingSystem.toLowerCase().replace(/[ .]/g, "-")
                           : "generic";

    return <div className={`Desktop theme-${themeClassName}`}>

               <BrowserView availableBrowsers={props.availableBrowsers}
                            defaultBrowser={activeBrowser}
                            callbackBrowserChanged={(browser)=>setActiveBrowser(browser)}/>

               <Taskbar browsingYear={activeBrowser? activeBrowser.browsingYear : (new Date().getFullYear())}/>

           </div>
}

Desktop.validate_props = function(props = {})
{
    panic_if_not_type("object", props);
    panic_if_not_type("array", props.availableBrowsers);

    return;
}
