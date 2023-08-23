// @ts-nocheck
function searchTable() {
  var input = document.getElementById("searchInput");
  var filter = input.value.toUpperCase();
  var table = document.getElementById("maintable");
  var tr = table.getElementsByTagName("tr");
  for (var i = 1; i < tr.length; i++) {
    var td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      var txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      }
      else {
        tr[i].style.display = "none";
      }
    }
  }
}
var task = [];
function addrow() {
  var inputElement = document.getElementById("inputBox").value.split(" ").join("").toUpperCase();
  if (inputElement.length >= 1) {
    if (!task.includes(inputElement)) {
      task.push(inputElement);
      var table = document.getElementById("maintable");
      var row1 = document.getElementById("row1");
      var newRow = table.insertRow(row1.rowIndex + 1);
      var cell1 = newRow.insertCell(0);
      cell1.innerHTML = '<input onchange="updateclick(this)" type="checkbox" class="checkbox" >';
      var cell2 = newRow.insertCell(1);
      cell2.innerHTML = document.getElementById("inputBox").value;
      var taskTextElement = cell2.innerHTML;
      var cell3 = newRow.insertCell(2);
      var status_1 = '<select  name="status" onchange="updateRow(this)"><option >Incomplete</option><option >Inprogress</option><option >Completed</option></select>';
      cell3.innerHTML = status_1;
      var cell4 = newRow.insertCell(3);
      cell4.innerHTML = "<button onclick='delete_row(this)'><i class='fa-solid fa-trash'></i></button>";
    }
  }
}
function delete_row(r) {
  var input = document.getElementById("inputBox").value.split(" ").join("");
  var i = r.parentNode.parentNode.rowIndex;
  document.getElementById("maintable").deleteRow(i);
  task = task.filter(function (val) {
    if (val !== input) {
    }
    else {
      return val;
    }
  });
}
function updateRow(selectElement) {
  var row = selectElement.parentNode.parentNode;
  var statusValue = selectElement.value;
  var taskCell = row.cells[1];
  var checkboxCell = row.cells[0];
  if (statusValue === "Completed") {
    taskCell.innerHTML = "<del>" + taskCell.textContent + "</del>";
    checkboxCell.firstChild.checked = true;
  }
  else {
    taskCell.innerHTML = taskCell.textContent;
    checkboxCell.firstChild.checked = false;
  }
}
function updateclick(selectElement) {
  var row = selectElement.parentNode.parentNode;
  var taskCell = row.cells[1];
  var statusCell = row.cells[2];
  if (selectElement.checked) {
    taskCell.style.textDecoration = "line-through";
    statusCell.innerHTML =
      '<select  name="status" onchange="updateRow(this)"><option >Complete</option><option >Inprogress</option><option >Incompleted</option></select>';
  }
  else {
    taskCell.style.textDecoration = "none";
    statusCell.innerHTML =
      '<select  name="status" onchange="updateRow(this)"><option >Incomplete</option><option >Inprogress</option><option >Completed</option></select>';
  }
}
