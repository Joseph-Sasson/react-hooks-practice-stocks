import React from "react";
import Stock from "./Stock";

function PortfolioContainer({myStocks, click}) {
  return (
    <div>
      <h2>My Portfolio</h2>
        {myStocks.map(stock=>
          <Stock key={stock.id} stock={stock} click={click} />
        )}
    </div>
  );
}

export default PortfolioContainer;
