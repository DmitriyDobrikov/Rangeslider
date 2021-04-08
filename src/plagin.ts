

//import $ from 'jquery'
import { ViewType, defaultView } from "./View/types"
import { SliderParams, defaultSlider } from "./types"
// import "./main.scss"
// import 'jquery'
import './index'


//const $ = require( 'jquery' );
import { ExampleService } from './example-service';
import { Scale } from './View/scale/scale';
import { View } from './View/view';
import { Controller } from "./Controller/controller"
import { Model } from './Model/model';
//import examplePlugin from "./index"
//import jQuery from './interface'

$('#rootq').rangeSlider(



    {
    
    
        sliderViewParams: {
            // handlerView: { 
            //     handlerBackground: "green",
            //     //handlerLeft: "70px"
            // },
            scaleView: {
                scaleBackground: "grey",
                scaleProgress: "red"
            },
        },
    

        sliderModelParams: {
            min: 110,
            max: 120,
        //current: 103,
        },
  }



)

