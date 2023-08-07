fetch("http://localhost:3000/api/products")
.then(function (res) {
	if(res.ok) {
		return res.json();
	}
})
.then(function(products) {
	console.log(products)

	if(products.length === 0) {
		document.getElementById("items").textContent = "Pas de produits disponibles à la vente";
	}

	for(let i = 0; i < products.length; i++) {

		console.log(products[i]);

		// Creating <a>
		let a = document.createElement("a");
		a.setAttribute('href', `./product.html?id=${products[i]._id}`);

		// Creating <article>
		let article = document.createElement("article");
		a.appendChild(article);

		// Creating <img>
		let img = document.createElement("img");
		img.setAttribute('src', products[i].imageUrl);
		img.setAttribute('alt', products[i].altTxt);
		article.appendChild(img);

		// Creating <h3>
		let h3 = document.createElement("h3");
		h3.setAttribute('class', 'productName');
		h3.textContent = products[i].name;
		article.appendChild(h3);

		// Creating <p>
		let p = document.createElement("p");
		p.setAttribute('class', 'productDescription');
		p.textContent = products[i].description;
		article.appendChild(p);

		// Adding <a> to #items
		document.getElementById("items").appendChild(a);
	}
})
.catch(function(err) {
	console.log(err);
	document.getElementById("items").textContent = "Pas de produits disponibles à la vente";
});




