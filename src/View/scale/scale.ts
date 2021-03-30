import { Handler } from '../handler/handler';
import { ScaleType, scaleStyle } from './types';


export class Scale {
    scale = document.createElement('div')
    minVal = document.createElement('div')
    maxVal = document.createElement('div')

    scaleValues = document.createElement('div')
    scaleMarkerValue = document.createElement('div')

    scaleStyleData : ScaleType = {}
    
    constructor (scaleStyleParams : ScaleType = scaleStyle,){

        Object.assign(this.scaleStyleData, scaleStyle)

        // //this.scaleStyleData = scaleStyleParams

        for (const key in this.scaleStyleData) {
            if (scaleStyleParams[key] != undefined) {
                this.scaleStyleData[key] = scaleStyleParams[key]
            }
        }


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

        //this.scaleMarkerValue.style.position = "absolute"

        // this.minVal.textContent = "1000"
        // this.maxVal.textContent = "1000"
        //this.minVal.textContent = this.maxVal.style.width 
        this.maxVal.style.left = this.scale.style.width
        this.scale.style.marginLeft = "10px"// this.scale.style.width 
        this.minVal.style.right = this.scale.style.width
        this.minVal.style.top = "-5px"
        this.maxVal.style.top = "-5px"
        this.maxVal.style.fontSize = '12px'
        this.minVal.style.fontSize = '12px'


        this.scale.append(this.scaleValues)  
        this.scale.append(this.minVal)  
        this.scale.append(this.maxVal)    
        
    }

    
}