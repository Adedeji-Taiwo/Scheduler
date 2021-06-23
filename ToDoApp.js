//Toggle between dark and light mode stylesheets 
document.addEventListener('DOMContentLoaded', () => {

    const themeStylesheet = document.getElementById('theme');
    const modeToggle = document.getElementById('modeToggle');
    modeToggle.addEventListener('click', () => {
        // if it's dark -> go light
        if(themeStylesheet.href.includes('dark')){
            themeStylesheet.href = 'ToDo-light.css';
            modeToggle.innerHTML = '<i class="far fa-moon fa-2x" ></i>';
        } else {
            // if it's light -> go dark
            themeStylesheet.href = 'ToDo-dark.css';
            modeToggle.innerHTML = '<i class="far fa-sun fa-2x"></i>';

        }
    })
})








//Set greeting based on time of the day 
const salute = document.querySelector(".salute");

let today = new Date();
let hour = today.getHours();
let greeting;

(hour < 12) ? greeting = "Good Morning" : (hour >= 12 && hour <= 16) ? greeting = "Good Afternoon" : (hour >= 16 && hour <= 24) ? greeting = "Good Evening" : greeting = "Hi";
salute.textContent = `${greeting}, `;



//Set up time on profile card with Moment.js library
const fullDate = document.querySelector(".date");
fullDate.textContent = moment().format('dddd Do, MMMM');





//Function to display homepage with signUp from hidden
function clickHome(){
    document.getElementById("popMain1").style.display = "block";
    document.getElementById("signIn").style.display = "none";

  }

//Hides signUp form on clicking form cancel key  
function hideSign() {
    document.getElementById("signIn").style.display = "none";
    
    document.getElementById("uName").value = "";
    document.getElementById("fName").value = "";
    document.getElementById("lName").value = "";
  }

  



//Function to display Reminder page on click
  function alarmPop() {
    document.getElementById("alarm").style.display = "block";
}


//Function hides task addition form on click
function hideAlarm() {
    document.getElementById("alarm").style.display = "none";
    }
    
//Function displays reset form on click
function clearPop() {
    document.getElementById("clear").style.display = "block";
  }


//Function hides reset form on click
function hideClear() {
  document.getElementById("clear").style.display = "none";
  }


  //Switches from HomePage to WebPage two
  function showPopMain2(){
    document.getElementById("popMain2").style.display = "block";
    document.getElementById("popMain1").style.display = "none";
  }

  //Switches back from webPage two to one
  function backToPopMain1(){
    document.getElementById("popMain2").style.display = "none";
    document.getElementById("popMain1").style.display = "block";
  }



//Function displays task addition form on click
function show(){
document.getElementById("popup").style.display = "block";
}

//Function hides task addition form on click
function hide() {
document.getElementById("popup").style.display = "none";

document.getElementById("category").value = "";
document.getElementById("task").value = "";
}




//Sortable.js library class for reordering toDo tasks
new Sortable(sortable, {
animation: 150,
ghostClass: 'sortable-ghost'
});



//For task category toggle
function toggleClass(elem,className){
if (elem.className.indexOf(className) !== -1){
elem.className = elem.className.replace(className,'');
}
else{
elem.className = elem.className.replace(/\s+/g,' ') + 	' ' + className;
}

return elem;
}

function toggleDisplay(elem){
const curDisplayStyle = elem.style.display;			

if (curDisplayStyle === 'none' || curDisplayStyle === ''){
elem.style.display = 'block';
}
else{
elem.style.display = 'none';
}

}

function toggleMenuDisplay(e){
const dropdown = e.currentTarget.parentNode;
const menu = dropdown.querySelector('.menu');
const icon = dropdown.querySelector('.fa-angle-right');

toggleClass(menu,'hide');
toggleClass(icon,'rotate-90');
}

function handleOptionSelected(e){
toggleClass(e.target.parentNode, 'hide');			

const id = e.target.id;
const newValue = e.target.textContent + ' ';
const titleElem = document.querySelector('.dropdown .title');
const icon = document.querySelector('.dropdown .title .fa');


titleElem.textContent = newValue;
titleElem.appendChild(icon);


//trigger custom event
document.querySelector('.dropdown .title').dispatchEvent(new Event('change'));
//setTimeout is used so transition is properly shown
setTimeout(() => toggleClass(icon,'rotate-90',0));
}

function handleTitleChange(e){
return e.target.textContent;
}


//get elements
const dropdownTitle = document.querySelector('.dropdown .title');
const dropdownOptions = document.querySelectorAll('.dropdown .option');

//bind listeners to these elements
dropdownTitle.addEventListener('click', toggleMenuDisplay);

dropdownOptions.forEach(option => option.addEventListener('click',handleOptionSelected));

document.querySelector('.dropdown .title').addEventListener('change',handleTitleChange);




//Disable submit buttons until all input fields are completed
let txt = document.querySelectorAll('[type="text"]');
for (let i = 0; i < txt.length; i++) {
    txt[i].oninput = () => {
        if (!(txt[0].value == '') && !(txt[1].value == '') && !(txt[2].value == '')) {
            document.getElementById("submit1").removeAttribute('disabled');
            document.getElementById("submit1").style.color = " #03a9f4";
        }
        if (!(txt[3].value == '')) {
            document.getElementById("submit2").removeAttribute('disabled');
            document.getElementById("submit2").style.color = " #03a9f4";
        }
    }
}




//Declare variable for first submit button
//Create an empty array for form field data     
const submit1 = document.querySelector("#submit1");
let nameKeep = [];


//Add event listeners to first submit button
submit1.addEventListener("click", (e) => {
    
    // prevent the page from reloading when submitting the form
    e.preventDefault();


    //vibration API call on signUp
    window.navigator.vibrate(300);

    //Obtain values from form input fields 
    const uName = document.getElementById("uName").value;
    const fName = document.getElementById("fName").value;
    const lName = document.getElementById("lName").value;

    //Authenticate form fields
    if (uName === "" || fName === "" || lName === "") {
        alert("All fields are required");
    }

    else {    
        const nameItem = {
        uName: uName,
        fName: fName,
        lName: lName
    }

    //Append form field data into empty array 
    nameKeep.push(nameItem);
    //Save array contents into localStorage 
    localStorage.setItem("Name", JSON.stringify(nameKeep));
    
    setName();
    }
})
            
//Display all names obtained from form fields in designated elements
function setName() {
nameKeep.forEach(function(item) {
    const username = document.createElement("span");
    username.textContent = item.uName;
    salute.appendChild(username);
    document.querySelector("#firstName").textContent = item.fName;
    document.querySelector("#lastName").textContent = item.lName;

})
}


submit1.addEventListener("click", () => {
    if (uName === "" || fName === "" || lName === "") {
        document.getElementById("popMain1").style.display = "none";
        document.getElementById("signIn").style.display = "block";

    }
})

if (uName === "" || fName === "" || lName === "") {
    document.querySelector("#close").removeEventListener("click", () => {
        document.getElementById("signIn").style.display = "none";
    
    document.getElementById("uName").value = "";
    document.getElementById("fName").value = "";
    document.getElementById("lName").value = "";
    })
}


//Function to verify if name exists/signedUp in localStorage 
function nameCheck(task) {

nameKeep = JSON.parse(localStorage.getItem("Name")) || [];


if (localStorage.getItem("Name")) {
    document.getElementById("signIn").style.display = "none";
    document.getElementById("popMain1").style.display = "block";
    document.getElementById("popMain2").style.display = "none";

    //Displays names if they exist in localStorage
    nameKeep.map(() => {
        setName();  
    });
}
else {
    document.getElementById("signIn").style.display = "block";
    document.getElementById("popMain1").style.display = "block";
    document.getElementById("popMain2").style.display = "none";
}

}





//Create variables for updating profile photo
const edit = document.querySelector(".edit");
const cancel = document.querySelector(".cancel");

//Add event listener to edit button on click for photo upload button pop up
edit.addEventListener("click", () => {
    document.querySelector(".avatar1 label").style.visibility = "visible";
    document.querySelector(".reset").style.display = "block";

    cancel.style.display = "block";
})

//Add event listener to cancel button on click to halt process
cancel.addEventListener("click", () => {
    document.querySelector(".avatar1 label").style.visibility = "hidden";
    document.querySelector(".reset").style.display = "none";

    cancel.style.display = "none";
})


document.querySelector("#clear").addEventListener("click", (event) =>{

  document.querySelector(".avatar1 label").style.visibility = "hidden";
  document.querySelector(".reset").style.display = "none";

  cancel.style.display = "none";

  if (event.target.id === "yes") {
    //clear local storage
    localStorage.clear();

    //hide clear form
    document.querySelector("#clear").style.display = "none";

    
    //reload entire page
    window.location.reload();

    //invoke nameCheck function
    nameCheck();

    //Clear sign up form input fields
    document.getElementById("uName").value = "";
    document.getElementById("fName").value = "";
    document.getElementById("lName").value = "";

  }
  if (event.target.id === "no") {
    document.querySelector("#clear").style.display = "none";
  }
  else {
    false;
  }
})


//create a new class for radial percentage bar using easyPieChart library 
//style percentage bar
let element = document.querySelector('.chart');
let chart = new EasyPieChart(element, {
barColor: function(percent) {
    var ctx = this.renderer.getCtx();
    var canvas = this.renderer.getCanvas();
    var gradient = ctx.createLinearGradient(0,0,canvas.width,0);
  gradient.addColorStop(0, "#18ad85");
        gradient.addColorStop(1, "#57af24");
    return gradient;
    },
//barColor:  '#18ad85',//'#fd6470',
  trackColor: '#373535',//'#60345f',
    scaleLength: 0,
    lineCap: 'square',
    lineWidth: 18,
    size: 160,
    animate: {
    duration: 1000,
    enabled: true
    }
});





//Declare variable for second submit button
//Fetch the Ul element
//Create an empty array for toDo items
const submit2 = document.querySelector("#submit2");
const ul = document.querySelector("ul");
let toDos = [];


//Add event listener to second submit button on click
submit2.addEventListener("click", (e) => {

//hides form two on click
document.getElementById("popup").style.display = "none";
// prevent the page from reloading when submitting the form
e.preventDefault();
//variables for form two input content/value
const category = document.getElementById("category").textContent;
const task = document.getElementById("task").value;

//Form two authentication
if (category === "Choose a Category" || task === "") {
    alert("All fields are required!")
    }
else {       //if item is not empty
            // make a todo object, which has id, title, task, time and checked properties
        const toDo = {
        id: Date.now(),
        title: category,
        task: task,
        time: ` ${moment().format('MMM DD')} ${moment().format('hh:mm A')}`,
        checked: false
        }
        // Add task to toDos array
        toDos.push(toDo);
        //Store the array in local storage.
        localStorage.setItem("tasks", JSON.stringify(toDos));

        //Call the createTask() function for visually representing the task on the screen.
        createTask(task);


        //Clear the form
        clearForm();
        function clearForm() {
        document.getElementById("task").value = "";
        }

       }

})


//function responsible for creating the task’s markup on screen.
function createTask(task) {

// clear everything inside <ul>.
ul.innerHTML = "";

//Assign id and class to each task created
toDos.forEach(function(item) {
const li = document.createElement("li");
li.setAttribute("id", item.id);
li.className += "item";


//Create a span element for accommodating icons
const span = document.createElement("span");
span.id += "circle";
span.classList.add('fa-stack', 'fa-2x');

//Assign colors to span based on task category
(item.title == "Uncategorized ") ? span.style.color = "#18ad85" : (item.title == "Work ") ? span.style.color = "#0298e0" : (item.title == "Personal ") ? span.style.color = "#eeb405" : (item.title == "Life ") ? span.style.color = "#eb4762" : (item.title == "Study ") ? span.style.color = "#826bc9" : false;


//Create circular icons
const icon = document.createElement("i");
icon.classList.add('far', 'fa-circle', 'fa-stack-2x');

const icon2 = document.createElement("i");
icon2.classList.add('far', 'fa-stack-2x');



//Create title and description elements for task
const dl = document.createElement("dl");
const dt = document.createElement("dt");
const dd = document.createElement("dd");
dd.setAttribute("class", "mark");



//switch between the two icons on click
span.addEventListener("click", () => {
dd.classList.toggle("checked");

span.querySelector(':last-child').classList.toggle("fa-check-circle");

})


//create an element to accommodate date and delete button 
const  dateDelete = document.createElement("div");
dateDelete.className += "dateDelete";

//create,style and append span for date in parent element
const timeLog = document.createElement("span");
timeLog.className = "timeLog";
timeLog.textContent = item.time;        //time.toLocaleString("en-US", {hour: "numeric", minute: "numeric", hour12: true});  
timeLog.style.opacity = "1";
dateDelete.appendChild(timeLog);


//create.style and append span for delete button in parent element
const dBtn = document.createElement("span");
dBtn.className = "delete";
dBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
dBtn.style.opacity = "0";
dateDelete.appendChild(dBtn);



//Event listeners for hover effects on delete button
li.addEventListener("mouseenter", () => {
dBtn.style.opacity = "0.8";
});

li.addEventListener("mouseleave", () => {
dBtn.style.opacity = "0";
});




//create text nodes from object values
//append texts to appropriate elements as title and description
const categories = document.createTextNode(item.title);
const tasks = document.createTextNode(item.task);
dt.appendChild(categories);
dd.appendChild(tasks)

//append font awesome icons to span and span to <li> 
span.appendChild(icon);
span.appendChild(icon2);
li.appendChild(span);



//append title and description to description list
//append list to <li>
//append date and delete button span to <li>
//append li or toDo item to <ul>
dl.appendChild(dt);
dl.appendChild(dd);
li.appendChild(dl)
li.appendChild(dateDelete);
ul.appendChild(li)

//Restore submit button back to disabled mode
submit2.disabled = "disabled";
submit2.style.color = "rgb(243, 89, 62)";

//append </ul> to screen
document.getElementById("field2").appendChild(ul);


// check if the item is completed
//if yes, switch icons to checked circle
if (item.checked === true) {
dd.classList.add('checked');

span.querySelector(':last-child').classList.toggle("fa-check-circle");
}

//Call the countTasks() function.
countTasks();
})

}











//attach a click event to parent list
document.querySelector("ul").addEventListener("click", (e) => {

//Check if the element that is clicked is the “close” button 
if (e.target.classList.contains("fa-2x") ||
e.target.parentElement.classList.contains("fa-2x")) {

//Take the ID of the parent list item    
const taskId = e.target.closest("li").id;

//Pass ID to the update() function
updateTask(taskId, e.target);


//create update task function
function updateTask(taskId, el) {

//Grab the task that needs to be updated.
const toDo = toDos.find((task) => task.id === parseInt(taskId));

//toggle the task’s status via its checked attribute
toDo.checked = !toDo.checked;
if (toDo.checked) {
    el.setAttribute("checked", "");
}
else {
    el.removeAttribute("checked");
}

//Update the value of the tasks key in local storage.
localStorage.setItem("tasks", JSON.stringify(toDos)); 
//Call the countTasks() function.
countTasks();
}

}

})


//attach a click event to parent list
document.querySelector("ul").addEventListener("click", (e) => {

//Check if the element that is clicked is the “delete” button
if (e.target.classList.contains("delete") ||
e.target.parentElement.classList.contains("delete")) {

//grab the id of the parent list item.
const taskId = e.target.closest("li").id;

//Pass this id to the deleteToDo() function.
deleteToDo(taskId);


//create deleteToDo function
function deleteToDo(taskId) { 
//Remove from the tasks array the associated task.
toDos = toDos.filter((task) => task.id !== parseInt(taskId));
//Update the value of the tasks key in local storage.
localStorage.setItem("tasks", JSON.stringify(toDos));
//Remove the associated list item.
document.getElementById(taskId).remove();

//Call the countTasks() function.
countTasks();
}
}

});




//get elements for showcasing number of tasks
const totalTasks = document.querySelector(".total-tasks span");
const completedTasks = document.querySelector(".completed-tasks span");
const remainingTasks = document.querySelector(".remaining-tasks span");
const remainderDisplay = document.querySelector("#num");
const word = document.querySelector("#words");


const uncategorizedTasks  = document.querySelector("#uncategorizedNum");
const workTasks = document.querySelector("#workNum");
const personalTasks = document.querySelector("#personalNum");
const lifeTasks = document.querySelector("#lifeNum");
const studyTasks = document.querySelector("#studyNum");


const bell = document.querySelector("#bell");

//sentence for no task
(remainderDisplay.textContent === "0" || remainderDisplay.textContent === "") ? word.textContent = " No pending tasks" : false;

//Hide bell icon if no pending tasks
(remainderDisplay.textContent === "0" || remainderDisplay.textContent === "") ? bell.style.visibility = "hidden" : false;


//function monitors the tasks for changes (additions, updates, deletions) and update the content of the related elements.
function countTasks() {
totalTasks.textContent = toDos.length;
const completedTasksArray = toDos.filter((task) => task.checked === true);
completedTasks.textContent = completedTasksArray.length;
remainingTasks.textContent = toDos.length - completedTasksArray.length;
remainderDisplay.textContent = toDos.length - completedTasksArray.length;


//Sentences set up according to task numbers
(remainderDisplay.textContent === "0" || remainderDisplay.textContent === "") ? word.textContent = " No pending tasks" : (remainderDisplay.textContent === "1") ? word.textContent = " Item not completed" : (remainderDisplay.textContent !== "0" || remainderDisplay.textContent !==" 1" || remainderDisplay.textContent !== "") ? word.textContent = " Items not completed" : false;
(remainderDisplay.textContent === "0") ? remainderDisplay.textContent = "" : false;


//If no pending tasks, hide bell icon
(remainderDisplay.textContent === "0" || remainderDisplay.textContent === "") ? bell.style.visibility = "hidden" : (remainderDisplay.textContent !== "0" || remainderDisplay.textContent !== "") ? bell.style.visibility = "visible" : false;



//grab tasks from local storage according to categories
const uncategorizedTasksArray = ((JSON.parse(localStorage.getItem("tasks"))).filter((task) => task.title === "Uncategorized " )); 
const workTasksArray = ((JSON.parse(localStorage.getItem("tasks"))).filter((task) => task.title === "Work " )); 
const personalTasksArray = ((JSON.parse(localStorage.getItem("tasks"))).filter((task) => task.title === "Personal " )); 
const lifeTasksArray = ((JSON.parse(localStorage.getItem("tasks"))).filter((task) => task.title === "Life " )); 
const studyTasksArray = ((JSON.parse(localStorage.getItem("tasks"))).filter((task) => task.title === "Study " ));   



//grab completed tasks based on categories
const completeUncategorizedTasksArray = ((JSON.parse(localStorage.getItem("tasks"))).filter((task) => task.title === "Uncategorized " && task.checked === true)); 
const completeWorkTasksArray = ((JSON.parse(localStorage.getItem("tasks"))).filter((task) => task.title === "Work " && task.checked === true)); 
const completePersonalTasksArray = ((JSON.parse(localStorage.getItem("tasks"))).filter((task) => task.title === "Personal " && task.checked === true)); 
const completeLifeTasksArray = ((JSON.parse(localStorage.getItem("tasks"))).filter((task) => task.title === "Life " && task.checked === true)); 
const completeStudyTasksArray = ((JSON.parse(localStorage.getItem("tasks"))).filter((task) => task.title === "Study " && task.checked === true));   




//return task completed in percentages
(workTasksArray.length === 0) ? workTasks.textContent = "" : workTasks.textContent = (`${((completeWorkTasksArray.length/workTasksArray.length)*100).toFixed(0)}%`);
(personalTasksArray.length === 0)?  personalTasks.textContent = "" : personalTasks.textContent = (`${((completePersonalTasksArray.length/personalTasksArray.length)*100).toFixed(0)}%`);  
(lifeTasksArray.length === 0)?  lifeTasks.textContent = "" : lifeTasks.textContent = (`${((completeLifeTasksArray.length/lifeTasksArray.length)*100).toFixed(0)}%`);
(studyTasksArray.length === 0)? studyTasks.textContent = "" : studyTasks.textContent = (`${((completeStudyTasksArray.length/studyTasksArray.length)*100).toFixed(0)}%`);
(uncategorizedTasksArray.length === 0) ? uncategorizedTasks.textContent = "" : uncategorizedTasks.textContent = (`${((completeUncategorizedTasksArray.length/uncategorizedTasksArray.length)*100).toFixed(0)}%`); 




//Set linear progressive bar ranges based on percentage 
/* construct manually */
var bar1 = new ldBar("#workBar");
/* ldBar stored in the element */
var bar2 = document.getElementById('workBar').ldBar;
bar1.set((completeWorkTasksArray.length/workTasksArray.length)*100);



/* construct manually */
var bar1 = new ldBar("#personalBar");
/* ldBar stored in the element */
var bar2 = document.getElementById('personalBar').ldBar;
bar1.set((completePersonalTasksArray.length/personalTasksArray.length)*100);



/* construct manually */
var bar1 = new ldBar("#lifeBar");
/* ldBar stored in the element */
var bar2 = document.getElementById('lifeBar').ldBar;
bar1.set((completeLifeTasksArray.length/lifeTasksArray.length)*100);



/* construct manually */
var bar1 = new ldBar("#studyBar");
/* ldBar stored in the element */
var bar2 = document.getElementById('studyBar').ldBar;
bar1.set((completeStudyTasksArray.length/studyTasksArray.length)*100);



/* construct manually */
var bar1 = new ldBar("#uncategorizedBar");
/* ldBar stored in the element */
var bar2 = document.getElementById('uncategorizedBar').ldBar;
bar1.set((completeUncategorizedTasksArray.length/uncategorizedTasksArray.length)*100);







//Calculation expressing circular progress bar percentage
let total = (JSON.parse(localStorage.getItem("tasks"))).length;

let completed = ((JSON.parse(localStorage.getItem("tasks"))).filter((task) => task.checked === true)).length;

let ratio = ((completed/total)*100).toFixed(0);

//set values obtained into appropriate elements
document.querySelector(".chart").setAttribute("data-percent", ratio);
document.querySelector(".percent").textContent = `${ratio}%`;
document.querySelector(".ratio").textContent =  `${completed}/${total}`

//clear Nan information from circular bar
if (document.querySelector(".percent").textContent === "NaN%") {
  document.querySelector(".percent").textContent = "";
  document.querySelector(".ratio").textContent = "";
}

//create hover effect on circular progress bar
document.querySelector(".chart").addEventListener("mouseenter", () => {
document.querySelector(".percent").textContent = "Done!";
});
document.querySelector(".chart").addEventListener("mouseleave", () => {
document.querySelector(".percent").textContent = `${ratio}%`;
});


//set percentage value to animate circular progress bar
chart.update(ratio);
chart.enableAnimation();
}






//Restore all tasks from the local storage on page load 
toDos = JSON.parse(localStorage.getItem("tasks")) || [];

if (localStorage.getItem("tasks")) {
toDos.map((task) => {

createTask(task);

});
}



//input focus
function runScript1(e) {
if (e.keyCode == 13) {        
document.getElementById("uName").focus();
document.getElementById("fName").focus();
return false;
}
}


function runScript2(e) {
if (e.keyCode == 13) {        
document.getElementById("fName").focus();
document.getElementById("lName").focus();

return false;
}
}


function runScript3(e) {
    if (e.keyCode == 13) {        
    document.getElementById("lName").focus();
    document.getElementById("submit2").focus();
    
    return false;
    }
    }

    
    





//Image upload and storage to localStorage
saveFile = () => {
const file = document.querySelector("input[type=file]").files[0];
const reader = new FileReader();

reader.addEventListener("loadend", () => {
    localStorage.savedImg = reader.result;
    loadFile();
});

if (file) {
    reader.readAsDataURL(file);
} else {
    preview.src = "";
}
};
loadFile = () => {
const savedImg = localStorage.savedImg;
if (savedImg) {
    const savedImgArray = savedImg.split(";base64,");
    const arrayBufferImg = base64ToArrayBuffer(savedImgArray[1]);
    const savedImgUrl = ArrayBufferToUrl(
    arrayBufferImg,
    savedImgArray[0].replace("data:", "")
    );

    document.querySelector(".avatar1").classList.add("userIcon");
    document.querySelector(".avatar1").style.backgroundImage = `url(${savedImgUrl})`;
    document.querySelector(".avatar1 label").style.visibility = "hidden";
    document.querySelector(".reset").style.display = "none";
    cancel.style.display = "none";


}
};

base64ToArrayBuffer = base64 => {
const binary_string = atob(base64);
const len = binary_string.length;
const bytes = new Uint8Array(len);
for (let i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
}
return bytes.buffer;
};
function ArrayBufferToUrl(ArrayBuffer, imgType) {
const blob = new Blob([ArrayBuffer], { type: imgType });
const urlCreator = window.URL || window.webkitURL;
const imageUrl = urlCreator.createObjectURL(blob);
return imageUrl;
}
document.querySelector("input[type=file]").addEventListener("change", saveFile);
loadFile();

















//Alarm set up
// set our variables
let  time, alarm, currentH, currentM,
    activeAlarm = false,
    sound = new Audio("https://res.cloudinary.com/dhegyaino/video/upload/v1624108624/575814__bayaba22c__iphone-alarm_jcxsfr.wav");




// loop alarm
sound.loop = true;


// define a function to display the current time
function displayTime() {
  let now = new Date();
  time = now.toLocaleTimeString();

  document.querySelector("#clock").textContent = time;

  // watch for alarm
  if (time === alarm) {
    sound.play();
    window.navigator.vibrate([500, 200, 800, 200, 500, 200, 800, 200, 500, 200, 800, 200, 500, 200, 800, 200, 500, 200, 800, 200, 500, 200, 800, 200, 500, 200, 800, 200, 500, 200, 800, 200, 500, 200, 800, 200, 500, 200, 800, 200, 500, 200, 800, 200, 500, 200, 800, 200, 500, 200, 800, 200, 500, 200, 800]);
    
    // show snooze button
    snooze.className = "";
  }
  setTimeout(displayTime, 1000);
}

displayTime();



// add option values relative towards time
function addMinSecValues(id) {
  let select = id;
  let min = 59;
  
  for (let i = 0; i <= min; i++) {
    // defined as new Option(text, value)
    select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i < 10 ? "0" + i : i);
  }
}

function addHours(id) {
  let select = id;
  let hour = 12;
  
  for (let i = 1; i <= hour; i++) {
    // defined as new Option(text, value)
    select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
  }
}

addMinSecValues(minutes);
addMinSecValues(seconds);
addHours(hours);

// set and clear alarm
const startStop = document.querySelector("#startStop");
const amPm = document.querySelector("#ampm");
startStop.onclick = function() {
  // set the alarm
  if (activeAlarm === false) {
    hours.disabled = true;
    minutes.disabled = true;
    seconds.disabled = true;
    amPm.disabled = true;
    
    alarm = `${hours.value}:${minutes.value}:${seconds.value} ${amPm.value}`;
    this.textContent = "Clear Alarm";
    activeAlarm = true;
  } else {
    // clear the alarm
    hours.disabled = false;
    minutes.disabled = false;
    seconds.disabled = false;
    amPm.disabled = false;
    
    sound.pause();
    window.navigator.vibrate(0);
    alarm = "00:00:00 AM";
    this.textContent = "Set Alarm";
    
    // hide snooze button
    snooze.className = "hideSnooze";
    activeAlarm = false;
  }
};

// snooze for 5 minutes
snooze.onclick = function() {
  if (activeAlarm === true) {
    // grab the current hour and minute
    currentH = time.substr(0, time.length - 9);
    currentM = time.substr(currentH.length + 1, time.length - 8);
    
    if (currentM >= "55") {
      minutes.value = "00";
      hours.value = parseInt(currentH) + 1;
    } else {
      if (parseInt(currentM) + 5 <= 9) {
        minutes.value = "0" + parseInt(currentM + 5);
      } else {
        minutes.value = parseInt(currentM) + 5;
      }
    }    
    // hide snooze button
    snooze.className = "hideSnooze";
    
    // now reset alarm
    startStop.click();
    startStop.click();
  } else {
    return false;
  }
};



//Save alarm to localStorage and close Alarm form on setting reminder
const set = document.querySelector("#startStop");
set.addEventListener("click", () => {
    if (set.textContent == "Clear Alarm") {
        document.getElementById("alarm").style.display = "none";


        let alarmStorage = [];

        const hourRem = document.querySelector("#hours").value;
        const minuteRem = document.querySelector("#minutes").value;
        const secondRem = document.querySelector("#seconds").value;
        const periodRem = document.querySelector("#ampm").value;


        const reminderDetails = { 
            hourRem: hourRem,
            minuteRem: minuteRem,
            secondRem: secondRem,
            periodRem: periodRem
        }
    
        alarmStorage.push(reminderDetails);


        //Save array contents into localStorage 
        localStorage.setItem("Alarm", JSON.stringify(alarmStorage));
    }

    //clear alarm from localStorage if clear button is clicked
    if (set.textContent == "Set Alarm") {

      localStorage.removeItem("Alarm");
    }
})




//Restore reminder from the local storage on page load 
alarmStorage = JSON.parse(localStorage.getItem("Alarm")) || [];
if (localStorage.getItem("Alarm")) {

    
alarmStorage.map((item) => {

        document.querySelector("#hours").value = item.hourRem;
        document.querySelector("#minutes").value = item.minuteRem;
        document.querySelector("#seconds").value = item.secondRem;
        document.querySelector("#ampm").value = item.periodRem;

        startStop.click();
});
}

















