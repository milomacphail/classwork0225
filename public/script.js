const url = "http://localhost:3000/api/grads";

let grads = [];

let xhrGetAll = new XMLHttpRequest();
xhrGetAll.open("GET", url, true);
xhrGetAll.send();

xhrGetAll.onload = () => {
    console.log(xhrGetAll);
    grads = JSON.parse(xhrGetAll.response);

    if (xhrGetAll.readyState == 4 && xhrGetAll.status == 200) {
        console.log(grads);
    } else {
        console.error("Error!");
    }
}

const renderGrads = () => {
    console.log("click");
    const gradList = grads.map(element => {
        console.log(element._id);
        return (
            "<li>" +
            "Name: " + element.name +
            ", " +
            "Role: " + element.role +
            ", " +
            "Company: " + element.company +
            ", " +
            "Date of Graduation: " + element.yearOfGraduation +
            `  <button class="btn waves-effect waves-light" onclick="editGraduate('${element._id}')">Edit Graduate</button>` +
            `  <button class="btn waves-effect waves-light" onclick="deleteGraduate('${element._id}')">Delete Graduates</button>` +
            "</li>"
        )
    })
    document.getElementById("results").innerHTML =
        "<ul>" + gradList.join() + "</ul>";
}


function addGraduate(e) {
    e.preventDefault();
    console.log("Submit");

    let grad = {
        name: document.getElementById("name").value,
        role: document.getElementById("role").value,
        company: document.getElementById("company").value,
        yearOfGraduation: document.getElementById("yearOfGraduation").value
    }
    console.log(grad);

    let xhrPost = new window.XMLHttpRequest();
    xhrPost.open("POST", url);
    xhrPost.setRequestHeader("Content-Type", "application/json");
    xhrPost.send(JSON.stringify(grad));

}

function editGraduate(id) {
    console.log("Editing open");

    let grad = {
        name: document.getElementById("name").value,
        role: document.getElementById("role").value,
        company: document.getElementById("company").value,
        yearOfGraduation: document.getElementById("yearOfGraduation").value
    };

    let xhrEdit = new XMLHttpRequest();
    xhrEdit.open("POST", url + `/${id}`);
    xhrEdit.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhrEdit.onload = () => {
        let grads = JSON.parse(xhrEdit.response);
        if (xhrEdit.readyState == 4 && xhrEdit.status == "200") {
            console.log(grads);
        } else {
            console.error(grads);
        }
    }
    xhrEdit.send(JSON.stringify(grad));
}

function deleteGraduate(id) {
    console.log("Delete request");

    let xhrDelete = new XMLHttpRequest();
    xhrDelete.open("DELETE", url +`/${id}`, true);
    xhrDelete.onload = function () {
        let grads = JSON.parse(xhrDelete.response);
        if (xhrDelete.readyState == 4 && xhrDelete.status == "200") {
            console.table(grads);
        } else {
            console.error(grads);
        }
    }
    xhrDelete.send(null);
}