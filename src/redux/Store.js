import { configureStore, createSlice } from '@reduxjs/toolkit'

const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        cityName: localStorage.getItem('weatherlycity') ? localStorage.getItem('weatherlycity') : '',
        tempType: localStorage.getItem('weatherlytemptype') ? localStorage.getItem('weatherlytemptype') : 'c'
    },
    reducers: {
        setName: (state, action) => {
            state.cityName = action.payload.name
        },
        setTempType: (state, action) => {
            state.tempType = action.payload.type
        }
    }
})

export const Store = configureStore({reducer: {weather: weatherSlice.reducer}}) 

export const {setName, setTempType} = weatherSlice.actions