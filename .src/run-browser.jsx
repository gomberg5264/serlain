/*
 * 2019 Tarpeeksi Hyvae Soft
 *
 * Software: Serlain
 * 
 */

"use strict";

import {Browser} from "./react-components/browser/Browser.js";
import {Button} from "./react-components/browser/parts/Button.js";

export function run_browser(container)
{
    const browser = Browser({
        // Create a list of the buttons that will appear on the browser's navi bar.
        // Now that the buttonName property must match a known button name - the
        // action performed when the user clicks on the button will be decided based
        // on the button name (such that e.g. a button named "reload" will reload
        // the page).
        naviButtons:
        [
            <Button buttonName="reload"
                    key="reload"/>,
        ],
    });

    ReactDOM.unmountComponentAtNode(container)
    ReactDOM.render(browser, container);

    return;
}
