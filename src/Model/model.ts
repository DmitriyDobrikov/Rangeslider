import { ModelType, defaultModel } from "./types"


export class Model {

    min
    max
    current
    minCurrentDoubleHeandler
    maxCurrentDoubleHeandler
    isVertical
    isRange
    step
    scaleValues
    scaleLines
    positionLabels

    modelData: ModelType = {}

    constructor (madelParam: ModelType = defaultModel) {

        Object.assign(this.modelData, defaultModel, madelParam)

        this.min = this.modelData.min 
        this.max = this.modelData.max

        this.current = this.modelData.current
        this.minCurrentDoubleHeandler = this.modelData.minCurrentDoubleHeandler
        this.maxCurrentDoubleHeandler = this.modelData.maxCurrentDoubleHeandler
        this.isVertical = this.modelData.isVertical
        this.isRange = this.modelData.isRange
        this.step = this.modelData.step 
        this.scaleValues = this.modelData.scaleValues 
        this.scaleLines = this.modelData.scaleLines 
        this.positionLabels = this.modelData.positionLabels
    }

    get currentValue() {
        return this.current
    }
    set currentValue(value) {
        this.current = value
    }

    get minCurrentValue() {
        return this.minCurrentDoubleHeandler
    }
    set minCurrentValue(value) {
        this.minCurrentDoubleHeandler = value
    }

    get maxCurrentValue() {
        return this.maxCurrentDoubleHeandler
    }
    set maxCurrentValue(value) {
        this.maxCurrentDoubleHeandler = value
    }


}