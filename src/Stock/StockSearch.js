import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { useHistory } from 'react-router-dom';

export default function StockSearch(props) {
  const [stocks, setStocks] = useState([]);
  const [searchSymbol, setSearchSymbol] = useState("")
  const [renewStocks, setRenewStocks] = useState([])

  const history = useHistory();

  const columns = [
    { headerName: "Symbol", field: "symbol" },
    { headerName: "Name", field: "name" },
    { headerName: "Industry", field: "industry" }
  ]

  const industries = ["Health Care", "Industrials", "Consumer Discretionary", "Information Technology", "Consumer Staples", "Utilities", "Financials", "Real Estate", "Materials", "Energy", "Telecommunication Services"]


  useEffect(() => {
    fetch("http://131.181.190.87:3001/all")
      .then(res => res.json())
      .then(data => {
        setStocks(data);
        setRenewStocks(data)
      })
  }, [])


  const searchStockBySymbol = () => {
    const regexp = new RegExp(searchSymbol,"i")  
    setRenewStocks(stocks.filter(stock => regexp.test(stock.symbol)))
  }

  const industrySelect = (value) => {
    if (value ==="") return;
    fetch(`http://131.181.190.87:3001/industry?industry=${value}`)
       .then(res=>res.json())
       .then(data=>{
         setRenewStocks(data)
       })
  }



  return (
    <div style={{ border: "2px solid black", width: "600px", padding: 20, margin: 50}}>
      <div style={{ display: "flex", "justifyContent": "space-around"}}> 
        <div>          
          <lable>Select stock</lable>
          <input placeholder="------" name="symbol" value={searchSymbol} onChange={(e) => setSearchSymbol(e.target.value)} />
          <button onClick={searchStockBySymbol}>Search</button> 
        </div>

        <div>
          <label>Industry</label>
          <select name="industry" onChange={(e)=>industrySelect(e.target.value)}>
            <option value = "">-Choose one industry-</option>
            {industries.map(industry=><option value ={industry} key={industry}>{industry}</option>)}
          </select>
        </div> 
      </div>

      <div 
        className="ag-theme-balham" 
        style={{height: "400px", width: "600px",marginTop: 30}}
        > 
        <AgGridReact 
          columnDefs={columns} 
          rowData={renewStocks} 
          pagination={true} 
          onCellClicked={(params) => {
            history.push(`/stock/history/${params.data.symbol}`)
            props.setSelectStock(params.data)
            }} />
      </div>
    </div>

  )
}
