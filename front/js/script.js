

fetch("http://localhost:3000/api/products")
.then(function (res) {
	if(res.ok) {
		return res.json();
	}
})
.then(function(value) {
	console.log(value)
	const section = document.getElementById("items")
	for(let i = 0; i < value.length; i++) {

		console.log(value[i]);

		// Creating <a>
		let a = document.createElement("a");
		a.setAttribute('href', `./product.html?id=${value[i]._id}`);

		// Creating <article>
		let article = document.createElement("article");
		a.appendChild(article);

		// Creating <img>
		let img = document.createElement("img");
		img.setAttribute('src', value[i].imageUrl);
		img.setAttribute('alt', value[i].altTxt);
		article.appendChild(img);

		// Creating <h3>
		let h3 = document.createElement("h3");
		h3.setAttribute('class', 'productName');
		h3.textContent = value[i].name;
		article.appendChild(h3);

		// Creating <p>
		let p = document.createElement("p");
		p.setAttribute('class', 'productDescription');
		p.textContent = value[i].description;
		article.appendChild(p);

		// Adding <a> to #items
		document.getElementById("items").appendChild(a);
	}
})
.catch(function(err) {
	console.log(err);
});


