

//! Ensuring navbar color changes are according to page
HomeID = document.getElementById("Home");
ActivitiesID = document.getElementById("Activities");
ApproachID = document.getElementById("Approach");
RecentActivitesID = document.getElementById("RecentActivites");
ContactID = document.getElementById("Contact");

//this part is usully pretty boring
HomeText = document.getElementById("HomeTxt");
ActivitiesText = document.getElementById("ActivitiesTxt");
ApproachText = document.getElementById("ApproachTxt");
RecentActivitiesText = document.getElementById("RecentActivitiesTxt");
ContactText = document.getElementById("ContactsTxt");



function FlipPage(Page)
{
  if (Page == "Activities")
  {
    ActivitiesID.style.backgroundColor = "#64766A";
    ActivitiesText.style.color = "rgba(245, 245, 245, 0.78)";
    
    HomeID.style.backgroundColor = "transparent";
    HomeText.style.color = "#64766A";

    ContactID.style.backgroundColor = "transparent";
    ContactText.style.color = "#64766A";
  }
  else if (Page == "Contact")
  {
    ContactID.style.backgroundColor = "#64766A";
    ContactText.style.color = "rgba(245, 245, 245, 0.78)";
    
    HomeID.style.backgroundColor = "transparent";
    HomeText.style.color = "#64766A";

    ActivitiesID.style.backgroundColor = "transparent";
    ActivitiesText.style.color = "#64766A";
  }

  else
  {
    HomeID.style.backgroundColor = "#64766A";
    HomeText.style.color = "rgba(245, 245, 245, 0.78)"

    ActivitiesID.style.backgroundColor = "transparent";
    ActivitiesText.style.color = "#64766A";

    ContactID.style.backgroundColor = "transparent";
    ContactText.style.color = "#64766A";
  }
}




//! Creating a fade on scroll navbar NavBar

var prevScrollpos = window.pageYOffset;

document.getElementById("NavBar").style.backgroundColor = "rgba(255, 255, 255, 0.358)";
window.onscroll = function() {
var currentScrollPos = window.pageYOffset;
if (prevScrollpos > currentScrollPos) 
{
    document.getElementById("NavBar").style.backgroundColor = "rgba(255, 255, 255, 0.358)";
    document.getElementById("NavBar").style.transition = "1s";
} 
  else if (prevScrollpos < currentScrollPos)
  {
    document.getElementById("NavBar").style.backgroundColor = "rgba(245, 245, 245, 0)";
  }
  prevScrollpos = currentScrollPos;
}


//!Ensuring the intro text is retractable in mobile view
retracted = true
var introText = document.getElementById("text1ID")
var initalTextHeight = introText.clientHeight
console.log(initalTextHeight, "the initial height")
introText.style.height = "200px"

function retractFunction()
{
  var retractBtn = document.getElementById("button1ID")
  if(retracted == true)
  {
    console.log("retracting")
    retracted = false
    anime({
      targets: "#text1ID",
      height: initalTextHeight,
      duration: 300,
      easing: 'cubicBezier(0, 0.14, 0, 1)',
    })
    retractBtn.style.boxShadow = 'none'
    retractBtn.innerHTML = '<p>See Less</p>'
  }
  else{
    retracted = true
    anime({
      targets: "#text1ID",
      height: '200px',
      duration: 300,
      easing: 'cubicBezier(0, 0.14, 0, 1)',
    })
    retractBtn.style.boxShadow = '0 -5px 30px 25px aliceblue'
    retractBtn.innerHTML = '<p>See More</p>'
  }
  

}



//! customizing the contacts behaviour on focus
jQuery(document).ready(function($) {
//?name focusing
  $(".focusName").focus(
    function(){
      $(".fName").addClass("focused");
  })
  $("#name").focusout(
    function(){
      $(".fName").removeClass("focused");
  });

//?contact focusing
$("#contact").focus(
  function(){
    $(".Contact").addClass("focused");
})
$("#contact").focusout(
  function(){
    $(".Contact").removeClass("focused");
});


//?subject focusing
$("#Subject").focus(
  function(){
    $(".subject").addClass("focused");
})
$("#Subject").focusout(
  function(){
    $(".subject").removeClass("focused");
});


//?message focusing
$("#m_text").focus(
  function(){
    $(".messagetextArea").addClass("focused");
})
$("#m_text").focusout(
  function(){
    $(".messagetextArea").removeClass("focused");
});
});

//!Ensuring the footer date auto updates
var footer = document.getElementById("footerTextID")
footer.innerText += new Date().getFullYear()


//! Ensuring the chatbox displays fine


$(document).ready(function()
{
  var CloseSearchClicked = false;
  //?opening chat
  $('.ChatBar, .connectBtn').click(function()
  {
    if (CloseSearchClicked == true)
    {
      $('.hidden').animate({
      top: "-=100",
      opacity:"-=0.9"
    }, 100, 'swing')
    }
    
    $('.ChatBar').hide();
    $(".hidden").fadeTo("fast", 1);
    $('.textArea').focus();
  })

  //? closing chat
  $('.BackButton').click(function()
  {
    CloseSearchClicked = true;
    $('.hidden').animate({
      top: "+=100",
      opacity:"-=0.9"
    }, 400, 'swing')
    $('.hidden').fadeTo("fast", 0);
    $('.hidden').fadeOut();
    $('.ChatBar').show();
   
  })
})




//!Ensuring the chatbot is draggable

var draggable = document.getElementById("handle");
var draggable2 = document.getElementById("HeaderBarID")
var dragged = document.getElementById("ChatbotDialog");
var isDragging = false;
var currentX;
var currentY;
var initialX;
var initialY;
var xOffset = 0;
var yOffset = 0;
var prevX = 0;
var prevY = 0;
var interpolationFactor = 0.1;

draggable.addEventListener("mousedown", dragStart);
draggable2.addEventListener("mousedown", dragStart);


function dragStart(e) {
  initialX = e.clientX - xOffset;
  initialY = e.clientY - yOffset;

  draggable.addEventListener("mouseup", dragEnd);
  draggable2.addEventListener("mouseup", dragEnd);
  draggable.addEventListener("mousemove", toDebounce);
  draggable2.addEventListener("mousemove", toDebounce);

  isDragging = true;
}

function dragEnd(e) 
{
  document.removeEventListener("mousemove", drag);
  document.removeEventListener("mouseup", dragEnd);
  
  isDragging = false;
}


function toDebounce(e)
{
  drag(e)
}

const debounce = (fn, delay) => {
  let timer;

  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);

  };
};
let drag = (e) => 
{
  if (isDragging) {
    e.preventDefault();
    currentX = e.clientX - initialX;
    currentY = e.clientY - initialY;

    xOffset = currentX;
    yOffset = currentY;

    currentX = prevX + (currentX - prevX) * interpolationFactor
    currentY = prevY + (currentY - prevY) * interpolationFactor

    setTranslate(currentX, currentY, dragged);

    prevX = currentX;
    prevY = currentY;
  }
}


//function drag(e) {}

drag = debounce(drag, 3)


function setTranslate(xPos, yPos, el)
{
  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)"; 
}

//?storing value returened by the function in setTranslate




// function setTranslate(xPos, yPos, el) {
//   el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
// }


//!Adding emojis to my work
const emojiList = document.getElementById("EmojisCollectionID")
const connectionErrMsg = document.getElementById("internetConnectionErr")
const textbox = document.getElementById('Msg')

function fetchEmoji(){
  fetch('https://emoji-api.com/emojis?access_key=eea0e5b4bb2189e0c6642ddd23858b0b6008f51d',{
  
})
  .then(res => res.json())
  .then(data => {
    loadEmoji(data)
    $(".EmojiLoading").hide();
    $("#internetConnectionErr").hide();
  })
  .catch(error => {
    //console.log(error)
    connectionErrMsg.innerHTML = ("Emojis currently unavailable. <br>Check your internet connection")
    $(".EmojiLoading").width('45px')
    $("#internetConnectionErr").fadeIn();
     setTimeout(() =>
     {fetchEmoji()}, 6000) 
  }
  )

}
fetchEmoji()

function loadEmoji(data)
{
  data.forEach(emoji => {
    let div = document.createElement("div");
    div.setAttribute('emoji-name', emoji.slug);

    div.onclick = function() {
      textbox.innerText = emoji.character;
    };

    div.textContent = emoji.character
    emojiList.appendChild(div);
  });
}

//!Adding emoji search function
const searchEmoji = document.getElementById("EmojiSearchID");

searchEmoji.addEventListener('keyup', e =>
{
  let value = e.target.value;
  let emojis = document.querySelectorAll('#EmojisCollectionID div')
  emojis.forEach(emoji => {
    if(emoji.getAttribute('emoji-name').toLowerCase().includes(value))
    {
      emoji.style.display = 'flex'
    }
    else{emoji.style.display = 'none'}
  });
})



//!Ensuring Emojis searchbox behaves fine
$(document).ready(function(){
  $('.searchIcon').click(function()
  {
    $('.searchIcon').hide();
    $('.EmojiSearchTextBox').show();
    $('.EmojiSearchTextBox').focus();
    $('.cancelSearchSecondary').fadeIn();
    $('.EmojiSearchBar').animate({
      width: '+=100'
    }, 220, 'swing')
  })
  $('.cancelSearchSecondary').click(function()
  {
    $('.cancelSearchSecondary').hide();
    $('.searchIcon').fadeIn();
    $('.EmojiSearchTextBox').hide();
    searchEmoji.value = '';
    $('.EmojiSearchBar').animate({
      width: '-=100'
    }, 220, 'swing')
  })
})
function CloseSearch()
{
  let emojis = document.querySelectorAll('#EmojisCollectionID div');
  emojis.forEach(emoji => {
    emoji.style.display = 'flex'
  });
}

//!Ensuring Emojibar is retractable

$(document).ready(function(){
  $('.StartEmoji').click(function()
  {
    $('.EmojiSearchBar').show();
    $('.StartEmoji').hide();
    $('.cancelSearchMain').fadeIn();
    $('#EmojiSelectionBarID').show();
    $('#EmojiSelectionBarID').animate({
      height: '+=150'
    }, 220, 'swing')
  })

  $('.cancelSearchMain').click(function()
  {
    $('.cancelSearchMain').hide();
    $('.StartEmoji').fadeIn();
    $('.textArea').focus();
    $('#EmojiSelectionBarID').animate({
      height: '-=150'
    }, 220, 'swing')
    $('.EmojiSearchBar').hide();
  })
})






//! ensuring chatbox button does not go past activities block to contacts
// window.onscroll = function() {
//   var activitiesBlock = document.getElementById("ActivitiesAnchor");
//   var ChatBotBtn = document.getElementById("ChatBotBtn");

//   if(window.scrollY > activitiesBlock.offsetTop)
//   {
//     $('#ChatBotBtn').fadeOut();
//   }
//   else{
//     $('#ChatBotBtn').fadeIn();
//   }
// }

//!Ensuring the message does not overflow too much
// const ChatBotTextArea = document.getElementById('Message');
// const ChatAreaResize = document.getElementById('ChatAreaID');
// const ChatBoxContainer1 = document.getElementById("messageDraftID")
// const ChatBoxContainer2 = document.getElementById("MessageBoxID")
// const ChatBoxContainer3 = document.getElementById("DraftAreaClassID")

// ChatBotTextArea.addEventListener('input', ()=> {
//   const lines = ChatBotTextArea.value.split('\n').length;
//   if(lines < 7)
//   {
//     ChatBotTextArea.style.height = (ChatBotTextArea.scrollHeight) + "px"
//     ChatBoxContainer1.style.height = (ChatBotTextArea.scrollHeight) + "px"
//     ChatBoxContainer2.style.height = (ChatBotTextArea.scrollHeight) + "px"
    
//     ChatAreaResize.style.height = ChatAreaResize.offsetHeight - (lines + "40") + "px";
//   }
// })

//! Ensuring the chat and survey option is responsive
const messageOptionID = document.getElementById("messageOptionID")
const SurveyOptionID = document.getElementById("surveyOptionID")

const Client_or_SurveyName = document.getElementById("ChatBotnameID")
const Client_or_SurveyID = document.getElementById("ChatBotcontactID")
const Client_or_SurveyNameContainer = document.getElementById("nameBoxID")

messageOptionID.style.borderBottomColor = "#64766A";
messageOptionID.addEventListener('mouseover', ()=>{
  messageOptionID.style.borderBottomColor = "#64766A";
  SurveyOptionID.style.borderBottomColor = "#94a7ae31";
})
SurveyOptionID.addEventListener('mouseover', ()=>{
  messageOptionID.style.borderBottomColor = "#94a7ae31";
  SurveyOptionID.style.borderBottomColor = "#64766A";
})
SurveyOptionID.addEventListener('mouseleave', leaveSurvey)
function leaveSurvey(){
  messageOptionID.style.borderBottomColor = "#64766A";
  SurveyOptionID.style.borderBottomColor = "#94a7ae31";
}
function leaveMessage(){
  messageOptionID.style.borderBottomColor = "#94a7ae31";
  SurveyOptionID.style.borderBottomColor = "#64766A";
}

function changeSubmitType(type)
{
  switch(type)
  {
    case("message"):
    messageOptionID.style.borderBottomColor = "#64766A";
    SurveyOptionID.style.borderBottomColor = "#94a7ae31";
    SurveyOptionID.addEventListener('mouseleave', leaveSurvey);
    messageOptionID.removeEventListener('mouseleave', leaveMessage)

    Client_or_SurveyNameContainer.style.display = "flex";
    Client_or_SurveyName.innerText = "Name:"
    Client_or_SurveyID.innerText = "Contact:"
    break;
    case("survey"):
    messageOptionID.style.borderBottomColor = "#94a7ae31";
    SurveyOptionID.style.borderBottomColor = "#64766A";
    SurveyOptionID.removeEventListener('mouseleave', leaveSurvey);
    messageOptionID.addEventListener('mouseleave', leaveMessage)

    Client_or_SurveyNameContainer.style.display = "none";
    Client_or_SurveyID.innerText = "Survey ID:"
    break;
    default:
      messageOptionID.style.borderBottomColor = "#64766A";
      SurveyOptionID.style.borderBottomColor = "#94a7ae31";
  }
}

//!Small universal JS to allow focusing to affect parent
function onFocus(element, elementParent)
{
  elementParent.style.borderBottomColor = "#64766A";
  document.addEventListener("click", (event)=>
  {
    var outFocus = !element.contains(event.target)
    if (outFocus)
    {
      offFocus(elementParent)
    }
  })
}

function offFocus(elementParent)
{
  elementParent.style.borderBottomColor = "#94a7ae31";
}



//! ############################################ !//
//? small screen JS

//! Ensuring the title autorecedes to the navbar
var mainTitle = document.getElementById("TitleNameID");
var speciality = document.getElementById("specialityID");
var heightCheckpoint =  document.getElementById("textBox1ID")
var mainID = document.getElementById("MainID")
var navbar = document.getElementsByClassName('menuButton')[0]
var Transition = true
var prevTransitionType = true

var MainTitleStyle = mainTitle.style


scrollCheck(heightCheckpoint.getBoundingClientRect().top)

function scrollCheck(checkpoint)
{
    if (checkpoint > -300){
        var refreshrate = 50
    }
    else{
        refreshrate = 300
    }
    if (checkpoint > 0){
        
        Transition = true
    }
    else{
        Transition = false
    }
    if (Transition != prevTransitionType)
    {
        console.log("Transistion: ", Transition, "prev", prevTransitionType)
        transition(Transition)
    }
    prevTransitionType = Transition
    setTimeout(()=>{
        scrollCheck(heightCheckpoint.getBoundingClientRect().top)
    }, refreshrate)
}

function transition(type)
{
    console.log("triggered!", type)
    if(type == true)
    {
        mainTitle.style.color = "blue"
    }
    if(type == false)
    {
        mainTitle.style.color = "black"
        MainTitleStyle.fontSize = "250%"
        anime({
            targets: '#TitleNameID',
            fontSize: ['250%', '150%'],
            duration: 200,
            easing: 'easeInOutQuad',
        })
        anime({
          targets: '.menuButton',
          backgroundColor: ['rgba(255, 255, 255, 0)', '#f0f8ff'],
        })
        navbar.style.boxShadow = "2px 1px 1px 2px rgba(0,0,0,0.5)"
        MainTitleStyle.position = "fixed"
        MainTitleStyle.top = "0px"
        MainTitleStyle.left = "15%"
    }
    if(type == true)
    {
        MainTitleStyle.fontSize = "300%"
        mainTitle.style.color = "black"
        anime({
            targets: '#TitleNameID',
            fontSize: ['300%', '400%'],
            duration: 200,
            easing: 'easeInOutQuad',
        })
        anime({
          targets: '.menuButton',
          backgroundColor: ['#94a7ae31', 'rgba(255, 255, 255, 0)'],
        })
        navbar.style.boxShadow = "none"
        MainTitleStyle.position = "static"
    }
}


//! mobile view menu functionality

function openMenu()
{
    var overlay = document.getElementById("menuOverlayID").style;
    overlay.display = "block"
    anime({
        targets: ".menuOverlay",
        backdropFilter: ['blur(0)', 'blur(12px)'],
        duration: 1500,
    })

}
function back(element, elClass, elID)
{

    element.style.display = "none"
}


