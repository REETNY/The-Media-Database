import { createSlice } from "@reduxjs/toolkit";

const pathFinder = (url) => {
    if(url.includes("popular")){
        return "popular"
    }else if(url.includes("now_playing")){
        return "now_playing"
    }else if(url.includes("top_rated")){
        return "top_rated"
    }else if(url.includes("upcoming")){
        return "upcoming"
    }else if(url.includes("air_today")){
        return "airing_today"
    }else if(url.includes("on_the_air")){
        return "on_the_air"
    }
}

const initialState = {
    calender: {
        calen1:{
            date: new Date().toISOString(),
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
        },
        pickedDate1:{
            date: null,
            month: null,
            year: null
        },
        calen2:{
            date: new Date().toISOString(),
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
        },
        pickedDate2:{
            date: null,
            month: null,
            year: null
        }
    },
    fils: {
        sortBy: false,
        letterFil: false,
        query: false,
        others: false,
        type: false,
        status: false,
        startCalen: false,
        endCalen: false,
        btnQuery: false,
        watchProvide: false,
    },
    isBtnQuery: false,
    urlQuerySearch: "",
    isIntersect: false,
    mov_tv: pathFinder(location.pathname)
}


export const FilterSlice1 = createSlice({
    name: "filterSlice1",
    initialState,
    reducers: {
        // for custom date 

        // function or method for next month btn
        changeDP: (state, action) => {
            let {type } = action.payload;
            if(type == "start"){
                let month = parseFloat(state.calender.calen1.month);
                month += 1;
                if (month < 0 || month > 11) {

                    // Set the date to the first day of the 
                    // month with the new year
                    let dn = new Date(parseFloat(state.calender.calen1.year), month, new Date().getDate());
            
                    // Set the year to the new year
                    let yr = dn.getFullYear();
            
                    // Set the month to the new month
                    let mn = dn.getMonth();
            
                    state.calender.calen1.date = dn.toISOString()
                    state.calender.calen1.year = yr
                    state.calender.calen1.month = mn
                }else {
                
                // Set the date to the current date
                let date = new Date();
                state.calender.calen1.month = month;
                state.calender.calen1.date = date.toISOString()
                }
            }else{
                let month = parseFloat(state.calender.calen2.month);
                month += 1;
                if (month < 0 || month > 11) {

                    // Set the date to the first day of the 
                    // month with the new year
                    let dn = new Date(parseFloat(state.calender.calen2.year), month, new Date().getDate());
            
                    // Set the year to the new year
                    let yr = dn.getFullYear();
            
                    // Set the month to the new month
                    let mn = dn.getMonth();
            
                    state.calender.calen2.date = dn.toISOString()
                    state.calender.calen2.year = yr
                    state.calender.calen2.month = mn
                }else {
                
                // Set the date to the current date
                let date = new Date();
                state.calender.calen2.month = month;
                state.calender.calen2.date = date.toISOString()
                }
            }

        },
        
        // function or method for previous month btn
        changeDM: (state, action) => {
            let {type} = action.payload
            if(type == "start"){
                let month = parseFloat(state.calender.calen1.month);
                month -= 1;
                if (month < 0 || month > 11) {

                    // Set the date to the first day of the 
                    // month with the new year
                    let dn = new Date(parseFloat(state.calender.calen1.year), month, new Date().getDate());
            
                    // Set the year to the new year
                    let yr = dn.getFullYear();
            
                    // Set the month to the new month
                    let mn = dn.getMonth();
            
                    state.calender.calen1.date = dn.toISOString()
                    state.calender.calen1.year = yr
                    state.calender.calen1.month = mn
                }else {
                    // Set the date to the current date
                    let date = new Date();
                    state.calender.calen1.month = month;
                    state.calender.calen1.date = date.toISOString()
                }
            }else{
                let month = parseFloat(state.calender.calen2.month);
                month -= 1;
                if (month < 0 || month > 11) {

                    // Set the date to the first day of the 
                    // month with the new year
                    let dn = new Date(parseFloat(state.calender.calen2.year), month, new Date().getDate());
            
                    // Set the year to the new year
                    let yr = dn.getFullYear();
            
                    // Set the month to the new month
                    let mn = dn.getMonth();
            
                    state.calender.calen2.date = dn.toISOString()
                    state.calender.calen2.year = yr
                    state.calender.calen2.month = mn
                }else {
                    // Set the date to the current date
                    let date = new Date();
                    state.calender.calen2.month = month;
                    state.calender.calen2.date = date.toISOString()
                }
            }
            
        },
        
        // function or method to take us to current month, year and date
        changeNW: (state, action) => {
            const {type} = action.payload

            if(type == "start"){
                let date = new Date();
                let month = date.getMonth();
                let year = date.getFullYear();


                state.calender.calen1.date = date.toISOString()
                state.calender.calen1.month = month;
                state.calender.calen1.year = year;
                state.calender.pickedDate1 = {
                    date: date.getDate(),
                    month,
                    year
                }
            }else{
                let date = new Date();
                let month = date.getMonth();
                let year = date.getFullYear();


                state.calender.calen2.date = date.toISOString()
                state.calender.calen2.month = month;
                state.calender.calen2.year = year;
                state.calender.pickedDate2 = {
                    date: date.getDate(),
                    month,
                    year
                }
            }
            
        },

        // function or method to pick choice of date
        pickDate: (state, action) => {
            const {month, year, val, type} = action.payload
            if(type == "start"){
                state.calender.pickedDate1.date = val
                state.calender.pickedDate1.month = month;
                state.calender.pickedDate1.year = year;
                
                state.calender.calen1.year = year
                state.calender.calen1.month = month
            }else{
                state.calender.pickedDate2.date = val
                state.calender.pickedDate2.month = month;
                state.calender.pickedDate2.year = year;
                
                state.calender.calen2.year = year
                state.calender.calen2.month = month
            }
           
        },

        goToDate: (state, action) => {
            const {month, year, type} = action.payload
            if(type == "start"){         
                state.calender.calen1.year = year
                state.calender.calen1.month = month
            }else{       
                state.calender.calen2.year = year
                state.calender.calen2.month = month
            }
        },

        // end of date functions ss

        // set fils state for filters
        setFil: (state, action) => {
            if(typeof action.payload == "string"){
                state.fils = {
                    ...state.fils,
                    [action.payload]: !state.fils[action.payload]
                }
            }else if(typeof action.payload == "object"){
                state.fils = {
                    ...state.fils,
                    [action.payload.name]: action.payload.val
                }
            }
            
        },

        setWatchProvide: (state, action) => {
            if(typeof action.payload == "string"){
                state.fils = {
                    ...state.fils,
                    [action.payload]: !state.fils[action.payload]
                }
            }else if(typeof action.payload == "object"){
                state.fils = {
                    ...state.fils,
                    [action.payload.name]: action.payload.val
                }
            }
        },

        // make search btn active or non active
        setBtnQuery: (state, action) => {
            if(typeof action.payload == "string"){
               state.isBtnQuery = !state.isBtnQuery
            }else if(typeof action.payload == "object"){
                state.isBtnQuery = action.payload.val
            }else if((typeof action.payload == "boolean")){
                state.isBtnQuery = action.payload
            }
        },

        // to save url
        saveUrl: (state, action) => {
            state.urlQuerySearch = action.payload
        },

        // intersection observer
        setIntersection: (state, action) => {
            state.isIntersect = action.payload
        },

        addNewRouteMv_Tv: (state, action) => {
            state.mov_tv = action.payload;
        }
    }
})

export const {changeDP, changeDM, changeNW, pickDate, addNewRouteMv_Tv, setFil, setBtnQuery, saveUrl, setIntersection, goToDate, setWatchProvide} = FilterSlice1.actions
export const getCalenDets = (state) => state.filterSlice1.calender
export const filState = (state) => state.filterSlice1.fils
export const BtnQueryReady = (state) => state.filterSlice1.isBtnQuery
export const urlQueries = (state) => state.filterSlice1.urlQuerySearch
export const intersect = (state) => state.filterSlice1.isIntersect
export const Mv_Tv = state => state.filterSlice1.mov_tv
export default FilterSlice1.reducer