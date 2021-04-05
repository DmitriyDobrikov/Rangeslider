import { Scale } from "./scale"


export class ScaleValues {

    scaleValues = document.createElement('div')
    scaleMarkerValue = document.createElement('div')
    marker = document.createElement('div')
    range
    valueMarker = document.createElement('div')




    constructor() {

        this.scaleMarkerValue.style.position = "absolute"
        this.scaleMarkerValue.style.width = "10px"
        this.scaleMarkerValue.style.height = "1px"
        this.scaleMarkerValue.style.background = "black"
        //this.scaleMarkerValue.style.top = 0 + "px"

        this.scaleValues.style.position = "absolute"
        this.scaleValues.style.width = "30px"
        this.scaleValues.style.height = "10px"
        //this.scaleValues.style.background = "black"
        this.scaleValues.style.top = 0 + "px"
        this.scaleValues.style.textAlign = "center"
        this.scaleValues.style.fontSize = "10px"







        this.marker=document.createElement('div')
        this.marker.style.position = "absolute"

        this.valueMarker.style.position = "absolute"
    
    }



}