import React, {useState} from 'react';
import {  Switch, Route, useRouteMatch} from 'react-router-dom';
import StockSearch from './StockSearch';
import StockHistory from './StockHistory';


export default function Stock(props) {

    const {path} = useRouteMatch();
    const[selectStock, setSelectStock] = useState(null);

    return (
        <Switch>
            <Route path={`${path}/history/:symbol`}>
                <StockHistory selectStock={selectStock} />
            </Route>

            <Route path={path}>
                <StockSearch setSelectStock={setSelectStock} />
            </Route>
        </Switch>
    )
}



