import { Scale } from './scale/scale';
import { Handler } from './handler/handler';
import { ViewType, defaultView } from './types';
import { Model } from '../Model/model'
import { ScaleValues } from "./scale/scaleValues"



export class View {

    scaleValuesLines

    controller 

    sliderScale
    scaleHandler
    positionLabel
    scaleVaeInView
    thumb
    handlerFullRadius
    minValue
    maxValue
    viewParamsData: ViewType = defaultView;
    exp
    

    rangeValue

    positionHandler
    positionHandler1

    correctValue

    stepView

    stepViewSimbols

    selectCurrentValues

    rightEdge
    thumb1
    scaleHandler1
    positionLabel1

    constructor (viewParams: ViewType = defaultView, ) {

        
      
        this.sliderScale = new Scale(viewParams.scaleView) 
        this.scaleHandler = new Handler(viewParams.handlerView) 
        this.scaleHandler1 = new Handler(viewParams.handlerView) 
        this.scaleVaeInView = this.sliderScale.scale
        this.thumb = this.scaleHandler.handler
        this.thumb1 = this.scaleHandler1.handler
        this.handlerFullRadius = this.scaleHandler.handlerStyleData.handlerWidth

        this.positionLabel = this.scaleHandler.handlerCurrentPosinion
        this.positionLabel1 = this.scaleHandler1.handlerCurrentPosinion

        this.scaleVaeInView.append(this.positionLabel)
        this.scaleVaeInView.append(this.positionLabel1)
        this.scaleVaeInView.append(this.thumb1) 
        this.scaleVaeInView.append(this.thumb) 
        //this.scaleVaeInView.append(this.thumb1) 

        const that = this

        // this.scaleVaeInView.onclick = function (event) {
        //     const self = that
        //     self.scaleOncklickMethod(event)
        // }
         
        this.thumb.onmousedown = function(event) {
            const self = that
            self.scaleHandlerMoveMethod(event, self.thumb)
        };

        this.thumb1.onmousedown = function(event) {
            const self = that
            self.scaleHandlerMoveMethod(event, self.thumb1)
        };

        this.thumb.ondragstart = function() {
            return false;
        };



        this.maxValue = parseInt(this.sliderScale.scaleStyleData.scaleWidth) - parseInt(this.handlerFullRadius)
        this.minValue 

        this.rangeValue = this.maxValue * 1

        this.l = parseFloat(this.thumb.style.left)
        this.r = parseFloat(this.thumb1.style.left)

    }


    i



    metodX(a) {
        console.log(a)
    }


    stepValueAfterDot(num) {
        num = String(num)
        if (num.indexOf('.') == -1) {
            return 0
        } else {
            return (num.substr(num.indexOf('.') + 1, num.length)).length
        }
    }



    nearValue(position) {
        if(position % this.stepView > this.stepView/2) {
            return position = position + ( this.stepView - (position % this.stepView))
        }
        return position = position - (position % this.stepView)
    }


    scaleOncklickMethod (event) {
        event.preventDefault();
        
        // показывает количество знаков после запятой
        this.getStepViewSimbols(this.stepView)
        // показывает количество знаков после запятой

        // позиция бегунка
        this.positionHandler = event.clientX  - this.scaleVaeInView.getBoundingClientRect().left - parseInt(this.handlerFullRadius)/2;
        // позиция бегунка

        // защита от выхода из границ
        this.stayHandlerInBorder();
        // защита от выхода из границ

        // перемещает бегунов к ближайшему к клику значению
        if((this.positionHandler * this.correctValue)%this.stepView < this.stepView) {
            this.positionLabel.textContent = (this.nearValue(this.positionHandler * this.correctValue)  + this.minValue).toFixed(this.stepViewSimbols)
            this.positionLabel1.textContent = (this.nearValue(this.positionHandler * this.correctValue)  + this.minValue).toFixed(this.stepViewSimbols)

            this.positionHandler = (this.nearValue(this.positionHandler * this.correctValue))/this.correctValue
        }
        // перемещает бегунов к ближайшему к клику значению

        this.thumb.style.left = this.positionHandler + 'px'
        //this.thumb1.style.left = this.positionHandler + 20 + 'px'///////////////////
        this.scaleVaeInView.style.background = `linear-gradient(to right, ${this.viewParamsData.scaleView.scaleProgress} 0%, ${this.viewParamsData.scaleView.scaleProgress} ${this.positionHandler/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%, #EEEEEE ${this.positionHandler/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100}%, #EEEEEE 100%)`         
    }







    scaleHandlerMoveMethod(event , handlerName) {
            
        let self = this
        event.preventDefault(); // предотвратить запуск выделения (действие браузера)

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        

        function onMouseMove(event) {
           
            
            self.positionHandler = event.clientX  - self.scaleVaeInView.getBoundingClientRect().left - parseInt(self.handlerFullRadius)/2;

            //self.positionHandler1 = event.clientX  - self.scaleVaeInView.getBoundingClientRect().left - parseInt(self.handlerFullRadius)/2;


            self.getStepViewSimbols(self.stepView)

            self.stayHandlerInBorder()
            




            if((self.positionHandler * self.correctValue)%self.stepView < self.stepView) {
                self.positionLabel.textContent = (self.nearValue(self.positionHandler * self.correctValue)  + self.minValue).toFixed(self.stepViewSimbols)
            }


            if(handlerName == self.thumb1 && self.positionHandler < (parseFloat(self.thumb.style.left) + self.stepView/self.correctValue)) {
                self.positionHandler = (parseFloat(self.thumb.style.left) + self.stepView/self.correctValue)
                //console.log(self.positionHandler)
            } 
            if(handlerName == self.thumb && self.positionHandler > (parseFloat(self.thumb1.style.left) - self.stepView/self.correctValue)) {
                self.positionHandler = parseFloat(self.thumb1.style.left)  - self.stepView/self.correctValue
                //console.log(self.positionHandler)
            } 
            // else if(self.positionHandler < parseFloat(self.thumb.style.left)) {
            //     self.positionHandler = parseFloat(self.thumb.style.left)
            // }

            handlerName.style.left = self.positionHandler + "px"



            
            self.r = parseFloat(self.thumb1.style.left)

            self.l = parseFloat(self.thumb.style.left)

            
            handlerName.style.left = self.positionHandler + 'px';
            self.positionLabel.style.left = self.thumb.style.left 
            self.positionLabel1.style.left = self.thumb1.style.left 
           

            self.positionLabel.textContent = (self.nearValue(parseInt(self.thumb.style.left) * self.correctValue)  + self.minValue).toFixed(self.stepViewSimbols)
            self.positionLabel1.textContent = (self.nearValue(parseInt(self.thumb1.style.left) * self.correctValue)  + self.minValue).toFixed(self.stepViewSimbols)
            self.scaleprogressColor()         
        }

        function onMouseUp() {
            self.positionHandler = (self.nearValue(self.positionHandler * self.correctValue))/self.correctValue
            handlerName.style.left = self.positionHandler + "px"
            self.scaleprogressColor()


            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onMouseMove);
        }
        
    };



    getStepViewSimbols(value) {
        if(Math.floor(value) != value) {
            return this.stepViewSimbols = this.stepValueAfterDot(value)
        } else {
            return this.stepViewSimbols = 0 
        }
    }

    l
    r


    stayHandlerInBorder() {
        if (this.positionHandler < - this.positionHandler) {
            this.positionHandler = 0
        }
        this.rightEdge = parseInt(this.sliderScale.scaleStyleData.scaleWidth) - parseInt(this.handlerFullRadius)
        if (this.positionHandler > this.rightEdge) {
            this.positionHandler = this.rightEdge
        }
     
        
        // if(this.r - this.l <= 10) {
        //     this.positionHandler = this.l
        //     //this.thumb1.style.left = this.positionHandler + "px"
        // }

        // else if(this.positionHandler >= this.r) {
        //     this.positionHandler = this.r
        //     //this.thumb1.style.left = this.positionHandler + "px"
        // }
        //console.log(this.positionHandler)
    }





    scaleprogressColor() {
        
        if(this.r > this.l){
            this.scaleVaeInView.style.background = `linear-gradient(to right, 
            ${this.viewParamsData.scaleView.scaleBackground} 0%, 
            ${this.viewParamsData.scaleView.scaleBackground} ${parseInt(this.thumb.style.left)/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%,
            ${this.viewParamsData.scaleView.scaleProgress} ${parseInt(this.thumb.style.left)/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%,
            ${this.viewParamsData.scaleView.scaleProgress} ${parseInt(this.thumb1.style.left)/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%,
            ${this.viewParamsData.scaleView.scaleBackground} ${parseInt(this.thumb1.style.left)/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%,
            ${this.viewParamsData.scaleView.scaleBackground} 100%`  
        } else {
            this.scaleVaeInView.style.background = `linear-gradient(to right, 
            ${this.viewParamsData.scaleView.scaleBackground} 0%, 
            ${this.viewParamsData.scaleView.scaleBackground} ${parseInt(this.thumb1.style.left)/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%,
            ${this.viewParamsData.scaleView.scaleProgress} ${parseInt(this.thumb1.style.left)/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%,
            ${this.viewParamsData.scaleView.scaleProgress} ${parseInt(this.thumb.style.left)/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%,
            ${this.viewParamsData.scaleView.scaleBackground} ${parseInt(this.thumb.style.left)/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%,
            ${this.viewParamsData.scaleView.scaleBackground} 100%`  
        }      
    }


    valuesOnScale

    margerScaleRange
    
    markerSkaleView

    markerValueSkaleView

    stepValueLines

    maxV
    minV


    scaleLinesAdd() {
        
        this.valuesOnScale = ((this.maxV - this.minV)/this.stepView).toFixed(0)
        this.margerScaleRange = parseInt(this.handlerFullRadius)/2
        
        this.markerSkaleView = new ScaleValues().marker
        this.markerValueSkaleView = new ScaleValues().valueMarker
        this.markerSkaleView.style.top = parseInt(this.handlerFullRadius)*0.75 + "px"
        this.markerValueSkaleView.style.top = parseInt(this.handlerFullRadius)*1.75 + "px"
        this.scaleVaeInView.append(this.markerSkaleView)
        this.scaleVaeInView.append(this.markerValueSkaleView)

        this.scaleLinesAndLabelsStep()     

        for(let i = 0; i < this.stepPositionRangeOnScale + 1; i += 1 ) {
            let line = new ScaleValues().scaleMarkerValue  
            let numberValue = new ScaleValues().scaleValues
            numberValue.style.left = this.margerScaleRange - 15 + "px";
            if(((this.margerScaleRange - parseInt(this.handlerFullRadius)/2)*this.correctValue).toFixed(this.stepViewSimbols) < this.maxV){
                numberValue.textContent = String((this.minV +(this.margerScaleRange - parseInt(this.handlerFullRadius)/2 )*this.correctValue).toFixed(this.stepViewSimbols))
            } else {
                numberValue.textContent = String(this.maxV)
            }


            //numberValue.textContent = String(((this.margerScaleRange )*this.correctValue).toFixed(this.stepViewSimbols))
            line.style.left = this.margerScaleRange + "px"
            this.margerScaleRange += ((this.stepValueLines) / this.correctValue)
            this.markerSkaleView.append(line) 
            this.markerValueSkaleView.append(numberValue) 
        }      

    }







    scaleLinesTrigger(y) {
        for(let x = 0; x < this.stepPositionRangeOnScale + 1; x += this.stepView) {
            if(y) {
                this.markerSkaleView.getElementsByTagName("div")[x].style.display = 'block'
            } else {
                this.markerSkaleView.getElementsByTagName("div")[x].style.display = 'none'
            }
        }
    }


    scaleValuesTrigger(y) {
        for(let x = 0; x < this.stepPositionRangeOnScale + 1; x += this.stepView) {
            if(y) {
                this.markerValueSkaleView.getElementsByTagName("div")[x].style.display = 'block'
            } else {
                this.markerValueSkaleView.getElementsByTagName("div")[x].style.display = 'none'
            }
        }
    }

    stepPositionRangeOnScale



    scaleLinesAndLabelsStep() {       
        if( this.valuesOnScale <= 10) {
            this.stepValueLines = this.stepView
            this.stepPositionRangeOnScale = parseInt(this.valuesOnScale)
        } else {
            outer:for (let index = 5; index < 10; index++) {
                if(this.valuesOnScale % index == 0) {
                    this.stepValueLines = this.valuesOnScale / index
                    this.stepPositionRangeOnScale = this.valuesOnScale/(this.valuesOnScale / index)
                    break outer
                } else {
                    this.stepValueLines = this.nearValue((this.valuesOnScale / 5).toFixed(this.stepViewSimbols))
                    this.stepPositionRangeOnScale = 5
                }
            }
        }
    }


}






















        //     let self = i

        //     if(Math.floor(self.stepView) != self.stepView) {
        //         self.stepViewSimbols = self.stepValueAfterDot(self.stepView)
        //     } else {
        //         self.stepViewSimbols = 0 
        //     }

        //     self.positionHandler = event.clientX  - self.scaleVaeInView.getBoundingClientRect().left - parseInt(self.handlerFullRadius)/2// + parseInt(self.handlerFullRadius);
            
        //     if (self.positionHandler < -self.positionHandler) {
        //        self.positionHandler = 0;
        //     }
            
        //     let rightEdge = parseInt(self.sliderScale.scaleStyleData.scaleWidth) - parseInt(self.handlerFullRadius)
        //     if (self.positionHandler > rightEdge) {
        //        self.positionHandler = rightEdge;
        //     }
         
            

        //     if((self.positionHandler * self.correctValue)%self.stepView < self.stepView) {

        //         //self.positionLabel.textContent = (self.nearValue(self.positionHandler * self.correctValue - (self.positionHandler * self.correctValue)%self.stepView)).toFixed(self.stepViewSimbols)
        //         self.positionLabel.textContent = (self.nearValue(self.positionHandler * self.correctValue)  + self.minValue).toFixed(self.stepViewSimbols)
        //         //self.positionHandler = (self.nearValue(self.positionHandler * self.correctValue - (self.positionHandler * self.correctValue)%self.stepView))/self.correctValue
        //         self.positionHandler = (self.nearValue(self.positionHandler * self.correctValue))/self.correctValue
        //     }

        //     //self.nearValue(9)

        //     //self.stepValueAfterDot(self.stepView)


        //     self.thumb.style.left = self.positionHandler + 'px'
        //     self.scaleVaeInView.style.background = `linear-gradient(to right, ${viewParams.scaleView.scaleProgress} 0%, ${viewParams.scaleView.scaleProgress} ${self.positionHandler/parseInt(self.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%, #EEEEEE ${self.positionHandler/parseInt(self.sliderScale.scaleStyleData.scaleWidth) * 100}%, #EEEEEE 100%)`         









    //     event.preventDefault(); // предотвратить запуск выделения (действие браузера)

    //     let shiftX = event.clientX - self.thumb.getBoundingClientRect().left 
    //     // shiftY здесь не нужен, слайдер двигается только по горизонтали

    //     document.addEventListener('mousemove', onMouseMove);
    //     document.addEventListener('mouseup', onMouseUp);

    //     function onMouseMove(event) {
    //     let newLeft = event.clientX - shiftX - self.scaleVaeInView.getBoundingClientRect().left// + parseInt(self.handlerFullRadius);
    //     // self.controller = new Controller(self.thumb)
    //     // курсор вышел из слайдера => оставить бегунок в его границах.
        

    //     if (newLeft < -newLeft) {
    //         newLeft = 0;
    //     }
    //     //let rightEdge = scale.offsetWidth - thumb.offsetWidth;
    //     let rightEdge = parseInt(self.sliderScale.scaleStyleData.scaleWidth) - parseInt(self.handlerFullRadius)
    //     if (newLeft > rightEdge) {
    //         newLeft = rightEdge;
    //     }
    //     self.exp = self.controller
    //    // console.log(self.exp)

    //     self.thumb.style.left = newLeft + 'px';
    //     //console.log(newLeft)
    //     self.positionHandler = newLeft
    //     self.positionLabel.textContent = self.positionHandler

    //     self.scaleVaeInView.style.background = `linear-gradient(to right, ${self.viewParamsData.scaleView.scaleProgress} 0%, ${self.viewParamsData.scaleView.scaleProgress} ${newLeft/parseInt(self.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%, #EEEEEE ${newLeft/parseInt(self.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%, #EEEEEE 100%)`
    //     }

    //     function onMouseUp() {
    //     document.removeEventListener('mouseup', onMouseUp);
    //     document.removeEventListener('mousemove', onMouseMove);
    //     }
        
