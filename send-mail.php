<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $recaptchaSecret = '6Lf6n0UqAAAAACxMJPX52ug39fE556IN3L3RKM5F'; // replace with your secret key
    $recaptchaResponse = $_POST['g-recaptcha-response'];

    // Verify reCAPTCHA
    $verify = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$recaptchaSecret}&response={$recaptchaResponse}");
    $captchaSuccess = json_decode($verify);

    if (!$captchaSuccess->success) {
        echo "captcha_error";
        exit;
    }
    // Get form fields
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['inputEmail']));
    $phone = htmlspecialchars(trim($_POST['phone']));
    $message = htmlspecialchars(trim($_POST['message']));
    $enquiryFrom = htmlspecialchars(trim($_POST['txtEnquiryFrom']));

    // Set email variables
    $to = "info@vivahalive.com"; // Replace with your email address
    $subject = "New Contact Us Message";
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    $body = "
        <h3>You have received a new message from your website contact form:</h3>
        <p><strong>Name:</strong> {$name}</p>
        <p><strong>Email:</strong> {$email}</p>
        <p><strong>Phone:</strong> {$phone}</p>
        <p><strong>Message:</strong><br>{$message}</p>
        <p><strong>Enquiry From:</strong> {$enquiryFrom}</p>
    ";

    // Send email
    if (mail($to, $subject, $body, $headers)) {
        echo "success";
    } else {
        echo "error";
    }
} else {
    echo "invalid";
}
?>
