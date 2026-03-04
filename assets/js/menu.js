
//side menu toggle
$('document').ready(function () {
    $('.navbar-toggler').click(function (e) {
      e.preventDefault();
      $('.navbar-collapse').addClass('d-none')
      $('.sideMenu').toggleClass('w-100');
      $('.menuOpen, .menuClose').toggle();
      $('.sideMenu').toggleClass('d-none');
    });
  
    //apply selected on clik of dropdown option
    $('.weddingLiveDropdown a').on('click', function () {
      $('.weddingLiveDropdown a').removeClass('active');
      $(this).addClass('active');
      $('.sideDropdown').toggle();
    })
  
    $('.menuHome').on('click', function () {
      $('.menuHome').removeClass('active');
      $(this).addClass('active');
    })
    


  //scroll-top icon function
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('#scroll').fadeIn();
    } else {
      $('#scroll').fadeOut();
    }
  });
  $('#scroll').click(function () {
    $("html, body").animate({
      scrollTop: 0
    }, 600);
    return false;
  });

  //wedding live dropdown hover
  $('.dropdown-hover').hover(function () {
    $(this).find('.dropdown-menu').stop(true, true).delay(200).slideToggle(500);
  }, function () {
    $(this).find('.dropdown-menu').stop(true, true).delay(200).slideUp(500);
  });

  //dropdown open on click of wedding live in side-menu
  $('.sideMenuProfiles').children().first().on('click', function () {
    $(this).siblings('.sideDropdown').toggle();
  });

  //close of wedding live dropdown on outside click in side-menu
  $(document).on('click', function (e) {
    if (!$(e.target).closest('.menuHome, .sideDropdown li').length) {
      $('.sideDropdown').slideUp(300);  // Hide the dropdown
    }
  });

  $('.dropdown-toggle').click(function () {
    $(this).find('.dropdown-menu').slideToggle();
  });


document.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const headerNavbar = document.querySelector('.headerNavbar');
    const logo = document.querySelector('#logo_vivahalive_svg');
  
    if (scrollY !== 0) {
      headerNavbar.classList.add('sticky');
      logo.style.fill = '#050922';
    } else {
      headerNavbar.classList.remove('sticky');
      logo.style.fill = '#FFF';
    }
  });
  })
  
  
  