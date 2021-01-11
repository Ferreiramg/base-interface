import React from 'react';
import { GET_PLOT_FAT_TIMESERIES } from 'utils/constants/actionTypes';
import { useDispatch, useSelector } from "react-redux";
import { Plot } from './plotly';
import { useWindowSize } from 'hooks/useWindowSize';
const PlotFaturamento = () => {

    const dispatch = useDispatch();
    const { timeseries_faturamento } = useSelector(({ Plot }) => Plot);

    const size = useWindowSize();

    React.useEffect(() => {
        dispatch({ type: GET_PLOT_FAT_TIMESERIES });
    },[]);

    return (<>
        <div style={{ display: 'flex', width: '100%' }}>
            {timeseries_faturamento && <Plot
                data={timeseries_faturamento}
                layout={{
                    autosize: false,
                    width: size.width - (size.width / 9)
                    , title: 'Faturamento Anual'
                }}
            />}
        </div>
    </>);
}

export default PlotFaturamento;