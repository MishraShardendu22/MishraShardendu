import { useState, useEffect } from 'react';
import Name from "./Name"
import axios from 'axios';

function App() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [rateData, setRateData] = useState({});
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get(`https://v6.exchangerate-api.com/v6/0bd1dced4678a94769bd3e4d/latest/${fromCurrency}`)
      .then(res => {
        setRateData(res.data.conversion_rates);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [fromCurrency]);

  useEffect(() => {
    if (rateData[toCurrency]) {
      const conversionRate = rateData[toCurrency];
      setConvertedAmount(amount * conversionRate);
    }
  }, [rateData, toCurrency, amount]);

  if (loading) return (
    <p className='font-bold text-center text-white text-2xl mx-8 my-8 bg-gray-600 rounded-xl p-4 transition duration-300 ease-in-out'>
      Loading Please Wait...
    </p>
  );
  if (error) return (
    <p className='font-bold text-center text-white text-2xl mx-8 my-8 bg-gray-600 rounded-xl p-4 transition duration-300 ease-in-out'>
      There has been an error!
    </p>
  );

  return (
    <div className='flex flex-col items-center p-8 min-h-screen bg-gray-600 '>
      <p className='font-bold text-center text-3xl mb-6 text-black bg-teal-500 p-4 rounded-lg hover:bg-teal-100 scale-110 transition duration-300 ease-in-out'>
        Currency Converter
      </p>
      <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
        <label className='block mb-4 font-semibold text-lg'>
          From:
          <select
            value={fromCurrency}
            onChange={e => setFromCurrency(e.target.value)}
            className='ml-2 border rounded-md p-2'
          >
            {Object.keys(rateData).map(currency => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </label>
        <label className='block mb-4 font-semibold text-lg'>
          To:
          <select
            value={toCurrency}
            onChange={e => setToCurrency(e.target.value)}
            className='ml-2 border rounded-md p-2'
          >
            {Object.keys(rateData).map(currency => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </label>
        <label className='block mb-4 font-semibold text-lg'>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(parseFloat(e.target.value) || 0)}
            className='ml-2 border rounded-md p-2'
          />
        </label>
        <h2 className='text-xl font-semibold'>
          {amount} {fromCurrency} = {convertedAmount.toFixed(4)} {toCurrency}
        </h2>
      </div>
      <Name/>
    </div>
  );
}

export default App;
