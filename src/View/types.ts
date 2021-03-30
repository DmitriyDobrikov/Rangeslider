import { View } from "./view";
import { HandlerType, handlerStyle } from "./handler/types";
import { ScaleType, scaleStyle } from "./scale/types"



type ViewType = { 
  scaleView?: ScaleType, 
  handlerView?: HandlerType,
}



const defaultView = {
  scaleView: scaleStyle, 
  handlerView: handlerStyle,
}



export {ViewType, defaultView}