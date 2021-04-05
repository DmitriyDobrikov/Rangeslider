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
    q


    x
    y

    isVerticalIdentifier = false



    constructor (viewParams: ViewType = defaultView, ) {

        
      
        this.sliderScale = new Scale(viewParams.scaleView) 
        this.scaleHandler = new Handler(viewParams.handlerView) 
        this.scaleVaeInView = this.sliderScale.scale
        this.thumb = this.scaleHandler.handler
        this.scaleVaeInView.style.width
        
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
        this.q = this.scaleHandler.handler.style.top

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


        this.x = this.scaleVaeInView.style.width
        this.y = this.scaleVaeInView.style.height

        this.handlerRegulLeft = this.scaleHandler.handler.style.left
        this.handlerRegulTop = this.scaleHandler.handler.style.top

      
        

    }

    handlerRegulLeft
    handlerRegulTop
    


    





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
        console.log(this.positionHandler, this.thumbMin.style.top, this.thumbMax.style.top)
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
                handlerName.style.left = -4 + "px"
            } else {
                handlerName.style.left = self.positionHandler + 'px';
                handlerName.style.top = -4 + "px"
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
            //this.scaleVaeInView.style.background = `linear-gradient(to top, ${this.viewParamsData.scaleView.scaleProgress} 0%, ${this.viewParamsData.scaleView.scaleProgress} ${parseInt(this.leftOrTopPosition(this.thumb))/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%, #EEEEEE ${this.positionHandler/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%, #EEEEEE 100%)`
            this.isVerticalIdentifier?
            this.scaleVaeInView.style.background = `linear-gradient(to bottom, ${this.viewParamsData.scaleView.scaleBackground} 0%, ${this.viewParamsData.scaleView.scaleBackground} ${parseInt(this.leftOrTopPosition(this.thumb))/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%, ${this.viewParamsData.scaleView.scaleProgress} ${parseInt(this.leftOrTopPosition(this.thumb))/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%, ${this.viewParamsData.scaleView.scaleProgress} 100%)`:
            this.scaleVaeInView.style.background = `linear-gradient(to right, ${this.viewParamsData.scaleView.scaleProgress} 0%, ${this.viewParamsData.scaleView.scaleProgress} ${parseInt(this.leftOrTopPosition(this.thumb))/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%, ${this.viewParamsData.scaleView.scaleBackground} ${parseInt(this.leftOrTopPosition(this.thumb))/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%, ${this.viewParamsData.scaleView.scaleBackground} 100%)`
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

        if(this.isVerticalIdentifier) {
            this.markerSkaleView.style.left = -parseInt(this.handlerFullRadius) - parseInt(this.y) + "px"
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
                //numberValue.style.left = this.margerScaleRange - parseInt(this.handlerFullRadius)/2 + "px";
                numberValue.style.left = this.margerScaleRange - 15 + "px";
            }

            if(((this.margerScaleRange - parseInt(this.handlerFullRadius)/2)*this.correctValue).toFixed(this.stepViewSimbols) < this.maxV){
                this.isVerticalIdentifier?
                numberValue.textContent = String((this.maxV - (this.margerScaleRange - parseInt(this.handlerFullRadius)/2 )*this.correctValue).toFixed(this.stepViewSimbols)):
                numberValue.textContent = String((this.minV + (this.margerScaleRange - parseInt(this.handlerFullRadius)/2 )*this.correctValue).toFixed(this.stepViewSimbols))
            } else {
                this.isVerticalIdentifier?
                numberValue.textContent = String(this.minV):
                numberValue.textContent = String(this.maxV)
            }

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
    twoHandlersBorderMove(handler) {
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
        (parseFloat(this.x) - parseFloat(handler.style.top) - 12):
        parseFloat(handler.style.left)
    }







    // включает/отключает отображение делений шкалы
    scaleLinesTrigger(y) {
        for(let x = 0; x < this.stepPositionRangeOnScale + 1; x += this.stepView) {
            if(y) {
                this.markerSkaleView.getElementsByTagName("div")[x].style.display = 'block'
            } else {
                this.markerSkaleView.getElementsByTagName("div")[x].remove().style.display = 'none'
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
                this.markerValueSkaleView.getElementsByTagName("div")[x].remove().style.display = 'none'
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
                this.thumbMin.style.top = 0 + 'px'
                this.thumb.style.top = 0 + "px"
                this.thumb.style.left = "-4px"
            } else {
                this.thumbMax.style.left = parseInt(this.sliderScale.scaleStyleData.scaleWidth) - parseInt(this.handlerFullRadius) + "px"
                this.thumbMin.style.left = 0 + 'px'
                this.thumb.style.left = 0 + 'px'
                this.thumb.style.top = "-4px" 

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
            this.thumb.style.left = 0  + "px" 
            this.scaleVaeInView.style.background = `linear-gradient(to right, ${this.viewParamsData.scaleView.scaleProgress} 0%, ${this.viewParamsData.scaleView.scaleProgress} ${parseInt(this.thumb.style.left)/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%, #EEEEEE ${parseInt(this.thumb.style.left)/parseInt(this.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%, #EEEEEE 100%)`
            this.positionLabel.style.left = parseInt(this.leftOrTopPosition(this.thumb)) - 19 + parseInt(this.handlerFullRadius)/2 + "px"
            this.positionLabel.textContent = this.minValue
            if(this.isVerticalIdentifier) {
                this.thumbMax.style.top = parseInt(this.sliderScale.scaleStyleData.scaleWidth) - parseInt(this.handlerFullRadius) + "px"
                this.thumbMin.style.top = 0 + 'px'
                this.thumb.style.top = parseInt(this.sliderScale.scaleStyleData.scaleWidth) - parseInt(this.handlerFullRadius) + "px"
                this.thumb.style.left = "-4px" 
            } else {
                this.thumbMax.style.left = parseInt(this.sliderScale.scaleStyleData.scaleWidth) - parseInt(this.handlerFullRadius) + "px"
                this.thumbMin.style.left = 0 + "px"
                this.thumb.style.left = 0 + "px" 
                this.thumb.style.top = "-4px" 
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
            this.positionLabelMax.style.top = -parseInt(this.handlerFullRadius) - parseInt(this.y) + "px"
            this.positionLabelMin.style.top =  -parseInt(this.handlerFullRadius) - parseInt(this.y) + "px"
            this.positionLabel.style.top = -parseInt(this.handlerFullRadius) - parseInt(this.y) + "px"
            this.positionLabel.style.left = parseInt(this.leftOrTopPosition(this.thumb)) - 19 + parseInt(this.handlerFullRadius)/2 + "px"
            this.positionLabelMax.style.left = parseInt(this.leftOrTopPosition(this.thumbMax)) - 19 + parseInt(this.handlerFullRadius)/2 + "px"
            this.positionLabelMin.style.left = parseInt(this.leftOrTopPosition(this.thumbMin)) - 19 + parseInt(this.handlerFullRadius)/2 + "px"
        }
        
    }
    // двигает текст над бегунком



    // isVerticalController(vertical) {
    //     if(vertical) {

    //     }
    // }

    // toVertical(pos, newPos){
    //     pos = newPos + "px"
    // }
    
    leftOrTopPosition(a) {
        return this.isVerticalIdentifier?
        a.style.top:
        a.style.left
    }





    verticalControl(i: boolean = true) {

        this.isVerticalIdentifier = !this.isVerticalIdentifier
        if(this.isVerticalIdentifier){
            this.scaleVaeInView.style.width = this.y
            this.scaleVaeInView.style.height =  this.x
           
            this.thumb.style.top = parseFloat(this.x) - parseFloat(this.handlerFullRadius) + "px"
         
            this.thumbMax.style.top = parseFloat(this.x) - parseFloat(this.handlerFullRadius) + "px" 
            this.thumbMin.style.top = "0px"

            this.thumb.style.left = "-4px"
            this.thumbMax.style.left = "-4px"
            this.thumbMin.style.left = "-4px"
            
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
            this.scaleVaeInView.style.width = this.x
            this.scaleVaeInView.style.height =  this.y

            this.thumb.style.left = "0px"
            this.thumbMax.style.left = parseFloat(this.x) - parseFloat(this.handlerFullRadius) + "px"
            this.thumbMin.style.left = "0px"

            this.thumb.style.top = "-4px"
            this.thumbMax.style.top = "-4px"
            this.thumbMin.style.top = "-4px"
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




    returnCurrentValue(){}
}












