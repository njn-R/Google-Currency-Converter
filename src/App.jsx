import { useState, useEffect } from 'react'
import CurrencyInput from './CurrencyInput'
import axios from 'axios'
import { format } from 'date-fns'
import './App.css'
import './CurrencyInput.css'

const API_KEY = "9d511e37d0a7d7daaae95bae"
const CURRENCY_API = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`

function App() {
  const [currencyRates, setcurrencyRates] = useState([])
  const [amountOne, setAmountOne] = useState(1)
  const [amountTwo, setAmountTwo] = useState(1)
  const [currencyOne, setCurrencyOne] = useState("USD")
  const [currencyTwo, setCurrencyTwo] = useState("INR")


    
  useEffect(()=>{
    axios.get(CURRENCY_API)
         .then((response) => setcurrencyRates(response.data.conversion_rates))
         .catch((error) => {
            console.log(error)
            setcurrencyRates(null)
          })
  }, [])

  useEffect(()=>{
    if(!!currencyRates) handleAmountOneChange(1)
  }, [currencyRates])

  const formatCurrency = (number) => {
    return number.toFixed(2)
  }

  const handleAmountOneChange = (amountOne) => {
    setAmountTwo(formatCurrency(amountOne * currencyRates[currencyTwo] / currencyRates[currencyOne]))
    setAmountOne(amountOne)
  }

  const handleAmountTwoChange = (amountTwo) => {
    setAmountOne(formatCurrency(amountTwo * currencyRates[currencyOne] / currencyRates[currencyTwo]))
    setAmountTwo(amountTwo)
  }

  const handleCurrencyOneChange = (currencyOne) => {
    setAmountTwo(formatCurrency(amountOne * currencyRates[currencyTwo] / currencyRates[currencyOne]))
    setCurrencyOne(currencyOne)
  }

  const handleCurrencyTwoChange = (currencyTwo) => {
    setAmountOne(formatCurrency(amountTwo * currencyRates[currencyOne] / currencyRates[currencyTwo]))
    setCurrencyTwo(currencyTwo)
  }

  if(!currencyRates) return <p>Something went wrong</p>
  if(currencyRates.length === 0) return <p>Loading...</p>

  return (
    <div>
      <h1>React Currency Converter</h1>
      <p className='oneCurrencyText'>1 {currencyOne} equals </p>
      <p className='rateText'> {formatCurrency(amountTwo/amountOne)} {currencyTwo}</p>
      <p className='date'>{format(new Date(), "dd/mm/yyyy h:mm")}</p>
      <CurrencyInput amount={amountOne} currency={currencyOne} currencies={Object.keys(currencyRates)} onAmountChange={handleAmountOneChange} onCurrencyChange={handleCurrencyOneChange}/>
      <CurrencyInput amount={amountTwo} currency={currencyTwo} currencies={Object.keys(currencyRates)} onAmountChange={handleAmountTwoChange} onCurrencyChange={handleCurrencyTwoChange}/> 
    </div>
  )
}

export default App
