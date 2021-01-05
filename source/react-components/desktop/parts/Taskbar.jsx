/*
 * 2020 Tarpeeksi Hyvae Soft
 *
 * Software: Serlain
 * 
 */

"use strict";

import {panic_if_not_type} from "../../../assert.js";

export function Taskbar(props = {})
{
    Taskbar.validate_props(props);

    const [clockString, setClockString] = React.useState(current_time_string());

    // Update the clock's time display once per minute.
    React.useEffect(()=>
    {
        let interval;
        const msUntilFirstFullMinute = ((60000 - (Date.now() % 60000)) + 50);

        const timeout = setTimeout(()=>
        {
            update_clock_string();
            interval = setInterval(update_clock_string, 60000);
        }, msUntilFirstFullMinute);

        return ()=>
        {
            clearTimeout(timeout);
            clearInterval(interval);
        }
        
        function update_clock_string()
        {
            setClockString(current_time_string());
        }
    }, []);

    return <div className="Taskbar">

               <div className="right-side-container">

                   <div className="icon-row">

                       <i className="fas fa-fw fa-network-wired"/>
                       <i className="fas fa-fw fa-window-maximize"/>
                       <i className="fas fa-fw fa-chart-pie"/>

                   </div>

                   <div className="time-display">
                       
                       {clockString}, {props.browsingYear}
                       
                   </div>

               </div>

           </div>

    function current_time_string()
    {
        return new Date().toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });
    }
}

Taskbar.validate_props = function(props = {})
{
    panic_if_not_type("object", props);
    return;
}
