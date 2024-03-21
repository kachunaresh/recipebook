                                        const searchBox=document.querySelector('.searchBox');
const searchBtn=document.querySelector('.searchBtn');
const recipeContainer=document.querySelector('.recipe-container'); 
const recipeDetailsContent=document.querySelector('.recipe-details-content');
const recipeCloseBtn=document.querySelector('.recipe-close-btn');

//function to get recipes
 

const fetchRecipes= async (query)=>{
    recipeContainer.innerHTML="<h2>fetching recipes..</h2>"
    try{
    const data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response= await data.json();
    recipeContainer.innerHTML="";
   // console.log(response);
    response.meals
    .forEach(meal => {
        const recipeDiv=document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML=`
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish<p/>
        <p> Belongs to<span>${meal.strCategory} category</span><p/>

        `
        const button=document.createElement('button');
        button.textContent="view Recipe";
        recipeDiv.appendChild(button);
        
       //ADING EVENT LISTNER TO RECIPE BUTTON
       button.addEventListener('click',()=>{
        openRecipePoupup(meal);
        
       })
       recipeContainer.appendChild(recipeDiv);
       
        
    });
}
catch(error){
    recipeContainer.innerHTML="<h2> error in fetching recipes....</h2>"

}

}
//function to fetch ingredients and measurements
 
const fetchIngredients=(meal)=>{
  //  console.log(meal);
  let ingredientList ="";
  for(let i=1;i<=20;i++){
    const ingredient=meal[`strIngredient${i}`];
    if (ingredient) {
        const measure = meal[`strMeasure${i}`];
        ingredientList += `<li>${measure} ${ingredient}</li>`

        
    }
    else{
        break;
    }
  }
return ingredientList;

}

const openRecipePoupup=(meal)=>{
    recipeDetailsContent.innerHTML=`
    <h2 class="recipeName">${meal.strMeal}</h2> 
    <h3>Ingredents:</h3>
    <ul class="ingredientList">${fetchIngredients(meal)}</ul>
    <div class="recipeInstructions">
    <h3>Instructions:</h3>
    <p>${meal.strInstructions}</p>
    </div>
    `
    
    
    recipeDetailsContent.parentElement.style.display="block";

}
recipeCloseBtn.addEventListener('click',()=>{
    recipeDetailsContent.parentElement.style.display="none";
})

searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchInput=searchBox.value.trim(); 
    if (!searchInput) {
        recipeContainer.innerHTML=`<h2>type of the meal in  the search box</h2>`;
        return;
        
    }          
    fetchRecipes(searchInput);

   // console.log("button clicked");

   
})