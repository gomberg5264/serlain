/*
 * 2019 Tarpeeksi Hyvae Soft
 *
 * Software: Serlain
 * 
 */

"use strict";

export function panic_if_not_type(typeName, ...properties)
{
    for (const property of properties)
    {
        const isOfType = (()=>
        {
            switch (typeName)
            {
                case "array": return Array.isArray(property);
                default: return (typeof property === typeName);
            }
        })();

        if (!isOfType)
        {
            panic(`A property is of the wrong type; expected "${typeName}".`);
        }
    }

    return;
}

export function panic_if(conditional, panicMessage)
{
    panic_if_not_type("boolean", conditional);
    panic_if_not_type("string", panicMessage);

    if (conditional)
    {
        panic(panicMessage);
    }

    return;
}

export function panic(errorMessage)
{
    console.error(errorMessage);
    throw new Error(errorMessage);
}
