import axios from 'axios'
import { create } from 'zustand'

const moment = require('moment');

const showStore = create((set) => ({
  graphData: [],
  
  reset: () => {
    set({graphData: []})
  },

  fetchData: async (id) => {
    const [graphRes, dataRes] = await Promise.all([
      axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=idr&days=7&precision=3`),
      axios.get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&market_data=true`)
    ])
    console.log("graphRes.data > ", graphRes.data)
    const graphData = graphRes.data.prices.map((price) => {
      const [timestamp, p] = price;
      // const date = new Date(timestamp).toLocaleDateString("en-us")
      const date = moment(timestamp).format("DD/MM")
      return {
        Date: date,
        Price: p
      }
    })

    
    set({ graphData, data: dataRes.data })
  }
}))

export default showStore