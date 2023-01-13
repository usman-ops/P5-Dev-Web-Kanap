



function recuperatiodonnées() {
  fetch("http://localhost:3000/api/products")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      console.log(value)
      const section = document.getElementById("items")
      for (let i = 0; i < value.length; i++) {
        console.log(value[i])
        let a = document.createElement("a");


        a.innerHTML = `<a href="./product.html?id=${value[i]._id}">
          <article>
            <img src="${value[i].imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
              <h3 class="productName">${value[i].name}</h3>
              <p class="productDescription">${value[i].description}</p>
          </article>
          </a>`;
          document.getElementById("items").appendChild(a);
      }

    })

    .catch(function (err) {

    });
}
recuperatiodonnées()


