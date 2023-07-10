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
		document.querySelector('#cart__items').innerHTML +=
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
		</article>`;
	})
	.catch(function(err){
		console.log(err);
	})
}