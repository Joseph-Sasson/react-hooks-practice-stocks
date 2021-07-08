import React from "react";
import Stock from "./Stock";

function StockContainer({stocks, click}) {
  return (
    <div>
      <h2>Stocks</h2>
      {stocks.map(stock=>
        <Stock key={stock.id} stock={stock} click={click} />
      )}
    </div>
  );
}

export default StockContainer;
