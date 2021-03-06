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
function cartNumbers(products, action) {
  let productNumbers = localStorage.getItem('cartNumbers');
  productNumbers = parseInt(productNumbers)

  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  if (action == 'decrease') {
    localStorage.setItem('cartNumbers', productNumbers - 1)
    document.querySelector('.cart span').textContent = productNumbers - 1
  } else if ( productNumbers ) {
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.cart span').textContent = productNumbers + 1
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
function totalCost(products, action) {
  let cartCost = localStorage.getItem('totalCost'); 

  if (action == 'decrease') {
    cartCost = parseInt(cartCost)
    localStorage.setItem('totalCost', cartCost - products.price);
  } else if(cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem('totalCost', cartCost + products.price)
  } else {
    localStorage.setItem('totalCost', products.price);  
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  let cart = localStorage.getItem('totalCost'); 
  cart = parseInt(cart)

  let productsContainer = document.querySelector(".products");
  

  if (cartItems && productsContainer) {
    productsContainer.innerHTML = '';
    Object.values(cartItems).map(item => {
      productsContainer.innerHTML += ` 
        <div class="cartList"><img src="./assets/close.png" class="remove-item"><img src="./assets/${item.tag}.png" class="banner">
          <span class="product-name">${item.name} </span>
        </div>
        <div class="product-price"> 
          $ ${item.price},00 
        </div>
        <div class="product-quantity">
            <img src="./assets/left.png" class="icons decrease">
            <span>${item.inCart}</span>
            <img src="./assets/right.png" class="icons increase" id=${item.id}>
        </div>
        <div class="product-total">$${item.inCart * item.price},00</div>`}
    );
    
    
    productsContainer.innerHTML += `
    <div class="cart-total">
    <h3>TOTAL: $</h3>
    <h3>  ${cart}</h3>
    </div>
    `;

  }
    deleteButtons();
    changeQuantity();
}

// asigno los botones con el ícono 'x' y los loopeo.
//por cada uno de ellos genero un click eventlistener que seleccione al textcontent de su elemento padre (donde se encuentra el name)
// lo trimeo y transformo a minúscula, y reemplazo con regex cada espacio por un espacio vacío.
//así obtengo el nombre en minúscula y sin espacios del elemento que quiero borrar que coincide con el tag..
//accedo a la cantidad de items por artículo con el nombre del producto y su cantidad inCart y se la resto a la cantidad de productos total
//accedo al costo de los items a borrar y se los resto al costo total
//borro del localStorage los items a borrar y actualizo el carrito a la variable de items en el carrito actualizada
//corro las funciones de carga y renderización del carrito
function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.remove-item');
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;

    for(let i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g,'').trim();
           
            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalCost', cartCost - ( cartItems[productName].price * cartItems[productName].inCart));

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
        })
    }
}

//asigno a variables los botones de izquierda y derecha para sumar y restar elementos.
//asigno a variable la cantidad actual de un elemento inicializandola a 0
//loopeo cada uno de esos botones y reasigno a la variable de cantidad, la cantidad del span del elemento padre del ícono.
//asigno a variable la el texto del span del hermano anterior al hermano anterior del elemento padre del ícono
//lo transformo a lowercase y reemplazo con regex los espacios con espacios vacíos

function changeQuantity () {
  let decreaseButtons = document.querySelectorAll('.decrease');
  let increaseButtons = document.querySelectorAll('.increase');

  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems) 

  let currentQuantity = 0;
  let currentProduct = '';

  //accedo a la cantidad de productos inCart del elemento y le resto 1 siempre que sea mayor a 1, 
  //llamo a las funciones que actualizan también el carrito y al costo total.
  //luego rerenderizo el carrito

  for (let i = 0; i < decreaseButtons.length; i++) {
    decreaseButtons[i].addEventListener('click', () => {
      currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
      currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLowerCase().replace(/ /g, '').trim();

      if (cartItems[currentProduct].inCart > 1) {
        cartItems[currentProduct].inCart = cartItems[currentProduct].inCart - 1
        cartNumbers(cartItems[currentProduct], 'decrease')
        totalCost(cartItems[currentProduct], 'decrease')
        localStorage.setItem('productsInCart', JSON.stringify(cartItems))
        displayCart()
      }
    });
  }

  //lo mismo que el decrease pero incrementando
  for (let i = 0; i < increaseButtons.length; i++) {
    increaseButtons[i].addEventListener('click', () => {
      currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
      currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();

      cartItems[currentProduct].inCart += 1;
      cartNumbers(cartItems[currentProduct]);
      totalCost(cartItems[currentProduct]);
      localStorage.setItem('productsInCart', JSON.stringify(cartItems));
      displayCart();
    })
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

$("#button-games").one('click', () => { 
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

