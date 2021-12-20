// Write Javascript Here
const baseUrl = "http://localhost:3000/users";
const headers = {
    'Content-type': 'application/json; charset=UTF-8'
};


var listUser = []

getUsersRequest().then(users => {
    //This function has been implemented already for you
    const tableEl = document.getElementById("table");
    for (const user of users) {
        listUser = [...users]
        tableEl.appendChild(createTableRow(user))
    }
})








function addNewUser() {
    //TODO: Implement me    
    let name = prompt("Add User:", "");
    if (name) {
        var id = Math.floor(Math.random() * 101);
        const user = { id: id, name: name }
        createUserRequest(user);
        location.reload();

    }

}



function editUser(id, userName) {
    let name = prompt("Edit User:", userName);
    if (name) {
        const user = { id: id, name: name }
        updateUserRequest(user);
        location.reload();

    }
}

function deleteUser(id) {
    //TODO: implement me
    if (confirm("Are you sure want delete this entry ?")) {
        deleteUserRequest(id);
        location.reload();
    }


}




//CRUD HELPER METHODS
function createUserRequest(user) {

    return fetch(baseUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(user),
    }).then(response => response.json())
}


function getUsersRequest() {
    return fetch(baseUrl, {
        method: 'GET',
    }).then(response => response.json())
}

function deleteUserRequest(id) {
    return fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
    }).then(response => response.json())
}


function updateUserRequest(user) {
    return fetch(`${baseUrl}/${user.id}`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(user),
    }).then(response => response.json())
}


//HELPER METHODS
function createTableRow(user) {
    var tr = document.createElement("tr");
    tr.innerHTML = `<td>${user.name}</td> <td><a href="#" onclick="editUser(${user.id}, '${user.name}')">Edit</a> / <a href="#" onclick="deleteUser(${user.id})">Delete</a></td>`;
    return tr;
}
