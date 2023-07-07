let cart =[];
// Getting cart data from LocalStorage
let lsproducts = localStorage.getItem("product");
// JSON.parse data
let jslstorage = JSON.parse(lsproducts) ?? [];
// Looping on each cartItem existing in cart


function lsrecup(){
if(jslstorage!= null){
    const lstotal = jslstorage.length;
    for(let i = 0; i < lstotal; i++){
        searchProduct(jslstorage[i].id, jslstorage[i].color, jslstorage[i].quantity);
    }
}
}
console.log(lsrecup);
// Fetching missing data from API backend from product id http://localhost:3000/api/products/id

fetch ("http://localhost:3000/api/products/"+id)

.then (function(res){
    if(res.ok){
        return res.JSON();
    }
})
.then (function(value){
    console.log(value);

    jslstorage[i].imageUrl = value.imageUrl;
    jslstorage[i].altTxt = value.altTxt;
    jslstorage[i].name = value.name;
    jslstorage[i].price = value.price;

    cart.push(lsproducts.id);
})
.catch(function(err){
    console.log('error');
})
// Generating HTML from both data (cart + api)

document.querySelector('#cart__items').innerHTML += `<article class="cart__item" value-id= ${jslstorage[i].id}  value-color= ${jslstorage[i].colors}>
            <div class="cart__item__img">
                <img src=${jslstorage[i].imageUrl} alt=${jslstorage[i].altTxt}>
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${jslstorage[i].name}</h2>
                    <p>Couleur du produit : ${jslstorage[i].colors}</p>
                    <p>Prix unitaire : ${jslstorage[i].price} €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p> Qté : ${jslstorage[i].quantity} </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${jslstorage[i].quantity}>
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>`;