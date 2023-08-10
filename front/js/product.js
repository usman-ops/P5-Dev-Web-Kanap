//Getting 'id' param
const parsedUrl = new URL(window.location.href);
const id = parsedUrl.searchParams.get('id');
console.log(id);

let cart = [];
// Fetching product data
fetch("http://localhost:3000/api/products/"+id)
.then(function (res) {
	if(res.ok) {
		return res.json();
	}
})
.then(function(json) {
	const product = json;
	console.log(product);

	// Inserting product title
	document.getElementById('title').textContent = product.name;

	// Inserting product description
	document.getElementById('description').textContent = product.description;

	// Inserting product price
	document.getElementById('price').textContent = product.price;
	// Inserting product image
	let img = document.createElement('img');
	img.src = product.imageUrl;
	img.alt = product.altTxt;
	let parent = document.querySelector('.item__img');
	parent.append(img);

	// Inserting product select / option
	let select = document.querySelector('#colors');
	for(let i = 0; i < product.colors.length ; i++) {
		let option = document.createElement('option');
		option.value = product.colors[i];
		option.textContent = product.colors[i];
		select.append(option);
	}

	// Handling quantity input
	document.querySelector('#quantity').addEventListener('change', function() {
		let quantity = document.querySelector('#quantity').value;
		if(quantity != null) {
			if(quantity < 1 || quantity > 100) alert("La quantité doit être comprise entre 1 et 100");
			if(quantity < 1) document.querySelector('#quantity').value = 1;
			if(quantity > 100) document.querySelector('#quantity').value = 100;
		}
	});

	// Handling quantity click
	document.querySelector('#addToCart').addEventListener('click', function() {

		// Getting cart from LocalStorage
		let cart = JSON.parse(localStorage.getItem('cart')) ?? [];

		// Creating cartItem
		let cartItem = {
			productId: id,
			productColor: document.querySelector('#colors').value,
			productQuantity: document.querySelector('#quantity').value
		};

		// Checking if cartItem is OK
		if(cartItem.productQuantity < 1 || cartItem.productQuantity > 100 || cartItem.productColor == '') {
			alert("Veuiller vérifier votre sélection (couleur / quantité)");
		}
		else {
			// Adding cartItem to existing cart
			cart.push(cartItem);

			// Saving updated cart into LocalStorage
			localStorage.setItem('cart', JSON.stringify(cart));

			// Displaying message to customer
			let messageDiv = document.createElement('div');
			messageDiv.textContent = "Produit ajouté au panier";
			messageDiv.style.textAlign = 'center';
			messageDiv.style.margin = '20px';
			document.querySelector('.item__content__addButton').after(messageDiv);
			setTimeout(function() {
				messageDiv.remove(); // will be executed in 2s (200ms)
			}, 2000)
		}
	});
})
.catch(function(err) {
	document.querySelector(".item").textContent = "Produit introuvable";
	console.log(err);
});
