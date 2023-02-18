document.getElementById("submit_btn").addEventListener("click", submit);
var student_list = [];
var first_table_row = 0;
var student_object_container = [];
//to generate header from our object one time
var counter_table_header = 0;
var counter_prevent_number=0;

//to prevent input type [a-z] for nationcode & studentcode & phonenumber
function prevent_letter(){
  if(event.which>=65&&event.which<=90)
      event.preventDefault();
}
//to prevent input type [0-9] for firstname & lastname & subject
function prevent_number(){
    if(event.keyCode>= 48 && event.keyCode<=57)
        event.preventDefault();
        else if (event.keyCode >= 96 && event.keyCode <= 105)
         event.preventDefault();
    if(counter_prevent_number==6)
        document.getElementsByTagName("input")[0].disabled=false;
        document.getElementsByTagName("input")[1].disabled=false;

 }
 //create an object the user information (input)
function students(fname,lname,subject,nationCode,studentCode,birthDate,phoneNum,totalItem,passedItem,gender,Degree)
{
  this.نام = fname;
  this["نام خانوادگی"] = lname;
  this["رشته تحصیلی"] = subject;
  this["کد ملی"] = nationCode;
  this["شماره دانشجویی"] = studentCode;
  this["تاریخ تولد"] = birthDate;
  this["شماره تماس"] = phoneNum;
  this["واحدهای اخذ شده"] = totalItem;
  this["واحدهای پاس شده"] = passedItem;
  this.جنسیت = gender;
  this.مدرک = Degree;
}
//to gather all info that user entered after pressing submit_btn
function submit() {

  //create a new object from object constructor
  let student = new students(
    (fname = document.getElementById("fname").value),
    (lname = document.getElementById("lname").value),
    (subject = document.getElementById("subject").value),
    (nationCode = document.getElementById("nationCode").value),
    (studentCode = document.getElementById("studentCode").value),
    (birthDate = document.getElementById("birthDate").value),
    (phoneNum = document.getElementById("phoneNum").value),
    (totalItem = document.getElementById("totalItem").value),
    (passedItem = document.getElementById("passedItem").value),
    (gender = document.getElementById("Gender").value),
    (Degree = document.getElementById("Degree").value)
  );
  //push new student info to an array
  student_object_container.push(student);

  //to reset form after pressing submit_btn
  document.getElementById("myForm").reset();
}
//show result table after pressing showrable_btn
function showTable() {
  document.getElementById("studentTable").style.display = "block";

//generate table header in html page
  function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
      let th = document.createElement("th");
      let text = document.createTextNode(key);
      th.appendChild(text);
      row.appendChild(th);
    }
  }

//generate table in html page
  function generateTable(table, data) {
    for (let element of data) {
      let row = table.insertRow();
      for (key in element) {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
      }
    }
  }
  let table = document.querySelector("table");

  //to split student info that not shown in the table yet
  var student_show_in_table = [];
  for (var index = first_table_row; index < student_object_container.length; index++) {
    student_show_in_table.push(student_object_container[index]);
  }
  first_table_row = student_object_container.length;
  //for create table header one time in html
  if (counter_table_header == 0) {
    let data = Object.keys(student_object_container[0]);
    generateTableHead(table, data);
    counter_table_header = 1;
  }
  generateTable(table, student_show_in_table);
}
