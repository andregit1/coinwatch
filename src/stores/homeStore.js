import axios from 'axios'
import { create } from 'zustand'
import debounce from '../helpers/debounce'

const homeStore = create((set) => ({
  coins: [],
  trending: [],
  query: '',
  searching: false,
  searched: false,
  connected: false,

  setQuery: (e) => {
    set({ query: e.target.value });
    homeStore.getState().searchCoins();
  },

  resetQuery: () => set({ query: '', searching: false, searched: false }),

  searchCoins: debounce(async () => {
    set({searching: true})
    const { query, trending } = homeStore.getState()
    
    if (query.length > 2) {
      const res = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`)
      
      const coins = res.data.coins.map(coin => {
        return {
          id: coin.id,
          name: coin.name,
          image: coin.large,
        }
      })

      set({coins, searching: false, searched: true})
    } else {
      set({coins: trending, searching: false, searched: false})
    }
  }, 500), 
  
  fetchCoins: async () => {
    const [res, btcResIDR] = await Promise.all([
      axios.get('https://api.coingecko.com/api/v3/search/trending'),
      axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=idr`),
    ])

    const btcPriceIDR = btcResIDR.data.bitcoin.idr
    
    const coins = res.data.coins.map(coin => {
      return {
        id: coin.item.id,
        name: coin.item.name,
        image: coin.item.large,
        priceBTC: coin.item.price_btc.toFixed(10),
        priceIDR: coin.item.price_btc * btcPriceIDR.toFixed(10)
      }
    })
    set({coins, trending: coins})
  }
}))

export default homeStore