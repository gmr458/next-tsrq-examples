"use client";

// react-scan must be imported before react
import { scan } from "react-scan";
import * as React from "react";

export function ReactScan(): React.JSX.Element {
    React.useEffect(() => {
        scan({
            enabled: false,
        });
    }, []);

    return <></>;
}
