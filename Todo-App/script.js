function addTask() {
    var taskInput = document.getElementById('taskInput');
    var taskList = document.getElementById('taskList');
  
    if (taskInput.value === '') {
      alert('Please enter a task.');
      return;
    }
  
    var li = document.createElement('li');
    li.innerText = taskInput.value;
  
    var deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.onclick = function() {
      taskList.removeChild(li);
    };
  
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  
    taskInput.value = '';
  }
  