import { SliderPanel } from '../blocks/panel/panel'
import './demo-page.scss'


let oneHandlerHorizontal = new SliderPanel('#one-handler-horizontal')



let oneHandlerVertical = new SliderPanel('#one-handler-vertical' , {
    sliderViewParams: {
      scaleView: {
          scaleWidth: "300px",
          scaleHeight: "6px",
          scaleBorder: "0px solid black",
          scaleBackground: "gray",
          scaleBorderRadius: '10px',
          scaleProgress: "black"
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
      max: 10,
      current: 5,
      minCurrentDoubleHeandler: 2,
      maxCurrentDoubleHeandler: 8,
      isVertical: true,
      isRange: false,
      step: 0.2,
      scaleValues: false,
    },
  }
)




let twoHandlerHorizontal = new SliderPanel('#two-handler-horizontal' , {
  sliderViewParams: {
    scaleView: {
        scaleWidth: "300px",
        scaleHeight: "6px",
        scaleBorder: "0px solid black",
        scaleBackground: "gray",
        scaleBorderRadius: '10px',
        scaleProgress: "coral"
  },
    handlerView: { 
        handlerWidth: "12px",
        handlerHeight: "12px",
        handlerBorder: "1px solid #FFFFFF",
        handlerBackground: "coral",
        handlerBorderRadius: '10px',
        handlerLeft: "0px",
        handlerTop: "-4px",
    },
  },

  sliderModelParams: {
    min: 0,
    max: 10,
    current: 2,
    minCurrentDoubleHeandler: 20,
    maxCurrentDoubleHeandler: 88,
    isVertical: false,
    isRange: true,
    step: 0.1,
    scaleLines: false,
  },
}
)


let twoHandlerVertical = new SliderPanel('#two-handler-vertical', 
{
  sliderViewParams: {
    scaleView: {
        scaleWidth: "200px",
        // scaleHeight: "6px",
        // scaleBorder: "0px solid black",
        // scaleBackground: "#EEEEEE",
        // scaleBorderRadius: '10px',
        // scaleProgress: "blue"
  },
    handlerView: { 
        // handlerWidth: "15px",
        // handlerHeight: "15px",
        // handlerBorder: "2px solid #FFFFFF",
        handlerBackground: "red",
        // handlerBorderRadius: '5px',
        // handlerLeft: "0px",
        // handlerTop: "-4px",
    },
  },

  sliderModelParams: {
    min: -10,
    max: 15,
    current: 20,
    minCurrentDoubleHeandler: 20,
    maxCurrentDoubleHeandler: 88,
    isVertical: true,
    isRange: true,
    step: 1,
    positionLabels: false,
  },
}
)
