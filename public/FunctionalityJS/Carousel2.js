
//! trial 6 -- trying to do a more functional one
//Vanilla Javascript
const images = document.querySelectorAll('.slide');
let currentImage = 1;
let prevImage = currentImage-1;

var timeOut;
SwitchButton(false, currentImage, prevImage, false);

function  SwitchButton(nextBtn, imgNum, prevNum)
{
    if(prevNum == imgNum){prevNum = imgNum - 1}
  if(prevNum <= 0){prevNum = images.length;}
  else{prevNum = imgNum - 1}
  if(imgNum == 0){imgNum = images.length}
  if(imgNum > images.length){imgNum = 1}

  currentImage = imgNum;
  prevImage = prevNum;


    let imageToShow = document.getElementById(`image${imgNum}`)
    let imageToHide = document.getElementById(`image${prevNum}`)

    imageToHide.style.display = "none"
    imageToShow.style.display = "block"
    
    imgNum++
    
    if(nextBtn == true){clearTimeout(timeOut)}

    timeOut = setTimeout(() =>{
    SwitchButton(false, imgNum, prevNum, false);
  }, 4000)
}


//!Ensuring the carousel buttons dissapear after hovering after some time
