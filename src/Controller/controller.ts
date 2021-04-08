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

        this.HandlerCurrentsPositionTextContent()
        this.getHandlerCurrentsPosition()
        this.setCurrentValue()



    }



    getData() {
        this.view.correctValue = (this.model.max - this.model.min)/this.view.rangeValue
        this.view.stepView = this.model.step
        this.view.getStepViewSimbols(this.view.stepView)
        this.view.maxV = this.model.max
        this.view.minV = this.model.min
        this.view.maxValue = this.model.max
        this.view.minValue = this.model.min
        this.view.scaleLinesAdd()
        this.view.isRangeSwitch(this.model.isRange)
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


    rangeSwich(param) {
        this.model.isRange = !this.model.isRange
        this.view.isRangeSwitch(param)
    }
    

    verticalMethod(param) {
        //this.view.isVerticalIdentifier = param
        this.model.isVertical = !this.model.isVertical
        this.view.verticalControl(param)
    }
    
}

//берем вид и модель 
//данные из модели переводим в тип принимаемый видом
//данные из вида переводим в модельные
//
//
//