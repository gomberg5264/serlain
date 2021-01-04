/*
 * 2020 Tarpeeksi Hyvae Soft
 *
 * Software: Serlain
 * 
 */

"use strict";

import {panic_if_not_type} from "../../../assert.js";
import {WaybackBrowser} from "../../wayback-browser/WaybackBrowser.js";
import {Icon} from "./Icon.js";

export function BrowserView(props = {})
{
    BrowserView.validate_props(props);

    const [browsersOpen, setBrowsersOpen] = React.useState([]);

    const iconElements = props.availableBrowsers.map((browser, idx)=>{
        return <Icon key={idx}
                     tabIndex={idx+1}
                     title={browser.desktopIcon.title}
                     imageUrl={browser.desktopIcon.imageUrl}
                     onDoubleClick={()=>open_browser(browser)}/>;
    });

    return <div className="BrowserView">

               {iconElements}

               {browsersOpen}

           </div>

    function open_browser(browser)
    {
        const newBrowser = <WaybackBrowser browserClassName={browser.browserClassName}
                                           browsingYear={browser.browsingYear}
                                           buttons={browser.buttons}
                                           messageBarStrings={browser.messageBarStrings}
                                           key={`${browser.browserClassName}-${Date.now()}`}/>;

        setBrowsersOpen([...browsersOpen, newBrowser]);

        return;
    }
}

BrowserView.validate_props = function(props = {})
{
    panic_if_not_type("object", props);
    panic_if_not_type("array", props.availableBrowsers);

    return;
}
