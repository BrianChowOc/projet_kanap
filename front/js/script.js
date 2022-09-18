// <!--           <a href="./product.html?id=42">
//             <article>
//               <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
//               <h3 class="productName">Kanap name1</h3>
//               <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
//             </article>
//           </a> -->

async function getItems() {
  const response = await fetch("http://localhost:3000/api/products");
  return response.json();
}

getItems();

const itemsBlock = document.getElementById("items");

async function displayItems() {
  const items = await getItems();
  items.map((item) => {
    const newLink = document.createElement("a");
    const newArticle = document.createElement("article");
    const newImage = document.createElement("img");
    const newH3 = document.createElement("h3");
    const newP = document.createElement("p");

    newLink.setAttribute("href", "./product.html?id=" + item._id);
    newImage.setAttribute("src", item.imageUrl);
    newImage.setAttribute("alt", item.altTxt);
    newH3.classList.add("productName");
    newH3.innerHTML = item.name;
    newP.classList.add("productDescription");
    newP.innerHTML = item.description;

    newArticle.appendChild(newImage);
    newArticle.appendChild(newH3);
    newArticle.appendChild(newP);

    newLink.appendChild(newArticle);

    itemsBlock.appendChild(newLink);
  });
}

displayItems();
