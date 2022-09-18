let id = null;

async function getProduct(id) {
  const response = await fetch("http://localhost:3000/api/products/" + id);
  return response.json();
}

async function displayItem(id) {
  const product = await getProduct(id);
  const itemImg = document.getElementsByClassName("item__img");
  const optionColor = document.getElementById("colors");
  const itemTitle = document.getElementById("title");
  const itemPrice = document.getElementById("price");
  const itemDescription = document.getElementById("description");

  const img = document.createElement("img");
  img.setAttribute("src", product.imageUrl);
  img.setAttribute("alt", product.altTxt);
  itemTitle.innerHTML = product.name;
  itemPrice.innerHTML = product.price;
  itemDescription.innerHTML = product.description;

  itemImg[0].appendChild(img);

  product.colors.map((color) => {
    const newOption = document.createElement("option");
    newOption.setAttribute("value", color);
    newOption.innerHTML = color;
    optionColor.appendChild(newOption);
  });
}

const adr = window.location.href;
const url = new URL(adr);
const search_params = new URLSearchParams(url.search);
if (search_params.has("id")) {
  id = search_params.get("id");
  displayItem(id);
}

const addToCart = document.getElementById("addToCart");

addToCart.addEventListener("click", () => {
  const quantity = document.getElementById("quantity");
  const color = document.getElementById("colors");
  if (!color.value || quantity.value === "0") {
    console.log("error, color or quantity invalid");
    return;
  }
  // mettre a jour l'element en ajoutant la quantite + redirection
  localStorage.setItem(id + color.value, [id, quantity.value, color.value]);
});
