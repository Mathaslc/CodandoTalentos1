function splideSlider(){
    var splide = new Splide( '#splide' );
    splide.on( 'autoplay:playing', function ( rate ) {
        console.log( rate ); // 0-1
    } );
    splide.mount();
}
function responsiveLogin(){
    if(window.outerWidth<750){
        let splide  = document.querySelector(".splide");
        let carousel  = document.querySelector(".carousel");
        let content  = document.querySelector(".content");
        let loginContainer = document.querySelector(".login-container");
        splide.style.visibility = 'hidden';
        carousel.style.visibility = 'hidden';
        content.style.display = 'inline';
        loginContainer.style.width = '75%';
    }
    else{
        let splide  = document.querySelector(".splide");
        let carousel  = document.querySelector(".carousel");
        let content  = document.querySelector(".content");
        let loginContainer = document.querySelector(".login-container");
        splide.style.visibility = 'visible';
        carousel.style.visibility = 'visible';
        content.style.display = 'flex';
        loginContainer.style.width = '40%';

    }
}

