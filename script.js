let userdetails = [];

let d = new Date();
d.setDate(d.getDate() - 1);
document.getElementById("birthdate").max = d.toISOString().split('T')[0];

const genderVal = () => {
    let radioBtn = document.getElementsByName("gender");
    let selected = Array.from(radioBtn).find(radio => radio.checked);
    location.reload();
    return selected.value;
}

function getItem() {
    if (localStorage.getItem("crud") == null) {
        userdetails = [];
    } else {
        userdetails = JSON.parse(localStorage.getItem('crud'));
    }
}

let uemail = [];
function emailchecking(vemail){
    if (localStorage.getItem("crud") == null) {
        userdetails = [];
    } else {
        userdetails = JSON.parse(localStorage.getItem('crud'));
    }

    for (let i = 0; i < userdetails.length;i++){
        uemail.push(userdetails[i].email);
    }
    let ans = uemail.includes(vemail);
    
    if(ans){
        alert("data not added due to duplication of email")
    }
    return ans;     
}

function setRadiobtn(gender) {
    document.getElementById(gender).checked = true;
}


let mainform = document.getElementById("mainform");
mainform.addEventListener("submit", (e) => {
    e.preventDefault();
})

function showData() {

    getItem()

    for (let i = 0; i < userdetails.length; i++) {
        document.getElementById("employeeList").innerHTML +=
            `<tr>
            <td>${i + 1}</td>
            <td>${userdetails[i].firstname}</td>
            <td>${userdetails[i].lastname}</td>
            <td>${userdetails[i].email}</td>
            <td>${userdetails[i].address}</td>
            <td>${userdetails[i].phone}</td>
            <td>${userdetails[i].gender}</td>
            <td>${userdetails[i].birthdate}</td>
            <td>
                <button class="btn btn-success" onclick="editData(${i})"  data-bs-dismiss="modal" data-bs-target="#DataForm" data-bs-toggle="modal">Edit</button>
                <button class="btn btn-danger btn-sm delete" onclick="deleteData(${i})">Delete</button>
            </td>
        </tr>`
    }
}
document.onload = showData();

function manageData() {

    getItem()

    if(!validateData()){
        return false;
    }

    let firstname = document.getElementById("firstname");
    let lastname = document.getElementById("lastname");
    let email = document.getElementById("email");
    let address = document.getElementById("address");
    let phone=document.getElementById("phone");
    let gender = genderVal(); 
    let birthdate=document.getElementById("birthdate");   
    let emailValue = document.getElementById("email").value;
    
    if(emailchecking(emailValue)){
        return false;
    } 

    let data = {
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        address: address.value,
        phone: phone.value,
        gender: gender,
        birthdate: birthdate.value
    };
    userdetails.push(data);
    // console.log(details);

    localStorage.setItem('crud', JSON.stringify(userdetails));

    showData()

    firstname.value = "";
    lastname.value = "";
    email.value = "";
    address.value = "";
    phone.value = "";
    gender.value="";
    birthdate.value = "";

    location.reload();
}

function deleteData(index) {

    getItem()

    if (confirm("You can sure to delete this data??") == true) {

        userdetails.splice(index, 1);
        localStorage.setItem('crud', JSON.stringify(userdetails));
        showData();
        location.reload();
    }
}

function editData(index) {

    getItem()

    document.getElementById("firstname").value = userdetails[index].firstname;
    document.getElementById("lastname").value = userdetails[index].lastname;
    document.getElementById("email").value = userdetails[index].email;
    document.getElementById("address").value = userdetails[index].address;
    document.getElementById("phone").value = userdetails[index].phone;
    setRadiobtn(userdetails[index].gender);
    document.getElementById("birthdate").value = userdetails[index].birthdate;

    document.querySelector(".update").onclick = (e) => {
        e.preventDefault();

        if(!validateData()){
            return false;
        }

        userdetails[index].firstname = document.getElementById("firstname").value;
        userdetails[index].lastname = document.getElementById("lastname").value;
        userdetails[index].email = document.getElementById("email").value;
        userdetails[index].address = document.getElementById("address").value;
        userdetails[index].phone = document.getElementById("phone").value;
        userdetails[index].gender = genderVal();
        userdetails[index].birthdate = document.getElementById("birthdate").value;

        localStorage.setItem('crud', JSON.stringify(details));


        showData();

        document.getElementById("firstname").value = "";
        document.getElementById("lastname").value = "";
        document.getElementById("email").value = "";
        document.getElementById("address").value = "";
        document.getElementById("phone").value = "";
        gender.value = "";
        document.getElementById("birthdate").value = "";

        location.reload();
    }
}

function validateData(){

    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let email = document.getElementById("email").value;
    let address = document.getElementById("address").value;
    let phone = document.getElementById("phone").value;
    let gender = document.getElementsByName("gender");
    let date = document.getElementById("birthdate").value;
    
 
    let flag = 1;

    if (firstname == "") {
        document.getElementById("errorN").innerHTML = "Plese Enter Your first Name";
        flag = 0;
    } else if ((firstname.length <= 2) || (firstname.length > 20)) {
        document.getElementById("errorN").innerHTML = "Firstname must be between 2 to 20";
        firstnameInput.focus();
        flag = 0;
    } else if (!isNaN(firstname)) {
        document.getElementById("errorN").innerHTML = "Only characters are allowed.";
        firstnameInput.focus();
        flag = 0;
    } else {
        document.getElementById("errorN").innerHTML = "";
        document.getElementById("errorN").style.display = "none";
    }

    if (lastname == "") {
        document.getElementById("errorL").innerHTML = "Plese Enter Your last Name";
        flag = 0;
    } else if ((lastname.length <= 2) || (lastname.length > 20)) {
        document.getElementById("errorL").innerHTML = "Lastname must be between 2 to 20";
        lastnameInput.focus();
        flag = 0;
    } else if (!isNaN(lastname)) {
        document.getElementById("errorL").innerHTML = "Only characters are allowed.";
        lastnameInput.focus();
        flag = 0;
    } else {
        document.getElementById("errorL").innerHTML = "";
        document.getElementById("errorL").style.display = "none";
    }

    if (email == "") {
        document.getElementById("errorE").innerHTML = "Plese Enter Your Email";
        flag = 0;
    } else if (!(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email))) {
        document.getElementById("errorE").innerHTML = "Enter valid email";
        flag = 0;
    } else {
        document.getElementById("errorE").innerHTML = "";
        document.getElementById("errorE").style.display = "none";
    }

    if (address == "") {
        document.getElementById("errorA").innerHTML = "Plese Enter Your Current Address";
        flag = 0;
    } else {
        document.getElementById("errorA").innerHTML = "";
        document.getElementById("errorA").style.display = "none";
    }

   if(phone==''){
    document.getElementById("phone").innerHTML="please Enter your phone Number";
    flag=0;
   } else {
    document.getElementById("errorP").innerHTML="";
    document.getElementById("errorP").style,display="none";
   }


    if (!(gender[0].checked || gender[1].checked)) {
        document.getElementById("errorG").innerHTML = "select gender";
        flag = 0;
    } else {
        document.getElementById("errorG").style.display = "none";
    }

    if (date == '') {
        document.getElementById("errorD").innerHTML = "Plese select date";
        flag = 0;
    } else {
        document.getElementById("errorD").style.display = "none";
    }

    return flag;
}
