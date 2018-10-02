
function postDb(obj) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            var listEle = document.createElement("li");
            var txt = document.createTextNode(fd.get("exercise"));
            listEle.appendChild(txt);
            document.getElementById("exerciseList").appendChild(listEle);
            //document.getElementById("exerciseForm").innerHTML = this.responseText;
            console.log("AJAX success");
        }
    };
    var fd = new FormData(obj);
    xhttp.open("POST", obj.action);
    xhttp.send(fd);

    return false;
}

function validate(obj){
    return false;
    /*
    if ( == ""){
        alert("invalid input");
        return false;
    } */

}