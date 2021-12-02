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
// profile var
const profileBtn = $('.nav__items .profile')
const profileModal = $('.profile__modal');
const profileClose = $('.profile-close');
// setting var
const settingBtn = $('.nav__items .setting')
const settingModal = $('.setting__modal');
const settingClose = $('.setting-close');

const user = {
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
};


const app = {
  isEdit: false,
  tasks: user.tasksStore,
  renderTasks: function () {
    const htmls = this.tasks.map((task) => {
      const newElement =  `
      <div class="task" data-id-task="${task.id}">
        <div class="btn-check active">
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
        const idEdit = app.tasks.find(task => task.id === Number(taskEdit.getAttribute('data-id-task')))
        console.log(idEdit);
        app.editTask(idEdit);
        taskModal.style.display = "block";
        deleteBtn.style.display = "block";
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
    // profile button (open,close)
    profileBtn.addEventListener('click',function(){
      profileModal.style.display = "block";
    })
    profileClose.addEventListener('click', function(){
      profileModal.style.display = "none";
    })




    // when click "add task" button
    addTaskBtn.addEventListener('click',function(){
      taskModal.style.display = "block";
      deleteBtn.style.display = "none";
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
  },
  start: function () {
    this.hangleEvent();
    this.renderTasks();
    this.suggestTags();
  }
};

app.start();



