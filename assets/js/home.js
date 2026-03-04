$(document).ready(function () {
  //navbar hover slider function
  $('#owl-carousel').owlCarousel({
    loop: true,
    margin: 30,
    dots: true,
    nav: true,
    items: 1,
    autoHeight: true,
  })
  $('#owl-carouselMobile').owlCarousel({
    loop: true,
    margin: 30,
    dots: true,
    nav: true,
    items: 1,
    autoHeight: true,
  })


  //on click down arrow scroll down to next slide 
  document.querySelector('.downScroll').addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector('#yourUltimateParent');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });



  //display hours content information based on click action
  $('.displayHours').on('click', function () {
    $('.displayHours').removeClass('selected');
    $(this).addClass('selected');
    $('.hoursContent').addClass('d-none');
    let index = $(this).attr("index");
    $('.hoursContent').each(function () {
      if ($(this).hasClass('hours' + index)) {
        $(this).removeClass('d-none');
      }
    });
  });


});

//image display
document.addEventListener('DOMContentLoaded', function () {
  var modal = document.getElementById("imageModal");
  var modalImg = document.getElementById("popupImg");
  var closeBtn = document.getElementsByClassName("close")[0];
  var prevBtn = document.getElementsByClassName("prev")[0];
  var nextBtn = document.getElementsByClassName("next")[0];

  var images = document.querySelectorAll('.weddingPhotography img');
  var currentIndex = 0;

  function showModal(index) {
    modal.style.display = "flex";
    modalImg.src = images[index].src;
    currentIndex = index;
  }

  images.forEach(function (image, index) {
    image.addEventListener('click', function () {
      showModal(index);
    });
  });

  closeBtn.onclick = function () {
    modal.style.display = "none";
  };

  // Navigate to the next image
  nextBtn.onclick = function () {
    currentIndex = (currentIndex + 1) % images.length;
    showModal(currentIndex);
  };

  // Navigate to the previous image
  prevBtn.onclick = function () {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showModal(currentIndex);
  };

  // Close modal when clicking anywhere outside the image
  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});

//image full view
document.addEventListener('DOMContentLoaded', function () {
  var modal = document.getElementById("imageModal");
  var modalImg = document.getElementById("popupImg");
  var closeBtn = document.getElementsByClassName("close")[0];
  var prevBtn = document.getElementsByClassName("prev")[0];
  var nextBtn = document.getElementsByClassName("next")[0];
  var images = document.querySelectorAll('.weddingPhotoSection');
  var currentIndex = 0;
  function showModal(index) {
    modal.style.display = "flex";
    var imageDiv = images[index].children[0];
    let backgroundImg = window.getComputedStyle(imageDiv).getPropertyValue('background-image');
    let imageUrl = backgroundImg.slice(5, -2); // Removes 'url(' and ')'
    modalImg.src = imageUrl;
    currentIndex = index;
  }
  images.forEach(function (image, index) {
    image.addEventListener('click', function () {
      showModal(index);
    });
  });
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };
  // Navigate to the next image
  nextBtn.onclick = function () {
    currentIndex = (currentIndex + 1) % images.length;
    showModal(currentIndex);
  };
  // Navigate to the previous image
  prevBtn.onclick = function () {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showModal(currentIndex);
  };
  // Close modal when clicking anywhere outside the image
  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});




