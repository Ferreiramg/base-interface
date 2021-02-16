import Home from "./Home";
import Conciliacao from "./Conciliacao";
import Faturamento from "./Faturamento";
import ListFaturamento from "./Faturamento/List";
import FobList from "./Faturamento/FobList";
import PlotFaturamento from "./Reports/PlotFaturamento";
import EditorText from "./EditorText";
import StoreImages from "./StoreImage";

import * as route from "utils/constants/routes";

const breadcrumbNameMap = {
    [route.FECHAMENTO]: 'Fechamento',
    [route.FECHAMENTO_IMPORTANTE]: 'Importante',
    [route.CONCILIACAO]: 'Conciliação',
    [route.FATURAMENTO]: 'Faturamento',
    [route.REPORTS]: 'Relatórios',
    [route.FATURAMENTO_CHECKOUT]: 'Checar faturamento',
    [route.FATURAMENTO_FOB]: 'Ler faturamento FOB',
    [route.FATURAMENTO_LIST]: 'Listar todos faturamentos',
    [route.EDITOR_TEXT]: 'Editor de Textos',
    [route.FATURAMENTO_PLOT_TIMESERIES]: 'Time Series Faturamento',
    [route.FIRESTORE_UPLOAD]: 'Firebase storage',
};
const privateRoutes = [
    { key: 'home', title: "Pagina inicial", path: route.HOME, Component: Home, exact: true },
    { key: 'word', title: "CKEditor text", path: route.EDITOR_TEXT, Component: EditorText, exact: true },
    { key: 'conciliacao', title: "Importa Conciliação", path: route.CONCILIACAO, Component: Conciliacao, exact: true },
    { key: 'faturamento', title: "Faturamento Checkout", path: route.FATURAMENTO_CHECKOUT, Component: Faturamento, exact: true },
    { key: 'faturamento-list', title: "Listar Todos Faturamentos", path: route.FATURAMENTO_LIST, Component: ListFaturamento, exact: true },
    { key: 'faturamento-fob', title: "Listar Faturamentos FOB", path: route.FATURAMENTO_FOB, Component: FobList, exact: true },
    //PLot Report
    { key: 'faturamento-timeseries', title: "Time Series Faturamento", path: route.FATURAMENTO_PLOT_TIMESERIES, Component: PlotFaturamento, exact: true },
    { key: 'faturamento-timeseries', title: "Upload Imagens com Firebase storage", path: route.FIRESTORE_UPLOAD, Component: StoreImages, exact: true },
];

export { privateRoutes, breadcrumbNameMap };