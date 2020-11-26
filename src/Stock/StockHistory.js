import React, {useState, useEffect} from 'react';
import {  useParams } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { Line } from 'react-chartjs-2'


export default function StockHistory(props) {
    const chart_data = {
        labels: [],
        datasets: [
            {
                label: 'Closing Price',
                fill: true,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: []
            }
        ]
    };

    let { symbol } = useParams();

    const[stockHistory, setStockHistory] = useState([]);
    const[beginDate, setBeginDate] = useState("");
    const [renewHistory, setRenewHistory] = useState([]);
    const [chartData, setChartData] = useState(chart_data);
    

    const columns = [
            { headerName: "Date", field: "timestamp" },
            { headerName: "Open", field: "open" },
            { headerName: "High", field: "high" },
            { headerName: "Low", field: "low" },
            { headerName: "Close", field: "close" },
            { headerName: "Volumes", field: "volumes" },
        ]

    useEffect(() => {
            fetch(`http://131.181.190.87:3001/history?symbol=${symbol}`)
              .then(res => res.json())
              .then(data => {
                data.forEach (record => {
                    record.timestamp = record.timestamp.split('T')[0]});
                setStockHistory(data)
                setRenewHistory(data);

                let update_chart_data = { ...chartData };
                update_chart_data.labels = data.map(record => record.timestamp).reverse();
                update_chart_data.datasets[0].data = data.map(record => record.close).reverse();
                setChartData(update_chart_data);
              })
          }, [symbol])


    const searchByBeginDate = () => {
        const renewHistory = stockHistory.filter(record => record.timestamp > beginDate); 
        setRenewHistory(renewHistory)
    
        let update_chart_data = { ...chartData };
        update_chart_data.labels = renewHistory.map(record => record.timestamp).reverse();
        update_chart_data.datasets[0].data = renewHistory.map(record => record.close).reverse();
        setChartData(update_chart_data);
    }

      

    return (
            <div style={{ border: "2px solid black", padding: 20, margin: 30}}>            
                <label htmlFor="begin_date">Search date from:</label>
                <input type="date" id="begin_date" name="begin_date" onChange={(e) => setBeginDate(e.target.value)} />
                <button onClick={searchByBeginDate}>Search</button>
                <h3>{props.selectStock ? "Showing stocks for the " + props.selectStock.name : "Showing stocks for the "+ "(company name)"}[{symbol}] </h3>
                <div 
                    className="ag-theme-balham"
                    style={{height: "400px", width: "1200px",margin: 50}}> 
                    <AgGridReact  columnDefs={columns}  rowData={renewHistory}  pagination={true} />
                </div>
                <div>
                    <h2>Closing Price Chart</h2>
                    <Line data={chartData}/>
                </div>
    
            </div>
        )
}


