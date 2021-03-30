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
        //view.selectCurrentValues = model.current
        
    }

    setCurrentValue(view) {
        //view.getStepViewSimbols(view.step.veiw)
        view.selectCurrentValues = (view.nearValue((view.maxValue + view.minValue)/2)).toFixed(view.stepViewSimbols)
        
        view.thumb.style.left = view.selectCurrentValues/view.correctValue + 'px'
        view.thumb1.style.left = view.selectCurrentValues/view.correctValue + 90 + 'px'


        //view.thumb.style.left = String(view.selectCurrentValues/view.correctValue) + 'px'
        view.positionLabel.textContent = view.selectCurrentValues
        
        view.scaleVaeInView.style.background = `linear-gradient(to right, 
        ${view.viewParamsData.scaleView.scaleBackground} 0%, 
        ${view.viewParamsData.scaleView.scaleBackground} ${parseInt(view.thumb.style.left)/parseInt(view.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%,
        ${view.viewParamsData.scaleView.scaleProgress} ${parseInt(view.thumb.style.left)/parseInt(view.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%,
        ${view.viewParamsData.scaleView.scaleProgress} ${parseInt(view.thumb1.style.left)/parseInt(view.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%,
        ${view.viewParamsData.scaleView.scaleBackground} ${parseInt(view.thumb1.style.left)/parseInt(view.sliderScale.scaleStyleData.scaleWidth) * 100 + 1}%,
        ${view.viewParamsData.scaleView.scaleBackground} 100%`   

        
        view.scaleLinesAdd()

        // view.scaleLinesTrigger(false)
        // view.scaleValuesTrigger(false)

        // view.scaleValuesTrigger(true)
        // view.scaleLinesTrigger(true)

    }
    
}

//берем вид и модель 
//данные из модели переводим в тип принимаемый видом
//данные из вида переводим в модельные
//
//
//