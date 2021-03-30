// //import Icon from './images/1.png'
//const imageSrc = require('./images/1.png')
//const $ = require( 'jquery' );

import $ from 'jquery'
import { ViewType, defaultView } from "./View/types"
import { SliderParams, defaultSlider } from "./types"


//const $ = require( 'jquery' );
import { ExampleService } from './example-service';
import { Scale } from './View/scale/scale';
import { View } from './View/view';
import { Controller } from "./Controller/controller"
import { Model } from './Model/model';



// type SliderViewParams = {
//   sliderViewParams?: ViewType,
//   sliderModelParams?: ModelType,
// }

//selectSliderView : SliderViewParams = {sliderViewParams: defaultView}
//{handlerView: {handlerBackground: "red"}, scaleView: {scaleBackground: "red"}
//slider selectSliderView: ViewType,

$.fn.examplePlugin = function ( selectSliderParams : SliderParams = defaultSlider,) {



  let contr = new Controller()

  let mod = new Model(selectSliderParams.sliderModelParams)


//   function qwe (model, view) {
//     view.maxValue  .sliderScale.maxVal.textContent = model.max
// }



 
  let sliderScaleView = new View(selectSliderParams.sliderViewParams)
  contr.HandlerCurrentsPositionTextContent(mod, sliderScaleView)
  contr.getHandlerCurrentsPosition(mod, sliderScaleView)
  contr.setCurrentValue(sliderScaleView)
  //let sliderScaleView1 = new View()
  let sliderScalePlugin = sliderScaleView.scaleVaeInView
 // let sliderHandlerPlugin = sliderScaleView.thumb
  


  // let i = sliderScaleView.sliderScale
  // let j = sliderScaleView.sliderHandler
  //let sliderHandlerView = new View().sliderHandler
  // let t = new View()
  // sliderScaleView.viewSliderMove(i, j)
  //sliderScale.scaleConstruct()
  //let t = sliderScaleView.sliderScale
  
  // let self = this
  // let t = sliderScale.scale


  //contr.getHandlerCurrentsPosition (mod, sliderScaleView)

  //console.log(sliderScaleView.correctValue)




  this.append(sliderScalePlugin)
  
  //sliderScaleView.viewSliderMove(i, j)

  // i.onclick = function() {
  //   console.log(sliderScaleView.controller)
  // }
  // alert(sliderScaleView.maxValue)


  return this
  
};

$('#rootq').examplePlugin(

  //   {
    
    
  // //   sliderViewParams: {
  // //     handlerView: { 
  // //       //handlerBackground: "green",
  // //       //handlerLeft: "70px"
  // //    },
  // //   scaleView: {
  // //     scaleBackground: "grey",
  // //     scaleProgress: "red"
  // //   },
  // //   },
  

  //   sliderModelParams: {
  //     min: 110,
  //     max: 120,
  //   },
  // }


);






$('#qwe').examplePlugin(

  // {
  //   sliderViewParams: {
  //     handlerView: { 
  //       handlerBackground: "green",
  //       //handlerLeft: "70px"
  //    },
  //   // scaleView: {
  //   //   //scaleBackground: "grey",
  //   //   //scaleProgress: " red"
  //   // },
  //   }
  // }
 );

 $('#qwer').examplePlugin()