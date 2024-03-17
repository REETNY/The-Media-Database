import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";

const initialState = {
    manga: {
        list : JSON.parse(localStorage.getItem("mangaList")) || [],
        favourite: JSON.parse(localStorage.getItem("mangaFav")) || [],
        read_watch: JSON.parse(localStorage.getItem("mangaRead_Watch")) || [],
        rating: JSON.parse(localStorage.getItem("mangaRating")) || []
    },
    anime: {
        list : JSON.parse(localStorage.getItem("animeList")) || [],
        favourite: JSON.parse(localStorage.getItem("animeFav")) || [],
        read_watch: JSON.parse(localStorage.getItem("animeRead_Watch")) || [],
        rating: JSON.parse(localStorage.getItem("animeRating")) || []
    },
    movies: {
        list : [],
        favourite: [],
        read_watch: [],
        rating: []
    },
    tv: {
        list : [],
        favourite: [],
        read_watch: [],
        rating: []
    }
}


export const DataDetzSlice = createSlice({
    name: "dataDetzSlice",
    initialState,
    reducers: {

        add_remove_Like: (state, action) => {
            let {type, id} = action.payload;

            let main_container = current(state[type].list);

            const itExist = main_container.filter((item) => item.id == id ? item : false);

            if(itExist.length > 0){
                state[type].list = state[type].list.filter((item) => item.id == id ? false : item)
            }else if(itExist.length == 0){
                state[type].list.push({id})
            }

        },

        add_remove_favourite: (state, action) => {
            let {type, id} = action.payload;
            
            let main_container = current(state[type].favourite);

            const itExist = main_container.filter((item) => item.id == id ? item : false);

            if(itExist.length > 0){
                state[type].favourite = state[type].favourite.filter((item) => item.id == id ? false : item)
            }else if(itExist.length == 0){
                state[type].favourite.push({id})
            }

        },

        addRating: (state, action) => {
            let {type, id, rate} = action.payload;

            let existting = state[type].rating.find((item) => item.id == id);

            if(existting == undefined || existting == []){
                state[type].rating.push({id, rate});
            }else{
                state[type].rating = state[type].rating.map((item) => item.id == id ? {...item, rate} : item)
            }

        },

        removeRating: (state, action) => {
            const {type, id} = action.payload;

            state[type].rating = state[type].rating.filter((item) => item.id == id ? false : item)

        },

        add_remove_read_watched: (state, action) => {

            let {type, id} = action.payload;

            let container = current(state[type].read_watch);
            const itExist = container.filter((item) => item.id == id ? item : false);

            if(itExist.length > 0){
                state[type].read_watch = state[type].read_watch.filter((item) => item.id == id ? false : item)
            }else if(itExist.length == 0){
                state[type].read_watch.push({id})
            }

        }
    }
})

export const {add_remove_Like, add_remove_favourite, addRating, add_remove_read_watched,removeRating} = DataDetzSlice.actions;
export default DataDetzSlice.reducer;
export const MangaDatas = (state) => state.dataDetzSlice.manga
export const AnimeDatas = (state) => state.dataDetzSlice.anime
export const MoviesData = (state) => state.dataDetzSlice.movies
export const TVData = (state) => state.dataDetzSlice.tv
export const ALLData = (state) => state.dataDetzSlice