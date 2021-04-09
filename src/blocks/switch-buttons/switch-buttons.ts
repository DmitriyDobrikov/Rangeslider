import './switch-buttons.scss'

export class ControlParamButton {

    containerOfSwitchParams = document.createElement('div')//.classList.add('.container-of-switch-params')
    textContainer = document.createElement('div')//.classList.add('.container-of-switch-params-text')
    paramInput = document.createElement('input')//.classList.add('.paramInput')
    switchButton = document.createElement('button')//.classList.add('.switch-button')

    constructor(textOfParam: string) {

        this.containerOfSwitchParams.classList.add('container-of-switch-params')
        this.textContainer.classList.add('container-of-switch-params-text')
        this.paramInput.classList.add('paramInput')
        this.switchButton.classList.add('switch-button')
        
        this.containerOfSwitchParams.append(this.textContainer, this.paramInput, this.switchButton)

        this.textContainer.textContent = textOfParam

    }


    booleanMethod(booleanValue) {
        if(booleanValue == 'true') {
            return true
        } else if(booleanValue == 'false') {
            return false
        } else {
            alert('Enter the boolean type')
            
        }
    }

    numberMethod(numberValue) {
        if(isNaN(Number(numberValue))) {
            alert('Enter the number type')
        }
        return Number(numberValue)
    }
}