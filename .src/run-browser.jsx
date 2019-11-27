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
    const browser_InternetExplorer4_800x600 = Browser({
        browserClassName: "internet-explorer-4",

        // Create a list of the interactible buttons in the browser window.
        // Note that the buttonName property must match a known button name - the
        // action performed when the user clicks on the button will be decided based
        // on the button name (such that e.g. a button named "reload" will reload
        // the page).
        buttons:
        [
            <Button buttonName="reload" key="0"/>,
            //<Button buttonName="stop" key="1"/>, Disabled while a proper implementation of its functionality is missing.
            <Button buttonName="home" key="2"/>,
            <Button buttonName="close" key="3"/>,
            <Button buttonName="back" key="4"/>,
            <Button buttonName="forward" key="5"/>,
        ],

        // Strings that will be shown in the browser's message bar as a response to
        // specific events.
        messageBarStrings:
        {
            fetching_page_url: (url)=>`Connecting to site ${url}`,
            loading_page: (url)=>`Opening page ${url}...`,
            page_load_failed: (url)=>`Unable to connect to site ${url}`, /// TODO: Is this the wording used by the real browser?
            page_load_finished: ()=>"Done",
        },

        // The DOM element in which the browser is displayed.
        container,
    });

    const browser_NetscapeNavigator3_800x600 = Browser({
        browserClassName: "netscape-navigator-3",

        buttons:
        [
            <Button buttonName="reload" key="0"/>,
            <Button buttonName="home" key="2"/>,
            <Button buttonName="close" key="3"/>,
            <Button buttonName="back" key="4"/>,
            <Button buttonName="forward" key="5"/>,
        ],

        // Strings that will be shown in the browser's message bar as a response to
        // specific events.
        messageBarStrings:
        {
            fetching_page_url: (url)=>`Connect: Looking up host: ${url}...`,
            loading_page: (url)=>`Transferring data from ${url}`,
            page_load_failed: (url)=>`Unable to connect to site ${url}`, /// TODO: Is this the wording used by the real browser?
            page_load_finished: ()=>"Document: Done",
        },

        // The DOM element in which the browser is displayed.
        container,
    });

    ReactDOM.unmountComponentAtNode(container)
    ReactDOM.render(browser_NetscapeNavigator3_800x600, container);

    return;
}
