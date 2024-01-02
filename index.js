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
    <i class="fa fa-angle-right"></i>
    </div>`;
  }
  categoriesColumn.innerHTML = innerHTML;
}

function fillSubCategories(category) {
  let innerHTML = "";
  for (subCategory of jsonData[category]) {
    innerHTML += `<div class="category">
    <p>${subCategory}</p>
    <i class="fa fa-angle-right"></i>
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

//carousel courses section
const coursesList = document.querySelector(".selection-of-courses ul");
const courses = document.querySelector(".courses");
const exploreButton = document.querySelector(".course-tab-details button");
let coursesDataJSON;

fetch("./data-courses.json")
  .then((response) => response.json())
  .then((data) => {
    coursesDataJSON = data;
    handleCourses(data);
  });

function handleCourses(data) {
  let innerHTML = "";
  for (key in data) {
    innerHTML += `<a><li>${key}</li></a>`;
  }
  coursesList.innerHTML = innerHTML;
  for (child of coursesList.children) {
    child.addEventListener("click", function () {
      displayCourses(this.children[0].textContent);
    });
  }
  displayCourses(Object.keys(data)[0]);
  coursesList.children[0].classList.add("active");
}

function displayCourses(category) {
  const coursesData = coursesDataJSON[category];
  let innerHTML = "";
  for (const course of coursesData) {
    innerHTML += `<div class="card">
          <img
            src="${course["image-link"]}"
            alt=""
          />
          <h3 class="title">
            ${course["title"]}
          </h3>
          <p class="instructors">${course["instructors"]}</p>
          <div class="rating">${course["rating"]}</div>
          <h2 class="price">${course["price"]}</h2>
        </div>`;
  }
  courses.innerHTML = innerHTML;

  exploreButton.textContent = "Explore " + category;
}
