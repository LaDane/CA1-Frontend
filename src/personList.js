var personListDiv = null;
var personListForm = null;
var displayedPersonsDiv = null;

export function personListStart() {
    personListDiv = document.getElementById("person-list-div");
    personListForm = document.getElementById("person-list-form");

    addEventHandlers();
}

function addEventHandlers() {
    document.getElementById("person-list-hobby-button").addEventListener("click", function (event) {
        event.preventDefault();
        displayPersonsHobby();
    });

    document.getElementById("person-list-zipcode-button").addEventListener("click", function (event) {
        event.preventDefault();
        displayPersonsZipCode();
    });
}

function displayPersonsHobby() {
    let hobbyId = document.getElementById("person-list-input").value;
    fetch(`https://alekw.dk/ca1/api/person/hobby/${hobbyId}`)
        .then((result) => result.json())
        .then((data) => {
            displayPersons(data);
        });
}

function displayPersonsZipCode() {
    let zipCode = document.getElementById("person-list-input").value;
    fetch(`https://alekw.dk/ca1/api/person/zipcode/${zipCode}`)
        .then((result) => result.json())
        .then((data) => {
            displayPersons(data);
        });
}

function displayError(msg) {
    if (displayedPersonsDiv != null) {
        displayedPersonsDiv.remove();
    }

    displayedPersonsDiv = document.createElement("div");
    personListDiv.appendChild(displayedPersonsDiv);

    let p = document.createElement("p");
    p.innerHTML = msg;
    p.style.color = "red";
    displayedPersonsDiv.appendChild(p);
}

function displayPersons(data) {
    if (data.code == 404) {
        displayError(data.message);
        return;
    }

    if (displayedPersonsDiv != null) {
        displayedPersonsDiv.remove();
    }

    displayedPersonsDiv = document.createElement("div");
    personListDiv.appendChild(displayedPersonsDiv);

    let table = document.createElement("table");
    table.setAttribute("class", "table table-striped");
    displayedPersonsDiv.appendChild(table);

    let tHead = document.createElement("thead");
    table.appendChild(tHead);

    let tr1 = document.createElement("tr");
    tHead.appendChild(tr1);

    let hth1 = document.createElement("th");
    hth1.setAttribute("scope", "col");
    hth1.innerHTML = "ID";
    tr1.appendChild(hth1);

    let hthE = document.createElement("th");
    hthE.setAttribute("scope", "col");
    hthE.innerHTML = "Email";
    tr1.appendChild(hthE);

    let hth2 = document.createElement("th");
    hth2.setAttribute("scope", "col");
    hth2.innerHTML = "First Name";
    tr1.appendChild(hth2);

    let hth3 = document.createElement("th");
    hth3.setAttribute("scope", "col");
    hth3.innerHTML = "Last Name";
    tr1.appendChild(hth3);

    let hth4 = document.createElement("th");
    hth4.setAttribute("scope", "col");
    hth4.innerHTML = "Street";
    tr1.appendChild(hth4);

    let hth5 = document.createElement("th");
    hth5.setAttribute("scope", "col");
    hth5.innerHTML = "Add Info";
    tr1.appendChild(hth5);

    let hth6 = document.createElement("th");
    hth6.setAttribute("scope", "col");
    hth6.innerHTML = "Zipcode";
    tr1.appendChild(hth6);

    let hth7 = document.createElement("th");
    hth7.setAttribute("scope", "col");
    hth7.innerHTML = "City";
    tr1.appendChild(hth7);

    let tBody = document.createElement("tbody");
    table.appendChild(tBody);

    for (var i = 0; i < data.length; i++) {
        let tr2 = document.createElement("tr");
        tBody.appendChild(tr2);

        let th1 = document.createElement("th");
        th1.setAttribute("scope", "row");
        th1.innerHTML = data[i]["id"];
        tr2.appendChild(th1);


        let th2 = document.createElement("th");
        th2.innerHTML = data[i]["email"];
        tr2.appendChild(th2);

        let th3 = document.createElement("th");
        th3.innerHTML = data[i]["firstName"];
        tr2.appendChild(th3);

        let th4 = document.createElement("th");
        th4.innerHTML = data[i]["lastName"];
        tr2.appendChild(th4);

        let th5 = document.createElement("th");
        th5.innerHTML = data[i]["addressDTO"]["street"];
        tr2.appendChild(th5);

        let th6 = document.createElement("th");
        th6.innerHTML = data[i]["addressDTO"]["additionalInfo"];
        tr2.appendChild(th6);

        let th7 = document.createElement("th");
        th7.innerHTML = data[i]["addressDTO"]["cityInfoDTO"]["zipCode"];
        tr2.appendChild(th7);

        let th8 = document.createElement("th");
        th8.innerHTML = data[i]["addressDTO"]["cityInfoDTO"]["city"];
        tr2.appendChild(th8);
    }
}

{/* <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr> */}