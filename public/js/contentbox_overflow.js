let container = document.getElementById('container')
let content = container.getElementsByClassName('content-box')
let itens = content.getElementsByClassName('descricao');
let data = [].map.call(itens, item => item.textContent)

console.log(data);