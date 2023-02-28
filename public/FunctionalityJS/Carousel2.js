
//! trial 6 -- trying to do a more functional one
//Vanilla Javascript
const images = document.querySelectorAll('.slide');
let currentImage = 1;
let prevImage = currentImage-1;

var timeOut;
SwitchButton(false, currentImage, prevImage, false);

//?this will have to be impure functions 😐
function  SwitchButton(nextBtn, imgNum, prevNum)
{
    if(prevNum == imgNum){prevNum = imgNum - 1}
  if(prevNum <= 0){prevNum = images.length;}
  else{prevNum = imgNum - 1}
  if(imgNum == 0){imgNum = images.length}
  if(imgNum > images.length){imgNum = 1}

  currentImage = imgNum;
  prevImage = prevNum;

  console.log("current:>", imgNum, "prev:>", prevNum, "images.len:>", images.length)

    let imageToShow = document.getElementById(`image${imgNum}`)
    let imageToHide = document.getElementById(`image${prevNum}`)

    imageToHide.style.display = "none"
    imageToShow.style.display = "block"
    
    console.log(`showed image num ${imgNum} and hid ${prevNum}`)
    imgNum++
    
    if(nextBtn == true){clearTimeout(timeOut)}

    timeOut = setTimeout(() =>{
    SwitchButton(false, imgNum, prevNum, false);
  }, 2000)
}
