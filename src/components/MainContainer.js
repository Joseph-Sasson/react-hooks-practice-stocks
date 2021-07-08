import React, {useState, useEffect} from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([])
  const [myStocks, setMyStocks] = useState([])
  const [sort, setSort] = useState('')
  const [displayedStocks, setDisplayedStocks] = useState([])


  useEffect(()=>{
    fetch('http://localhost:3001/stocks')
    .then(res=>res.json())
    .then(data => {
      setStocks(data)
      setDisplayedStocks(data)}
      )
  },[])

  const buy = (stock)=>{
    if (!myStocks.includes(stock)){
    const updatedPortfolio = [...myStocks, stock]
    setMyStocks(updatedPortfolio)}
  }

  const sell = (stock)=>{
    const updatedPortfolio = [...myStocks].filter(mystocks=> mystocks.id !== stock.id)
        setMyStocks(updatedPortfolio)
  }

  const sortStocks = (e)=>{
    const value = e.target.value
    setSort(value)}

    const sortByName = ()=>{
      return (
      [...displayedStocks].sort(function(a, b) {
        let nameA = a.name.toUpperCase()
        let nameB = b.name.toUpperCase()
        if (nameA < nameB) {
          return -1
        }
        if (nameA > nameB) {
          return 1
        }
        return 0
      }))}

    const sortByPrice = ()=>{
      return(
      [...displayedStocks].sort(function (a, b) {
        return a.price - b.price
      }))}

  useEffect(()=>{
    if (sort === 'Alphabetically')
    {const sortedStocks = sortByName()
      setDisplayedStocks(sortedStocks)}
    else
    {const sortedStocks = sortByPrice()
      setDisplayedStocks(sortedStocks)}
  }, [sort])

  function handleFilter(e){
    let value = e.target.value
    setDisplayedStocks(stocks.filter(stock=>{
      return stock.type === value
  }))
  }

  return (
    <div>
      <SearchBar sort={sortStocks} filter={handleFilter} />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={displayedStocks} click={buy} />
        </div>
        <div className="col-4">
          <PortfolioContainer myStocks={myStocks} click={sell} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
