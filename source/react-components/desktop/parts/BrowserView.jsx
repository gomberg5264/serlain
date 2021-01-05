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

    const [activeBrowser, setActiveBrowser] = React.useState(props.availableBrowsers[3]);

    const browserDesktopIcons = props.availableBrowsers.map((browser, idx)=>{
        return <Icon key={idx}
                     tabIndex={idx+1}
                     title={browser.desktopIcon.title}
                     imageUrl={browser.desktopIcon.imageUrl}
                     browsingYear={browser.browsingYear}
                     onDoubleClick={()=>open_browser_window(browser)}/>;
    });

    const activeBrowserElement = (()=>
    {
        if (activeBrowser)
        {
            return <WaybackBrowser browserClassName={activeBrowser.browserClassName}
                                   browsingYear={activeBrowser.browsingYear}
                                   buttons={activeBrowser.buttons}
                                   messageBarStrings={activeBrowser.messageBarStrings}
                                   closeBrowser={close_active_browser_window}
                                   key={Date.now()}/>;
        }

        return "";
    })();

    React.useEffect(()=>
    {
        props.callbackBrowserChanged(activeBrowser);
    }, [activeBrowser]);

    return <div className="BrowserView">

               {browserDesktopIcons}

               {activeBrowserElement}

           </div>

    function open_browser_window(browser)
    {
        setActiveBrowser(browser);

        return;
    }

    function close_active_browser_window()
    {
        setActiveBrowser(undefined);

        return;
    }
}

BrowserView.validate_props = function(props = {})
{
    panic_if_not_type("object", props);
    panic_if_not_type("array", props.availableBrowsers);
    panic_if_not_type("function", props.callbackBrowserChanged);

    return;
}
