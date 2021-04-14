import { Handler } from '../handler/handler';
import { ScaleType, scaleStyle } from './types';


export class Scale {
    scale = document.createElement('div')
    minVal = document.createElement('div')
    maxVal = document.createElement('div')

    scaleValues = document.createElement('div')
    scaleMarkerValue = document.createElement('div')

    scaleStyleData : ScaleType = {}
    
    scaleProgress
    constructor (scaleStyleParams : ScaleType = scaleStyle,){

        Object.assign(this.scaleStyleData, scaleStyle)


        for (const key in this.scaleStyleData) {
            if (scaleStyleParams[key] != undefined) {
                this.scaleStyleData[key] = scaleStyleParams[key]
            }
        }
        

        this.scaleProgress = this.scaleStyleData.scaleProgress
        this.scale.style.width = this.scaleStyleData.scaleWidth
        this.scale.style.height = this.scaleStyleData.scaleHeight
        this.scale.style.border = this.scaleStyleData.scaleBorder
        this.scale.style.borderRadius = this.scaleStyleData.scaleBorderRadius
        this.scale.style.background = this.scaleStyleData.scaleBackground
        this.scale.style.position = "relative"
     
        this.minVal.style.position = "absolute"
        this.maxVal.style.position = "absolute"
        this.minVal.style.background = "none"
        this.maxVal.style.background = "none"

        this.scaleValues.style.position = "absolute"
        this.scaleValues.style.background = "none"
        this.scaleValues.style.width = this.scaleStyleData.scaleWidth
        this.scaleValues.style.top = this.scale.style.height

        this.maxVal.style.left = this.scale.style.width
        this.scale.style.marginLeft = "10px" 



        this.scale.append(this.scaleValues)  

        
    }

    
}