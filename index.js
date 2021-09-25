class Requests {

    constructor() {
        this.acceptableResponses = [200, 201];
    }

    GET(url, callback) {
        let http = new XMLHttpRequest();
        http.onreadystatechange = () => {
            // readyState == 4 indicates a state of "Done"
            if (http.readyState === 4 && this.requestWasSuccessful(http)) callback(http.responseText);
        }

        // GET request to the URL w/ async true
        http.open("GET", url, true);
        // Send the request w/ a null body
        http.send();
    }

    POST(url, body, callback) {
        let http = new XMLHttpRequest();
        http.onreadystatechange = () => {
            // readyState == 4 indicates a state of "Done"
            if (http.readyState === 4 && this.requestWasSuccessful(http)) callback(http.responseText);
        }
        
        // GET request to the URL w/ async true
        http.open("POST", url, true);
        http.send(body);
    }

    requestWasSuccessful(request) {
        return this.acceptableResponses.includes(request.status)
    }
}

function getCallback(response) {
    const CONTENT_ID = "getResponse";
    let contentElem = document.getElementById(CONTENT_ID);
    contentElem.innerHTML = "GET: " + response;
}

function postCallback(response) {
    const CONTENT_ID = "postResponse";
    let contentElem = document.getElementById(CONTENT_ID);
    contentElem.innerHTML = "POST: " + response;
}

function main() {
    const BASE_URL = "https://reqres.in/api/";
    const GET_URL = BASE_URL + "products/3";
    const POST_URL = BASE_URL + "users";
    let request = new Requests();

    let getButton = document.getElementById("getButton");
    let postButton = document.getElementById("postButton");
    getButton.addEventListener("click", () => {
        request.GET(GET_URL, getCallback);
    });

    let obj = {name: "Bruce", job: "Programmer"};
    let body = new Blob([JSON.stringify(obj, null, 2)], {type : 'application/json'});

    postButton.addEventListener("click", () => {
        request.POST(POST_URL, body, postCallback)
    });
}

main();
