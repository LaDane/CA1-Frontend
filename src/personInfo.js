var personInfoDiv = null;
var personInfoForm = null;
var displayedPersonDiv = null;

export function personInfoStart() {
    personInfoDiv = document.getElementById("person-info-div");
    personInfoForm = document.getElementById("person-info-form");

    addEventHandlers();
}

function addEventHandlers() {
    document.getElementById("person-info-id-button").addEventListener("click", function (event) {
        event.preventDefault();
        displayPersonId();
    });

    document.getElementById("person-info-phone-button").addEventListener("click", function (event) {
        event.preventDefault();
        displayPersonNumber();
    });
}

function displayPersonId() {
    let id = document.getElementById("person-info-input").value;
    fetch(`https://alekw.dk/ca1/api/person/${id}`)
        .then((result) => result.json())
        .then((data) => {
            displayPerson(data);
        });
}

function displayPersonNumber() {
    let number = document.getElementById("person-info-input").value;
    fetch(`https://alekw.dk/ca1/api/person/phone/${number}`)
        .then((result) => result.json())
        .then((data) => {
            displayPerson(data);
        });
}

function displayError(msg) {
    if (displayedPersonDiv != null) {
        displayedPersonDiv.remove();
    }

    displayedPersonDiv = document.createElement("div");
    personInfoDiv.appendChild(displayedPersonDiv);

    let p = document.createElement("p");
    p.innerHTML = msg;
    p.style.color = "red";
    displayedPersonDiv.appendChild(p);
}

export function displayPerson(data) {
    if (data.code == 404) {
        displayError(data.message);
        return;
    }

    if (displayedPersonDiv != null) {
        displayedPersonDiv.remove();
    }

    displayedPersonDiv = document.createElement("div");
    personInfoDiv.appendChild(displayedPersonDiv);

    let p = document.createElement("p");
    p.innerHTML = `<b>Person ID:</b>        ${data.id}<br>`;
    p.innerHTML += `<b>Email:</b>           ${data.email}<br>`;
    p.innerHTML += `<b>First Name:</b>      ${data.firstName}<br>`;
    p.innerHTML += `<b>Last Name:</b>       ${data.lastName}<br><br>`;
    p.innerHTML += `<b>Address ID:</b>      ${data["addressDTO"]["id"]}<br>`;
    p.innerHTML += `<b>Street:</b>          ${data["addressDTO"]["street"]}<br>`;
    p.innerHTML += `<b>Addition Info:</b>   ${data["addressDTO"]["additionalInfo"]}<br><br>`;
    p.innerHTML += `<b>City Info ID:</b>    ${data["addressDTO"]["cityInfoDTO"]["id"]}<br>`;
    p.innerHTML += `<b>Zip code:</b>        ${data["addressDTO"]["cityInfoDTO"]["zipCode"]}<br>`;
    p.innerHTML += `<b>City:</b>            ${data["addressDTO"]["cityInfoDTO"]["city"]}<br><br>`;

    for (var i = 0; i < data["phoneList"].length; i++) {
        p.innerHTML += `<b>Phone ${i + 1} ID:</b>              ${data["phoneList"][i]["id"]}<br>`;
        p.innerHTML += `<b>Phone ${i + 1} Number:</b>          ${data["phoneList"][i]["number"]}<br>`;
        p.innerHTML += `<b>Phone ${i + 1} Description:</b>     ${data["phoneList"][i]["description"]}<br><br>`;
    }

    for (var i = 0; i < data["hobbyDTOList"].length; i++) {
        p.innerHTML += `<b>Hobby ${i + 1} ID:</b>              ${data["hobbyDTOList"][i]["id"]}<br>`;
        p.innerHTML += `<b>Hobby ${i + 1} Name:</b>            ${data["hobbyDTOList"][i]["name"]}<br>`;
        p.innerHTML += `<b>Hobby ${i + 1} Description:</b>     ${data["hobbyDTOList"][i]["description"]}<br><br>`;
    }

    displayedPersonDiv.appendChild(p);
}
