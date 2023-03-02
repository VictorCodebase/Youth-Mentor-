/*
I had to seperate this to not squeeze functionality.JS
Chatbot 1.0.0
*/


//!Ensuring the client responses are handled well in GUI
let ChatArea = document.getElementById("ChatAreaID");
let AssistantChatClass = 'Assistant textBubble';
let AssistantChatStylerClass = 'styler AssistantStyler';
let ClientClass = 'Client textBubble';
let messageBox = document.getElementById("Message");

function newMessage(message)
{
    setTimeout(()=>
    {
    //creating a new instance of a messagebox. I think classes would have worked great here tho
    let ClientMessage = document.createElement("div")
    ClientMessage.setAttribute('class',ClientClass)
    ClientMessage.innerText += message
    ChatArea.appendChild(ClientMessage);
    messageBox.value = '';
    $('#Message').focus();

    ChatArea.scrollTop = ChatArea.scrollHeight;
    }, 200)

}


//!Ensuring responses are sent well
var RealNameInput = document.getElementById("ChatName").value;
var RealContactInput = document.getElementById("ChatContact").value = "Hey";
var GhostContactInput = document.pseudoForm.ChatContact.value
var GhostNameInput = document.getElementById("GhostContact").value = "hey you";

function StoreData(){
    GhostContactInput = RealContactInput;
    GhostNameInput = RealNameInput;
    console.log(GhostContactInput, " ,", GhostNameInput, " ,",RealNameInput ,"Here I am😎👍")

}


//!Ensuring that responses make sense

let errorMessage = "Sorry, an error occured; I am working to resolve it hang on tight";
let wrongEmailInput = "The email format you entered appears to be faulty, please consider retrying. Thank you";
let wrongContactInput = "The contact format you entered appears to be faulty, please consider retrying. Thank you";
let successMessage = `Awesome! Your message on ${subject} has been successfully sent to Anne. You'll get your response very soon`;

function ChatBotRespond(expectation)
{
    switch(expectation)
    {
        case('details200'):
        //
        break;

        default:
            //
    }
}
