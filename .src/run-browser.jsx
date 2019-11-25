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
        // Create a list of the interactible buttons in the browser window.
        // Note that the buttonName property must match a known button name - the
        // action performed when the user clicks on the button will be decided based
        // on the button name (such that e.g. a button named "reload" will reload
        // the page).
        buttons:
        [
            <Button buttonName="reload" key="0"/>,
            <Button buttonName="stop" key="1"/>,
            <Button buttonName="home" key="2"/>,
            <Button buttonName="close" key="3"/>,
        ],
        container,
    });

    ReactDOM.unmountComponentAtNode(container)
    ReactDOM.render(browser, container);

    return;
}
