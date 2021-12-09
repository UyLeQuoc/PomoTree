import { printQueriedTasksFromFirebase, printTasksFromFirebase} from './app.js';

flatpickr("input[type=datetime]", {inline: true}).config.onChange.push(function(s, dateStr) {
  printQueriedTasksFromFirebase("date", dateStr);
});
$('.tagHome').addEventListener("click", () => {
  printQueriedTasksFromFirebase("tag", "Home")
});
$('.tagWork').addEventListener("click", () => {
  printQueriedTasksFromFirebase("tag", "Work")
});
$('.tagFreetime').addEventListener("click", () => {
  printQueriedTasksFromFirebase("tag", "Freetime")
});
$('.tagSchool').addEventListener("click", () => {
  printQueriedTasksFromFirebase("tag", "School")
});
$('.done').addEventListener("click", () => {
  printQueriedTasksFromFirebase("isDone", true)
});
$('.notdone').addEventListener("click", () => {
  printQueriedTasksFromFirebase("isDone", false)
});
$('.all').addEventListener("click", () => {
  printTasksFromFirebase()
});
