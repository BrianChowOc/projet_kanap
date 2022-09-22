let priceTotal = 0;
let articles = 0;

// Récupération de l'item via l'API avec son ID
async function getProduct(id) {
  const response = await fetch("http://localhost:3000/api/products/" + id);
  return response.json();
}

// Affichage des items du panier
async function displayItem(item) {
  const product = await getProduct(item[0]);
  const cartItem = document.getElementById("cart__items");
  const article = document.createElement("article");
  const divImg = document.createElement("div");
  const img = document.createElement("img");
  const divItemContent = document.createElement("div");
  const divItemDescription = document.createElement("div");
  const h2Item = document.createElement("h2");
  const pColor = document.createElement("p");
  const pPrice = document.createElement("p");
  const divSetting = document.createElement("div");
  const divQty = document.createElement("div");
  const pQty = document.createElement("p");
  const inputQty = document.createElement("input");
  const divDelete = document.createElement("div");
  const pDelete = document.createElement("p");

  const totalQty = document.getElementById("totalQuantity");
  const totalPrice = document.getElementById("totalPrice");

  articles += Number(item[1]);
  priceTotal += item[1] * product.price;

  article.setAttribute("class", "cart__item");
  article.setAttribute("data-id", product._id);
  article.setAttribute("data-color", item[2]);

  divImg.setAttribute("class", "cart__item__img");
  img.setAttribute("src", product.imageUrl);
  img.setAttribute("alt", product.altTxt);

  divItemContent.setAttribute("class", "cart__item__content");
  divItemDescription.setAttribute("class", "cart__item__content__description");

  h2Item.innerHTML = product.name;
  pColor.innerHTML = item[2];
  pPrice.innerHTML = product.price + " €";

  divSetting.setAttribute("class", "cart__item__content__settings");
  divQty.setAttribute("class", "cart__item__content__settings__quantity");
  pQty.innerHTML = "Qté : ";

  inputQty.setAttribute("type", "number");
  inputQty.setAttribute("class", "itemQuantity");
  inputQty.setAttribute("name", "itemQuantity");
  inputQty.setAttribute("min", "1");
  inputQty.setAttribute("max", "100");
  inputQty.setAttribute("value", item[1]);

  divDelete.setAttribute("class", "cart__item__content__settings__delete");
  pDelete.setAttribute("class", "deleteItem");
  pDelete.innerHTML = "Supprimer";

  divDelete.appendChild(pDelete);

  divQty.appendChild(pQty);
  divQty.appendChild(inputQty);

  divSetting.appendChild(divDelete);
  divSetting.appendChild(divQty);

  divItemDescription.appendChild(h2Item);
  divItemDescription.appendChild(pColor);
  divItemDescription.appendChild(pPrice);

  divItemContent.appendChild(divItemDescription);
  divItemContent.appendChild(divSetting);

  divImg.appendChild(img);

  article.appendChild(divImg);
  article.appendChild(divItemContent);

  cartItem.appendChild(article);

  totalPrice.innerHTML = priceTotal;
  totalQty.innerHTML = articles;

  pDelete.addEventListener("click", () => {
    articles -= Number(item[1]);
    priceTotal -= item[1] * product.price;
    totalPrice.innerHTML = priceTotal;
    totalQty.innerHTML = articles;
    localStorage.removeItem(item[0] + item[2]);
    pDelete.closest("article").remove();
    if (localStorage.length === 0) {
      cartItem.innerHTML = "Il n'y a pas d'article dans votre panier";
    }
  });

  inputQty.addEventListener("change", () => {
    console.log(localStorage);
    localStorage.setItem(item[0] + item[2], [item[0], inputQty.value, item[2]]);
    document.location.reload(true);
  });
}

// Affichage des items du panier
function localStorageLoop() {
  for (let item of Object.getOwnPropertyNames(localStorage)) {
    displayItem(localStorage[item].split(","));
  }
}

// Envoi de la requete avec les information à l'API
async function postRequest(contact) {
  let products = [];
  for (let itemId of Object.getOwnPropertyNames(localStorage)) {
    products.push(localStorage.getItem(itemId).split(",")[0]);
  }

  const response = await fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ contact, products }),
  });
  const result = await response.json();
  document.location.href =
    "http://127.0.0.1:5500/front/html/confirmation.html?orderId=" +
    result.orderId;
}

// Vérification du formulaire
function formCheck() {
  let check = true;
  const inputFirstName = document.getElementById("firstName");
  const inputLastName = document.getElementById("lastName");
  const inputAddress = document.getElementById("address");
  const inputCity = document.getElementById("city");
  const inputEmail = document.getElementById("email");
  const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
  const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
  const addressErrorMsg = document.getElementById("addressErrorMsg");
  const cityErrorMsg = document.getElementById("cityErrorMsg");
  const emailErrorMsg = document.getElementById("emailErrorMsg");

  const regexName = new RegExp("^[a-zA-Z]+$");
  const regexAddress = new RegExp(
    "((^[0-9]*).?((BIS)|(TER)|(QUATER))?)?((W+)|(^))(([a-z]+.)*)([0-9]{5})?.(([a-z'']+.)*)"
  );
  const regexCity = new RegExp("^[a-zA-Z]+$");
  const regexEmail = new RegExp(
    "^[a-zA-Z0-9_-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$"
  );
  firstNameErrorMsg.innerHTML = "";
  lastNameErrorMsg.innerHTML = "";
  addressErrorMsg.innerHTML = "";
  cityErrorMsg.innerHTML = "";
  emailErrorMsg.innerHTML = "";
  if (!regexName.test(inputFirstName.value)) {
    firstNameErrorMsg.innerHTML = "Votre prénom est invalide";
    check = false;
  }
  if (!regexName.test(inputLastName.value)) {
    lastNameErrorMsg.innerHTML = "Votre nom est invalide";
    check = false;
  }
  if (!regexAddress.test(inputAddress.value)) {
    addressErrorMsg.innerHTML = "Votre adresse est invalide";
    check = false;
  }
  if (!regexCity.test(inputCity.value)) {
    cityErrorMsg.innerHTML = "Votre ville est invalide";
    check = false;
  }
  if (!regexEmail.test(inputEmail.value)) {
    emailErrorMsg.innerHTML = "Votre adresse mail est invalide";
    check = false;
  }

  return check
    ? {
        firstName: inputFirstName.value,
        lastName: inputLastName.value,
        address: inputAddress.value,
        city: inputCity.value,
        email: inputEmail.value,
      }
    : false;
}

localStorageLoop();
if (localStorage.length === 0) {
  const cartItem = document.getElementById("cart__items");
  cartItem.innerHTML = "Il n'y a pas d'article dans votre panier";
}
const submit = document.getElementById("order");
submit.addEventListener("click", (e) => {
  const resCheck = formCheck();

  if (resCheck && localStorage.length > 0) {
    postRequest(resCheck);
  }
  e.preventDefault();
});
