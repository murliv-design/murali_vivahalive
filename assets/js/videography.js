$(document).ready(function () {
    $('#owl-carousel').owlCarousel({
        loop: false,
        margin: 10,
        dots: false,
        nav: true,
        video: true,
        lazyLoad: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 3
            }
        }
    })

    $('#client-owl-carousel').owlCarousel({
        loop: true,
        margin: 30,
        dots: true,
        nav: true,
        items: 1,
    })

    //on click down arrow scroll down to next slide 
    $('.downScroll').on('click', function (e) {
        e.preventDefault();
        console.log('downscroll');
        const target = $('.section2');
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 'slow');  
        }
    });

});

//full view video play of 'play demo'
$('document').ready(function () {
    const videoModal = $('#video-modal');
    const modalVideo = $('.videoGallery #modal-video');
    const closeBtn = $('.videoGallery .close');
    $('.playDemo').on('click', function () {
        const videoSrc = $(this).attr('data-video-src');
        modalVideo.attr('src', videoSrc);
        videoModal.css('display', 'flex'); 
        modalVideo[0].play(); 
    });

    // Close the modal when the user clicks the close button
    closeBtn.on('click', function () {
        videoModal.css('display', 'none'); 
        modalVideo[0].pause(); 
        modalVideo[0].currentTime = 0;
    });

    // Close the modal when the user clicks outside of the video
    videoModal.on('click', function (e) {
        if ($(e.target).is(videoModal)) {
            videoModal.css('display', 'none');
            modalVideo[0].pause();
            modalVideo[0].currentTime = 0;
        }
    });

})


//carousel video play on click image inside same div
document.addEventListener('DOMContentLoaded', function () {
    const videoWrappers = document.querySelectorAll('.video-wrapper');

    function pauseAllVideos() {
        videoWrappers.forEach(wrapper => {
            const video = wrapper.querySelector('.photos-video');
            const image = wrapper.querySelector('.image-tilt-startframe');
            const playButton = wrapper.querySelector('.playback-control');

            if (!video.paused) {
                video.pause();
                video.currentTime = 0;
                video.style.display = 'none'; 
                image.style.opacity = '1'; 
                playButton.innerHTML = `
                   <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                        <path id="Path_51525" data-name="Path 51525" d="M44,24A20,20,0,1,0,64,44,20,20,0,0,0,44,24Zm0,36.923A16.923,16.923,0,1,1,60.923,44,16.923,16.923,0,0,1,44,60.923ZM53.277,42.7,40.969,35a1.538,1.538,0,0,0-2.354,1.3V51.692A1.538,1.538,0,0,0,40.969,53L53.277,45.3a1.538,1.538,0,0,0,0-2.608ZM41.692,48.917V39.083L49.56,44Z" transform="translate(-24 -24)" fill="#fff"/>
                    </svg>
                `;
                playButton.setAttribute('aria-label', 'Play video');
            }
        });
    }

    //pause functionality for all iframe videos
    var stopVideos = function () {
        $('#play-video').show();
        var videos = document.querySelectorAll('iframe, video');
        videos.forEach(function (video) {         
            if (video.tagName.toLowerCase() === 'video') {
                video.pause();
            }
            else if (video.tagName.toLowerCase() === 'iframe') {
                var src = video.src;
                if (src.includes("youtube.com")) {
                    const iframeWindow = video.contentWindow;
                    iframeWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
                } else {
                    video.src = src;
                }
            }
        });
    };

    //ifram play function
    $('#play-video').on('click', function (ev) {
        ev.preventDefault(); 
        console.log('play');
        pauseAllVideos();
        var video = document.querySelector('iframe'); 
        if (video && video.tagName.toLowerCase() === 'iframe') {
            var src = video.src;
            if (src.includes("youtube.com")) {
                const iframeWindow = video.contentWindow;
                iframeWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
            } else if (src.includes("vimeo.com")) {
                const iframeWindow = video.contentWindow;
                iframeWindow.postMessage('{"method":"play"}', '*');
            } else {
                video.src = src;
            }
        }
        $('#play-video').hide();
    });



//carousel video binding on click image
    videoWrappers.forEach(wrapper => {
        const video = wrapper.querySelector('.photos-video');
        const image = wrapper.querySelector('.image-tilt-startframe');
        const playButton = wrapper.querySelector('.playback-control');
        function playVideo() {
            pauseAllVideos();
            stopVideos();
            image.style.opacity = '0'; 
            video.style.display = 'block'; 
            video.play();
            playButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                    <g id="Pause" transform="translate(1474 8493)">
                        <path d="M20,3A17,17,0,0,0,7.979,32.021,17,17,0,0,0,32.021,7.979,16.889,16.889,0,0,0,20,3m0-3A20,20,0,1,1,0,20,20,20,0,0,1,20,0Z" transform="translate(-1474 -8493)" fill="#fff"/>
                        <path d="M3,3V13H13V3H3M2,0H14a2,2,0,0,1,2,2V14a2,2,0,0,1-2,2H2a2,2,0,0,1-2-2V2A2,2,0,0,1,2,0Z" transform="translate(-1462 -8481)" fill="#fff"/>
                    </g>
                </svg>
            `;
            playButton.setAttribute('aria-label', 'Pause video');
        }

        // Function to pause the video and show the image
        function pauseVideo() {
            video.pause(); 
            video.currentTime = 0; 
            video.style.display = 'none';
            image.style.opacity = '1'; 
            playButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                    <path id="Path_51525" data-name="Path 51525" d="M44,24A20,20,0,1,0,64,44,20,20,0,0,0,44,24Zm0,36.923A16.923,16.923,0,1,1,60.923,44,16.923,16.923,0,0,1,44,60.923ZM53.277,42.7,40.969,35a1.538,1.538,0,0,0-2.354,1.3V51.692A1.538,1.538,0,0,0,40.969,53L53.277,45.3a1.538,1.538,0,0,0,0-2.608ZM41.692,48.917V39.083L49.56,44Z" transform="translate(-24 -24)" fill="#fff"/>
                </svg>
            `;
            playButton.setAttribute('aria-label', 'Play video');
        }
        playButton.addEventListener('click', function () {
            if (video.paused) {
                playVideo();
            } else {
                pauseVideo();
            }
        });
    });


    //star rating functionality
    // const inputElement = document.querySelector('.stars-input');
    // const filledStars = document.querySelector('.stars-icons-filled');
    // inputElement.addEventListener('input', function (e) {
    //     const value = e.target.value;
    //     const fillPercentage = (value / 5) * 100;
    //     filledStars.style.width = `${fillPercentage}%`;
    // });
    // window.addEventListener('load', () => {
    //     filledStars.style.width = '0%'; // Initially, no stars are filled
    // });
});






