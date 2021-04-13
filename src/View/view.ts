import { Scale } from './scale/scale';
import { Handler } from './handler/handler';
import { HandlerType } from './handler/types';
import { ViewType, defaultView } from './types';
import { Model } from '../Model/model'
import { ScaleValues } from "./scale/scaleValues"



export class View {

    scaleValuesLines

     

    sliderScale
    scaleHandler
    positionLabel
    scaleVaeInView
    thumb
    handlerFullRadius
    minValue
    maxValue
    viewParamsData: ViewType = defaultView;
    
    

    rangeValue

    positionHandler
    positionHandler1

    correctValue

    stepView

    stepViewSimbols

    selectCurrentValues

    rightEdge
   

    thumbMax
    thumbMin

    positionLabelMax
    positionLabelMin

    isRange = false
    scaleLong
    scaleWidth
    isVerticalIdentifier = false



    valuesOnScale
    margerScaleRange
    markerSkaleView
    markerValueSkaleView
    stepValueLines
    maxV
    minV


    handlerRegulLeft
    handlerRegulTop
    

    stepPositionRangeOnScale

    current
    currentMin
    currentMax




    constructor (viewParams: ViewType = defaultView, ) {


        this.viewParamsData


        Object.assign(this.viewParamsData, defaultView, viewParams)

        // //this.scaleStyleData = scaleStyleParams

        for (const key in this.viewParamsData) {
            if (viewParams[key] != undefined) {
                this.viewParamsData[key] = viewParams[key]
            }
        }
        
      
        this.sliderScale = new Scale(viewParams.scaleView) 
        this.scaleHandler = new Handler(viewParams.handlerView) 
        this.scaleVaeInView = this.sliderScale.scale
        this.thumb = this.scaleHandler.handler
        //this.scaleVaeInView.style.width = '200px'
        
        
        this.handlerFullRadius = this.scaleHandler.handlerStyleData.handlerWidth

        this.thumbMax = new Handler(this.viewParamsData.handlerView).handler 
        this.thumbMin = new Handler(this.viewParamsData.handlerView).handler 

        this.positionLabel = this.scaleHandler.handlerCurrentPosinion
        this.positionLabelMax = new Handler(this.viewParamsData.handlerView).handlerCurrentPosinion
        this.positionLabelMin = new Handler(this.viewParamsData.handlerView).handlerCurrentPosinion

        //this.isVerticalIdentifier = this.viewParamsData

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


        this.scaleLong = this.scaleVaeInView.style.width
        this.scaleWidth = this.scaleVaeInView.style.height

        this.handlerRegulLeft = this.scaleHandler.handler.style.left
        this.handlerRegulTop = this.scaleHandler.handler.style.top


        // handlerPositionInLong
        // handlerPositionInWidth

      
        

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
        if(this.isVerticalIdentifier){
            this.positionHandler = event.clientY  - this.scaleVaeInView.getBoundingClientRect().top - parseInt(this.handlerFullRadius)/2;
        } else {
            this.positionHandler =  event.clientX  - this.scaleVaeInView.getBoundingClientRect().left - parseInt(this.handlerFullRadius)/2;
        }
        // позиция бегунка

        // защита от выхода из границ
        this.stayHandlerInBorder();
        // защита от выхода из границ

        // перемещает бегунов к ближайшему к клику значению
        this.movePositionToNearestValue()
        // перемещает бегунов к ближайшему к клику значению

        //this.twoHandlersBorderMove(this.thumbMin)

        if(this.isVerticalIdentifier) {
            if(Math.abs(this.positionHandler - parseInt(this.thumbMin.style.top)) > Math.abs(this.positionHandler - parseInt(this.thumbMax.style.top))) {
                this.thumbMax.style.top = this.positionHandler + 'px'
            } else {          
                this.thumbMin.style.top = this.positionHandler + 'px'
            }
            this.scaleprogressColor(this.thumbMin)

            if (this.thumb.style.display != "none") {
                this.thumb.style.top = this.positionHandler + 'px'
                this.scaleprogressColor(this.thumb)
            }
        } else {
            if(Math.abs(this.positionHandler - this.verticalOrHorizontalPosition(this.thumbMin)) > Math.abs(this.positionHandler - this.verticalOrHorizontalPosition(this.thumbMax))) {
                this.thumbMax.style.left = this.positionHandler + 'px'
            } else {          
                this.thumbMin.style.left = this.positionHandler + 'px'
            }
            this.scaleprogressColor(this.thumbMin)
            if (this.thumb.style.display != "none") {
                this.thumb.style.left = this.positionHandler + 'px'
                this.scaleprogressColor(this.thumb)
            }
        }







        this.movePositionToNearestValue()
        this.setThumbLabelTextContentPosition()
        }



    scaleHandlerMoveMethod(event , handlerName) {
            
        let self = this
        event.preventDefault(); // предотвратить запуск выделения (действие браузера)

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        function onMouseMove(event) {
           
            if(self.isVerticalIdentifier){
                self.positionHandler = event.clientY  - self.scaleVaeInView.getBoundingClientRect().top - parseInt(self.handlerFullRadius)/2;
            } else {
                self.positionHandler =  event.clientX  - self.scaleVaeInView.getBoundingClientRect().left - parseInt(self.handlerFullRadius)/2;
            }
            // показывает количество знаков после запятой
            
            self.getStepViewSimbols(self.stepView)

            // защита от выхода из границ
            self.stayHandlerInBorder()
            
            // перемещает бегунок к ближайшему значению. Если аргумент true перемещает с движением мыши иначе - скачками, устанавливает текстовое значения поля над бегунком 
            self.movePositionToNearestValue(true) 

            // не позволяет меньшему значению быть >= большего и наоборот
            self.twoHandlersBorderMove(handlerName)



            if(self.isVerticalIdentifier){
                //handlerName.style.left = self.q;
                handlerName.style.top = self.positionHandler + 'px';
            } else {
                //handlerName.style.top = self.q;
                handlerName.style.left = self.positionHandler + 'px';
            }
           

            // двигает текст над бегунком
            self.setThumbLabelTextContentPosition()
  
            //окрашивает шкалу в зависимости от типа хэндлера
            self.scaleprogressColor(handlerName)

           

            
        }

        function onMouseUp() {
            self.positionHandler = (self.nearValue(self.positionHandler * self.correctValue))/self.correctValue
          
            if(self.isVerticalIdentifier){
                handlerName.style.top = self.positionHandler + 'px';
                handlerName.style.left = self.handlerRegulTop
            } else {
                handlerName.style.left = self.positionHandler + 'px';
                handlerName.style.top = self.handlerRegulTop
            }

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
        if(handlerType == this.thumbMin || handlerType == this.thumbMax){
            !this.isVerticalIdentifier?
            this.scaleVaeInView.style.background = `linear-gradient(to right, 
            ${this.viewParamsData.scaleView.scaleBackground} 0%, 
            ${this.viewParamsData.scaleView.scaleBackground} ${parseInt(this.leftOrTopPosition(this.thumbMin))/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%,
            ${this.viewParamsData.scaleView.scaleProgress} ${parseInt(this.leftOrTopPosition(this.thumbMin))/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%,
            ${this.viewParamsData.scaleView.scaleProgress} ${parseInt(this.leftOrTopPosition(this.thumbMax))/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%,
            ${this.viewParamsData.scaleView.scaleBackground} ${parseInt(this.leftOrTopPosition(this.thumbMax))/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%,
            ${this.viewParamsData.scaleView.scaleBackground} 100%`  :
            this.scaleVaeInView.style.background = `linear-gradient(to bottom, 
            ${this.viewParamsData.scaleView.scaleBackground} 0%, 
            ${this.viewParamsData.scaleView.scaleBackground} ${parseInt(this.leftOrTopPosition(this.thumbMin))/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%,
            ${this.viewParamsData.scaleView.scaleProgress} ${parseInt(this.leftOrTopPosition(this.thumbMin))/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%,
            ${this.viewParamsData.scaleView.scaleProgress} ${parseInt(this.leftOrTopPosition(this.thumbMax))/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%,
            ${this.viewParamsData.scaleView.scaleBackground} ${parseInt(this.leftOrTopPosition(this.thumbMax))/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%,
            ${this.viewParamsData.scaleView.scaleBackground} 100%`
        } else {
            this.isVerticalIdentifier?
            this.scaleVaeInView.style.background = `linear-gradient(to bottom, ${this.viewParamsData.scaleView.scaleBackground} 0%, ${this.viewParamsData.scaleView.scaleBackground} ${parseInt(this.leftOrTopPosition(this.thumb))/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100 }%, ${this.viewParamsData.scaleView.scaleProgress} ${parseInt(this.leftOrTopPosition(this.thumb))/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%, ${this.viewParamsData.scaleView.scaleProgress} 100%)`:
            this.scaleVaeInView.style.background = `linear-gradient(to right, ${this.viewParamsData.scaleView.scaleProgress} 0%, ${this.viewParamsData.scaleView.scaleProgress} ${parseInt(this.leftOrTopPosition(this.thumb))/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100 }%, ${this.viewParamsData.scaleView.scaleBackground} ${parseInt(this.leftOrTopPosition(this.thumb))/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%, ${this.viewParamsData.scaleView.scaleBackground} 100%)`
        }
    }
    //окрашивает шкалу в зависимости от типа хэндлера

    // добавление линий деления шкалы слайдера в вид
    scaleLinesAdd() {

        if(this.markerValueSkaleView != undefined) this.markerValueSkaleView.remove()
        if(this.markerSkaleView != undefined) this.markerSkaleView.remove()        
        
        this.valuesOnScale = ((this.maxV - this.minV)/this.stepView).toFixed(0)
        this.margerScaleRange = parseInt(this.handlerFullRadius)/2
        
        this.markerSkaleView = new ScaleValues().marker
        this.markerValueSkaleView = new ScaleValues().valueMarker

        if(this.isVerticalIdentifier) {
            this.markerSkaleView.style.left = -parseInt(this.handlerFullRadius) - parseInt(this.scaleWidth) + "px"
            this.markerValueSkaleView.style.left = -parseInt(this.handlerFullRadius)*3.75 + "px"
        } else {
            this.markerSkaleView.style.top = parseInt(this.handlerFullRadius)*0.75 + "px"
            this.markerValueSkaleView.style.top = parseInt(this.handlerFullRadius)*1.75 + "px"
        }
        this.scaleVaeInView.append(this.markerSkaleView)
        this.scaleVaeInView.append(this.markerValueSkaleView)

        this.scaleLinesAndLabelsStep()     

        for(let i = 0; i < this.stepPositionRangeOnScale + 1; i += 1 ) {
            let line = new ScaleValues().scaleMarkerValue  
            if(this.isVerticalIdentifier) {
                line.style.width = "10px"
                line.style.height = "1px"
            } else {
                line.style.width = "1px"
                line.style.height = "10px"
            }

            let numberValue = new ScaleValues().scaleValues
            if(this.isVerticalIdentifier) {
                numberValue.style.top = this.margerScaleRange - parseInt(this.handlerFullRadius)/2 + "px";
            } else {
                numberValue.style.left = this.margerScaleRange - parseInt(this.handlerFullRadius) - 3 + "px";
            }

            this.isVerticalIdentifier?
            numberValue.textContent = String(Number((this.maxV - (this.margerScaleRange - parseInt(this.handlerFullRadius)/2 )*this.correctValue).toFixed(this.stepViewSimbols))):
            numberValue.textContent = (this.minV + (this.margerScaleRange - parseInt(this.handlerFullRadius)/2 )*this.correctValue).toFixed(this.stepViewSimbols);

            if(this.isVerticalIdentifier) {
                line.style.top = this.margerScaleRange + "px"
            } else {
                line.style.left = this.margerScaleRange + "px"
            }
            this.margerScaleRange += ((this.stepValueLines) / this.correctValue)
            this.markerSkaleView.append(line) 
            this.markerValueSkaleView.append(numberValue) 
        } 
    

    }
    // добавление линий деления шкалы слайдера в вид

    // не позволяет меньшему значению быть >= большего и наоборот
    twoHandlersBorderMove(handler : HandlerType) {
        if(handler == this.thumbMax && this.positionHandler < (parseFloat(this.leftOrTopPosition(this.thumbMin)) + this.stepView/this.correctValue)) {
            this.positionHandler = (parseFloat(this.leftOrTopPosition(this.thumbMin)) + this.stepView/this.correctValue)
        } 
        if(handler == this.thumbMin && this.positionHandler > (parseFloat(this.leftOrTopPosition(this.thumbMax)) - this.stepView/this.correctValue)) {
            this.positionHandler = parseFloat(this.leftOrTopPosition(this.thumbMax))  - this.stepView/this.correctValue
        } 
    }
    // не позволяет меньшему значению быть >= большего и наоборот

    // перемещает бегунок к ближайшему значению. Если аргумент true перемещает с движением мыши иначе - скачками, устанавливает текстовое значения поля над бегунком 
    movePositionToNearestValue(slowMover: boolean = false) {
        if((this.positionHandler * this.correctValue)%this.stepView < this.stepView) {
            this.positionLabel.textContent = (this.nearValue(this.verticalOrHorizontalPosition(this.thumb) * this.correctValue)  + this.minValue).toFixed(this.stepViewSimbols)
            
            this.positionLabelMax.textContent = (this.nearValue(this.verticalOrHorizontalPosition(this.thumbMax) * this.correctValue)  + this.minValue).toFixed(this.stepViewSimbols)
            this.positionLabelMin.textContent = (this.nearValue(this.verticalOrHorizontalPosition(this.thumbMin) * this.correctValue)  + this.minValue).toFixed(this.stepViewSimbols)
            if(!slowMover)this.positionHandler = (this.nearValue(this.positionHandler * this.correctValue))/this.correctValue
        }
    }
    // перемещает бегунок к ближайшему значению. Если аргумент true перемещает с движением мыши иначе - скачками, устанавливает текстовое значения поля над бегунком 



    verticalOrHorizontalPosition(handler) {
        return this.isVerticalIdentifier?
        (parseFloat( this.scaleLong) - parseFloat(handler.style.top) - parseFloat(this.handlerFullRadius)):
        parseFloat(handler.style.left)
    }







    // включает/отключает отображение делений шкалы
    scaleLinesTrigger(y) {
        this.valuesOnScale = ((this.maxV - this.minV)/this.stepView).toFixed(0)
        this.scaleLinesAndLabelsStep()
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
        this.valuesOnScale = ((this.maxV - this.minV)/this.stepView).toFixed(0)
        this.scaleLinesAndLabelsStep()
        for(let x = 0; x < this.stepPositionRangeOnScale + 1; x += this.stepView) {
            if(y) {
                this.markerValueSkaleView.getElementsByTagName("div")[x].style.display = 'block'
            } else {
                this.markerValueSkaleView.getElementsByTagName("div")[x].style.display = 'none'
            }
        }
    }
    // включает/отключает отображение значений деления шкалы

    


    //вычисление количества делений шкалы и шага размещения линий и значений(в единицах деления шкалы)
    scaleLinesAndLabelsStep() {       
        if( this.valuesOnScale <= 10) {
            this.stepValueLines = this.stepView
            this.stepPositionRangeOnScale = parseInt(this.valuesOnScale)
        } else {
            outer:for (let index = 10; index > 4; index--) {
                if(this.valuesOnScale % index == 0) {
                    this.stepValueLines = (this.valuesOnScale / index)*this.stepView
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
        this.isRange = isRange
        if(isRange) {
            this.thumb.style.display = "none"
            this.positionLabel.style.display = "none"
            this.thumbMax.style.display = "block"
            this.thumbMin.style.display = "block"
            this.positionLabelMax.style.display = "block"
            this.positionLabelMin.style.display = "block"
            if(this.isVerticalIdentifier) {
                this.thumbMax.style.top = parseInt(this.sliderScale.scaleStyleData.scaleWidth) - parseInt(this.handlerFullRadius) + "px"
                this.thumbMin.style.top = this.handlerRegulLeft
                this.thumb.style.top = this.handlerRegulLeft
                this.thumb.style.left = this.handlerRegulTop
            } else {
                this.thumbMax.style.left = parseInt(this.sliderScale.scaleStyleData.scaleWidth) - parseInt(this.handlerFullRadius) + "px"
                this.thumbMin.style.left = this.handlerRegulLeft
                this.thumb.style.left = this.handlerRegulLeft
                this.thumb.style.top = this.handlerRegulTop

            }
            this.scaleVaeInView.style.background = `linear-gradient(to right, 
            ${this.viewParamsData.scaleView.scaleBackground} 0%, 
            ${this.viewParamsData.scaleView.scaleBackground} ${parseInt(this.leftOrTopPosition(this.thumbMin))/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%,
            ${this.viewParamsData.scaleView.scaleProgress} ${parseInt(this.leftOrTopPosition(this.thumbMin))/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%,
            ${this.viewParamsData.scaleView.scaleProgress} ${parseInt(this.leftOrTopPosition(this.thumbMax))/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%,
            ${this.viewParamsData.scaleView.scaleBackground} ${parseInt(this.leftOrTopPosition(this.thumbMax))/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%,
            ${this.viewParamsData.scaleView.scaleBackground} 100%`  
            this.positionLabelMax.style.left = parseInt(this.leftOrTopPosition(this.thumbMax)) - 19 + parseInt(this.handlerFullRadius)/2 + "px"
            this.positionLabelMin.style.left = parseInt(this.leftOrTopPosition(this.thumbMin)) - 19 + parseInt(this.handlerFullRadius)/2 + "px"
            this.positionLabelMin.textContent = this.minValue
            this.positionLabelMax.textContent = this.maxValue
            this.setThumbLabelTextContentPosition()
            } else {
            this.thumb.style.display = "block"
            this.positionLabel.style.display = "block"
            this.thumbMax.style.display = "none"
            this.thumbMin.style.display = "none"
            this.positionLabelMax.style.display = "none"
            this.positionLabelMin.style.display = "none"
            this.thumb.style.left = this.handlerRegulLeft 
            this.scaleVaeInView.style.background = `linear-gradient(to right, ${this.viewParamsData.scaleView.scaleProgress} 0%, ${this.viewParamsData.scaleView.scaleProgress} ${parseInt(this.thumb.style.left)/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%, #EEEEEE ${parseInt(this.thumb.style.left)/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%, #EEEEEE 100%)`
            this.positionLabel.style.left = parseInt(this.leftOrTopPosition(this.thumb)) - 19 + parseInt(this.handlerFullRadius)/2 + "px"
            this.positionLabel.textContent = this.minValue
            if(this.isVerticalIdentifier) {
                this.thumbMax.style.top = parseInt(this.sliderScale.scaleStyleData.scaleWidth) - parseInt(this.handlerFullRadius) + "px"
                this.thumbMin.style.top = this.handlerRegulLeft
                this.thumb.style.top = parseInt(this.sliderScale.scaleStyleData.scaleWidth) - parseInt(this.handlerFullRadius) + "px"
                this.thumb.style.left = this.handlerRegulTop
            } else {
                this.thumbMax.style.left = parseInt(this.sliderScale.scaleStyleData.scaleWidth) - parseInt(this.handlerFullRadius) + "px"
                this.thumbMin.style.left = this.handlerRegulLeft
                this.thumb.style.left = this.handlerRegulLeft
                this.thumb.style.top = this.handlerRegulTop
            }
            this.setThumbLabelTextContentPosition()
            
        }
        
    }
    // переключение вида количества бегунков

    // двигает текст над бегунком
    setThumbLabelTextContentPosition() {
        if(this.isVerticalIdentifier) {
            this.positionLabel.style.top = parseInt(this.leftOrTopPosition(this.thumb)) + "px"
            this.positionLabel.style.left = parseInt(this.handlerFullRadius)/2 + "px"
            this.positionLabelMax.style.left = parseInt(this.handlerFullRadius)/2 + "px"
            this.positionLabelMin.style.left = parseInt(this.handlerFullRadius)/2 + "px"
            this.positionLabelMax.style.top =  this.thumbMax.style.top 
            this.positionLabelMin.style.top =  this.thumbMin.style.top
            this.positionLabelMax.textContent = (this.nearValue(this.verticalOrHorizontalPosition(this.thumbMax) * this.correctValue)  + this.minValue).toFixed(this.stepViewSimbols)
            this.positionLabelMin.textContent = (this.nearValue(this.verticalOrHorizontalPosition(this.thumbMin) * this.correctValue)  + this.minValue).toFixed(this.stepViewSimbols)
        } else {
            this.positionLabelMax.style.top = -parseInt(this.handlerFullRadius) - parseInt(this.scaleWidth) + "px"
            this.positionLabelMin.style.top =  -parseInt(this.handlerFullRadius) - parseInt(this.scaleWidth) + "px"
            this.positionLabel.style.top = -parseInt(this.handlerFullRadius) - parseInt(this.scaleWidth) + "px"
            this.positionLabel.style.left = parseInt(this.leftOrTopPosition(this.thumb)) - 19 + parseInt(this.handlerFullRadius)/2 + "px"
            this.positionLabelMax.style.left = parseInt(this.leftOrTopPosition(this.thumbMax)) - 19 + parseInt(this.handlerFullRadius)/2 + "px"
            this.positionLabelMin.style.left = parseInt(this.leftOrTopPosition(this.thumbMin)) - 19 + parseInt(this.handlerFullRadius)/2 + "px"
        }
        
    }
    // двигает текст над бегунком
    
    leftOrTopPosition(a) {
        return this.isVerticalIdentifier?
        a.style.top:
        a.style.left
    }

    verticalControl(i: boolean = true) {

        this.isVerticalIdentifier = i
        if(this.isVerticalIdentifier){
            this.scaleVaeInView.style.width = this.scaleWidth
            this.scaleVaeInView.style.height =  this.scaleLong
           
            this.thumb.style.top = parseFloat(this.scaleLong) - parseFloat(this.handlerFullRadius) + "px"
         
            this.thumbMax.style.top = parseFloat(this.scaleLong) - parseFloat(this.handlerFullRadius) + "px" 
            this.thumbMin.style.top = this.handlerRegulLeft

            this.thumb.style.left = this.handlerRegulTop
            this.thumbMax.style.left = this.handlerRegulTop
            this.thumbMin.style.left = this.handlerRegulTop
            
            this.setThumbLabelTextContentPosition()
            
            this.positionLabel.textContent = (this.nearValue(this.verticalOrHorizontalPosition(this.thumb) * this.correctValue)  + this.minValue).toFixed(this.stepViewSimbols)
            this.positionLabelMax.textContent = (this.nearValue(this.verticalOrHorizontalPosition(this.thumbMax) * this.correctValue)  + this.minValue).toFixed(this.stepViewSimbols)
            this.positionLabelMin.textContent = (this.nearValue(this.verticalOrHorizontalPosition(this.thumbMin) * this.correctValue)  + this.minValue).toFixed(this.stepViewSimbols)
            
            
            
            this.markerValueSkaleView.remove()
            this.markerSkaleView.remove()     
            
            this.scaleLinesAdd()

            if(this.isRange) {
                this.scaleprogressColor(this.thumbMax)
            } else {
                this.scaleprogressColor(this.thumb)
            }


            
        } else {
            this.scaleVaeInView.style.width = this.scaleLong
            this.scaleVaeInView.style.height =  this.scaleWidth

            this.thumb.style.left = this.handlerRegulLeft
            this.thumbMax.style.left = parseFloat(this.scaleLong) - parseFloat(this.handlerFullRadius) + "px"
            this.thumbMin.style.left = this.handlerRegulLeft

            this.thumb.style.top = this.handlerRegulTop
            this.thumbMax.style.top = this.handlerRegulTop
            this.thumbMin.style.top = this.handlerRegulTop
            this.setThumbLabelTextContentPosition()


            this.positionLabel.textContent = this.minV 
            this.positionLabelMax.textContent = this.maxV 
            this.positionLabelMin.textContent = this.minV 
            


            this.markerValueSkaleView.remove()
            this.markerSkaleView.remove()     
            

            this.scaleLinesAdd()

            if(this.isRange) {
                this.scaleprogressColor(this.thumbMax)
            } else {
                this.scaleprogressColor(this.thumb)
            }
            
        }


    }

    setCurrentValue(currentValue: number) {
        this.positionLabel.textContent = currentValue
        this.valuesOnScale = ((this.maxV - this.minV)/this.stepView).toFixed(0)
        currentValue = (currentValue - this.minValue) * this.stepView
        this.current = this.nearValue((currentValue).toFixed(this.stepViewSimbols))/this.correctValue
        if (!this.isVerticalIdentifier) {
            this.thumb.style.left = this.current + "px"
        } else {
            this.thumb.style.top = (this.valuesOnScale/this.correctValue) - this.current + 'px'
        }
        this.scaleprogressColor(this.thumb)
        this.setThumbLabelTextContentPosition()
        this.movePositionToNearestValue()
    }

    setCurrentRangeValue(currentMinValue: number, currentMaxValue: number) {
        this.positionLabelMax.textContent = currentMaxValue
        this.positionLabelMin.textContent = currentMinValue

        this.valuesOnScale = ((this.maxV - this.minV)/this.stepView).toFixed(0)
        currentMinValue = (currentMinValue - this.minValue) * this.stepView
        currentMaxValue = (currentMaxValue - this.minValue) * this.stepView

        this.currentMax = this.nearValue((currentMaxValue).toFixed(this.stepViewSimbols))/this.correctValue
        this.currentMin = this.nearValue((currentMinValue).toFixed(this.stepViewSimbols))/this.correctValue

        if (!this.isVerticalIdentifier) {
            this.thumbMin.style.left = this.currentMin + "px"
            this.thumbMax.style.left = this.currentMax + "px"
        } else {
            this.thumbMin.style.top = (this.valuesOnScale/this.correctValue) - this.currentMax + 'px'
            this.thumbMax.style.top = (this.valuesOnScale/this.correctValue) - this.currentMin + 'px'
        }
        this.scaleprogressColor(this.thumbMax)
        this.setThumbLabelTextContentPosition()
        this.movePositionToNearestValue()
    }




}












