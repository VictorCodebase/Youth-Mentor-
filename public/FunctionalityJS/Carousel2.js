
//! trial 6 -- trying to do a more functional one
//Vanilla Javascript

//? Add images in the HTML side. JS will automatically pick it

const images = document.querySelectorAll('.SlideImage');
const imageSlots = document.querySelectorAll('.slide')

PreviewSlot = document.getElementById("CarouselPreviewContainerID")

for (i = 0; i < images.length; i++) {
  imageSlots[i].setAttribute("id", `image${i}`)
  console.log("GeneratingID: ", imageSlots[i])

  var PreviewContainer = document.createElement("div")
  PreviewContainer.setAttribute("class", "PreviewContainer")
  PreviewContainer.setAttribute("id", `Container${i}ID`)

  var src = images[i].src
  console.log(src)
  var PreviewImage = document.createElement("img")
  PreviewImage.src = src
  PreviewImage.alt = "404 err"
  PreviewContainer.appendChild(PreviewImage)

  var PreviewShadow = document.createElement("div")
  PreviewShadow.setAttribute("id", `Shadow${i}ID`)
  PreviewContainer.appendChild(PreviewShadow)
  PreviewSlot.appendChild(PreviewContainer)
};

// UNDONE(Polish): Let the user be able to jump between the "activities"
let currentImage = 0;

var timeOut;
SwitchButton(currentImage);

function SwitchButton(imgNum) {
  //? Dealing with the main images

  if (imgNum >= images.length) { imgNum = 0 }
  document.getElementById(`image${imgNum}`).style.display = "flex"


  //? Dealing with the preview
  let currentContainer = document.getElementById(`Container${imgNum}ID`)
  let currentShadow = document.getElementById(`Shadow${imgNum}ID`)
  currentShadow.style.backgroundColor = "transparent";
  currentShadow.className += "PreviewContainerOnDisplay"


//

  imgNum++
  currentImage = imgNum;

  timeOut = setTimeout(() => {
    reset();
    SwitchButton(currentImage);
  }, 4000)
}
function reset() {
  for (i = 0; i < images.length; i++) {

    document.getElementById(`image${i}`).style.display = "none"
    document.getElementById(`Shadow${i}ID`).style.backgroundColor = "rgba(10, 9, 9, 0.706"
    document.getElementById(`Shadow${i}ID`).classList.remove("PreviewContainerOnDisplay")

  }


}

//!Ensuring the carousel buttons dissapear after hovering after some time
