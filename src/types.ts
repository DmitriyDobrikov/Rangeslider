import { ViewType, defaultView } from "./View/types"
import { ModelType, defaultModel } from "./Model/types"
//import { ViewType }
//import { ScaleType } from "./View/scale/types"

type SliderParams = {
  sliderViewParams?: ViewType,
  sliderModelParams?: ModelType,
}



const defaultSlider = {
    sliderViewParams: defaultView,
    sliderModelParams: defaultModel,
}

export {SliderParams, defaultSlider,}