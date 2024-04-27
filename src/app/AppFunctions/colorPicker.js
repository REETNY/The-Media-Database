import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ColorThief from "../../../node_modules/colorthief/dist/color-thief.mjs";

const initialState = {
    rgb: '',
    id: '',
    status: "pending"
}

async function getDominantColor(imageSrc) {
    return new Promise((resolve, reject) => {
        let colorThief = new ColorThief();
        let img = new Image();
        img.crossOrigin = "Anonymous";
        // img.referrerPolicy = "origin"
        // img.fetchPriority = 'high'
        img.src = imageSrc + "?not-from-cache-please";

        img.onload = () => {

            let colorApiUrl = (rgbCode) => `https://www.thecolorapi.com/id?hex=0047AB&rgb=${rgbCode}&format=json`

            let dominantColors = colorThief.getPalette(img, 5, 4)

            let checkerApi = dominantColors.filter( async(item) => {
                let code = ""
                for(let i = 0; i < item.length; i++){
                    if(i == (item.length - 1)){
                        code += `${item[i]}`
                    }else{
                        code += `${item[i]},`
                    }
                }
                let fetcher  = await fetch(colorApiUrl(code));
                let res = await fetcher.json()
                let data = res?.name || {}
                if(!data?.value || data?.value.includes("white") || data?.value.includes("light")){
                    return false
                }else{
                    return item
                }
            })

            resolve(checkerApi);
        };

        

        img.onerror = (error) => {

            reject(error);
        };
    });
}


export const getColor = createAsyncThunk('colorPicker', async({id, imageSrc}) => {
    try {
        const dominantColors = await getDominantColor(imageSrc);
        let arr = (dominantColors[0]) || [0,0,0];

        let DMC = ""
        for(let i = 0; i < arr.length; i++){
            if(i == (arr.length - 1)){
                DMC += `${arr[i]}`
            }else{
                DMC += `${arr[i]},`
            }
        }
        return DMC
        // Do something with the dominant color
    } catch (error) {
        return `0,0,0`
    }
})

const ColorPicker = createSlice({
    name: "colorPicker",
    initialState,
    reducers:{
        
    },
    extraReducers(builder){
        builder
            .addCase(getColor.fulfilled, (state, action) => {
                state.status = "fulfilled"
                state.rgb = action.payload;
            })
            .addCase(getColor.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(getColor.rejected, (state, action) => {
                state.status = "failed"
            })
    }
})
export default ColorPicker.reducer
export const rgbColor = (state) => state.colorPicker.rgb;
export const colorStatus = (state) => state.colorPicker.status;