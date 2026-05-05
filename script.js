// script.js

const screens =
  document.querySelectorAll(".screen");

function showScreen(id){

  screens.forEach(screen=>{
    screen.classList.remove("active");
  });

  document
    .getElementById(id)
    .classList.add("active");
}

function showToast(message,type){

  const toast =
    document.getElementById("toast");

  toast.innerText = message;

  if(type === "error"){
    toast.style.background = "#ef4444";
  }else{
    toast.style.background = "#16a34a";
  }

  toast.style.display = "block";

  setTimeout(()=>{
    toast.style.display = "none";
  },2500);
}

function showSuccess(message){
  showToast(message,"success");
}

function showError(message){
  showToast(message,"error");
}

function createAccount(){

  const name =
    document.getElementById("signupName").value;

  const studentId =
    document.getElementById("signupStudentId").value;

  const email =
    document.getElementById("signupEmail").value;

  const phone =
    document.getElementById("signupPhone").value;

  const password =
    document.getElementById("signupPassword").value;

  if(
    !name ||
    !studentId ||
    !email ||
    !phone ||
    !password
  ){
    showError(
      "Please complete all required fields."
    );
    return;
  }

  const user = {
    name,
    studentId,
    email,
    phone,
    password
  };

  localStorage.setItem(
    "campusfind_user",
    JSON.stringify(user)
  );

  showSuccess(
    "Account created successfully!"
  );

  showScreen("loginScreen");
}

function login(){

  const email =
    document.getElementById("loginEmail").value;

  const password =
    document.getElementById("loginPassword").value;

  const user =
    JSON.parse(
      localStorage.getItem(
        "campusfind_user"
      )
    );

  if(!user){
    showError("No account found.");
    return;
  }

  if(
    (
      email === user.email ||
      email === user.studentId
    )
    &&
    password === user.password
  ){

    document
      .getElementById("welcomeName")
      .innerText =
      user.name;

    document
      .getElementById("profileName")
      .innerText =
      user.name;

    document
      .getElementById("profileId")
      .innerText =
      "ID: " + user.studentId;

    document
      .getElementById("profileFullName")
      .innerText =
      user.name;

    document
      .getElementById("profileEmail")
      .innerText =
      user.email;

    document
      .getElementById("profilePhone")
      .innerText =
      user.phone;

    showSuccess("Login successful!");

    showScreen("homeScreen");

  }else{

    showError("Invalid credentials.");

  }
}

function logout(){

  showSuccess("Logged out successfully.");

  showScreen("loginScreen");
}

const items = [

  {
    name:"iPhone 13",
    category:"Electronics",
    location:"Library",
    date:"May 5",
    description:"Lost near study hall.",
    finder:"John Doe",
    status:"LOST",
    color:"#3b82f6"
  },

  {
    name:"Student ID",
    category:"ID/Documents",
    location:"Registrar",
    date:"May 2",
    description:"Found outside office.",
    finder:"Mary Jane",
    status:"FOUND",
    color:"#1d4ed8"
  },

  {
    name:"Keys",
    category:"Keys",
    location:"Gym",
    date:"Apr 29",
    description:"Found near lockers.",
    finder:"Mike Ross",
    status:"FOUND",
    color:"#f59e0b"
  }

];

function renderItems(){

  const recentFeed =
    document.getElementById("recentFeed");

  const browseList =
    document.getElementById("browseList");

  recentFeed.innerHTML = "";
  browseList.innerHTML = "";

  items.forEach((item,index)=>{

    const statusClass =
      item.status === "LOST"
      ? "lost"
      : "found";

    const card = `

      <div class="item-card"
           onclick="openDetail(${index})">

        <div class="item-top">

          <div class="item-image"
               style="background:${item.color}">
          </div>

          <div class="item-info">

            <h4>${item.name}</h4>

            <p>${item.category}</p>

            <p>${item.location}</p>

            <p>${item.date}</p>

            <span class="status ${statusClass}">
              ${item.status}
            </span>

          </div>

        </div>

      </div>

    `;

    recentFeed.innerHTML += card;

    browseList.innerHTML += card;

  });

}

function submitLostItem(){

  const name =
    document.getElementById("lostName").value;

  const location =
    document.getElementById("lostLocation").value;

  const description =
    document.getElementById("lostDescription").value;

  if(
    !name ||
    !location ||
    !description
  ){
    showError(
      "Complete all required fields."
    );
    return;
  }

  showSuccess(
    "Lost item submitted successfully!"
  );

  showScreen("homeScreen");
}

function submitFoundItem(){

  const name =
    document.getElementById("foundName").value;

  const location =
    document.getElementById("foundLocation").value;

  const description =
    document.getElementById("foundDescription").value;

  if(
    !name ||
    !location ||
    !description
  ){
    showError(
      "Complete all required fields."
    );
    return;
  }

  showSuccess(
    "Found item submitted successfully!"
  );

  showScreen("homeScreen");
}

function filterItems(){

  const value =
    document
      .getElementById("searchInput")
      .value
      .toLowerCase();

  const cards =
    document.querySelectorAll(".item-card");

  cards.forEach(card=>{

    if(
      card.innerText
      .toLowerCase()
      .includes(value)
    ){
      card.style.display = "block";
    }else{
      card.style.display = "none";
    }

  });

}

function openDetail(index){

  const item = items[index];

  document
    .getElementById("detailContent")
    .innerHTML = `

      <div class="item-image"
           style="
             background:${item.color};
             width:100%;
             height:180px;
             border-radius:24px;
             margin-bottom:20px;
           ">
      </div>

      <h2>${item.name}</h2>

      <br>

      <p><strong>Category:</strong>
      ${item.category}</p>

      <p><strong>Date:</strong>
      ${item.date}</p>

      <p><strong>Location:</strong>
      ${item.location}</p>

      <p><strong>Description:</strong>
      ${item.description}</p>

      <p><strong>Finder:</strong>
      ${item.finder}</p>

      <br>
  `;

  showScreen("detailScreen");
}

function loadNotifications(){

  const notifications = [

    {
      text:"Potential match for Black Wallet",
      time:"2h ago",
      color:"#16a34a"
    },

    {
      text:"iPhone found near Library",
      time:"5h ago",
      color:"#2563eb"
    },

    {
      text:"Claim approved successfully",
      time:"1d ago",
      color:"#f59e0b"
    }

  ];

  const list =
    document.getElementById(
      "notificationList"
    );

  list.innerHTML = "";

  notifications.forEach(note=>{

    list.innerHTML += `

      <div class="notification-card">

        <div style="
          width:45px;
          height:45px;
          border-radius:14px;
          background:${note.color};
          margin-bottom:10px;
        ">
        </div>

        <h4>${note.text}</h4>

        <p style="
          color:#666;
          margin-top:5px;
          font-size:12px;
        ">
          ${note.time}
        </p>

      </div>

    `;

  });

}

renderItems();

loadNotifications();
