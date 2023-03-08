/*
I had to seperate this to not squeeze functionality.JS
Chatbot 1.0.0
*/

var messageCount = 0;


//!Ensuring the client responses are handled well in GUI
let ChatArea = document.getElementById("ChatAreaID");
let AssistantChatClass = 'Assistant textBubble';
let AssistantChatStylerClass = 'styler AssistantStyler';
let ClientClass = 'Client textBubble';
let messageBox = document.getElementById("Message");

function newMessage(message)
{
    if(messageCount > 0){
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
    

}



//!Ensuring that responses make sense

let errorMessage = "Sorry, an error occured; I am working to resolve it hang on tight";
let wrongEmailInput = "The email format you entered appears to be faulty, please consider retrying. Thank you";
let wrongContactInput = "The contact format you entered appears to be faulty, please consider retrying. Thank you";
let noContactInput = "Hi there! 😊 I noticed that you may have forgotten to include your details 🤔. Don't worry, Anne would love to get in touch with you and provide a response! \n \nIf you've already provided your information, just make sure to click submit so we can receive it. \n \nThank you! 😃"
let repeatedNoContact = "I apologize that we were unable to receive your message😥. You can find the form in my first message. \n \nOnce you've submitted it, the submit option should disappear, but your contact details will still be saved😊. \n \nAlternatively, if you would like to participate in our survey, you can go back to the very first message and click the 'survey' button located just below the submit button. Follow the instructions provided in the message to complete the survey. \n \nThank you! 😊"


//! Assistant messages processed here
function AssistantResponse(message)
{
    let AssistantMessage = document.createElement("div")
    AssistantMessage.setAttribute('class', AssistantChatClass)
    AssistantMessage.innerText += message
    ChatArea.appendChild(AssistantMessage);
    $('#Message').focus();

    ChatArea.scrollTop = ChatArea.scrollHeight;
}


//! Sending the messages to server 
const formMessage = document.querySelector("#MessageBoxID");
const formUserData = document.querySelector("#pseudoFormID");
const userDataSubmit = document.getElementById("SubmitDetailsChatID");
const formMessageSubmit = document.getElementById("sendID");
var clientDataSubmitted = false;

    console.log (formMessage)

//one promise to wait for all promises. Waiting for both forms
userDataSubmit.addEventListener('click', event => {
    messageCount = 1;
    event.preventDefault();
})
formMessageSubmit.addEventListener('click', event => {
     //giving response to user
    if (messageCount == 0)
    {
        AssistantResponse(noContactInput);
        messageCount--;
    }else if(messageCount < 0)
    { //!======================================================
        AssistantResponse(repeatedNoContact);
    }
    event.preventDefault();
})
if(clientDataSubmitted == false)
{
    Promise.all([
        new Promise(resolve => userDataSubmit.addEventListener('mouseup', resolve)),
        new Promise(resolve => formMessageSubmit.addEventListener('mouseup',  resolve)),
        
    ]).then(() => {
        // Gathering data from both forms
        clientDataSubmitted = true
        console.log("im here 1")
        console.log("im here 1.2")
        const messageData = {
            text: formMessage.querySelector('#Message').value,
        };
        const clientData = {
            name: formUserData.querySelector('#ChatName').value,
            contact: formUserData.querySelector('#ChatContact').value,
        };
    
        //combining data from both fields to one obj
        const data = { message: messageData, client: clientData};
    console.log("im here 2")
        fetch('/api/messages',{
            method: 'POST',
            headers: {'content-type' : 'application/json'},
            body: JSON.stringify(data),
    
        }).then(response => {
            if (response.ok)
            {
                console.log('Both messages sent successfully as JSON files')
            }else{
                console.log("the following errors were captured when sending data to server", "\n", response)
            }
        })
        .catch(error => {
            console.log("Network issues; I think")
        })
    })
}
else
{

}
