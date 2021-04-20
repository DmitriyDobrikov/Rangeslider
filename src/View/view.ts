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


    scaleProgress
    scaleBackground

    constructor (viewParams: ViewType = defaultView, ) {
        this.viewParamsData

        Object.assign(this.viewParamsData, defaultView, viewParams)

        for (const key in this.viewParamsData) {
            if (viewParams[key] != undefined) {
                this.viewParamsData[key] = viewParams[key]
            }
        }

        this.scaleProgress = new Scale(this.viewParamsData.scaleView).scale
        this.scaleProgress.style.position = 'absolute'
        this.scaleProgress.style.left = '-10px'
        this.scaleProgress.style.background = this.viewParamsData.scaleView.scaleProgress
        this.scaleProgress.style.zIndex = '1'
        


        this.scaleBackground = new Scale(viewParams.scaleView).scale
        this.scaleBackground.style.width = "100%"
        this.scaleBackground.style.height = "100%"
        this.scaleBackground.style.position = 'absolute'
        this.scaleBackground.style.right = '0px'
        this.scaleBackground.style.background = this.viewParamsData.scaleView.scaleBackground
        this.scaleBackground.style.zIndex = '0'



      
        this.sliderScale = new Scale(viewParams.scaleView) 
        this.scaleHandler = new Handler(viewParams.handlerView) 
        this.scaleVaeInView = this.sliderScale.scale
        this.thumb = this.scaleHandler.handler
        
        
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
        this.scaleVaeInView.append(this.scaleProgress) 
        this.scaleVaeInView.append(this.scaleBackground) 

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

        this.rangeValue =  parseInt(this.sliderScale.scaleStyleData.scaleWidth) - parseInt(this.handlerFullRadius)


        this.scaleLong = this.scaleVaeInView.style.width
        this.scaleWidth = this.scaleVaeInView.style.height

        this.handlerRegulLeft = this.scaleHandler.handler.style.left
        this.handlerRegulTop = this.scaleHandler.handler.style.top 
        this.valuesOnScale = ((this.maxV - this.minV)/this.stepView).toFixed(0)    
        

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
        this.scaleVaeInView.style.background = this.viewParamsData.scaleView.scaleBackground
        if(handlerType == this.thumbMin || handlerType == this.thumbMax){
            if(this.isVerticalIdentifier) {
                this.scaleProgress.style.width = this.scaleWidth
                this.scaleBackground.style.width = this.scaleWidth
                this.scaleBackground.style.height = this.scaleLong
                this.scaleProgress.style.height = parseInt(this.leftOrTopPosition(this.thumbMax)) - parseInt(this.leftOrTopPosition(this.thumbMin)) + parseInt(this.handlerFullRadius)/2 + 'px'
                this.scaleProgress.style.top = parseInt(this.leftOrTopPosition(this.thumbMin)) + parseInt(this.handlerFullRadius)/2 + 'px' //parseInt(this.scaleLong) - parseInt(this.leftOrTopPosition(this.thumbMax)) - parseInt(this.handlerFullRadius)/2 + 'px'
                this.scaleProgress.style.left = - parseInt(this.handlerFullRadius)*0.8 + 'px'
            } else {
                this.scaleBackground.style.width = this.scaleLong
                this.scaleBackground.style.height = this.scaleWidth
                this.scaleProgress.style.height = this.scaleWidth
                this.scaleProgress.style.left = this.leftOrTopPosition(this.thumbMin)
                this.scaleProgress.style.top = '0'
                this.scaleProgress.style.width = parseInt(this.leftOrTopPosition(this.thumbMax)) - parseInt(this.leftOrTopPosition(this.thumbMin)) - parseInt(this.handlerFullRadius)/2 + 'px'
            }
        } else {
            if(this.isVerticalIdentifier) {
                this.scaleBackground.style.width = this.scaleWidth
                this.scaleBackground.style.height = this.scaleLong
                this.scaleProgress.style.width = this.scaleWidth
                this.scaleProgress.style.height = parseInt(this.scaleLong) - parseInt(this.leftOrTopPosition(this.thumb)) - parseInt(this.handlerFullRadius)/2 + 'px'
                this.scaleProgress.style.top = parseInt(this.leftOrTopPosition(this.thumb)) + parseInt(this.handlerFullRadius)/2 + 'px'
            } else {
                this.scaleBackground.style.width = this.scaleLong
                this.scaleBackground.style.height = this.scaleWidth
                this.scaleProgress.style.height = this.scaleWidth
                this.scaleProgress.style.top = '0'
                this.scaleProgress.style.left = - parseInt(this.handlerFullRadius)*0.8 + 'px'
                this.scaleProgress.style.width = parseInt(this.leftOrTopPosition(this.thumb)) + parseInt(this.handlerFullRadius)/2 + 'px'
            }
        }
        //alert(this.scaleProgress.style.bottom)
        //console.log(parseInt(this.leftOrTopPosition(this.thumbMax)) + '  ' +  parseInt(this.leftOrTopPosition(this.thumbMin)) + ' ' + parseInt(this.handlerFullRadius)/2 + 'px')
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
        for(let x = 0; x < this.stepPositionRangeOnScale + 1; x += 1) {
            if(y) {
                this.markerSkaleView.getElementsByTagName("div")[x].style.display = 'block'
                //console.log(this.markerSkaleView.getElementsByTagName("div")[x])
            } else {
                //console.log(this.markerSkaleView.getElementsByTagName("div")[x])
                this.markerSkaleView.getElementsByTagName("div")[x].style.display = 'none'
            }
        }
    }
    // включает/отключает отображение делений шкалы


    // включает/отключает отображение значений деления шкалы
    scaleValuesTrigger(y) {
        this.valuesOnScale = ((this.maxV - this.minV)/this.stepView).toFixed(0)
        this.scaleLinesAndLabelsStep()
        for(let x = 0; x < this.stepPositionRangeOnScale + 1; x += 1) {
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
  
            this.setThumbLabelTextContentPosition()
        } else {
            this.thumb.style.display = "block"
            this.positionLabel.style.display = "block"
            this.thumbMax.style.display = "none"
            this.thumbMin.style.display = "none"
            this.positionLabelMax.style.display = "none"
            this.positionLabelMin.style.display = "none"
     
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


    positionLabelTrigger(positionLabelTrig: boolean) {
        if(positionLabelTrig) {
            if(this.isRange) {
                this.positionLabelMax.style.display = 'block' 
                this.positionLabelMin.style.display = 'block' 
            } else {
                this.positionLabel.style.display = 'block' 
            }
        } else {
            if(this.isRange) {
                this.positionLabelMax.style.display = 'none' 
                this.positionLabelMin.style.display = 'none' 
            } else {
                this.positionLabel.style.display = 'none' 
            }
        }
    }


    
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

            // this.thumb.style.left = this.handlerRegulLeft
            // this.thumbMax.style.left = parseFloat(this.scaleLong) - parseFloat(this.handlerFullRadius) + "px"
            // this.thumbMin.style.left = this.handlerRegulLeft

            this.thumb.style.top = this.handlerRegulTop
            this.thumbMax.style.top = this.handlerRegulTop
            this.thumbMin.style.top = this.handlerRegulTop
            this.setThumbLabelTextContentPosition()


            // this.positionLabel.textContent = this.minV 
            // this.positionLabelMax.textContent = this.maxV 
            // this.positionLabelMin.textContent = this.minV 
            


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
        
        this.valuesOnScale = ((this.maxV - this.minV)/this.stepView).toFixed(0)
        currentValue = this.nearValue(Number((currentValue).toFixed(this.stepViewSimbols)))
        this.positionLabel.textContent = currentValue

        let currentValueNew = (currentValue - this.minValue) / this.stepView
        this.current = (currentValueNew * ((parseInt(this.scaleLong) - parseInt(this.handlerFullRadius)) / parseInt(this.valuesOnScale)))
        
        this.getStepViewSimbols(this.stepView)
        
        if (!this.isVerticalIdentifier) {
            this.thumb.style.left = this.current  + "px"
        } else {
            this.thumb.style.top = (parseInt(this.scaleLong) - parseInt(this.handlerFullRadius)) - this.current + 'px'
        }
        this.scaleprogressColor(this.thumb)
        this.setThumbLabelTextContentPosition()
        this.movePositionToNearestValue()
    }



    setCurrentRangeValue(currentMinValue: number, currentMaxValue: number) {

        currentMinValue = this.nearValue(Number((currentMinValue).toFixed(this.stepViewSimbols)))
        currentMaxValue = this.nearValue(Number((currentMaxValue).toFixed(this.stepViewSimbols)))
        this.valuesOnScale = ((this.maxV - this.minV)/this.stepView).toFixed(0)

        this.positionLabelMax.textContent = currentMaxValue
        this.positionLabelMin.textContent = currentMinValue

        currentMaxValue = (currentMaxValue - this.minValue) / this.stepView
        currentMinValue = (currentMinValue - this.minValue) / this.stepView

        this.currentMin = (currentMinValue * ((parseInt(this.scaleLong) - parseInt(this.handlerFullRadius)) / parseInt(this.valuesOnScale)))
        this.currentMax = (currentMaxValue * ((parseInt(this.scaleLong) - parseInt(this.handlerFullRadius)) / parseInt(this.valuesOnScale)))

        if (!this.isVerticalIdentifier) {
            this.thumbMin.style.left = this.currentMin + "px"
            this.thumbMax.style.left = this.currentMax + "px"
        } else {
            this.thumbMin.style.top = (parseInt(this.scaleLong) - parseInt(this.handlerFullRadius)) - this.currentMax + 'px'
            this.thumbMax.style.top = (parseInt(this.scaleLong) - parseInt(this.handlerFullRadius)) - this.currentMin + 'px'
        }
        this.scaleprogressColor(this.thumbMax)
        this.setThumbLabelTextContentPosition()
        this.movePositionToNearestValue()
    }



    get getCurrentValue() {
        this.valuesOnScale = (this.maxV - this.minV)/this.stepView
        let item = this.stepView/this.correctValue
        if (!this.isVerticalIdentifier) {
            return  this.nearValue(Number(this.minValue + ((parseInt(this.thumb.style.left)/item) * this.stepView).toFixed(this.stepViewSimbols)))
        } else {
            return  this.nearValue(Number(this.minValue + ((parseInt(this.scaleLong) - parseInt(this.handlerFullRadius) - parseInt(this.thumb.style.top))/item) * this.stepView.toFixed(this.stepViewSimbols)))
        }
    }

    get getCurrentMinValue() {
        this.valuesOnScale = (this.maxV - this.minV)/this.stepView
        let item = this.stepView/this.correctValue
        if (!this.isVerticalIdentifier) {
            return  this.nearValue(Number(this.minValue + ((parseInt(this.thumbMin.style.left)/item) * this.stepView).toFixed(this.stepViewSimbols)))
        } else {
            return  this.nearValue(Number(this.minValue + ((parseInt(this.scaleLong) - parseInt(this.handlerFullRadius) - parseInt(this.thumbMax.style.top))/item) * this.stepView.toFixed(this.stepViewSimbols)))
        }
    }


    get getCurrentMaxValue() {
        this.valuesOnScale = (this.maxV - this.minV)/this.stepView
        let item = this.stepView/this.correctValue
        if (!this.isVerticalIdentifier) {
            return  this.nearValue(Number(this.minValue + ((parseInt(this.thumbMax.style.left)/item) * this.stepView).toFixed(this.stepViewSimbols)))
        } else {
            return  this.nearValue(Number(this.minValue + ((parseInt(this.scaleLong) - parseInt(this.handlerFullRadius) - parseInt(this.thumbMin.style.top))/item) * this.stepView.toFixed(this.stepViewSimbols)))
        }
    }


}












