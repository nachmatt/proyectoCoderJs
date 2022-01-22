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

function resetearDiv(elementID)
{
  $(elementID).append() = $(elementID).append();
}
//FIN JS SLIDER

//INICIO FUNCIONALIDAD CARTAS
let popupViews = $('.popup-view').toArray();
let popupBtns = $('.popup-btn').toArray();
let closeBtns = $('.close-btn').toArray();

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
    $('.cart span').toArray().textContent = productNumbers + 1;
  } else {
    localStorage.setItem('cartNumbers', 1)
    $('.cart span').toArray().textContent = 1
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
  let productsContainer = $(".products");
  let cartCost = localStorage.getItem('totalCost'); 
  
  if (cartItems && productsContainer) {
    //console.log(cartItems)
    productsContainer.append ('');
    Object.values(cartItems).map(item => {
      productsContainer.append ( `
      <div class="item">
        <img src="./assets/close.png" class="remove-item">
        <img src="./assets/${item.tag}.png" class="banner">
        <span>${item.name}</span>
      </div>
      <div class="price">$ ${item.price}</div>
      
      <div class="quantity">
      <img src="./assets/left.png" class="icons">
      ${item.inCart}
      <img src="./assets/right.png" class="icons">
      </div>
      <div class="total">$ ${item.inCart * item.price}</div>
      `)
    });
    
    productsContainer.append ( `
    <div class="basketTotal">
    <h3>TOTAL</h3>
    <h3>$ ${cartCost}</h3>
    </div>
    `)
  }
}

function deleteItems() {
  //al cliquear la imagen 'deleteIcons' se borre el elemento de esa imagen
}


onLoadCartNumbers();
displayCart();
//FIN FUNCIONALIDAD CARRITO

//INICIO AJAX

//declaro url del get
const games = "https://static.nvidiagrid.net/supported-public-game-list/gfnpc.json?JSON"
//agrego botón de get con jQuery
$("section.gamesList").prepend('<button id="buttonGames" class="buttonGames">Ver juegos tendencia</button>');
//escucho el click del botón 
$("#buttonGames").click(() => { 
    $.get(games, function (response, state) {
          if(state === "success"){
            let myGames = response;
            myGames.slice(0, 5).forEach(element => {
              $(".gamesList").prepend(`
              <div>
                <h3>${element.title}</h3>
                <p> ${element.steamUrl}</p>
                <p> ${element.status}</p>
                <p> ${element.genres}</p>
              </div>`);
            })              
          }
    });
});

//genero una respuesta

//FIN AJAX

//cosas a hacer:
//funcion para borrar elementos del localStorage-Carrito
//función para aumentar y disminuir la cantidad de elementos del carrito desde flechitas
//arreglar en el index.html el hamburger menu no vuelve
//arreglar en el cart.html el hamburger menu no funca
//hacer que el cart sea un popup
//hacer que al comprar un producto no me suba al principio de la web
//estilizar carrito

/*
El uso de clases y una función constructora son requisitos para el curso, tene en cuenta eso para futuras entregas. Por otro lado también que los productos se carguen de manera dinámica desde el archivo javascript, en un futuro vas a ver que lo haremos desde un JSON.
El trabajo esta muy bien, solo faltaria cumplir esos dos objetivos para el curso tendiente a tu entrega final! 

*/