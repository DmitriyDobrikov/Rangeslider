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


    thumbMax
    thumbMin

    positionLabelMax
    positionLabelMin

    isRange = false



    constructor (viewParams: ViewType = defaultView, ) {

        
      
        this.sliderScale = new Scale(viewParams.scaleView) 
        this.scaleHandler = new Handler(viewParams.handlerView) 
        //this.scaleHandler1 = new Handler(viewParams.handlerView) 
        this.scaleVaeInView = this.sliderScale.scale
        this.thumb = this.scaleHandler.handler
        
        this.handlerFullRadius = this.scaleHandler.handlerStyleData.handlerWidth


        this.thumbMax = new Handler(viewParams.handlerView).handler 
        this.thumbMin = new Handler(viewParams.handlerView).handler 

        this.positionLabel = this.scaleHandler.handlerCurrentPosinion
        this.positionLabelMax = new Handler(viewParams.handlerView).handlerCurrentPosinion
        this.positionLabelMin = new Handler(viewParams.handlerView).handlerCurrentPosinion

        this.scaleVaeInView.append(this.positionLabel)
        this.scaleVaeInView.append(this.positionLabelMax)
        this.scaleVaeInView.append(this.positionLabelMin)
        this.scaleVaeInView.append(this.thumbMax) 
        this.scaleVaeInView.append(this.thumbMin) 
        this.scaleVaeInView.append(this.thumb) 

        const that = this


        this.scaleVaeInView.onclick = function (event) {
            const self = that
            self.scaleOncklickMethod(event)
        }
        this.thumb.onmousedown = function(event) {
            const self = that
            self.scaleHandlerMoveMethod(event, self.thumb)
        };

        this.thumbMax.onmousedown = function(event) {
            const self = that
            self.scaleHandlerMoveMethod(event, self.thumbMax)
        };
        this.thumbMin.onmousedown = function(event) {
            const self = that
            self.scaleHandlerMoveMethod(event, self.thumbMin)
        };

        this.thumb.ondragstart = function() {
            return false;
        };
        this.thumbMin.ondragstart = function() {
            return false;
        };
        this.thumbMax.ondragstart = function() {
            return false;
        };



        this.maxValue = parseInt(this.sliderScale.scaleStyleData.scaleWidth) - parseInt(this.handlerFullRadius)
        this.minValue 

        this.rangeValue = this.maxValue * 1

        

    }


    



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
        this.movePositionToNearestValue()
        // перемещает бегунов к ближайшему к клику значению
        
        //this.setThumbLabelTextContentPosition()

        //this.thumb.style.left = this.positionHandler + 'px'
        if(Math.abs(this.positionHandler - parseInt(this.thumbMin.style.left)) > Math.abs(this.positionHandler - parseInt(this.thumbMax.style.left))) {
            this.thumbMax.style.left = this.positionHandler + 'px'
            this.scaleprogressColor(this.thumbMax)
        } else {          
            this.thumbMin.style.left = this.positionHandler + 'px'
            this.scaleprogressColor(this.thumbMin)
        }
        if (this.thumb.style.display != "none") {
            this.thumb.style.left = this.positionHandler + 'px'
            this.scaleprogressColor(this.thumb)
        }
        this.movePositionToNearestValue()
        this.setThumbLabelTextContentPosition()
        // console.log()
        //this.movePositionToNearestValue()
        //this.scaleVaeInView.style.background = `linear-gradient(to right, ${this.viewParamsData.scaleView.scaleProgress} 0%, ${this.viewParamsData.scaleView.scaleProgress} ${this.positionHandler/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%, #EEEEEE ${this.positionHandler/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100}%, #EEEEEE 100%)`         
    }



    scaleHandlerMoveMethod(event , handlerName) {
            
        let self = this
        event.preventDefault(); // предотвратить запуск выделения (действие браузера)

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        function onMouseMove(event) {
           
            self.positionHandler = event.clientX  - self.scaleVaeInView.getBoundingClientRect().left - parseInt(self.handlerFullRadius)/2;

            // показывает количество знаков после запятой
            self.getStepViewSimbols(self.stepView)

            // защита от выхода из границ
            self.stayHandlerInBorder()
            
            // перемещает бегунок к ближайшему значению. Если аргумент true перемещает с движением мыши иначе - скачками, устанавливает текстовое значения поля над бегунком 
            self.movePositionToNearestValue(true) 

            // не позволяет меньшему значению быть >= большего и наоборот
            self.twoHandlersBorderMove(handlerName)
            
            handlerName.style.left = self.positionHandler + 'px';

            // двигает текст над бегунком
            self.setThumbLabelTextContentPosition()
  
            //окрашивает шкалу в зависимости от типа хэндлера
            self.scaleprogressColor(handlerName)
        }

        function onMouseUp() {
            self.positionHandler = (self.nearValue(self.positionHandler * self.correctValue))/self.correctValue
            handlerName.style.left = self.positionHandler + "px"
            self.scaleprogressColor(handlerName)
            self.setThumbLabelTextContentPosition()
            
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onMouseMove);
        }
    };


    // показывает количество знаков после запятой
    getStepViewSimbols(value) {
        if(Math.floor(value) != value) {
            return this.stepViewSimbols = this.stepValueAfterDot(value)
        } else {
            return this.stepViewSimbols = 0 
        }
    }
    // показывает количество знаков после запятой

    // защита от выхода из границ
    stayHandlerInBorder() {
        if (this.positionHandler < - this.positionHandler) {
            this.positionHandler = 0
        }
        this.rightEdge = parseInt(this.sliderScale.scaleStyleData.scaleWidth) - parseInt(this.handlerFullRadius)
        if (this.positionHandler > this.rightEdge) {
            this.positionHandler = this.rightEdge
        }
    }
    // защита от выхода из границ

    //окрашивает шкалу в зависимости от типа хэндлера
    scaleprogressColor(handlerType) {
        if(handlerType == this.thumbMax || handlerType == this.thumbMin){
            this.scaleVaeInView.style.background = `linear-gradient(to right, 
            ${this.viewParamsData.scaleView.scaleBackground} 0%, 
            ${this.viewParamsData.scaleView.scaleBackground} ${parseInt(this.thumbMin.style.left)/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%,
            ${this.viewParamsData.scaleView.scaleProgress} ${parseInt(this.thumbMin.style.left)/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%,
            ${this.viewParamsData.scaleView.scaleProgress} ${parseInt(this.thumbMax.style.left)/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%,
            ${this.viewParamsData.scaleView.scaleBackground} ${parseInt(this.thumbMax.style.left)/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%,
            ${this.viewParamsData.scaleView.scaleBackground} 100%`  
        } else {
            this.scaleVaeInView.style.background = `linear-gradient(to right, ${this.viewParamsData.scaleView.scaleProgress} 0%, ${this.viewParamsData.scaleView.scaleProgress} ${parseInt(this.thumb.style.left)/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%, #EEEEEE ${this.positionHandler/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%, #EEEEEE 100%)`
        }
    }
    //окрашивает шкалу в зависимости от типа хэндлера


    valuesOnScale

    margerScaleRange
    
    markerSkaleView

    markerValueSkaleView

    stepValueLines

    maxV
    minV

    // добавление линий деления шкалы слайдера в вид
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

            line.style.left = this.margerScaleRange + "px"
            this.margerScaleRange += ((this.stepValueLines) / this.correctValue)
            this.markerSkaleView.append(line) 
            this.markerValueSkaleView.append(numberValue) 
        }      

    }
    // добавление линий деления шкалы слайдера в вид

    // не позволяет меньшему значению быть >= большего и наоборот
    twoHandlersBorderMove(handler) {
        if(handler == this.thumbMax && this.positionHandler < (parseFloat(this.thumbMin.style.left) + this.stepView/this.correctValue)) {
            this.positionHandler = (parseFloat(this.thumbMin.style.left) + this.stepView/this.correctValue)
        } 
        if(handler == this.thumbMin && this.positionHandler > (parseFloat(this.thumbMax.style.left) - this.stepView/this.correctValue)) {
            this.positionHandler = parseFloat(this.thumbMax.style.left)  - this.stepView/this.correctValue
        } 
    }
    // не позволяет меньшему значению быть >= большего и наоборот

    // перемещает бегунок к ближайшему значению. Если аргумент true перемещает с движением мыши иначе - скачками, устанавливает текстовое значения поля над бегунком 
    movePositionToNearestValue(slowMover: boolean = false) {
        if((this.positionHandler * this.correctValue)%this.stepView < this.stepView) {
            this.positionLabel.textContent = (this.nearValue(this.positionHandler * this.correctValue)  + this.minValue).toFixed(this.stepViewSimbols)
            this.positionLabelMax.textContent = (this.nearValue(parseInt(this.thumbMax.style.left) * this.correctValue)  + this.minValue).toFixed(this.stepViewSimbols)
            this.positionLabelMin.textContent = (this.nearValue(parseInt(this.thumbMin.style.left) * this.correctValue)  + this.minValue).toFixed(this.stepViewSimbols)
            if(!slowMover)this.positionHandler = (this.nearValue(this.positionHandler * this.correctValue))/this.correctValue
        }
    }
    // перемещает бегунок к ближайшему значению. Если аргумент true перемещает с движением мыши иначе - скачками, устанавливает текстовое значения поля над бегунком 

    // включает/отключает отображение делений шкалы
    scaleLinesTrigger(y) {
        for(let x = 0; x < this.stepPositionRangeOnScale + 1; x += this.stepView) {
            if(y) {
                this.markerSkaleView.getElementsByTagName("div")[x].style.display = 'block'
            } else {
                this.markerSkaleView.getElementsByTagName("div")[x].style.display = 'none'
            }
        }
    }
    // включает/отключает отображение делений шкалы


    // включает/отключает отображение значений деления шкалы
    scaleValuesTrigger(y) {
        for(let x = 0; x < this.stepPositionRangeOnScale + 1; x += this.stepView) {
            if(y) {
                this.markerValueSkaleView.getElementsByTagName("div")[x].style.display = 'block'
            } else {
                this.markerValueSkaleView.getElementsByTagName("div")[x].style.display = 'none'
            }
        }
    }
    // включает/отключает отображение значений деления шкалы

    stepPositionRangeOnScale


    //вычисление количества делений шкалы и шага размещения линий и значений(в единицах деления шкалы)
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
    //вычисление количества делений шкалы и шага размещения линий и значений(в единицах деления шкалы)


    // переключение вида количества бегунков
    isRangeSwitch(isRange: boolean) {
        if(isRange) {
            this.thumb.style.display = "none"
            this.positionLabel.style.display = "none"
            this.thumbMax.style.display = "block"
            this.thumbMin.style.display = "block"
            this.positionLabelMax.style.display = "block"
            this.positionLabelMin.style.display = "block"
            this.thumbMax.style.left = parseInt(this.sliderScale.scaleStyleData.scaleWidth) - parseInt(this.handlerFullRadius) + "px"
            this.thumbMin.style.left = 0 + 'px'
            this.scaleVaeInView.style.background = `linear-gradient(to right, 
            ${this.viewParamsData.scaleView.scaleBackground} 0%, 
            ${this.viewParamsData.scaleView.scaleBackground} ${parseInt(this.thumbMin.style.left)/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%,
            ${this.viewParamsData.scaleView.scaleProgress} ${parseInt(this.thumbMin.style.left)/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%,
            ${this.viewParamsData.scaleView.scaleProgress} ${parseInt(this.thumbMax.style.left)/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%,
            ${this.viewParamsData.scaleView.scaleBackground} ${parseInt(this.thumbMax.style.left)/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%,
            ${this.viewParamsData.scaleView.scaleBackground} 100%`  
            this.positionLabelMax.style.left = parseInt(this.thumbMax.style.left) - 19 + parseInt(this.handlerFullRadius)/2 + "px"
            this.positionLabelMin.style.left = parseInt(this.thumbMin.style.left) - 19 + parseInt(this.handlerFullRadius)/2 + "px"
            this.positionLabelMin.textContent = this.minValue
            this.positionLabelMax.textContent = this.maxValue
        } else {
            this.thumb.style.display = "block"
            this.positionLabel.style.display = "block"
            this.thumbMax.style.display = "none"
            this.thumbMin.style.display = "none"
            this.positionLabelMax.style.display = "none"
            this.positionLabelMin.style.display = "none"
            this.scaleVaeInView.style.background = `linear-gradient(to right, ${this.viewParamsData.scaleView.scaleProgress} 0%, ${this.viewParamsData.scaleView.scaleProgress} ${parseInt(this.thumb.style.left)/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%, #EEEEEE ${parseInt(this.thumb.style.left)/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%, #EEEEEE 100%)`
            this.positionLabel.style.left = parseInt(this.thumb.style.left) - 19 + parseInt(this.handlerFullRadius)/2 + "px"
            this.positionLabelMax.textContent = (this.nearValue((this.maxValue + this.minValue)/2)).toFixed(this.stepViewSimbols)
        }
    }
    // переключение вида количества бегунков

    // двигает текст над бегунком
    setThumbLabelTextContentPosition() {
        this.positionLabel.style.left = this.positionHandler - 19 + parseInt(this.handlerFullRadius)/2 + "px"
        this.positionLabelMax.style.left = parseInt(this.thumbMax.style.left) - 19 + parseInt(this.handlerFullRadius)/2 + "px"
        this.positionLabelMin.style.left = parseInt(this.thumbMin.style.left) - 19 + parseInt(this.handlerFullRadius)/2 + "px"
    }
    // двигает текст над бегунком


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
        
