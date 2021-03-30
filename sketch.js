var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed, lastFed



function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed = createButton("Feed Dog")
  feed.position(200,95);
  feed.mousePressed(feedDog);
  
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

if(lastFed>=12){
  text("Last Feed : PM", 350,30)
}else if(lastFed==0){
  text("Last Feed : 12 AM", 350,30)
}else{
  text("Last Feed : AM", 350,30)
 
}
}

 
  drawSprites();
}


function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  getCount(){
    var foodCountRef = database.ref('food');
    foodCountRef.on("value",function(data){
      foodCount = data.val();
    })
  }

  updateCount(count){
    database.ref('/').update({
      foodCount: count
    });
  }

  update(lastFed){
    var feedTime = "food" + foodCount;
    database.ref(feedTime).set({
      feedTime:lastFed
    });
  }
}



//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
