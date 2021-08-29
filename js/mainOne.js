//first code form validation part : 01' start-v-t-22 end-v-t-37   

const button = document.getElementById("submit-btn");
// let orderedProductsArray = [];
button.addEventListener("click", (e) => {
    e.preventDefault(); //button click page reload stop
    document.getElementById("meal-items").innerHTML = ""; //all products div html line : 137
    document.getElementById("error-message").innerHTML = "";// error message div  line : 132
    document.getElementById("product-info").innerHTML = "";//single product ingredients' div line : 135

    const inputValue = document.getElementById("input-value").value;
    if (inputValue.length > 0) {
        //<!-- spinner --> line : 125 for data load time
        document.getElementById("spinner").classList.remove("d-none");
        getMealData(inputValue); 
    } else {
        // error message div  line : 132 error handeling for form or input field
        document.getElementById("error-message").innerHTML =
            "<p class='text-center p-3 bg-danger text-white'><b>Please enter a meal name...</b></p>";
    }
});
//first code form validation part : 02' start-v-t-37 end-v-t-40  
//check url api lenth for form searching this func call main one js line no:15

//function for passing url for data fetching based on different input
const getMealData = (mealName) => {
    if (mealName.length === 1) {
        mealCardDiv(
            `https://www.themealdb.com/api/json/v1/1/search.php?f=${mealName}` //search by full meal or food name
        );
    } else {
        mealCardDiv(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`  //search by single meal or food name
        );
    }
};

//first code form validation part : 03' start-v-t-40 end-v-t-37  
//savevid part-2 start-v-t-23 end-v-t-  
//function for data fetching

const fetchedData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

//function for displaying all product by search after fetching data
/* const mealCardDiv = (url) => {
    fetchedData(url)
        .then((data) => {

        })
}; */
const mealCardDiv = (url) => {
fetchedData(url)
        .then((data) => {
            //turn of spinner
            document.getElementById("spinner").classList.add("d-none");
            data.meals.forEach((element) => {
                //console.log(element)
                const mealSets = document.getElementById("meal-items");
                const {
                    strMeal,
                    strMealThumb
                } = element;
                const mealDiv = document.createElement("div");
                mealDiv.className = "col m-auto";
                let mealCard = ` <div class="m-3" style="cursor: pointer" onclick='singleMealData("${strMeal}")'>
          <div class="card h-100">
            <img
              src="${strMealThumb}"
              class="card-img-top img-fluid" style=""
            />
            <div class="card-footer text-center">
               <h6 class="card-title">${strMeal}</h6>
            </div>
                 <button class='btn btn-info btn-sm mt-2' >See details</button>
          </div>
     
        </div>`;
                mealDiv.innerHTML = mealCard;
                mealSets.appendChild(mealDiv);
            });
        })
        .catch((err) => {
            errorMessage();
        });
};
//savevid part-3 start-v-t-0 ,vd-break-41,vd-break-start-41 end-v-t-
//function for single product description
const singleMealData = (itemName) => {
    window.scrollTo(0, 40);
    fetchedData(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${itemName}`
    ).then((data) => {
        const singleMealInfo = data.meals[0];
        const {
            strMeal,
            strMealThumb,
            idMeal
        } = singleMealInfo;
        const singleMealDiv = document.getElementById("product-info");
        singleMealDiv.innerHTML = `
 <div class="card m-auto" style="width: 20rem">
   <img
     src="${strMealThumb}"
     class="card-img-top"
    />
   <div class="card-body">
     <h5 class="card-title">${strMeal}</h5>
     <p><b>Ingredients</b></p>
     <ul id="ingredient-list"></ul>
   </div>
   <button class='btn btn-primary btn-sm' onclick='addToCart(${idMeal})'>Add to cart</button>
 </div>`;
        //onclick='addToCart(${idMeal})
        const list = document.getElementById("ingredient-list");
        for (let i = 1; i <= 20; i++) {
            let ingredientKey = "strIngredient" + i;
            let ingredient = singleMealInfo[ingredientKey];
            //ingredient="Water",
            let quantityKey = "strMeasure" + i;
            let quantity = singleMealInfo[quantityKey];
            //quantity='3 tbs'
            let listItem = quantity + " " + ingredient;
            const li = document.createElement("li");
            // li.innerText = listItem;
            //list.appendChild(li);
            //the code in the below is optional
            if (listItem.length > 2 && listItem.indexOf("null null") != 0) {
                li.innerText = listItem;
                list.appendChild(li);
            }
        }
    });
};