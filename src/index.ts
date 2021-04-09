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



  this.controller = new Controller(selectSliderParams)

  //let mod = new Model(selectSliderParams.sliderModelParams)


//   function qwe (model, view) {
//     view.maxValue  .sliderScale.maxVal.textContent = model.max
// }


  

 
  //this.sliderScaleView = new View(selectSliderParams.sliderViewParams)


  // contr.HandlerCurrentsPositionTextContent(mod, sliderScaleView)
  // contr.getHandlerCurrentsPosition(mod, sliderScaleView)
  // contr.setCurrentValue(mod, sliderScaleView)
  //let sliderScaleView1 = new View()
  this.sliderScalePlugin = this.controller.view.scaleVaeInView

  
 // let sliderHandlerPlugin = sliderScaleView.thumb
  // this.i = document.createElement('button')
  // this.vert = document.createElement('button')

  this.j = true
  let self = this
  // this.vert.onclick = function() {
  //   controller.model.isVertical = !controller.model.isVertical
  //   //controller.view.verticalControl()
  //   controller.verticalMethod(controller.model.isVertical)
  // }
  // this.i.onclick = function() {
  //   controller.model.isRange = !controller.model.isRange 
   
  //   controller.qwe(controller.model.isRange )
  // }
  
  this.append(this.sliderScalePlugin)
  //alert(Boolean("false"))
  // this.append(this.i)
  // this.append(this.vert)
  //name() = this
  return this
  
}
// let i = $('#qwe').rangeSlider()
// console.log(i.sliderScaleView)

// console.log(
// $('#rootq').rangeSlider(

//   {
let i = new SliderPanel('#qwe')

// $("#qwe").rangeSlider(
          
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
//       },

//     sliderModelParams: {
//       min: 0,
//       max: 10,
//       //current: 50,
//       minCurrentDoubleHeandler: 25,
//       maxCurrentDoubleHeandler: 75,
//       isVertical: true,
//       isRange: true,
//       step: 0.01,
//       },
//   }
// )