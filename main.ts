// @ts-nocheck
function searchTable() {
    const input = document.getElementById("searchInput") as HTMLInputElement;
    const filter = input.value.toUpperCase();
    const table = document.getElementById("maintable") as HTMLTableElement;
    const tr = table.getElementsByTagName("tr");
    for (let i = 1; i < tr.length; i++) {
        const td = tr[i].getElementsByTagName("td")[1]; 
        if (td) {
            const txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

const task: string[] = [];
function addrow() {
    const inputElement = (document.getElementById("inputBox") as HTMLInputElement).value.split(" ").join("").toUpperCase();
    if (inputElement.length >= 1) {
        if (!task.includes(inputElement)) {
            task.push(inputElement);
            const table = document.getElementById("maintable") as HTMLTableElement;
            const row1 = document.getElementById("row1") as HTMLTableRowElement;
            const newRow = table.insertRow(row1.rowIndex + 1);
            const cell1 = newRow.insertCell(0);
            cell1.innerHTML = '<input onchange="updateclick(this)" type="checkbox" class="checkbox" >';
            const cell2 = newRow.insertCell(1);
            cell2.innerHTML = (document.getElementById("inputBox") as HTMLInputElement).value;
            let taskTextElement = cell2.innerHTML;
            const cell3 = newRow.insertCell(2);
            const status =
                '<select  name="status" onchange="updateRow(this)"><option >Incomplete</option><option >Inprogress</option><option >Completed</option></select>';
            cell3.innerHTML = status;
            const cell4 = newRow.insertCell(3);
            cell4.innerHTML = "<button onclick='delete_row(this)'><i class='fa-solid fa-trash'></i></button>";
        }
    }
}

function delete_row(r: HTMLElement) {
    const input = (document.getElementById("inputBox") as HTMLInputElement).value.split(" ").join("");
    const i = r.parentNode.parentNode.rowIndex;
    (document.getElementById("maintable") as HTMLTableElement).deleteRow(i);
    task = task.filter(function (val) {
        if (val !== input) {
        } else {
            return val;
        }
    });
}

function updateRow(selectElement: HTMLSelectElement) {
    const row = selectElement.parentNode.parentNode as HTMLTableRowElement;
    const statusValue = selectElement.value;
    const taskCell = row.cells[1];
    const checkboxCell = row.cells[0];
    if (statusValue === "Completed") {
        taskCell.innerHTML = "<del>" + taskCell.textContent + "</del>";
        (checkboxCell.firstChild as HTMLInputElement).checked = true;
    } else {
        taskCell.innerHTML = taskCell.textContent;
        (checkboxCell.firstChild as HTMLInputElement).checked = false;
    }
}

function updateclick(selectElement: HTMLInputElement) {
    const row = selectElement.parentNode.parentNode as HTMLTableRowElement;
    const taskCell = row.cells[1];
    const statusCell = row.cells[2];
    if (selectElement.checked) {
        taskCell.style.textDecoration = "line-through";
        statusCell.innerHTML =
            '<select  name="status" onchange="updateRow(this)"><option >Complete</option><option >Inprogress</option><option >Incompleted</option></select>';
    } else {
        taskCell.style.textDecoration = "none";
        statusCell.innerHTML =
            '<select  name="status" onchange="updateRow(this)"><option >Incomplete</option><option >Inprogress</option><option >Completed</option></select>';
    }
}
