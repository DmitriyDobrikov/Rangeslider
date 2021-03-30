

export class ExampleService {
  scale = document.createElement('div')
  handler = this.scale.append('div')
  
  
  //rangeSliderProgressBar.onmousemove=this.value=event.clientX
  //rangeSliderProgressBar
  //rangeSliderProgressBar: HTMLDivElement
  ///value: string
  
  constructor() {
    //this.rangeSliderProgressBar.style.height = value
    
      
    //this.rangeSliderProgressBar.type = 'range'
    // this.rangeSliderProgressBar.min = min
    // this.rangeSliderProgressBar.max = max
    // this.rangeSliderProgressBar.value="500"
    //this.createElements();
    
   
  } 
  
  // private calculatePosition(sliderData: SliderModelData): number {
  //   const positionPart = ((this.itemIndex - sliderData.min) / sliderData.range);

  //   return clamp(positionPart, 0, 1);
  // }

  
  
  frweq() {
    let self = this
    let thumb = this.scale.querySelector('.thumb');

    // thumb.onmousedown = function(event) {
    //   event.preventDefault(); // предотвратить запуск выделения (действие браузера)

    //   let shiftX = event.clientX - thumb.getBoundingClientRect().left;
    //   // shiftY здесь не нужен, слайдер двигается только по горизонтали

    //   document.addEventListener('mousemove', onMouseMove);
    //   document.addEventListener('mouseup', onMouseUp);

    //   function onMouseMove(event) {
    //     let newLeft = event.clientX - shiftX - slider.getBoundingClientRect().left;

    //     // курсор вышел из слайдера => оставить бегунок в его границах.
    //     if (newLeft < 0) {
    //       newLeft = 0;
    //     }
    //     let rightEdge = slider.offsetWidth - thumb.offsetWidth;
    //     if (newLeft > rightEdge) {
    //       newLeft = rightEdge;
    //     }

    //     thumb.style.left = newLeft + 'px';
    //   }

    //   function onMouseUp() {
    //     document.removeEventListener('mouseup', onMouseUp);
    //     document.removeEventListener('mousemove', onMouseMove);
    //   }

    // };

    // thumb.ondragstart = function() {
    //   return false;
    // };










    //this.rangeSliderProgressBar.getboundingclientrect()
    // this.ball.onmousedown = function(event){ // (1) отследить нажатие

    //   // (2) подготовить к перемещению:
    //   // разместить поверх остального содержимого и в абсолютных координатах
    //   self.ball.style.position = 'absolute';
    //   self.ball.style.zIndex = '1000';
    //   // переместим в body, чтобы мяч был точно не внутри position:relative
    //   document.body.append(self.ball);
    //   // и установим абсолютно спозиционированный мяч под курсор
    
    //   moveAt(event.pageX, event.pageY);
    
    //   // передвинуть мяч под координаты курсора
    //   // и сдвинуть на половину ширины/высоты для центрирования
    //   function moveAt(pageX, pageY) {
    //     self.ball.style.left = pageX - self.ball.offsetWidth / 2 + 'px';
    //     self.ball.style.top = pageY - self.ball.offsetHeight / 2 + 'px';
    //   }
    
    //   function onMouseMove(event) {
    //     moveAt(event.pageX, event.pageY);
    //   }
    
    //   // (3) перемещать по экрану
    //  // if (self.ball.style.left < "300px") {
    //     document.addEventListener('mousemove', onMouseMove);
    //  // }

      
    //   // (4) положить мяч, удалить более ненужные обработчики событий
    //   self.ball.onmouseup = function() {
    //     document.removeEventListener('mousemove', onMouseMove);
    //     self.ball.onmouseup = null;
    //   };
    


      // self.ball.ondragstart = function() {
      //   return false;
      // };
    
    //};

    

  }
  
  
  
  
  //coords = elem.getBoundingClientRect();

  // private createElements(): void {
    //const parentElement = this.wrapElement;
    // this.elements = {
    //   wrap: document.createElement('div'),
    //   body: document.createElement('div'),
    //   scale: document.createElement('div'),
    //   handlers: document.createElement('div'),
    //   min: document.createElement('span'),
    //   max: document.createElement('span'),
    // }

   

  
  
  
  sliderMove(n) {
    


      // var newLeft = e.pageX - shiftX - sliderCoords.left;

      // //если вне слайдера
      // if (newLeft < 0) {
      //     newLeft = 0;
      // }

      // if (newLeft > max - thumbMin.offsetWidth / 2) {
      //     newLeft = max - thumbMin.offsetWidth / 2;
      // }

      // min = newLeft;
      // thumbMin.style.left = newLeft + 'px';
    }
  

  
  getExampleMessage(){ 
    return  this//.rangeSliderProgressBar
  }
    
}