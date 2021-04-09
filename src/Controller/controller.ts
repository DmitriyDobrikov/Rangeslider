import { Model } from "../Model/model"
import { View } from "../View/view"
import { ViewType, defaultView } from "../View/types"
import { ModelType, defaultModel } from "../Model/types"
import { SliderParams, defaultSlider } from "../types"


export class Controller {

    maxModel
    minModel

    maxView
    minView
    


    model
    view

    constructor(selectSliderParams : SliderParams = defaultSlider) {

        this.model = new Model(selectSliderParams.sliderModelParams)
        this.view = new View(selectSliderParams.sliderViewParams)

        // this.HandlerCurrentsPositionTextContent()
        // this.getHandlerCurrentsPosition()
        // this.setCurrentValue()
        this.getData()



    }



    getData() {
        if(this.model.max <= this.model.min) {
            alert('The min value cannot be less than the max value')
            return
        }
        if((this.model.max - this.model.min)%this.model.step) {
            alert('The number of scale divisions must be a multiple of the step')
            return
        }
        if(this.model.current < this.model.min || this.model.current > this.model.max) {
            alert('The current value must be within the scale values')
            return
        }
        if(this.model.current < this.model.min || this.model.current > this.model.max) {
            alert('The current value must be within the scale values')
            return
        }
        if(this.model.minCurrentDoubleHeandler < this.model.min) {
            this.model.minCurrentDoubleHeandler = this.model.min
        }
        if(this.model.maxCurrentDoubleHeandler > this.model.max) {
            this.model.maxCurrentDoubleHeandler = this.model.max
        }

  
        this.view.correctValue = (this.model.max - this.model.min)/this.view.rangeValue
        this.view.stepView = this.model.step
        this.view.getStepViewSimbols(this.view.stepView)
        this.view.maxV = this.model.max
        this.view.minV = this.model.min
        this.view.maxValue = this.model.max
        this.view.minValue = this.model.min
        this.view.isRange = this.model.isRange
        //this.view.selectCurrentValues = (this.view.nearValue((this.view.maxValue + this.view.minValue)/2)).toFixed(this.view.stepViewSimbols)
        
        //this.view.isVerticalIdentifier = this.model.isVertical

        

        // this.view.markerValueSkaleView.remove()
        // this.view.markerSkaleView.remove() 
        //this.model.current = this.view.current
        this.view.scaleLinesAdd();
        this.view.verticalControl(this.model.isVertical);
        this.view.isRangeSwitch(this.model.isRange);

        this.model.isRange?
        this.view.setCurrentRangeValue(this.model.minCurrentDoubleHeandler, this.model.maxCurrentDoubleHeandler):
        this.view.setCurrentValue(this.model.current);
        //this.view.setCurrentRangeValue(this.model.minCurrentDoubleHeandler, this.model.maxCurrentDoubleHeandler)
        

        // this.view.thumb.style.left = this.view.selectCurrentValues/this.view.correctValue + 'px'
        // this.view.scaleprogressColor(this.view.thumb)


    }




    getHandlerCurrentsPosition () {
        this.view.correctValue = (this.model.max - this.model.min)/this.view.rangeValue
        this.view.stepView = this.model.step
        this.view.getStepViewSimbols(this.view.stepView)
        this.view.maxV = this.model.max
        this.view.minV = this.model.min
    }

    HandlerCurrentsPositionTextContent () {
        this.view.maxValue = this.model.max
        this.view.minValue = this.model.min
        
        // this.view.sliderScale.maxVal.textContent = this.model.max
        // this.view.sliderScale.minVal.textContent = this.model.min
  
    }

    setCurrentValue() {
        //view.getStepViewSimbols(view.step.veiw)
        //this.view.selectCurrentValues = (this.view.nearValue((this.view.maxValue + this.view.minValue)/2)).toFixed(this.view.stepViewSimbols)
        //view.isRangeSwitch(true)
       
        // view.thumb.style.left = view.selectCurrentValues/view.correctValue + 'px'
        // view.positionLabel.style.left = view.selectCurrentValues/view.correctValue + 'px'

        //console.log(view.positionLabelMax.style.left, view.positionLabelMin.style.left)
        //this.view.positionLabel.textContent = this.view.selectCurrentValues
        // view.positionLabelMax.textContent = view.selectCurrentValues
        // view.positionLabelMin.textContent = view.selectCurrentValues
        
        this.view.scaleLinesAdd()
        // view.scaleLinesTrigger(false)
        // view.scaleValuesTrigger(false)

        this.view.isRangeSwitch(this.model.isRange)
        
    }




    rangeSwich(isRangeValue) {
        if(isRangeValue === true){
            isRangeValue = true
        } else if (isRangeValue === false) {
            isRangeValue = false
        } else {
            return 
        }
        this.model.isRange = isRangeValue//!this.model.isRange //isRangeValue
        this.view.isRangeSwitch(this.model.isRange)
        //console.log(this.model.isRange)
    }
    

    verticalMethod(isVerticalValue) {
        if(isVerticalValue === true){
            isVerticalValue = true
        } else if (isVerticalValue === false) {
            isVerticalValue = false
        } else {
            return 
        }
        //this.view.isVerticalIdentifier = param
        this.model.isVertical = isVerticalValue//!this.model.isVertical
        this.view.verticalControl(this.model.isVertical)
    }
    
}

//берем вид и модель 
//данные из модели переводим в тип принимаемый видом
//данные из вида переводим в модельные
//
//
//