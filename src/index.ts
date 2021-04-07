// //import Icon from './images/1.png'
//const imageSrc = require('./images/1.png')
//const $ = require( 'jquery' );

import $ from 'jquery';
import { ViewType, defaultView } from "./View/types"
import { SliderParams, defaultSlider, } from "./types"
import "./main.scss"


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


// interface SliderElement extends JQuery<HTMLElement> {
//   slider: (
//     method?: CompleteUserOptions | keyof PluginMethods,
//     options?: CompleteUserOptions
//   ) => void;
// }
// interface JQuery {
//   examplePlugin: Function;
// }




$.fn.examplePlugin = function examplePlugin ( selectSliderParams : SliderParams = defaultSlider,): JQuery {



  let controller = new Controller(selectSliderParams)

  //let mod = new Model(selectSliderParams.sliderModelParams)


//   function qwe (model, view) {
//     view.maxValue  .sliderScale.maxVal.textContent = model.max
// }


  

 
  let sliderScaleView = new View(selectSliderParams.sliderViewParams)


  // contr.HandlerCurrentsPositionTextContent(mod, sliderScaleView)
  // contr.getHandlerCurrentsPosition(mod, sliderScaleView)
  // contr.setCurrentValue(mod, sliderScaleView)
  //let sliderScaleView1 = new View()
  let sliderScalePlugin = controller.view.scaleVaeInView

  
 // let sliderHandlerPlugin = sliderScaleView.thumb
  this.i = document.createElement('button')
  this.vert = document.createElement('button')
  this.vert.style.background = "red"
  
  this.j = true
  let self = this
  this.vert.onclick = function() {
    controller.view.verticalControl()
  }
  this.i.onclick = function() {
    controller.model.isRange = !controller.model.isRange 
   
    controller.qwe(controller.model.isRange )
  }


  this.append(sliderScalePlugin)
  this.append(this.i)
  this.append(this.vert)
  //name() = this
  return this
  
}


// $('#rootq').examplePlugin(

//   {
    
    
//   // //   sliderViewParams: {
//   // //     handlerView: { 
//   // //       //handlerBackground: "green",
//   // //       //handlerLeft: "70px"
//   // //    },
//   // //   scaleView: {
//   // //     scaleBackground: "grey",
//   // //     scaleProgress: "red"
//   // //   },
//   // //   },
  

//     sliderModelParams: {
//       min: 110,
//       max: 120,
//       //current: 103,
//     },
//   }


// );






// $('#qwe').examplePlugin(

//   // {
//   //   sliderViewParams: {
//   //     handlerView: { 
//   //       handlerBackground: "green",
//   //       //handlerLeft: "70px"
//   //    },
//   //   // scaleView: {
//   //   //   //scaleBackground: "grey",
//   //   //   //scaleProgress: " red"
//   //   // },
//   //   }
//   // }
//  );

//  $('#qwer').examplePlugin()

