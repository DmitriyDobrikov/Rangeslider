import $ from 'jquery';
import { SliderParams, defaultSlider, } from "./types"
import "./main.scss"
import { SliderPanel } from './blocks/panel/panel'
import { Controller } from "./Controller/controller"
import './blocks/switch-buttons/switch-buttons.scss'




$.fn.rangeSlider = function  ( selectSliderParams : SliderParams = defaultSlider,): JQuery {
  this.controller = new Controller(selectSliderParams)
  this.sliderScalePlugin = this.controller.view.scaleVaeInView
  this.append(this.sliderScalePlugin)
  return this
}


// let oneHandlerHorizontal = new SliderPanel('#1'
//   ,{
//    sliderViewParams: {
//       scaleView: {
//           scaleWidth: "300px",
//           scaleHeight: "6px",
//           scaleBorder: "0px solid black",
//           scaleBackground: "gray",
//           scaleBorderRadius: '10px',
//           scaleProgress: "red"
//     },
//       handlerView: { 
//           handlerWidth: "12px",
//           handlerHeight: "12px",
//           handlerBorder: "1px solid #FFFFFF",
//           handlerBackground: "red",
//           handlerBorderRadius: '10px',
//           handlerLeft: "0px",
//           handlerTop: "-4px",
//       },
//     },

//     sliderModelParams: {
//       min: 0,
//       max: 10,
//       current: 0,
//       minCurrentDoubleHeandler: 20,
//       maxCurrentDoubleHeandler: 88,
//       isVertical: false,
//       isRange: false,
//       step: 0.1,
//       },
//   }
// )



// let oneHandlerVertical = new SliderPanel('#2' , {
//     sliderViewParams: {
//       scaleView: {
//           scaleWidth: "300px",
//           scaleHeight: "6px",
//           scaleBorder: "0px solid black",
//           scaleBackground: "gray",
//           scaleBorderRadius: '10px',
//           scaleProgress: "black"
//     },
//       handlerView: { 
//           handlerWidth: "12px",
//           handlerHeight: "12px",
//           handlerBorder: "1px solid #FFFFFF",
//           handlerBackground: "black",
//           handlerBorderRadius: '10px',
//           handlerLeft: "0px",
//           handlerTop: "-4px",
//       },
//     },

//     sliderModelParams: {
//       min: 0,
//       max: 10,
//       current: 5,
//       minCurrentDoubleHeandler: 2,
//       maxCurrentDoubleHeandler: 8,
//       isVertical: true,
//       isRange: false,
//       step: 0.2,
//       },
//   }
// )




// let twoHandlerHorizontal = new SliderPanel('#3' , {
//   sliderViewParams: {
//     scaleView: {
//         scaleWidth: "300px",
//         scaleHeight: "6px",
//         scaleBorder: "0px solid black",
//         scaleBackground: "gray",
//         scaleBorderRadius: '10px',
//         scaleProgress: "coral"
//   },
//     handlerView: { 
//         handlerWidth: "12px",
//         handlerHeight: "12px",
//         handlerBorder: "1px solid #FFFFFF",
//         handlerBackground: "coral",
//         handlerBorderRadius: '10px',
//         handlerLeft: "0px",
//         handlerTop: "-4px",
//     },
//   },

//   sliderModelParams: {
//     min: 0,
//     max: 10,
//     current: 2,
//     minCurrentDoubleHeandler: 20,
//     maxCurrentDoubleHeandler: 88,
//     isVertical: false,
//     isRange: true,
//     step: 0.1,
//     },
// }
// )


// let twoHandlerVertical = new SliderPanel('#4', 
// {
//   sliderViewParams: {
//     scaleView: {
//         scaleWidth: "200px",
//         scaleHeight: "6px",
//         scaleBorder: "0px solid black",
//         scaleBackground: "#EEEEEE",
//         scaleBorderRadius: '10px',
//         scaleProgress: "blue"
//   },
//     handlerView: { 
//         handlerWidth: "12px",
//         handlerHeight: "12px",
//         handlerBorder: "1px solid #FFFFFF",
//         handlerBackground: "red",
//         handlerBorderRadius: '5px',
//         handlerLeft: "0px",
//         handlerTop: "-4px",
//     },
//   },

//   sliderModelParams: {
//     min: -10,
//     max: 15,
//     current: 20,
//     minCurrentDoubleHeandler: 20,
//     maxCurrentDoubleHeandler: 88,
//     isVertical: true,
//     isRange: true,
//     step: 1,
//     },
// }
// )


































// $("#1").rangeSlider(          
//   {
//       sliderViewParams: {
//       scaleView: {
//           scaleWidth: "300px",
//           scaleHeight: "6px",
//           scaleBorder: "0px solid black",
//           scaleBackground: "#EEEEEE",
//           scaleBorderRadius: '10px',
//           scaleProgress: "blue"
//       },
//       handlerView: { 
//           handlerWidth: "12px",
//           handlerHeight: "12px",
//           handlerBorder: "1px solid #FFFFFF",
//           handlerBackground: "blue",
//           handlerBorderRadius: '10px',
//           handlerLeft: "0px",
//           handlerTop: "-4px",
//       },
//     },

//     sliderModelParams: {
//       min: 0,
//       max: 10,
//       current: 6,
//       minCurrentDoubleHeandler: 2,
//       maxCurrentDoubleHeandler: 7,
//       isVertical: false,
//       isRange: true,
//       step: 2,
//       },
//   }
// )


// $("#2").rangeSlider(
          
//   {
//       sliderViewParams: {
//       scaleView: {
//           scaleWidth: "200px",
//           scaleHeight: "6px",
//           scaleBorder: "0px solid black",
//           scaleBackground: "#EEEEEE",
//           scaleBorderRadius: '10px',
//           scaleProgress: "red"
//       },
//       handlerView: { 
//           handlerWidth: "12px",
//           handlerHeight: "12px",
//           handlerBorder: "1px solid #FFFFFF",
//           handlerBackground: "black",
//           handlerBorderRadius: '10px',
//           handlerLeft: "0px",
//           handlerTop: "-4px",
//       },
//     },

//     sliderModelParams: {
//       min: 0,
//       max: 20,
//       current: 5,
//       minCurrentDoubleHeandler: 2,
//       maxCurrentDoubleHeandler: 7,
//       isVertical: false,
//       isRange: false,
//       step: 1,
//       },
//   }
// )


// $("#3").rangeSlider(
          
//   {
//       sliderViewParams: {
//       scaleView: {
//           scaleWidth: "200px",
//           scaleHeight: "6px",
//           scaleBorder: "0px solid black",
//           scaleBackground: "#EEEEEE",
//           scaleBorderRadius: '10px',
//           scaleProgress: "black"
//       },
//       handlerView: { 
//           handlerWidth: "12px",
//           handlerHeight: "12px",
//           handlerBorder: "1px solid #FFFFFF",
//           handlerBackground: "red",
//           handlerBorderRadius: '10px',
//           handlerLeft: "0px",
//           handlerTop: "-4px",
//       },
//     },

//     sliderModelParams: {
//       min: 0,
//       max: 60,
//       current: 5,
//       minCurrentDoubleHeandler: 2,
//       maxCurrentDoubleHeandler: 7,
//       isVertical: true,
//       isRange: false,
//       step: 0.1,
//       },
//   }
// )
