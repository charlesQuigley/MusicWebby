var wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: 'violet',
    progressColor: 'purple',
    responsive: true,
    barRadius: 3,
    barWidth: 3,
    //cursorColor: 'blue',
    cursorWidth: 3,
    hideScrollbar: true,
    barGap: 1,
    fillParent: true,
});

wavesurfer.load('Samples/Positive.wav');

function playAudio(sampleNum)
{

    var listOfPlayButtons = document.querySelectorAll(".playButton");

    console.log(listOfPlayButtons);

    var playButton = listOfPlayButtons[sampleNum];

    wavesurfer.playPause();

    if(wavesurfer.isPlaying()){
        playButton.textContent = "||";
    }
    else
    {
        playButton.textContent = ">";
    }

}




//BURGER-MENU Functions (FOR MOBILE)
//-----------------------------------------------------

var NavBar_Mobile = document.querySelector('.nav-bar-mobile');

//Changes burger icon from 3 bars to x or vice-versa upon tapping the icon.
//-------------------------------
function click_burger_menu(burgerBars){
   for(let i = 0; i < burgerBars.children.length; i++)
   {
       burgerBars.children[i].classList.toggle("change");

       toggle_Mobile_Menu_Options();

   }
}

//Opens or closes the mobile pop-out menu
function toggle_Mobile_Menu_Options(){

    var popout_menu = document.querySelector('.nav-bar-mobile-popout-menu');

    popout_menu.classList.toggle("open-popout-menu");

}

//When the user clicks a pop-up menu option, the pop-up menu should close. This function makes that happen.
function closeMobileMenu(){
    var popout_menu = document.querySelector('.nav-bar-mobile-popout-menu');

    popout_menu.classList.toggle("open-popout-menu");

    var burger_menu = document.querySelector(".burger-icon");

    for(let i = 0; i < burger_menu.children.length; i++)
    {
        burger_menu.children[i].classList.remove("change");
  
    }
}


//Mobile Nav Bar dissapears from screen upon scroll down and reappears upon scroll up.

//The idea here is that if a user is scrolling down, s/he is reading new information off the website and 
//probably doesn't need the nav bar at the moment. So, to unobstruct the user's reading experience, the nav bar 
//slides up and out of view.
//When a user starts scrolling up, however, the user is no longer reading new information, but rather is looking for something.
//So, the user scrolls up, the nav bar should slide back into view. 
//-------------------------------
var burgerMenu_bar1 = document.querySelector('#bar1'); //One of the bars of the burger menu icon. We'll use this to determine if 
                                                      //the pop-out menu is opened or closed. If the pop-out menu is opened, then 
                                                    //we should not slide the nav bar out of view.
var prevY = 0; //previous Y position of user's scroll

//Get the position of the header image in pixels (bottom, top, right, left).
//The nav bar will only slide out of view once we're scrolled  passed this image.
var header_img_location = document.querySelector("#index-header-img").getBoundingClientRect();


document.addEventListener('scroll', function(e){

    //If the burger menu bar contains the class 'change', that means the burger icon is currently an X shape.
    //This means that the user tapped on the burger icon in order to open the pop-up menu.
    //If this is the case, then the nav bar should not slide out of view.
    //BASICALLY, if the pop-out menu is opened and visible, the nav bar should not slide out of view.
    if(burgerMenu_bar1.classList.contains('change'))
    {
        return;
    }

    var currentY = window.scrollY; //the current Y position of the user's scroll

    //If the current scroll Y position is not passed the bottom of the header image, do not allow the nav bar 
    //to scroll up and out of sight.
    if(currentY < header_img_location.bottom)
    {
        NavBar_Mobile.classList.remove('scrollDown-navBar');
        return;
    }

    //If the current Y position is greater than the previous Y position, that means the user is scrolling down.
    if(currentY > prevY){

        //To give a little buffer, the current Y position must be greater than the previous Y position + 10 pixels. 
        //Without this little buffer, the nav bar slides out of view immediately with even the slightest scroll down.
        // I feel the 10 pixel padding gives the user a little leeway when it comes to unintentional 'micro' scrolls 
        //so that s/he can interact with the nav bar without he/her accidentally sliding it out of view due to a 'micro' scroll down. 
        if(currentY > prevY + 10) 
        {
            NavBar_Mobile.classList.add('scrollDown-navBar'); //add this class to translate the nav bar up and out of view.

        }        
    }
    else{
        //To give a little buffer, the current Y Position must be less than the previous Y Position - 4 pixels.
        //Sometimes when the user scrolls down, when he/she lets go of the downward scroll motion,
        //he/she may accidentally scroll up a little bit, which would automatically trigger the nav bar to slide onto the screen.
        //Having the nav bar slide back into view upon this unintended micro scroll in the upward direction
        //is a little jarring and looks slightl buggy. To remedy this, some padding is added such that the user
        //would need to scroll up at least a couple of pixels before the nav bar is displayed.
        if(currentY < prevY - 4){
            NavBar_Mobile.classList.remove('scrollDown-navBar'); //remove this class to translate the nav bar back within the screen's view.
        }
    }

    //Update the previous Y position of the user's scroll to accurately represent where they are on the page.
    prevY = currentY;



});