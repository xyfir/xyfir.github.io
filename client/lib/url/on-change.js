import RouteParser from "route-parser";

// Constants
import routes from "constants/routes";
import { ABOUT } from "constants/views";

// Modules
import parseQuery from "./parse-query-string";

export default function() {

    let view = "", hash = {
        route: location.hash.substr(1).split('?')[0],
        params: {}, query: {}
    };

    // Match current route
    for (let route of routes) {
        let p = (new RouteParser(route[0])).match(hash.route);

        if (p !== false) {
            hash.params = p;
            view = route[1];
            break;
        }
    }

    // Set default view / route
    if (!view) {
        view = ABOUT;
        hash.route = "/";
    }
    // Parse query string
    else {
        hash.query = parseQuery();
    }

    const title = document.title =
        "Xyfir - " + view.split('/')[0]
            .toLowerCase()
            .replace(/\b[a-z]/g, f => f.toUpperCase()); 

    return { view, hash, title };

}