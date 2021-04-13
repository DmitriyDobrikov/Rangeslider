// //import Icon from './images/1.png'
//const imageSrc = require('./images/1.png')
//const $ = require( 'jquery' );

import $ from 'jquery';
import { ViewType, defaultView } from "./View/types"
import { SliderParams, defaultSlider, } from "./types"
import "./main.scss"
import { SliderPanel } from './blocks/panel/panel'


//const $ = require( 'jquery' );
import { ExampleService } from './example-service';
import { Scale } from './View/scale/scale';
import { View } from './View/view';
import { Controller } from "./Controller/controller"
import { Model } from './Model/model';


import './blocks/switch-buttons/switch-buttons.scss'

import { ControlParamButton } from './blocks/switch-buttons/switch-buttons'




$.fn.rangeSlider = function  ( selectSliderParams : SliderParams = defaultSlider,): JQuery {
  //this.newObj = selectSliderParams
  //Object.assign(this.newObj, selectSliderParams)

  this.controller = new Controller(selectSliderParams)

  this.sliderScalePlugin = this.controller.view.scaleVaeInView

  this.append(this.sliderScalePlugin)
  console.log(selectSliderParams.sliderViewParams.scaleView.scaleProgress)

  return this
  
}




// let i = new SliderPanel('#qwe', 
//   {
//         sliderViewParams: {
//         scaleView: {
//             scaleWidth: "100px",
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
//       },
  
//       sliderModelParams: {
//         min: 0,
//         max: 10,
//         current: 5,
//         minCurrentDoubleHeandler: 2,
//         maxCurrentDoubleHeandler: 7,
//         isVertical: true,
//         isRange: false,
//         step: 1,
//         },
//     })



// let j = new SliderPanel('#qwer', {
//   sliderViewParams: {
//     scaleView: {
//         scaleWidth: "200px",
//         scaleHeight: "6px",
//         scaleBorder: "0px solid black",
//         scaleBackground: "gray",
//         scaleBorderRadius: '10px',
//         scaleProgress: "black"
//   },
//     handlerView: { 
//         handlerWidth: "12px",
//         handlerHeight: "12px",
//         handlerBorder: "1px solid #FFFFFF",
//         handlerBackground: "black",
//         handlerBorderRadius: '10px',
//         handlerLeft: "0px",
//         handlerTop: "-4px",
//     },
//   },

//   sliderModelParams: {
//     min: 0,
//     max: 100,
//     current: 20,
//     minCurrentDoubleHeandler: 20,
//     maxCurrentDoubleHeandler: 88,
//     isVertical: true,
//     isRange: true,
//     step: 1,
//     },
// }
// )



//let k = new SliderPanel('#rootq')
// $("#qwer").rangeSlider()
// $("#rootq").rangeSlider()



$("#1").rangeSlider(          
  {
      sliderViewParams: {
      scaleView: {
          scaleWidth: "300px",
          scaleHeight: "6px",
          scaleBorder: "0px solid black",
          scaleBackground: "#EEEEEE",
          scaleBorderRadius: '10px',
          scaleProgress: "blue"
      },
      handlerView: { 
          handlerWidth: "12px",
          handlerHeight: "12px",
          handlerBorder: "1px solid #FFFFFF",
          handlerBackground: "blue",
          handlerBorderRadius: '10px',
          handlerLeft: "0px",
          handlerTop: "-4px",
      },
    },

    sliderModelParams: {
      min: 0,
      max: 10,
      current: 5,
      minCurrentDoubleHeandler: 2,
      maxCurrentDoubleHeandler: 7,
      isVertical: false,
      isRange: false,
      step: 1,
      },
  })


$("#2").rangeSlider(
          
  {
      sliderViewParams: {
      scaleView: {
          scaleWidth: "100px",
          scaleHeight: "6px",
          scaleBorder: "0px solid black",
          scaleBackground: "#EEEEEE",
          scaleBorderRadius: '10px',
          scaleProgress: "red"
      },
      handlerView: { 
          handlerWidth: "12px",
          handlerHeight: "12px",
          handlerBorder: "1px solid #FFFFFF",
          handlerBackground: "black",
          handlerBorderRadius: '10px',
          handlerLeft: "0px",
          handlerTop: "-4px",
      },
    },

    sliderModelParams: {
      min: 0,
      max: 20,
      current: 5,
      minCurrentDoubleHeandler: 2,
      maxCurrentDoubleHeandler: 7,
      isVertical: false,
      isRange: false,
      step: 1,
      },
  }
)


$("#3").rangeSlider(
          
  {
      sliderViewParams: {
      scaleView: {
          scaleWidth: "100px",
          scaleHeight: "6px",
          scaleBorder: "0px solid black",
          scaleBackground: "#EEEEEE",
          scaleBorderRadius: '10px',
          scaleProgress: "black"
      },
      handlerView: { 
          handlerWidth: "12px",
          handlerHeight: "12px",
          handlerBorder: "1px solid #FFFFFF",
          handlerBackground: "red",
          handlerBorderRadius: '10px',
          handlerLeft: "0px",
          handlerTop: "-4px",
      },
    },

    sliderModelParams: {
      min: 0,
      max: 60,
      current: 5,
      minCurrentDoubleHeandler: 2,
      maxCurrentDoubleHeandler: 7,
      isVertical: false,
      isRange: false,
      step: 1,
      },
  }
)