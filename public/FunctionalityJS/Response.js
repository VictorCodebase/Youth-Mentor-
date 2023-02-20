

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




//! Ensuring the chatbox displays fine


$(document).ready(function()
{
  //?opening chat
  $('.ChatBar').click(function()
  {
    $('.ChatBar').hide();
    $(".hidden").fadeTo("fast", 1);
    $('.textArea').focus();
  })

  //? closing chat
  $('.BackButton').click(function()
  {
    $('.hidden').animate({
      height: "-=600"
    }, 400, 'swing')
    $('.hidden').fadeTo("fast", 0);
    $('.hidden').animate({
      height: "+=600"
    }, 400, 'swing')
    $('.hidden').fadeOut();
    $('.ChatBar').show();
   
  })
})




//!Ensuring the chatbot is draggable

var draggable = document.getElementById("handle");
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


function dragStart(e) {
  initialX = e.clientX - xOffset;
  initialY = e.clientY - yOffset;

  draggable.addEventListener("mouseup", dragEnd);
  draggable.addEventListener("mousemove", toDebounce);

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

drag = debounce(drag, 15)


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
window.onscroll = function() {
  var activitiesBlock = document.getElementById("ActivitiesAnchor");
  var ChatBotBtn = document.getElementById("ChatBotBtn");

  if(window.scrollY > activitiesBlock.offsetTop)
  {
    $('#ChatBotBtn').fadeOut();
  }
  else{
    $('#ChatBotBtn').fadeIn();
  }
}