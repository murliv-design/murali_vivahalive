<?php
try {
    error_reporting(0);
    header('Access-Control-Allow-Origin: *');
    require_once './SwiftMailer/lib/swift_required.php';
    if (!empty($_POST)) {

        $recipientAddress = 'balamuruganc@nextologies.com';

        $contactName = $_POST['name'];
        $contactEmail = $_POST['inputEmail'];
        $contactPhone = $_POST['phone'];
        $enquiryFromWebsite = "Vivahalive Website";
        $enquiryMessage = $_POST['message'];
        $enquiryFromPage = $_POST['txtEnquiryFrom'];
        // $mailType = $_POST['txtEnquiryType'];
        $mailSubject = !empty($_POST['txtSubject']) ? $_POST['txtSubject'] : null;

        $senderName = "Vivahalive Website";
        $mailHost = "smtp.gmail.com";
        $portAddress = "587";
        $senderEmail = "balamuruganc@vivahalive.com";
        $senderPassword = "Pa55WWord";
        $mailSubject = "Form submission at Vivahalive Website by - " .$contactName . " : " . $mailSubject;
        $encryptionType = "tls";


        $imageURL = "https://www.vivahalive.com/assets/img/logo_vivahalive_svg.svg";
        $emailContent = file_get_contents("ContactUsEmailTemplate.php");
        // $emailContent = str_replace("IMAGE_URL", $imageURL, $emailContent);
        $emailContent = str_replace("NAME", $contactName, $emailContent);
        $emailContent = str_replace("EMAIL_ID", $contactEmail, $emailContent);
        $emailContent = str_replace("MESSAGE", $enquiryMessage, $emailContent);
        $emailContent = str_replace("PHONE_ID", $contactPhone, $emailContent);
        $emailContent = str_replace("SUBJECT", $enquiryFromPage, $emailContent);


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


        $emailResponseContent = file_get_contents("mailTemplate.php");
        $emailResponseSubject = "Thanks for reaching out!";
        $emailResponseContent = str_replace("NAME", $contactName, $emailResponseContent);
        
        //CUSTOMER_NAME
        // Create a Response message
        $message = (new Swift_Message($emailResponseSubject))
            ->setFrom([$senderEmail => "Vivahalive Website"])
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
