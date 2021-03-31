type ModelType = {
    min?: number;
    max?: number;
    current?: number;
    minCurrentDoubleHeandler?: number;
    maxCurrentDoubleHeandler?: number;
    ivVertical?: boolean;
    isRange?: boolean;
    step?: number;
    
}


 const defaultModel = {
    min: 0,
    max: 10,
    current: 50,
    minCurrentDoubleHeandler: 25,
    maxCurrentDoubleHeandler: 75,
    ivVertical: false,
    isRange: true,
    step: 1,
    
}

export {ModelType, defaultModel}