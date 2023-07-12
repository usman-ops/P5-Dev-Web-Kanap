// Getting cart data from LocalStorage
let lsCart = localStorage.getItem("cart");

// JSON.parse data
let cart = JSON.parse(lsCart) ?? [];

// Looping on each cartItem existing in cart
for(let i = 0; i < cart.length; i++) {
	const cartItem = cart[i];
	// Fetching data from API
	fetch("http://localhost:3000/api/products/"+cartItem.productId)
	.then(function(res){
		if(res.ok){
			return res.json();
		}
	})
	.then(function(json){
		const product = json;

		console.log(cartItem);
		console.log(product);

		// cartItem.productId
		// cartItem.productColor
		// cartItem.productQuantity
		// product._id
		// product.name
		// product.description
		// product.altTxt
		// product.imageUrl
		// product.price

		// Generating HTML from both data (cart + api)

		/***document.querySelector('#cart__items').innerHTML +=
		`<article class="cart__item" value-id= ${product._id} value-color= ${cartItem.productColor}>
			<div class="cart__item__img">
				<img src=${product.imageUrl} alt=${product.altTxt}>
			</div>
			<div class="cart__item__content">
				<div class="cart__item__content__description">
					<h2>${product.name}</h2>
					<p>Couleur du produit : ${cartItem.productColor}</p>
					<p>Prix unitaire : ${product.price} €</p>
				</div>
				<div class="cart__item__content__settings">
					<div class="cart__item__content__settings__quantity">
						<p> Qté : ${cartItem.productQuantity} </p>
						<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${cartItem.productQuantity}>
					</div>
					<div class="cart__item__content__settings__delete">
						<p class="deleteItem">Supprimer</p>
					</div>
				</div>
			</div>
		</article>`; ***/

    //creating article
const article = document.createElement("article");
value-id = product.id;
 value-color = product.productColor;
let cartitem =document.getElementById("#cart__Items");
 cartitem.append(article);

 // inserting img
 const img = document.createElement("img");
  img.src = product.imageUrl;
	img.alt = product.altTxt;
let divImg = document.querySelector('.cart__item__img');
divImg.append(img);

//inserting <h2>
let description = document.querySelector('.cart__item__content__description');
let h2 = document.createElement("h2");
		h2.textContent = product[i].name;
	  description.appendChild(h2);

//inserting <p>
let p = document.createElement("p");
		p.textContent = product[i].description;
		description.appendChild(p);
//inserting <p2>
let p2 = document.createElement("p");
		p2.textContent = product[i].price +'€';
		description.appendChild(p2);
//settings quantityand delete 
let divqty =document.querySelector('.cart__item__content__settings__quantity');
let pqty = document.createElement('p');
pqty.textContent =  product[i].quantity;
divqty.appendChild(pqty);

let divDelete =document.querySelector('.deleteItem');
let Pdelete = document.createElement('p');
Pdelete.textContent=product[i].delete;
divDelete.appendChild(Pdelete);
//addevenlistener delete
document.querySelector('.cart__item__content__settings__delete').addEventListener('click' ,Event=>{
	
})
	})
	.catch(function(err){
		console.log(err);
	})
}