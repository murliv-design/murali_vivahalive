<?php
/**
 * Created by PhpStorm.
 * User: w716843
 * Date: 09/04/18
 * Time: 2:41 PM
 */
try {
    error_reporting(0);
//    header('Access-Control-Allow-Origin: *');
    require_once './Swiftmailer/lib/swift_required.php';
//    require_once __DIR__ . '/vendor/autoload.php';
    if (!empty($_POST)) {

        $recipientAddress = 'balamurugan.chandrasekaran@webwings.co.in';
//        $recipientAddress = 'info@nextologies.com';

        $contactName = $_POST['txtName'];
        $contactEmail = $_POST['txtEmail'];
        $enquiryFromWebsite = "Nextologies Website";
        $contactNo = !empty($_POST['txtPhone']) ? $_POST['txtPhone'] : null;
        $enquiryMessage = $_POST['taMessage'];
        $enquiryFromPage = $_POST['txtEnquiryFrom'];
        $mailType = $_POST['txtEnquiryType'];
        $mailSubject = !empty($_POST['txtSubject']) ? $_POST['txtSubject'] : null;

        $senderName = "Nextologies Website";
        $mailHost = "smtp.gmail.com";
        $portAddress = "587";
        $senderEmail = "noreply@nextologies.com";
        $senderPassword = "NextologiesPassword";
        $mailSubject = "Form submission at Nextologies Website by - " .$contactName . " : " . $mailSubject;
        $encryptionType = "tls";


        $imageURL = "http://nextologies.com/images/logo-black.png?v=1.1";
        $emailContent = file_get_contents("ContactUsEmailTemplate.php");
        $emailContent = str_replace("IMAGE_URL", $imageURL, $emailContent);
        $emailContent = str_replace("NAME", $contactName, $emailContent);
        $emailContent = str_replace("EMAIL_ID", $contactEmail, $emailContent);
        $emailContent = str_replace("STUDIOTYPE_STYLE", "display:none;", $emailContent);
        if ($contactNo == NULL)
            $emailContent = str_replace("PHONE_NUMBER_STYLE", "display:none;", $emailContent);

        $emailContent = str_replace("PHONE_NUMBER", $contactNo, $emailContent);
        $emailContent = str_replace("MESSAGE", $enquiryMessage, $emailContent);
        $emailContent = str_replace("SUBJECT", $enquiryFromPage . " " . $mailType, $emailContent);


        // Create the Transport
        $transport = (new Swift_SmtpTransport($mailHost, $portAddress, $encryptionType))
            ->setUsername($senderEmail)
            ->setPassword($senderPassword)
            ->setStreamOptions(array('ssl' => array('allow_self_signed' => true, 'verify_peer' => false)));

        // Create the Mailer using your created Transport
        $mailer = new Swift_Mailer($transport);

        // Create a message
        $message = (new Swift_Message($mailSubject))
            ->setFrom([$senderEmail => $enquiryFromWebsite])
            ->setTo([$recipientAddress => $contactName])
            ->setBody($emailContent);
        //And optionally an alternative body
        $message->addPart($emailContent, 'text/html');

        // Send the message
        $result = $mailer->send($message);


        $emailResponseContent = file_get_contents("mailTemplate.html");
        $emailResponseSubject = "Thanks for reaching out!";
        $emailResponseContent = str_replace("CUSTOMER_NAME", $contactName, $emailResponseContent);
        
        //CUSTOMER_NAME
        // Create a Response message
        $message = (new Swift_Message($emailResponseSubject))
            ->setFrom([$senderEmail => "Nextologies"])
            ->setTo([$contactEmail => $contactName])
            ->setBody($emailResponseContent);
        //And optionally an alternative body
        $message->addPart($emailResponseContent, 'text/html');
        // Send the response message
        $result = $mailer->send($message);

        echo $result;
    } else
        echo "No data";
} catch (Exception $exception) {

    echo $exception->getMessage();
//    echo false;
}
