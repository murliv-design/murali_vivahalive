document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById("imageModal");
    var modalImg = document.getElementById("popupImg");
    var closeBtn = document.getElementsByClassName("close")[0];
    var prevBtn = document.getElementsByClassName("prev")[0];
    var nextBtn = document.getElementsByClassName("next")[0];
    var images = document.querySelectorAll('.additionalImagesDiv img');
    var currentIndex = 0;
  
    function showModal(index) {
      modal.style.display = "flex";
      var imageUrl = images[index].src;
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
  