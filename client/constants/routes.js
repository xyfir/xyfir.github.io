import * as VIEWS from "./views";

const routes = [
    ["/", VIEWS.HOME],
    ["/about", VIEWS.ABOUT],
    ["/contact", VIEWS.CONTACT],
    ["/network", VIEWS.NETWORK],

    ["/documentation", VIEWS.LIST_DOCS],
    ["/documentation/:site/:file"]
];

export default routes;