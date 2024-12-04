

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
        if (response.status === 404) {
          response.text().then((message) => {
            document.getElementById('server-response').innerText = message;
          });
        } else {
          return response.json();
        }
      })
      .then((todos) => {
        if (todos) {
          const todoListElement = document.getElementById('todoList');
          todoListElement.innerHTML = '';
  
          const deleteBox = document.getElementById('box');
          deleteBox.innerHTML = '';
  
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Delete user';
          deleteButton.id = 'deleteUser';
          deleteBox.appendChild(deleteButton);
  
          deleteButton.addEventListener('click', () => {
            fetch(`http://localhost:3000/delete/${searchUser}`, { method: 'DELETE' })
              .then((response) => response.text())
              .then((message) => {
                document.getElementById('server-response').innerText = message;
                todoListElement.innerHTML = '';
                deleteBox.innerHTML = '';
              })
              .catch((error) => console.error('Error', error));
          });
  
          todos.forEach((todo, index) => {
        
            let listNode = document.createElement('li');
            let todoLink = document.createElement('a');
            todoLink.href = '#';
            todoLink.textContent = todo;
            todoLink.className = 'delete-task';
            todoLink.dataset.todoIndex = index;
            todoLink.dataset.todo = todo;
  
            todoLink.addEventListener('click', (e) => {
              e.preventDefault();
              console.log(searchUser, todo)
              deleteTodo(searchUser, todo);
            });
  
            listNode.appendChild(todoLink);
            todoListElement.appendChild(listNode);
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
    });
});



function deleteTodo(name, todo) {
  fetch('http://localhost:3000/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, todo }),
  })
    .then((response) => response.text())
    .then((message) => {
      document.getElementById('server-response').innerText = message;
    })
    .catch((error) => console.error("Error", error));
}

