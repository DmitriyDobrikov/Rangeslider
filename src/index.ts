//import Icon from './images/1.png'
const imageSrc = require('./images/1.png')
// class Game {
//     name = 'Violin Charades'
// }
// const myGame = new Game()

// // создаем параграф
// const p = document.createElement('p')
// p.textContent = `I like ${myGame.name}.`

// // создаем элемент заголовка
// const heading = document.createElement('h1')
// heading.textContent = 'Как интересно!'

// // добавляем параграф и заголовок в DOM
// const root = document.querySelector('#root')
// root.append(heading, p)



function component() {
  const element = document.createElement('div');
  
  //element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());

alert('dfg')