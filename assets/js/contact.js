 //Accept number Only Validation
 function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

$('document').ready(function(){
    $('.contactInputQuestions').on('submit', function(event) {
        if (checkValidation() === false) {
            event.preventDefault(); 
            $(this).addClass('was-validated');
            return false;
        }
        $(this).removeClass('was-validated');
        this.submit();
    });
    $('#inputEmail').on('input', function(event){ 
        // Custom email validation
        var emailInput = $(this);
        var email = emailInput.val().trim();
    
        if (!isValidEmail(email)) {
            emailInput[0].setCustomValidity('Please enter a valid email address.');
        } else {
            emailInput[0].setCustomValidity(''); 
        }
    });

    // Custom email validation function
    function isValidEmail(email) {
        // Regular expression for validating emails with the domain ending with a dot and two letters
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }
    function checkValidation() {
        const name = $('input[name="name"]').val();
        const email = $('input[name="email"]').val();
        const phone = $('input[name="phone"]').val();
        const message = $('textarea[name="message"]').val();
                if (!name || !email || !phone || !message) {
            return false;
        }
        
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!regex.test(email)) {
            return false;
        }

    
        return true;
    }

   


     
})

