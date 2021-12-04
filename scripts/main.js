const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const closeTaskBtn = $('.btn-close');
const addTaskBtn = $('.btn-add');
const taskModal = $('.task__modal');
const titleTask = $('#title');
const dateTask = $('#date');
const tagsTask = $('#tags');
const descTask = $('#description');
const deleteBtn = $('.task__modal .delete-btn');
const cancelBtn = $('.task__modal .cancel-btn');
const saveBtn = $('.task__modal .save-btn');
const optionAllBox = $('.btn-all-option');

// profile var
const profileBtn = $('.nav__items .profile')
const profileModal = $('.profile__modal');
const profileClose = $('.profile-close');
const treeAmount = $('.profile-tree .amount');
// setting var
const settingBtn = $('.nav__items .setting')
const settingModal = $('.setting__modal');
const settingClose = $('.setting-close');

const user = {
  trees: 5,
  tags: [
    "School","Home","FreeTime","Work"
  ],
  tasksStore: [
    {
      id: 721839,
      title: "Task 1",
      date: "2021-07-23",
      tag: "School",
      description: "The next generation of the web’s favorite icon library + toolkit is now available as a Beta release! Try out the Free version. Subscribe to Font Awesome Pro to get even more!"
    },
    {
      id: 123780,
      title: "Task 1",
      date: "2021-11-20",
      tag: "Work",
      description: "The next generation of the web’s favorite icon library + toolkit is now available as a Beta release! Try out the Free version. Subscribe to Font Awesome Pro to get even more!"
    },
  ],
  tasksDone: [
    {
      id: 11,
      title: "Task 1",
      date: "2021-07-23",
      tag: "School",
      description: "The next generation of the web’s favorite icon library + toolkit is now available as a Beta release! Try out the Free version. Subscribe to Font Awesome Pro to get even more!"
    },
  ]
};


const app = {
  isEdit: false,
  tasks: user.tasksStore,
  renderTasks: function () {
    const htmls = this.tasks.map((task) => {
      const newElement =  `
      <div class="task" data-id-task="${task.id}">
        <div class="btn-check">
          <i class="fas fa-check-circle"></i>
        </div>
        <div class="name">
          <div class="title">${task.title} ${task.id}</div>
          <div class="date">${task.date}</div>
          <div class="note">${task.description}</div>
        </div>
        <div class="btn-option">
          <i class="fas fa-ellipsis-v"></i>
        </div>
      </div>
      `;
      return newElement;
    })
    $('.tasks').innerHTML = htmls.join('');

    // add event click when click option 
    const optionBtns = $$('.task .btn-option');
    optionBtns.forEach(optionBtn => {
      optionBtn.addEventListener('click', function(e){
        let taskEdit;
        if (e.target.classList == "btn-option"){
          taskEdit = e.currentTarget.parentNode;
        } 
        else if (e.target.parentNode.classList == "btn-option"){
          taskEdit = e.currentTarget.parentNode;
        }
        // get id from click and edit iidTask
        const idEdit = app.tasks.find(task => task.id === Number(taskEdit.getAttribute('data-id-task')));
        $('.modal-name').innerHTML = "Edit Task";  
        app.editTask(idEdit);
        taskModal.style.display = "block";
        deleteBtn.style.display = "block";
      })
    });
    // add event when click done
    const doneBtns = $$('.task .btn-check');
    doneBtns.forEach(doneBtn => {
    doneBtn.addEventListener('click', function(e){
        let doneTask;
        if (e.target.classList == "btn-check"){
          doneTask = e.currentTarget.parentNode;
          console.log(doneTask)
        } 
        else if (e.target.parentNode.classList == "btn-check"){
          doneTask = e.currentTarget.parentNode;
          console.log(doneTask)
        }
        // get id from click
        const id = Number(doneTask.getAttribute('data-id-task'));
        const idDone = app.tasks.find(task => task.id === id)
        app.deleteTask(id);

        // UPDATE FILEBASE
        user.tasksDone.push(idDone);
        app.renderTasks();
      })
    });
    
    // console.log($$('.task .btn-option'));
  },
  addTask: function () {
    // check if we just edit task
    if (this.isEdit) this.deleteTask(this.deleteTask(deleteBtn.id));
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    console.log(date);
    let newDate = dateTask.value == "" ? date : dateTask.value;
    let newTitle = titleTask.value == "" ? "New Note" : titleTask.value;
    const newId = this.isEdit ? Number(deleteBtn.id) : Math.floor(Math.random()*1000000)
    let newTask = {
      id: newId,
      title: newTitle,
      date: newDate,
      tag: tagsTask.value,
      description: descTask.value,
    };
    this.resetTask();
    return newTask;
  },
  editTask: function (task) {
    deleteBtn.id = task.id;
    titleTask.value = task.title;
    dateTask.value = task.date;
    tagsTask.value = task.tag;
    descTask.value = task.description;
    this.isEdit = true;
  },
  deleteTask: function(id){
    console.log(app.tasks);
    const index = this.tasks.findIndex(function(task){
      return task.id == id;
    })
    console.log(index);
    if (index !== -1) this.tasks.splice(index, 1);
    user.tasksStore = this.tasks;
  },
  resetTask: function (){
    titleTask.value = '';
    dateTask.value = '';
    tagsTask.value = '';
    descTask.value = '';
  },
  suggestTags: function () {
    const tagSuggest = $('.tags-box');
    const newElement = document.createElement("datalist");
    const htmls = user.tags.map((tag => {
      return `
      <option value=${tag}>
      `;
    }));
    newElement.id = "suggestions";
    newElement.innerHTML = htmls.join('');
    tagSuggest.appendChild(newElement);
    console.log(newElement);
  },
  hangleEvent: function () {
    const _this = this;
    // setting button (open close)
    settingBtn.addEventListener('click',function(){
      settingModal.style.display = "block";
    })
    settingClose.addEventListener('click', function(){
      settingModal.style.display = "none";
    })
    $('.setting__modal').addEventListener('click',function(e){
      if (e.target.classList == 'setting__modal') {
        settingModal.style.display = "none";
      }
    })
    // profile button (open,close)
    profileBtn.addEventListener('click',function(){
      profileModal.style.display = "block";
      treeAmount.innerHTML = user.trees;
    })
    profileClose.addEventListener('click', function(){
      profileModal.style.display = "none";
    })
    $('.profile__modal').addEventListener('click',function(e){
      if (e.target.classList == 'profile__modal') {
        profileModal.style.display = "none";
      }
    })
    // event done-all button
    $('.done-all').addEventListener('click',function(){
      user.tasksDone = user.tasksDone.concat(_this.tasks);
      _this.tasks = [];
      user.tasksStore = [];
      _this.renderTasks();
    })
    // event delete-all button
    $('.delete-all').addEventListener('click',function(){
      _this.tasks = [];
      user.tasksStore = [];
      _this.renderTasks();
    })

    // when click "add task" button
    addTaskBtn.addEventListener('click',function(){
      taskModal.style.display = "block";
      deleteBtn.style.display = "none";
      $('.modal-name').innerHTML = "Add Task";      
      _this.isEdit = false;
      _this.resetTask();
    })
    closeTaskBtn.addEventListener('click', function(){
      taskModal.style.display = "none";
    })
    deleteBtn.addEventListener('click', function(){
      _this.deleteTask(deleteBtn.id);
      _this.renderTasks();
      taskModal.style.display = "none";
    })
    cancelBtn.addEventListener('click', function(){
      taskModal.style.display = "none";
    })
    saveBtn.addEventListener('click', function(){
      taskModal.style.display = "none";
      _this.tasks.push(_this.addTask());
      user.tasksStore = _this.tasks;
      _this.renderTasks();
    })
    
    // when click option to select all in tasks box
    let isOptionOpen = false;
    optionAllBox.addEventListener('click',function(e){
      if (e.target.classList == "btn-all-option"){
        $('.options-box').classList.toggle('block');
        isOptionOpen = true;
      } 
      else if (e.target.parentNode.classList == "btn-all-option"){
        $('.options-box').classList.toggle('block');
        isOptionOpen = true
      }
    })
    $('body').addEventListener('click',function(e) {
      if (e.target.classList != "btn-all-option" && isOptionOpen){
        $('.options-box').classList.remove('block');
        isOptionOpen = false
      }
      if (e.target.parentNode.classList == "btn-all-option"){
        $('.options-box').classList.add('block');
      }
    })
    taskModal.addEventListener('click',function(e){
      if (e.target.classList == 'task__modal') {
        taskModal.style.display = "none";
      }
    })
  },
  start: function () {
    this.hangleEvent();
    this.renderTasks();
    this.suggestTags();
  }
};
app.start();