// create responsive

const searchContainer = document.querySelector(".search");
const resultontainer = document.querySelector(".result");
const input = document.getElementById("inputField");
const searchBtn = document.getElementById("searchBtn");
const mainContainer = document.querySelector(".result");
const popLayer = document.querySelector(".pop");
const popContainer = document.querySelector(".popContainer");
function pageRes() {
  if (window.innerWidth < 768) {
    searchContainer.classList.add("searchCOntainer");
    resultontainer.classList.add("resultContainer");
  } else if (window.innerWidth >= 768) {
    searchContainer.classList.remove("searchCOntainer");
    resultontainer.classList.remove("resultContainer");
  }
}
// inializing resize function
pageRes();
window.addEventListener("resize", pageRes);

// start doing requests
// https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood
// https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772

// catch input and btn

function getMeals() {
  let recipeName = input.value;
  if (!recipeName) {
    Swal.fire("Please Type Recipe Name First!");
    return;
  }
  // type request function
  const api = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${recipeName}`;
  fetch(api)
    .then(res => {
      if (res.ok) return res.json();
    })
    .then(data => {
      recipeName = "";
      showRecipes(data.meals);
    });
}

function showRecipes(data) {
  mainContainer.innerHTML = "";
  if (data === null) {
    Swal.fire("please Type Valid Name!");
    return;
  }
  console.log(data);
  data.forEach(recipe => {
    mainContainer.innerHTML += `
  <div class="card">
  <div class="image">
    <img src="${recipe.strMealThumb}" alt="">
  </div>
  <div class="info">
    <h2>${recipe.strMeal.split(" ")[0] +
      recipe.strMeal.split(" ")[1] +
      recipe.strMeal.split(" ")[2]}</h2>
    <a href="#" data-set = "${recipe.idMeal}" class="details">Get Recipe</a>
  </div>
</div>
  
  
  
  `;
  });
}
// this function happen when btn clicked

function getDetalisMeal(e) {
  if (e.target.classList.contains("details")) {
    const id = e.target.getAttribute("data-set");
    const api = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(api)
      .then(res => {
        if (res.ok) return res.json();
      })
      .then(data => {
        popContainer.innerHTML = "";
        showDetalis(data.meals);
      });
  }
}
function showDetalis(data) {
  popLayer.classList.remove("show");

  console.log(data);
  popContainer.innerHTML = `

<h3>
Recipe DetalisS

</h3>
<i class="fa-solid fa-x"></i>
<h4>Introduction ...</h4>
<div class="img">
<img src="${data[0].strMealThumb}" alt="">
</div>
<p>${data[0].strMeal}</p>
<p id="textDetalils">${data[0].strInstructions}</p>
<a href="${data[0].strYoutube
}">Whatch Video</a>

`;
}

function disapearPop(e){

    if(e.target.classList.contains("fa-solid")){
  popLayer.classList.add('show')
    
    }

}

popContainer.addEventListener('click' ,disapearPop)
mainContainer.addEventListener("click", getDetalisMeal);
searchBtn.addEventListener("click", getMeals);
