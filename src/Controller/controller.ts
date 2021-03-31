import { Model } from "../Model/model"
import { View } from "../View/view"
import { ViewType, defaultView } from "../View/types"
import { ModelType, defaultModel } from "../Model/types"


export class Controller {

    maxModel
    minModel

    maxView
    minView
    one


    getHandlerCurrentsPosition (model, view) {
        //let p = view.rangeValue/(model.max - model.min)
        view.correctValue = (model.max - model.min)/view.rangeValue
        //console.log(view.positionHandler)
        view.stepView = model.step
        view.getStepViewSimbols(view.stepView)
        view.maxV = model.max
        view.minV = model.min
       
        
    }

    HandlerCurrentsPositionTextContent (model, view) {
        view.maxValue = model.max
        view.minValue = model.min
        
        view.sliderScale.maxVal.textContent = model.max
        view.sliderScale.minVal.textContent = model.min
  
    }

    setCurrentValue(model, view) {
        //view.getStepViewSimbols(view.step.veiw)
        view.selectCurrentValues = (view.nearValue((view.maxValue + view.minValue)/2)).toFixed(view.stepViewSimbols)
        //view.isRangeSwitch(true)
       
        view.thumb.style.left = view.selectCurrentValues/view.correctValue + 'px'
        view.positionLabel.style.left = view.selectCurrentValues/view.correctValue + 'px'

        console.log(view.positionLabelMax.style.left, view.positionLabelMin.style.left)
        view.positionLabel.textContent = view.selectCurrentValues
        // view.positionLabelMax.textContent = view.selectCurrentValues
        // view.positionLabelMin.textContent = view.selectCurrentValues
        
        view.scaleLinesAdd()

        view.isRangeSwitch(model.isRange)
    }


    qwe(view, param) {
        view.isRangeSwitch(param)
    }
    
}

//берем вид и модель 
//данные из модели переводим в тип принимаемый видом
//данные из вида переводим в модельные
//
//
//