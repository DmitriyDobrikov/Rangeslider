import '../../index'
import { ControlParamButton } from '../switch-buttons/switch-buttons'
import { SliderParams, defaultSlider, } from "../../types"
import './panel.scss'


class SliderPanel {

    panel

    verticalParamButton = new ControlParamButton('Vertical')
    rangeParamButton = new ControlParamButton('Range')
    thumblerValue = new ControlParamButton('Current value')
    maxScaleValue = new ControlParamButton('Max value')
    minScaleValue = new ControlParamButton('Min value')
    stepValue = new ControlParamButton('Step')
    currentMinValue = new ControlParamButton('Current min')
    currentMaxValue = new ControlParamButton('Current max')
    scaleValues = new ControlParamButton('Scale values')
    scaleLines = new ControlParamButton('Scale lines')
    scaleLong = new ControlParamButton('Scale long')
    positionLabels = new ControlParamButton('Position label')

    // sliderConteiner = document.createElement('div')
    buttonConteiner = document.createElement('div')

    // panelConteiner = document.createElement('div')


    // buttonConteiner1 = document.createElement('div')

    constructor(sliderSelector: any, param : SliderParams = defaultSlider) {
        const that = this      
        //let i = $(sliderSelector).rangeSlider(param)


        // this.buttonConteiner1.textContent = "s;hguihsdhdhhdhdhfkjkdjf;skdef;skhg;fjh"
        // this.sliderConteiner.classList.add('slider-and-button-conteiner')
        this.buttonConteiner.classList.add('slider-and-button-conteiner')

        //this.panelConteiner.classList.add('panel-conteiner')

        this.panel = $(sliderSelector).rangeSlider(param)
        this.panel.append(this.buttonConteiner)

        this.buttonConteiner.append(this.verticalParamButton.containerOfSwitchParams)
        this.buttonConteiner.append(this.rangeParamButton.containerOfSwitchParams)
        this.buttonConteiner.append(this.thumblerValue.containerOfSwitchParams)
        this.buttonConteiner.append(this.maxScaleValue.containerOfSwitchParams)
        this.buttonConteiner.append(this.minScaleValue.containerOfSwitchParams)
        this.buttonConteiner.append(this.stepValue.containerOfSwitchParams)
        this.buttonConteiner.append(this.currentMinValue.containerOfSwitchParams)
        this.buttonConteiner.append(this.currentMaxValue.containerOfSwitchParams)
        this.buttonConteiner.append(this.scaleLines.containerOfSwitchParams)
        this.buttonConteiner.append(this.scaleValues.containerOfSwitchParams) 
        this.buttonConteiner.append(this.positionLabels.containerOfSwitchParams) 

        this.panel.controller.setModelDanaInPanelInput(this.verticalParamButton.paramInput, this.panel.controller.model.isVertical)
        this.panel.controller.setModelDanaInPanelInput(this.rangeParamButton.paramInput, this.panel.controller.model.isRange)
        this.panel.controller.setModelDanaInPanelInput(this.thumblerValue.paramInput, this.panel.controller.model.current)
        this.panel.controller.setModelDanaInPanelInput(this.maxScaleValue.paramInput, this.panel.controller.model.max)
        this.panel.controller.setModelDanaInPanelInput(this.minScaleValue.paramInput, this.panel.controller.model.min)
        this.panel.controller.setModelDanaInPanelInput(this.stepValue.paramInput, this.panel.controller.model.step)
        this.panel.controller.setModelDanaInPanelInput(this.currentMinValue.paramInput, this.panel.controller.model.minCurrentDoubleHeandler)
        this.panel.controller.setModelDanaInPanelInput(this.currentMaxValue.paramInput, this.panel.controller.model.maxCurrentDoubleHeandler)

        this.panel.controller.setModelDanaInPanelInput(this.scaleLines.paramInput, this.panel.controller.model.scaleLines)
        this.panel.controller.setModelDanaInPanelInput(this.scaleValues.paramInput, this.panel.controller.model.scaleValues)
        this.panel.controller.setModelDanaInPanelInput(this.positionLabels.paramInput, this.panel.controller.model.positionLabels)



        this.verticalParamButton.booleanMethod(this.verticalParamButton.paramInput.value)?
        this.verticalParamButton.containerOfSwitchParams.style.marginTop = '-' +(this.panel.controller.view.scaleLong):
        this.verticalParamButton.containerOfSwitchParams.style.marginTop = '-10px';


        this.rangeParamButton.switchButton.onclick = function() {
            that.panel.controller.rangeSwich(that.rangeParamButton.booleanMethod(that.rangeParamButton.paramInput.value))
            that.panel.controller.getData()
        }

        this.verticalParamButton.switchButton.onclick = function() {
            that.panel.controller.verticalMethod(that.verticalParamButton.booleanMethod(that.verticalParamButton.paramInput.value))
            

            that.verticalParamButton.booleanMethod(that.verticalParamButton.paramInput.value)?
            that.verticalParamButton.containerOfSwitchParams.style.marginTop = '-' +(that.panel.controller.view.scaleLong):
            that.verticalParamButton.containerOfSwitchParams.style.marginTop = '-10px';
            that.panel.controller.getData()
        }

        this.thumblerValue.switchButton.onclick = function() {
            //if(isNaN(that.thumblerValue.numberMethod(that.thumblerValue.paramInput.value)) == false) {
                that.panel.controller.current()
                that.thumblerValue.paramInput.value = that.panel.controller.c
                //that.panel.controller.model.current = that.thumblerValue.numberMethod(that.thumblerValue.paramInput.value)
            //}
            that.panel.controller.getData()
        }
        
        this.maxScaleValue.switchButton.onclick = function() {
            if(isNaN(that.maxScaleValue.numberMethod(that.maxScaleValue.paramInput.value)) == false) {
                that.panel.controller.model.max = that.maxScaleValue.numberMethod(that.maxScaleValue.paramInput.value)
            }
                that.panel.controller.getData()
        }

        this.minScaleValue.switchButton.onclick = function() {
            if(isNaN(that.minScaleValue.numberMethod(that.minScaleValue.paramInput.value)) == false) {
                that.panel.controller.model.min = that.minScaleValue.numberMethod(that.minScaleValue.paramInput.value)
            }
            that.panel.controller.getData()
        }

        this.stepValue.switchButton.onclick = function() {
            if(isNaN(that.stepValue.numberMethod(that.stepValue.paramInput.value)) == false) {
                that.panel.controller.model.step = that.stepValue.numberMethod(that.stepValue.paramInput.value)
            }
            that.panel.controller.getData()
        }

        this.currentMinValue.switchButton.onclick = function() {
            if(isNaN(that.currentMinValue.numberMethod(that.currentMinValue.paramInput.value)) == false) {
                that.panel.controller.model.minCurrentDoubleHeandler = that.currentMinValue.numberMethod(that.currentMinValue.paramInput.value)
            }
            that.panel.controller.getData()
        }

        this.currentMaxValue.switchButton.onclick = function() {
            if(isNaN(that.currentMaxValue.numberMethod(that.currentMaxValue.paramInput.value)) == false) {
                that.panel.controller.model.maxCurrentDoubleHeandler = that.currentMaxValue.numberMethod(that.currentMaxValue.paramInput.value)
            }
            that.panel.controller.getData()
        }

        this.scaleValues.switchButton.onclick = function() {
            that.panel.controller.model.scaleValues = that.scaleValues.booleanMethod(that.scaleValues.paramInput.value)
            that.panel.controller.view.scaleValuesTrigger(that.panel.controller.model.scaleValues)
        }

        this.scaleLines.switchButton.onclick = function() {
            that.panel.controller.model.scaleLines = that.scaleLines.booleanMethod(that.scaleLines.paramInput.value)
            that.panel.controller.view.scaleLinesTrigger(that.panel.controller.model.scaleLines)
        }


        this.positionLabels.switchButton.onclick = function() {
            that.panel.controller.model.positionLabels = that.positionLabels.booleanMethod(that.positionLabels.paramInput.value)
            that.panel.controller.view.positionLabelTrigger(that.panel.controller.model.positionLabels)
        }







        // $(sliderSelector).rangeSlider(
            
        //     {
        //         sliderViewParams: {
        //         scaleView: {
        //             scaleWidth: "300px",
        //             scaleHeight: "6px",
        //             scaleBorder: "0px solid black",
        //             scaleBackground: "#EEEEEE",
        //             scaleBorderRadius: '10px',
        //             scaleProgress: "blue"
        //         },
        //         handlerView: { 
        //             handlerWidth: "12px",
        //             handlerHeight: "12px",
        //             handlerBorder: "1px solid #FFFFFF",
        //             handlerBackground: "blue",
        //             handlerBorderRadius: '10px',
        //             handlerLeft: "0px",
        //             handlerTop: "-4px",
        //         },

        //         },
            

        //         sliderModelParams: {
        //         min: 0,
        //         max: 10,
        //         //current: 50,
        //         minCurrentDoubleHeandler: 25,
        //         maxCurrentDoubleHeandler: 75,
        //         isVertical: false,
        //         isRange: false,
        //         step: 0.01,
        //         },
        //     }

        // )

    }


}
export {SliderPanel}