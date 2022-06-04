var courseNameInput = document.getElementById('courseName');
var courseCategoryInput = document.getElementById('courseCategory');
var coursePriceInput = document.getElementById('coursePrice');
var courseDescriptionInput = document.getElementById('courseDescription');

var currentIndex=0;
var inputs = document.getElementsByClassName('inputs');
var data = document.getElementById('data');
var addBtn = document.getElementById('click');
var deleteBtn = document.getElementById("deleteBtn");
var courses;

if(localStorage.getItem("coursesList")==null){
    courses=[];
}
else{
    courses=JSON.parse(localStorage.getItem("coursesList"));
    displayData();
}


addBtn.onclick = function(){
    if(addBtn.innerHTML=='Add Cource'){
        addCourse();
    }
    else{
        updateCourse();
    }
     
     displayData();
     clearForm();
}

function addCourse(){
    var course = {
        name: courseNameInput.value,
        category: courseCategoryInput.value,
        price: coursePriceInput.value,
        desc: courseDescriptionInput.value
    }

    courses.push(course);
    localStorage.setItem("coursesList",JSON.stringify(courses));
}

function displayData(){
    var result = "";

    for(var i=0; i<courses.length ; i++){
        result += `<tr>
         <td>${i}</td>
         <td>${courses[i].name}</td>
         <td>${courses[i].category}</td>
         <td>${courses[i].price}</td>
         <td>${courses[i].desc}</td>
         <td><button class="update" onclick="getCourseData(${i})">update</button></td>
         <td><button class="delete" onclick="deleteCourse(${i})">delete</button></td>
        `
    }

    data.innerHTML=result;
}

function clearForm(){

    for(var i=0;i<inputs.length;i++){
        inputs[i].value="";
    }

}

function deleteCourse(index){

    courses.splice(index,1);
    localStorage.setItem("coursesList",JSON.stringify(courses));
    displayData();
}

deleteBtn.onclick=function(){
    courses=[];
    localStorage.removeItem("coursesList");
    displayData();
}


function search(searchText){
    var result="";
    for(var i=0;i<courses.length;i++){
        if(courses[i].name.toLowerCase().includes(searchText.toLowerCase())){
            result+= `
            <td>${i}</td>
            <td>${courses[i].name}</td>
            <td>${courses[i].category}</td>
            <td>${courses[i].price}</td>
            <td>${courses[i].desc}</td>
            <td><button class="update">update</button></td>
            <td><button class="delete" onclick="deleteCourse(${i})">delete</button></td>
            </tr>
           `
        }
    }
    data.innerHTML=result;
}


function getCourseData(index){

    var course = courses[index];
    courseNameInput.value=course.name;
    courseCategoryInput.value=course.category;
    coursePriceInput.value=course.price;
    courseDescriptionInput.value=course.desc;
    addBtn.innerHTML='update course';
    currentIndex=index;
}


function updateCourse(){

    var course = {
        name:courseNameInput.value,
        category:courseCategoryInput.value,
        price:coursePriceInput.value,
        desc:courseDescriptionInput.value
    };
    
    courses[currentIndex].name=course.name;
    courses[currentIndex].category=course.category;
    courses[currentIndex].price=course.price;
    courses[currentIndex].desc=course.desc;
    localStorage.setItem('coursesList',JSON.stringify(courses));
    addBtn.innerHTML='Add Cource';
    
}
