const adExitButton = document.querySelector(".btn-exit");
const skillUpBannar = document.querySelector(".skill-up-banar");
const categoriesColumn = document.querySelectorAll(".even-col")[0];
const subCategoriesColumn = document.querySelectorAll(".even-col")[1];

adExitButton.addEventListener("click", () => {
  skillUpBannar.style.display = "none";
});

let jsonData;
let lastCategoryHovered;

fetch("./categories.json")
  .then((response) => response.json())
  .then((data) => {
    jsonData = data;
    fillCategories(data);
  });

function fillCategories(data) {
  let innerHTML = "";
  fillSubCategories(Object.keys(data)[0]);
  lastCategoryHovered = Object.keys(data)[0];
  for (const key in data) {
    innerHTML += `<div class="category">
    <p>${key}</p>
    <i class="fa-solid fa-angle-right"></i>
    </div>`;
  }
  categoriesColumn.innerHTML = innerHTML;
}

function fillSubCategories(category) {
  let innerHTML = "";
  for (subCategory of jsonData[category]) {
    innerHTML += `<div class="category">
    <p>${subCategory}</p>
    <i class="fa-solid fa-angle-right"></i>
    </div>`;
  }
  subCategoriesColumn.innerHTML = innerHTML;
}

categoriesColumn.addEventListener("mouseover", (event) => {
  for (let i = 0; i < categoriesColumn.children.length; i++) {
    if (categoriesColumn.children[i].matches(":hover")) {
      const currentCategoryHovered =
        categoriesColumn.children[i].children[0].textContent;

      if (lastCategoryHovered !== currentCategoryHovered) {
        categoriesColumn.children[i].classList.add("hovered");

        for (let j = 0; j < categoriesColumn.children.length; j++) {
          if (
            categoriesColumn.children[j].children[0].textContent ===
            lastCategoryHovered
          ) {
            categoriesColumn.children[j].classList.remove("hovered");
          }
        }

        lastCategoryHovered = currentCategoryHovered;
        fillSubCategories(lastCategoryHovered);
      }
    }
  }
});
