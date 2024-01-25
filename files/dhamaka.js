"use strict";
const body = document.querySelector(".main-body");

const res = fetch("https://dummyjson.com/products/")
  .then((datas) => datas.json())
  .then((data) => {
    const items = data.products.filter((mData) => {
      if (mData.discountPercentage >= 15) {
        //This is the main container.. all items will be inserted inside here

        const parentContainer = document.createElement("div");
        parentContainer.classList.add("parent-container");
        body.appendChild(parentContainer);

        const imageContainer = document.createElement("div");
        imageContainer.classList.add("image-container");
        imageContainer.style.backgroundImage = `url(${mData.thumbnail})`;
        parentContainer.appendChild(imageContainer);

        const title = document.createElement("div");
        title.innerHTML = `<h3>${mData.title}</h3>`;
        parentContainer.appendChild(title);

        const description = document.createElement("div");
        description.classList.add("description");
        description.classList.add("showMore");
        description.innerHTML = `<p>${mData.description}</p>`;
        parentContainer.appendChild(description);

        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");
        parentContainer.appendChild(buttonContainer);

        const buttonForShowMore = document.createElement("button");
        buttonForShowMore.classList.add("showMoreButton");
        buttonForShowMore.textContent = "Show More....";
        buttonContainer.append(buttonForShowMore);

        if (description.textContent.length <= 45) {
          buttonContainer.remove();
        }
        const priceAndOthers = document.createElement("div");
        priceAndOthers.classList.add("priceAndOthers");
        parentContainer.appendChild(priceAndOthers);

        const price = document.createElement("div");
        price.innerHTML = `<p>Price $${mData.price}</p>`;
        priceAndOthers.appendChild(price);

        const discount = document.createElement("div");
        discount.innerHTML = `<p>${mData.discountPercentage} %Off</p>`;
        discount.style.color = "red";
        discount.style.fontWeight = "bold";
        priceAndOthers.appendChild(discount);
        if (mData.discountPercentage <= 10) {
          discount.style.color = "green";
        }

        const ratings = document.createElement("div");
        ratings.innerHTML = `<p>${mData.rating}&#9733&#9733&#9733&#9733&#9734</p>`;
        priceAndOthers.appendChild(ratings);

        const stock = document.createElement("div");
        stock.innerHTML = `Available ${mData.stock}`;
        stock.style.fontWeight = "bold";
        priceAndOthers.appendChild(stock);

        if (mData.stock <= 20) {
          stock.style.color = "red";
        } else if (mData.stock >= 20) {
          stock.style.color = "green";
        }

        buttonForShowMore.addEventListener("click", () => {
          description.classList.toggle("showMore");
          priceAndOthers.classList.toggle("hidden-priceAndOthers");

          if (description.classList.contains("showMore")) {
            buttonForShowMore.textContent = "Show More....";
            buttonForShowMore.style.marginTop = "0px";
          } else {
            if (description.textContent.length <= 80) {
              buttonForShowMore.textContent = "Show Less";
              buttonForShowMore.style.marginTop = "35px";
            } else {
              buttonForShowMore.textContent = "Show Less";
              buttonForShowMore.style.marginTop = "55px";
            }
          }
        });
      }
    });
  });
//dark mode
const darkbutton = document.querySelector(".darkbutton");

darkbutton.addEventListener("click", (e) => {
  body.parentElement.classList.toggle("active");
  body.lastElementChild.lastElementChild.classList.toggle("borderwhite");
});
