//INICIO JS SLIDER
const slider = document.querySelector(".slider");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const slides = document.querySelectorAll(".slide");
const slideIcons = document.querySelectorAll(".slide-icon");
const numberOfSlides = slides.length;
var slideNumber = 0;

// slider botón siguiente
nextBtn.addEventListener("click", () => {
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });
  slideIcons.forEach((slideIcon) => {
    slideIcon.classList.remove("active");
  });

  slideNumber++;

  if(slideNumber > (numberOfSlides - 1)){
    slideNumber = 0;
  }

  slides[slideNumber].classList.add("active");
  slideIcons[slideNumber].classList.add("active");
});

// slider botón anterior
prevBtn.addEventListener("click", () => {
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });
  slideIcons.forEach((slideIcon) => {
    slideIcon.classList.remove("active");
  });

  slideNumber--;

  if(slideNumber < 0){
    slideNumber = numberOfSlides - 1;
  }

  slides[slideNumber].classList.add("active");
  slideIcons[slideNumber].classList.add("active");
});

// slider autoplay
var playSlider;

var repeater = () => {
  playSlider = setInterval(function(){
    slides.forEach((slide) => {
      slide.classList.remove("active");
    });
    slideIcons.forEach((slideIcon) => {
      slideIcon.classList.remove("active");
    });

    slideNumber++;

    if(slideNumber > (numberOfSlides - 1)){
      slideNumber = 0;
    }

    slides[slideNumber].classList.add("active");
    slideIcons[slideNumber].classList.add("active");
  }, 4000);
}
repeater();

//parar el slider autoplay al mouseover
slider.addEventListener("mouseover", () => {
  clearInterval(playSlider);
});

//iniciar el slider autoplaydenuevo al mouseout
slider.addEventListener("mouseout", () => {
  repeater();
});

//FIN JS SLIDER

//INICIO FUNCIONALIDAD CARTAS
let popupViews = document.querySelectorAll('.popup-view');
let popupBtns = document.querySelectorAll('.popup-btn');
let closeBtns = document.querySelectorAll('.close-btn');

let popup = function(popupClick) {
    popupViews[popupClick].classList.add('active');
}

popupBtns.forEach((popupBtn, i) => {
    popupBtn.addEventListener("click", () => {
        popup(i);
    });
});

closeBtns.forEach((closeBtn) => {
    closeBtn.addEventListener("click", () => {
        popupViews.forEach((popupView) => {
            popupView.classList.remove('active');
        });
    });
});

//FIN FUNCIONALIDAD CARTAS

//INICIO FUNCIONALIDAD CARRITO

import items from './products.js'
/*hacer que nombre, precio, tag, descripción e imagen sean dinámicos
generar carrito en una table como js codepen, o más elaborado  
que el carrito se guarde en el local storage*/

let products = items

/*localizo todos los botones de añadir al carrito 
y los ingreso en una variable 'addToCart'*/
let addToCart = document.querySelectorAll('.add-cart-btn');

/*loopeo a todos esos botones y genero event listeners 
que cada vez que escuchen un click inicialicen la funcion cartNumbers() y totalCost()*/
for (let i = 0; i < addToCart.length; i++) {
  addToCart[i].addEventListener('click', () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
    displayCart();
  })
}

/*chequea si existen valores previos en el local storage
asignados a la variable 'cartNumbers' y si existen los asigna
a la variable 'productNumbers' y por ende al carrito.
*/
function onLoadCartNumbers () {
  let productNumbers = localStorage.getItem('cartNumbers')
  if (productNumbers) {
    document.querySelector('.cart span').textContent = productNumbers;
  }
}

/*ingresa al localstorage y chequea el valor de la variable 'cartNumbers', 
asigna ese valor a la variable 'productNumbers' parseandolo a un número 
(ya que devuelve un string)
Si hay un valor asignado a 'productNumbers' entonces le suma un 1, 
y si no lo hay, entonces le asigna el valor 1.
tanto en carrito como en localstorage de carrito.
*/
function cartNumbers(products) {
  let productNumbers = localStorage.getItem('cartNumbers');
  productNumbers = parseInt(productNumbers)
  if (productNumbers) {
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.cart span').textContent = productNumbers + 1;
  } else {
    localStorage.setItem('cartNumbers', 1)
    document.querySelector('.cart span').textContent = 1
  }
  setItems(products)
}

/* Asigna a la variable 'cartItems' el valor de la variable del localStorage 'productsInCart'
y luego lo parsea (transforma en notación json).*/
function setItems(products) {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  //Si cartItems tiene un valor previo, accedes al valor inCart del producto y le sumas 1
  //si cartItems no tiene un valor previo, inicializas el valor de inCart a 1 
  //y asignas a cartItems el valor del tag del producto clickeado
  if (cartItems != null) {
//chequea si cuando clickeo un producto devuelve undefined
//asigno a cartItems lo que hubiera previamente y el nuevo producto
    if(cartItems[products.tag] == undefined ){
      cartItems = {
        ...cartItems, [products.tag]:products
      }
    }
    cartItems[products.tag].inCart += 1
  } else {
    products.inCart = 1;
    cartItems = {
      [products.tag]: products
    }
  }

  //asigna a la variable 'productsInCart' el valor formateado en cadena de strings de cartItems
  localStorage.setItem('productsInCart', JSON.stringify(cartItems))

}

//crea la variable 'cartcost' y le asigna el valor del localStorage 'totalCost'
// luego chequea, si el 'cartCost' es diferente a null
// parsea el valor previo y asigna a 'totalcost' el valor de cartcost + el precio del producto
//si 'cartCost' es null, le asigna a 'totalCost' el precio del producto
function totalCost(products) {
  let cartCost = localStorage.getItem('totalCost'); 

  if(cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem('totalCost', cartCost + products.price)
  } else {
    localStorage.setItem('totalCost', products.price);  
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productsContainer = document.querySelector(".products");
  let cartCost = localStorage.getItem('totalCost'); 

  function deleteItem() {
    //al cliquear la imagen 'deleteIcons' se borre el elemento de esa imagen
  }
  
  if (cartItems && productsContainer) {
    //console.log(cartItems)
    productsContainer.innerHTML = '';
    Object.values(cartItems).map(item => {
      productsContainer.innerHTML += `      
        <tr id="cartList">
          <td><img src="./assets/close.png" class="remove-item" onclick="removeItem()"></td>
          <td> <img src="./assets/${item.tag}.png" class="banner"></td>
          <td class="product-name">${item.name}  </td>
          <td class="product-price"> $ ${item.price}  </td>
          <td class="product-quantity"><img src="./assets/left.png" class="icons" onclick="${substractItem}"> ${item.inCart} <img src="./assets/right.png" class="icons" onclick="${addItem}"></td>
          <td class="product-total">$ ${item.inCart * item.price}</td>
        </tr>`
      function addItem() {
        item.inCart += 1
      } 
      function substractItem() {
        item.inCart -= 1
      }
    });
    
    productsContainer.innerHTML += `
    <div class="cart-total">
    <h3>TOTAL: $</h3>
    <h3>  ${cartCost}</h3>
    </div>
    `
  }
}


onLoadCartNumbers();
displayCart();
//FIN FUNCIONALIDAD CARRITO

//INICIO AJAX

//declaro url del get
const games = "https://static.nvidiagrid.net/supported-public-game-list/gfnpc.json?JSON"
//agrego botón de get con jQuery
$("section.games-list").prepend('<button id="button-games" class="button-games">Ver juegos tendencia</button>');
//escucho el click del botón 
$("#button-games").click(() => { 
    $.get(games, function (response, state) {
          if(state === "success"){
            let myGames = response;
            myGames.slice(0, 5).forEach(element => {
              $(".games-list").prepend(`
              <div class="fadeIn">
                <h3>${element.title}</h3>
                <p> 
                <span>Link:</span> <a href="${element.steamUrl}">${element.steamUrl}</a>,
                <span>Status:</span> ${element.status}, 
                <span>Genres:</span> ${element.genres}.
                </p>
              </div>`).hide().slideDown('slow');
            })             
          }
    });
})

//INICIO FUNCIONALIDAD MAS-COMPRADOS//
import trendingItems from './masComprados.js';
const masComprados = trendingItems;

class masComprado {
  constructor (name, img, stock) {
    this.name = name
    this.img = img
    this.stock = stock;
  }
}

const trendItem1 = new masComprado(masComprados[0].name, masComprados[0].img, masComprados[0].stock)
const trendItem2 = new masComprado(masComprados[1].name, masComprados[1].img, masComprados[1].stock)
const trendItem3 = new masComprado(masComprados[2].name, masComprados[2].img, masComprados[2].stock)

$('.mas-comprados').prepend(`
<div class="trendDiv">
  <a href="#trendItem1">
    <h2 class="trendName">${trendItem1.name}</h2>
    <img src="${trendItem1.img}" class="trendImage"></img>
    <span class="trendStock">Stock: ${trendItem1.stock}</span>
  </a>
</div>

<div class="trendDiv">
  <a href="#trendItem2">
    <h2 class="trendName">${trendItem2.name}</h2>
    <img src="${trendItem2.img}" class="trendImage"></img>
    <span class="trendStock">Stock: ${trendItem2.stock}</span>  
  </a>
</div>

<div class="trendDiv">
  <a href="#trendItem3">
    <h2 class="trendName">${trendItem3.name}</h2>
    <img src="${trendItem3.img}" class="trendImage"></img>
    <span class="trendStock">Stock: ${trendItem3.stock}</span>
  </a>
</div>
`)
//FIN FUNCIONALIDAD MAS-COMPRADOS//

//cosas a hacer:
//que hide() y slideDown() afecten solo a la lista y no a todo el div.
//funcion para borrar elementos del localStorage - Carrito
//función para aumentar y disminuir la cantidad de elementos del carrito desde flechitas
//arreglar en el index.html el hamburger menu no vuelve
//estilizar carrito
