
// /*
// 1. get full number of images
// 2. set an interval that runs through them, then restarts
// 3. at each interval, an image is set to display block, rest are display none
// 4. add transition from display block to display none

// 5. add a dark shade using jquery to go with dialogue box 
// 6. set a small block of jquery that operates a dialogue box
// 7. ensure dialogue box exits before next transition
//  */

// //! Carousel for Activities page


// var Img1 = new Image();
// Img1.src = '../ImageFolder/IllustrationMedia/ActivitiesMomTalkingToSaintPaulsYouth.jpg';

// var Img2 = new Image();
// Img2.src = '../ImageFolder/IllustrationMedia/MommsyAndManyYouthsPosing.jpg';

// var Img3 = new Image();
// Img3.src = '../ImageFolder/IllustrationMedia/20171231_132042.jpg';

//  var Img4 = new Image();
//  Img4.src = '../ImageFolder/IllustrationMedia/ActivitiesMomExplainingPoinSaintPauls.jpg';

// const CarouselImages = [Img1, Img2, Img3, Img4];
// var ImageNum = 0;

// var WaitTime;

// setInterval(() =>
// {

//     if (ImageNum < CarouselImages.length)
//     {
//        console.log(ImageNum)

//         document.getElementById("CarouselImgId").appendChild(CarouselImages[ImageNum]);
//         ImageNum++;
//     }
//     else
//     {
//         ImageNum = 0;
//         document.getElementById("CarouselImgId").appendChild(CarouselImages[3]);
//     }

// }, 1000)


//! trial 2

// var SidesContainer = document.getElementById("CarouselImgId");
// const buttons = document.querySelectorAll("[data-carousel-button]");

// buttons.forEach(button => {
//     button.addEventListener("click", ()=>
//     {
//         const offset = button.dataset.carouselButton === "next"? 1 : -1;
//         console.log(offset)
//         //! if issue arises check 10:00 time
//         const slides = button
//         .closest("[data-carousel]")
//         .querySelector("[data-slides]");
//         const activeSlide = slides.querySelector("[data-active]");

//         //? converting the children of the slide to an array
//         let newIndex = [...slides.children].indexOf(activeSlide) + offset

//         if (newIndex < 0) newIndex.children.length - 1;
//         if (newIndex >= newIndex.children.length) newIndex = 0;

//         slides.children[newIndex].dataset.active = true;
//         delete activeSlide.dataset.active; 
//     })
// });


//!trial 3

// let autoPlay = null;
// let PictureArray = new Array();
// let ImageIndex = 0;
// var delayTime = 30;

// let pictures = document.querySelectorAll(".slide");
// pictures.forEach(picture => {
//     ImageIndex++;
//     PictureArray[ImageIndex] = picture;
//     console.log(PictureArray[ImageIndex])
    
// });

// StartAutoplay(ImageIndex);

// //? here is a nice way of doing functions, classy, right?

// function StartAutoplay (ImageID)
// {
//         console.log(ImageID)
//         function carouselLoop()
//         {
//             setTimeout(()=>
//             {

//                 var DisplayImage = document.getElementById(toString(ImageID))
//                 $('[data-active]').css('opacity', '1')
//                 console.log("Hey bud", ImageID)
//                 //!release this to restart the carousel engine
//                 StartAutoplay(ImageIndex)

//             }, 300)
//         }
//         carouselLoop() 
//         moveCarousel('next')

// }

// function moveCarousel (direction)
// {
//     console.log(direction, "what abt here")
  
//     slideNumber = 0;

//     // if (direction = 'next'){nextSlide()}
//     // else{nextSlide()} 
     
//     function nextSlide()
//     {
//         console.log(direction, "should be next")
//         $('#3').addClass("")
//         //!nice thought process

//     }
//     function prevSlide()
//     {
//         console.log(direction, "should be prev")

//     }

    
// }

//! trial 4

// let pictureArray = [];
// let images = document.querySelectorAll(".slide")
// let counter = 0;

// showImage()

// function showImage()
// {
    
//     $(images[2]).css("display", "block");
//     myVar = setTimeout(showImage, 2000);
    
// }


//!trial 5 --worked, but I want to optimize it

// let slideIndex = 0;
// showSlides();

// function showSlides() {
//   let i;
//   let slides = document.getElementsByClassName("slide");
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.opacity = "0";  
//   }
//   slideIndex++;
//   if (slideIndex > slides.length) {slideIndex = 1}    


//   slides[slideIndex-1].style.opacity = "1"; 
//   slides[slideIndex-1].style.alignItems = "center";  
//   setTimeout(showSlides, 2000); //! remember to edit images and create transition
//   //? for reference: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_slideshow_auto

// }



//! trial 6 -- trying to do a more functional one
//Vanilla Javascript
let images = document.querySelectorAll('.slide');
var imageNum = 0;
images.forEach(image => {
  console.log(image);
  image.setAttribute('id', `image-${imageNum}`)
  imageNum++;
});

imageNum = 0;
function ImageSwap(direction)
{

  if (direction == "right") 
  {
    goNext( false)
  }else if (direction == "left") 
  {
    goBack(false)
  }
  else{goNext(false)}

  var timeOut = setTimeout(() =>{
    ImageSwap("right");
  }, 1000)
  
}
ImageSwap('right');

//?this will have to be impure functions 😐
function goNext(nextBtn)
{
  //go next
  //console.log(imageNum, nextBtn, "hey")
  if (imageNum < images.length - 1)
  {
    ++imageNum

    let imageToShow = document.getElementById(`image-${String(imageNum)}`)
    if (imageNum > 1){    let imageToHide = document.getElementById(`image-${String(imageNum - 1)}`)}
    else{document.getElementById(`image-${0})}`)}
    let imageToHide = document.getElementById(`image-${String(imageNum - 1)}`)

    imageToShow.setAttribute("class", 'slide displaySlide')
    imageToHide.setAttribute("class", 'slide hideSlide')
    console.log(imageNum, "follow")
    
  }
  else{imageNum = 0; }
}


function goBack(backBtn)
{
  //console.log(imageNum, backBtn, "hey")
  if (imageNum > 0)
  {
    imageNum--
  }
  else{imageNum = images.length - 1; }
  //go back
  
}

