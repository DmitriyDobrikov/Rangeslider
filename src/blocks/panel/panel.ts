import '../../index'
import { SliderParams, defaultSlider } from "../../types"


export class SliderPanel {



    // sliderSelector
    rangeInput
    verticalInput

    min 
    max


    panel

    constructor(sliderSelector) {
        const that = this

        this.min = document.createElement('button')
        this.max = document.createElement('input')

        this.rangeInput = document.createElement('button')

        this.panel = $('#qwe').rangeSlider()
        // console.log(i.sliderScaleView)

        this.rangeInput.onclick = function() {
            that.panel.constructor.rangeSwich()
        }






        // $(sliderSelector).rangeSlider(
            
        //     {
        //         sliderViewParams: {
        //         scaleView: {
        //             scaleWidth: "300px",
        //             scaleHeight: "6px",
        //             scaleBorder: "0px solid black",
        //             scaleBackground: "#EEEEEE",
        //             scaleBorderRadius: '10px',
        //             scaleProgress: "blue"
        //         },
        //         handlerView: { 
        //             handlerWidth: "12px",
        //             handlerHeight: "12px",
        //             handlerBorder: "1px solid #FFFFFF",
        //             handlerBackground: "blue",
        //             handlerBorderRadius: '10px',
        //             handlerLeft: "0px",
        //             handlerTop: "-4px",
        //         },

        //         },
            

        //         sliderModelParams: {
        //         min: 0,
        //         max: 10,
        //         //current: 50,
        //         minCurrentDoubleHeandler: 25,
        //         maxCurrentDoubleHeandler: 75,
        //         isVertical: false,
        //         isRange: false,
        //         step: 0.01,
        //         },
        //     }

        // )

    }


}