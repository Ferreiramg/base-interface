import Home from "./Home";
import Conciliacao from "./Conciliacao";

import * as route from "utils/constants/routes";

const breadcrumbNameMap = {
    [route.FECHAMENTO]: 'Fechamento',
    [route.FECHAMENTO_IMPORTANTE]: 'Importante',
    [route.CONCILIACAO]: 'Conciliação',
    '/spam': 'Spam'
};
const privateRoutes = [
    { key: 'home', title: "Pagina inicial", path: route.HOME, Component: Home, exact: true },
    { key: 'conciliacao', title: "Importa Conciliação", path: route.CONCILIACAO, Component: Conciliacao, exact: true },
];

export { privateRoutes, breadcrumbNameMap };