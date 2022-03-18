import "./style.css";
import "bootstrap/dist/css/bootstrap.css";
import * as bootstrap from "bootstrap";
import "@popperjs/core";

import { addPersonStart } from "./addPerson.js";
import { personInfoStart } from "./personInfo.js";
import { personListStart } from "./personList.js";

addPersonStart();
personInfoStart();
personListStart();

document.getElementById("all-content").style.display = "block";

export function hideAllShowOne(idToShow) {
    document.getElementById("about_html").style = "display:none";
    document.getElementById("addPerson_html").style = "display:none";
    document.getElementById("personInfo_html").style = "display:none";
    document.getElementById("personList_html").style = "display:none";
    document.getElementById(idToShow).style = "display:block";
}

function menuItemClicked(evt) {
    const id = evt.target.id;
    switch (id) {
        case "addPerson":
            hideAllShowOne("addPerson_html");
            break;
        case "personInfo":
            hideAllShowOne("personInfo_html");
            break;
        case "personList":
            hideAllShowOne("personList_html");
            break;
        default:
            hideAllShowOne("about_html");
            break;
    }
    evt.preventDefault();
}
document.getElementById("menu").onclick = menuItemClicked;
hideAllShowOne("about_html");
