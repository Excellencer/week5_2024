

document.getElementById('todoForm').addEventListener('submit', function (event) {
    
    event.preventDefault();

    let name = document.getElementById('userInput').value;
    let todo = document.getElementById('todoInput').value;

    let userData = { name, todo };
    

    fetch('http://localhost:3000/add', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
        .then((response) => response.text())
        .then(response => 
            document.getElementById('server-response').innerText = response)
});



document.getElementById('searchForm').addEventListener('submit', function (event) {
    
    event.preventDefault();

    let searchUser = document.getElementById('searchInput').value;
    let fetchURL = 'http://localhost:3000/todos/';
    let searchQuery = fetchURL.concat(searchUser);
    
    fetch(searchQuery)
        
        .then((response) => {
            if (response.status === 201) {
                response.text()
                .then(response => 
            document.getElementById('server-response').innerText = response)
                
            }
            else{
            return response.json();
            }
        })
        .then((todos) => {
            
            let todoListElement = document.getElementById('todoList');
            todoListElement.innerHTML = ''; 

            let deleteBox = document.getElementById('box');
              deleteBox.innerHTML = "";
            let deleteButton = document.createElement("button");
              deleteButton.textContent = "Delete user";
              deleteButton.setAttribute("id", "deleteUser")
              deleteBox.appendChild(deleteButton);

              deleteButton.addEventListener('click', () => {
                fetch(`${window.location.origin}/delete/${searchUser}`, { method: 'DELETE' })
                    .then((response) => response.text())
                    .then((message) => {
                        document.getElementById('server-response').innerText = message;
                    })
                    .catch((error) => console.error('Error deleting user:', error));
            });


            todos.forEach((todo) => {
                let listItem = document.createElement('li');
                listItem.textContent = `${todo}`;
                todoListElement.appendChild(listItem);
            });
        }
        
        )
        .catch((error) => {
            console.error('Error:', error);
            
        });
    
});

function deleteUserButton(name) {
    document.getElementById('delete-user').onclick = function() {
        
        let fetchURL = 'http://localhost:3000/user/';
        let searchQuery = fetchURL.concat(name);
    
        fetch(searchQuery, {
            method: 'DELETE',
            })
            .then(response => response.text())
            .then(response => {
                if (response === "User deleted") {
                    console.log(response);
                    console.log(response);
                    document.getElementById('user-name').innerText = "";
                    document.getElementById('task-list').innerHTML = "";
                    document.getElementById('server-response').innerText = response
                    document.getElementById('delete-user').innerHTML = "";

                } 
                document.getElementById('server-response').innerText = response
                
                
                });
    
    }
}


