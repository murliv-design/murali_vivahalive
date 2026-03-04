
$(document).ready(function () {
    

    // Handle opening the modal and playing the video from the start
    $('#playDemoBtn').on('click', function() {
         var video = $('#demo-video').get(0); // Get the DOM element from jQuery object
         $('#play-demo-modal').show();
         video.currentTime = 0;  // Reset the video to the beginning
         video.play();  // Play the video
     });
 
     // Handle closing the modal and pausing the video
     $('#btn-close').on('click', function() {
         var video = $('#demo-video').get(0); // Get the DOM element from jQuery object
         $('#play-demo-modal').hide();
         video.pause();  // Pause the video
     });     
 });