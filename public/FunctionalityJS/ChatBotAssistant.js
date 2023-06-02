// const { response } = require("express");

/*
I had to seperate this to not squeeze functionality.JS
Chatbot 1.0.0
*/
var messageCount = 0;
var IsMessage = true;
var IsUser = false;

//!Ensuring that responses make sense

const recordedError = "" //this can be used to send errors to db so that we can note errors in system
const errorMessage = "Oh dear, an error occured; Check your connectivity then you can try again";
const serverError = "We apologize for the inconvenience, but it seems that something isn't working quite right on our end😢.\n \n Rest assured, our team has been notified and is actively working to resolve the issue and provide you with a smooth experience.\n \n Thank you for your patience🙂!"
const emptyFields = "Hello again! It seems you've left one or more fields blank. Please take a moment to fill in all the required details so we can provide you with a prompt response. Thank you!"
const wrongEmailInput = "The email format you entered appears to be faulty, please consider retrying. Thank you";
const wrongContactInput = "The contact format you entered appears to be faulty, please consider retrying. Thank you";
const noContactInput = "Hi there! I noticed that you may have forgotten to include some of your your details 🤔. Don't worry, Anne would love to get in touch with you and provide a response! \n \nIf you've already provided your information, just make sure to click submit so we can receive it. \n \nThank you!"
const repeatedNoContact = "I am sorry but we haven't yet received your contact details😥. These are very important in ensuring you get responses in due time. You can find the form in my first message. \n \nOnce you've submitted it successfully, the submit option should disappear, but your contact details will still be saved😊. \n \nAlternatively, if you would like to participate in our survey, you can go back to the very first message and click the 'survey' button located just below the submit button. Follow the instructions provided in the message to complete the survey. \n \nThank you! 😊"




//!Ensuring that survey message are clearly labbeled "survey"
var surveyOption = document.getElementById('surveyOptionID');
var messageOption = document.getElementById('messageOptionID');


surveyOption.addEventListener('mouseup', () => {
    Responsetype("survey")
})
messageOption.addEventListener('mouseup', () => {
    Responsetype("message")
})
function Responsetype(type) {
    IsMessage = (type == "message") ? true : false;
}
// TODO(CONFIRM BUTTON): Ensure the confirm button responds visually and sends survey ID's

//!making connections and sending data
function getDetails(name, contact) {
    if (name == "") {
        var nameSlot = document.getElementById("nameBoxID")
        var ChatName = document.getElementsByName("ChatName")[0]
        nameSlot.style.color = "red"
        ChatName.placeholder = "**field cannot be blank"
        nameSlot.style.borderBottomColor = "red"
        setTimeout(() => {
            nameSlot.style.color = "#64766A"
            nameSlot.style.borderBottomColor = "#64766A"
        }, 2000)
    }
    else if (contact == "") {
        var contactSlot = document.getElementById("emailBoxID")
        var ChatContact = document.getElementsByName("ChatContact")[0]
        contactSlot.style.color = "red"
        ChatContact.placeholder = "**field cannot be blank"
        contactSlot.style.borderBottomColor = "red"
        setTimeout(() => {
            contactSlot.style.color = "#64766A"
            contactSlot.style.borderBottomColor = "#64766A"
        }, 2000)
    }
    else {
        console.log("there")
        var newClientName = name;
        const newClientContact = contact;
        if (IsMessage != true) {
            newClientName = "Survey"
        }
        const newClientData = {
            name: newClientName,
            contactID: newClientContact
        }
        fetch('/api/messages', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newClientData),

        }).then(response => {
            if (response.ok) {
                IsUser = true;
                regSuccess(true)
                try {
                    return response.text(); // converting readerble stream in response to string. Just learnt that
                } catch (err) {
                    reportErr("Something went wrong extracting text from server response", err)
                    throw err;
                }

            } else {
                reportErr("response was not ok when sending document to db", response)
                regSuccess(false)
                AssistantResponse(errorMessage)
            }
        })
            .then(message => {
                if (message == "User") AssistantResponse(`Welcome back ${name}! What message do you wish to send Anne today?`);
                else AssistantResponse(`Nice to meet you ${name}. What message do you wish to send Anne today?`);
            })
            .then(data => {
                document.cookie = `AccountID=${data.id}`
            })
            .catch(error => {
                console.log("cookie error", error)
            })
    }
}


const collectionID = getCookie('AccountID')

function new_message(messageUpdate) {
    if (IsUser == false) {
        AssistantResponse(noContactInput)
    }
    else if (IsUser == true) {
        const message_update = {
            text: messageUpdate
        }

        fetch(`/update-message`, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(message_update)
        })
            .then(response => {
                if (response.ok) {
                    console.log("Server responded with code: 200")
                    newMessage(messageUpdate);
                } else {
                    reportErr("response was not ok when updating new message. User was told its network issues", response)
                    AssistantResponse(errorMessage)
                }
            })
            .catch(error => {
                console.log("Critical update faliure: ", error)
                reportErr("Update-message fetch endpoint didnt respond for some reason", error)
                AssistantResponse(errorMessage)
            })
    }

}

//! Reporting errors occured
var trialCount = 0;
function reportErr(overview, error) {
    const stackTrace = error.stack
    const errorReport = {
        overview: overview,
        error: error.message,
        trace: stackTrace.split('\n')[1].trim()
    }
    fetch('/api/errors', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(errorReport),
    }).then(response => {
        if (response.ok) {
            //respond through assistant
        }
        else {
            console.log(overview, "reported here", error)
        }
    }).catch(err => {
        //possible network error
        if (trialCount < 1) {
            setTimeout(() => {
                trialCount++;
                console.log(overview, error, "reported")
                reportErr(`error while tring to send this error to database (overview:${overview}. error:${error})`, err)
            }, 6000)
        }
        else {
            if (trialCount < 15) {
                setTimeout(() => {
                    trialCount++;
                    console.log(overview, error, "reported", trialCount)
                    reportErr(overview, error)
                }, 6000)
            }
        }

    })
}

//!incase you need cookies, use this
function getCookie(cookieName) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${cookieName}= `)
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
}


//!Ensuring the client responses are handled well in GUI
let IDnum = 0;
let ChatArea = document.getElementById("ChatAreaID");
let AssistantChatClass = 'Assistant textBubble';
let AssistantChatStylerClass = 'styler AssistantStyler';
let ClientClass = 'Client textBubble';
let messageBox = document.getElementById("Message");



//!creating a new instance of a messagebox. I think classes would have worked great here tho
function newMessage(message) {
    IDnum += 1;
    let ClientID = `ClientClassID${IDnum}`;
    let ClientMessage = document.createElement("div")
    ClientMessage.setAttribute('class', ClientClass);
    ClientMessage.setAttribute('id', ClientID);
    ClientMessage.innerText += message
    ChatArea.appendChild(ClientMessage);
    //?adding tag
    let TagSlot = document.getElementById(ClientID)
    let ClientTag = document.createElement("div");
    ClientTag.setAttribute('class', 'ClientTag');
    ClientTag.innerText == "HM";
    TagSlot.appendChild(ClientTag)
    let TagPositioning = TagSlot.clientHeight;
    ClientTag.style.top = (TagPositioning - 20) + "px";

    ChatArea.scrollTop = ChatArea.scrollHeight;
    console.log("scrollTop:", ChatArea.scrollTop, "scrollHeight:", ChatArea.scrollHeight)
    messageBox.value = '';
    $('#Message').focus();

}




//! Assistant messages processed here
function AssistantResponse(message) {
    let AssistantMessage = document.createElement("div")
    AssistantMessage.setAttribute('class', AssistantChatClass)
    AssistantMessage.innerText += message
    ChatArea.appendChild(AssistantMessage);
    $('#Message').focus();
    ChatArea.scrollTop = ChatArea.scrollHeight;
}
function regSuccess(response){
    var buttonTickResponse = document.getElementById('SubmitDetailsSVGid').style
    var buttonPResponse = document.getElementById('SubmitDetailsPid').style
    var buttonResponse = document.getElementById('SubmitDetailsChatID').style
    if(response == true) {
        buttonTickResponse.display = "block"
        buttonPResponse.display = "none"
    }
    else{buttonResponse.color = "red"}

    setTimeout(()=>{
        buttonTickResponse.display = "none"
        buttonPResponse.display = "block"
        buttonResponse.color = "black"
    }, 1500)
}




