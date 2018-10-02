function addToList(val){
    if (checkRepeat(val) & checkEmpty(val)) {
        var subBut = document.getElementById("sub"); 
        if (subBut != null) {
            subBut.parentNode.removeChild(subBut);
        }
        document.getElementById("reset").style.display = "inline";
        var ex = addExercise(val);
        document.getElementById("exerciseList").appendChild(ex);
        var range = addWeightRange();
        var display = addDisplay(range)
        ex.appendChild(display);
        ex.appendChild(range);
        var inp = addRepInput(1);
        ex.appendChild(inp);
        var sub = addSubmit(inp);
        ex.appendChild(sub);

    }
    return false;
}

function addExercise(val){
    var label = document.createElement("div");
    label.className = "exercise_name";
    var num = label.getElementsByClassName("set").length + 1;
    label.innerText = val;
    return label;
}

function addRepInput(num){
    var inp = createInput("number", num);
    inp.placeholder = "Set " + num;
    inp.className = "set";
    inp.oninput = function() {
        var prev = document.getElementById("currentInput")
        if (prev != null){
            prev.id = "";
        }
        this.id = "currentInput";
        var subBut = document.getElementById("sub");
        console.log(subBut); 
        if (subBut != null) {
            subBut.parentNode.removeChild(subBut);
        }
        this.insertAdjacentElement( "afterend", addSubmit(this));
    }
    return inp;
}

function addSubmit(inp){
    var subButton = createButton("Submit");
    subButton.id = "sub"
    subButton.onclick = submitReps(inp);
    return subButton;
}

function addWeightRange(){
    var range = createInput("range", "weight");
    range.min = 0;
    range.max = 100;
    range.className = "weight_range"
    return range;
    
}

function addDisplay(range){
    var weight =  document.createElement("p");
    weight.innerText = range.value
    weight.className = "weight_display"
    range.oninput = function() {
        range.parentNode.getElementsByClassName("weight_display")[0].innerText = range.value;
    }
    return weight;
}

function submitReps(inp){
    return function() {
        if (checkEmpty(inp.value)){
            inp.className = "blackout";
            saveReps(inp);
            var newInput = addRepInput(parseInt(inp.name)+ 1);
            inp.parentNode.appendChild(newInput);
            inp.parentNode.appendChild(addSubmit(newInput));
            inp.parentNode.removeChild(this);
            return false;
        }
    }
}

function padDates(num){
    if (num < 10){
        num = "0" + num;
    }
    return num;
}

function reset(obj,val) {
    document.getElementById(val).innerHTML = "";
    obj.style.display = "none";
}

function checkEmpty(val) {
    if (val === "") {
        alert("Empty");
        return false;

    } else return true;
}

function saveReps(){
    var inp = document.getElementById("currentInput");
    var obj = {"name" : inp.parentNode.getElementsByClassName("exerciseName")[0].innerText, "set": inp.name, "reps": inp.value, "weight": inp.parentNode.getElementsByClassName("weightRange")[0].value }
    console.log(obj);
    var jsonObj = JSON.stringify(obj);
    sendAJAX(jsonObj);
    return false;
}

function updateReps(){
    var inp = document.getElementById("currentInput");
    var obj = {"name" : inp.parentNode.getElementsByClassName("exerciseName")[0].innerText, "set": inp.name, "reps": inp.value, "weight": inp.parentNode.getElementsByClassName("weightRange")[0].value }
    console.log(obj);
    var jsonObj = JSON.stringify(obj);
    updateAJAX(jsonObj);
    return false;
}
function checkRepeat(val){
    var coll = document.getElementById("exerciseList").getElementsByClassName("exercise_name");
    var i;
    for (i = 0; i < coll.length; i++) {
        if (coll[i].innerText.includes(val)) {
            alert("Duplicate");
            return false;
        } 
    }
    return true;
}

function createInput(type, name){
    var inp = document.createElement("input");
    inp.type = type;
    inp.name = name;
    return inp;
}

function createButton(val) {
    var but = document.createElement("input");
    but.type = "button";
    but.value = val;
    return but;
}

