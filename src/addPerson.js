// document.body.onload = startup;
import { hideAllShowOne } from "./index.js";
import { displayPerson } from "./personInfo.js";

let phonesAdded = 1;
let hobbiesAdded = 0;

export function addPersonStart() {
    addEventHandlers();
    fetchHobbies();
}

function addEventHandlers() {
    document.getElementById("add-phone-button").addEventListener("click", function (event) {
        event.preventDefault();
        addAnotherPhone();
    });

    document.getElementById("add-person-button").addEventListener("click", function (event) {
        event.preventDefault();
        submitPerson();
    });
}

function addAnotherPhone() {
    phonesAdded++;
    let addPhoneDiv = document.getElementById("add-phone-div");

    // Number
    let phoneDiv = document.createElement("div");
    phoneDiv.setAttribute("class", "form-group row phone-div");
    addPhoneDiv.appendChild(phoneDiv);

    let phoneLabel = document.createElement("label");
    phoneLabel.setAttribute("for", `inputPhoneNumber${phonesAdded}`);
    phoneLabel.setAttribute("class", "col-sm-2 col-form-label");
    phoneLabel.textContent = `Phone Number ${phonesAdded}`;
    phoneDiv.appendChild(phoneLabel);

    let innerDiv = document.createElement("div");
    innerDiv.setAttribute("class", "col-sm-4");
    phoneDiv.appendChild(innerDiv);

    let phoneInput = document.createElement("input");
    phoneInput.setAttribute("type", "text");
    phoneInput.setAttribute("class", "form-control");
    phoneInput.setAttribute("id", `inputPhoneNumber${phonesAdded}`);
    phoneInput.setAttribute("placeholder", "Phone Number");
    innerDiv.appendChild(phoneInput);

    // Description
    let descDiv = document.createElement("div");
    descDiv.setAttribute("class", "form-group row phone-div");
    addPhoneDiv.appendChild(descDiv);

    let descLabel = document.createElement("label");
    descLabel.setAttribute("for", `inputPhoneDescription${phonesAdded}`);
    descLabel.setAttribute("class", "col-sm-2 col-form-label");
    descLabel.textContent = `Phone Description ${phonesAdded}`;
    descDiv.appendChild(descLabel);

    let innerDescDiv = document.createElement("div");
    innerDescDiv.setAttribute("class", "col-sm-4");
    descDiv.appendChild(innerDescDiv);

    let descInput = document.createElement("input");
    descInput.setAttribute("type", "text");
    descInput.setAttribute("class", "form-control");
    descInput.setAttribute("id", `inputPhoneDescription${phonesAdded}`);
    descInput.setAttribute("placeholder", "Phone Description");
    innerDescDiv.appendChild(descInput);
}

function fetchHobbies() {
    fetch("https://alekw.dk/ca1/api/hobby")
        .then((result) => result.json())
        .then((data) => {
            loopHobbies(data);
        });
}

function loopHobbies(data) {
    for (var i = 0; i < data.length; i++) {
        addHobbyCheckbox(data[i]);
    }
}

function addHobbyCheckbox(obj) {
    hobbiesAdded++;
    let addHobbyDiv = document.getElementById("add-hobby-div");

    let hDiv = document.createElement("div");
    hDiv.setAttribute("class", "form-check");
    addHobbyDiv.appendChild(hDiv);

    let hLabel = document.createElement("label");
    hLabel.setAttribute("class", "form-check-label");
    hLabel.setAttribute("for", `hobbyCheckId${obj.id}`);
    hLabel.innerHTML = `<b>${obj.name}</b> - ${obj.description}`;
    hDiv.appendChild(hLabel);

    let hInput = document.createElement("input");
    hInput.setAttribute("class", "form-check-input hobby-check-box");
    hInput.setAttribute("type", "checkbox");
    hInput.setAttribute("value", "");
    hInput.setAttribute("id", `hobbyCheckId${obj.id}`);
    hInput.setAttribute("hobbyId", `${obj.id}`);
    hDiv.appendChild(hInput);
}

function submitPerson() {
    let email = document.getElementById("inputEmail").value;
    let fName = document.getElementById("inputFirstName").value;
    let lName = document.getElementById("inputLastName").value;
    let street = document.getElementById("inputStreet").value;
    let addInfo = document.getElementById("inputAdditionalInfo").value;
    let zipCode = document.getElementById("inputZipCode").value;
    let city = document.getElementById("inputCity").value;

    let phoneArray = [];
    let phoneId = 1;
    while (document.getElementById(`inputPhoneNumber${phoneId}`) != null) {
        let p = {
            number: document.getElementById(`inputPhoneNumber${phoneId}`).value,
            description: document.getElementById(`inputPhoneDescription${phoneId}`).value,
        };
        phoneArray.push(p);
        phoneId++;
    }

    let hobbyArray = [];
    let hobbies = document.getElementsByClassName("hobby-check-box");
    for (var i = 0; i < hobbies.length; i++) {
        if (hobbies[i].checked) {
            let h = {
                id: hobbies[i].getAttribute("hobbyId"),
            };
            hobbyArray.push(h);
        }
    }

    let postBody = {
        email: email,
        firstName: fName,
        lastName: lName,
        addressDTO: {
            street: street,
            additionalInfo: addInfo,
            cityInfoDTO: {
                zipCode: zipCode,
                city: city,
            },
        },
        phoneList: phoneArray,
        hobbyDTOList: hobbyArray,
    };

    fetch("https://alekw.dk/ca1/api/person/", {
        method: "post",
        body: JSON.stringify(postBody),
        headers: { "Content-Type": "application/json" },
    })
        .then((result) => result.json())
        .then((data) => {
            resetFields();
            hideAllShowOne("personInfo_html");
            displayPerson(data);
        });
}

function resetFields() {
    document.getElementById("inputEmail").value = "";
    document.getElementById("inputFirstName").value = "";
    document.getElementById("inputLastName").value = "";
    document.getElementById("inputStreet").value = "";
    document.getElementById("inputAdditionalInfo").value = "";
    document.getElementById("inputZipCode").value = "";
    document.getElementById("inputCity").value = "";
    document.getElementById(`inputPhoneNumber1`).value = "";
    document.getElementById(`inputPhoneDescription1`).value = "";

    let phones = document.getElementsByClassName("phone-div");
    for (var i = 0; i < phones.length; i++) {
        phones[i].remove();
    }

    let hobbies = document.getElementsByClassName("hobby-check-box");
    for (var i = 0; i < hobbies.length; i++) {
        if (hobbies[i].checked) {
            hobbies[i].checked = false;
        }
    }
}
