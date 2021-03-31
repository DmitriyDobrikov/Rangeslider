import {HandlerType , handlerStyle} from './types';


export class Handler {
    
    handler = document.createElement('div')
    handler1 = document.createElement('div')
    handlerCurrentPosinion = document.createElement('div')
    

    handlerStyleData : HandlerType = {}


    constructor (handlerStyleParam : HandlerType = handlerStyle ) {

        Object.assign(this.handlerStyleData, handlerStyle)

        // //this.scaleStyleData = scaleStyleParams

        for (const key in this.handlerStyleData) {
            if (handlerStyleParam[key] != undefined) {
                this.handlerStyleData[key] = handlerStyleParam[key]
            }
        }

        this.handler.style.width = this.handlerStyleData.handlerWidth
        this.handler.style.height = this.handlerStyleData.handlerHeight
        this.handler.style.border = this.handlerStyleData.handlerBorder
        this.handler.style.borderRadius = this.handlerStyleData.handlerBorderRadius
        this.handler.style.background = this.handlerStyleData.handlerBackground
        this.handler.style.left = this.handlerStyleData.handlerLeft
        this.handler.style.top = this.handlerStyleData.handlerTop

        this.handler1.style.width = this.handlerStyleData.handlerWidth
        this.handler1.style.height = this.handlerStyleData.handlerHeight
        this.handler1.style.border = this.handlerStyleData.handlerBorder
        this.handler1.style.borderRadius = this.handlerStyleData.handlerBorderRadius
        this.handler1.style.background = this.handlerStyleData.handlerBackground
        this.handler1.style.left = this.handlerStyleData.handlerLeft
        this.handler1.style.top = this.handlerStyleData.handlerTop



        this.handlerCurrentPosinion.style.position = "absolute"
        this.handlerCurrentPosinion.style.top = "-20px"
        this.handlerCurrentPosinion.style.left = "-24px"
        this.handlerCurrentPosinion.style.background = "none"
        this.handlerCurrentPosinion.style.width = "40px"
        this.handlerCurrentPosinion.style.textAlign = "center"
        this.handlerCurrentPosinion.style.fontSize = "10px"

        this.handler.style.position = 'absolute'
    }

}