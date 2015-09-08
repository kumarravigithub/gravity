sendMail = function (to, subject, intro, mainhead, mainsummary, whatnext, buttoncaption, closing) {
    var contentTemplate = Assets.getText('template/email.html');
    contentTemplate = contentTemplate.replace("{{intro}}", intro);
    contentTemplate = contentTemplate.replace("{{mainhead}}", mainhead);
    contentTemplate = contentTemplate.replace("{{mainsummary}}", mainsummary);
    contentTemplate = contentTemplate.replace("{{whatnext}}", whatnext);
    contentTemplate = contentTemplate.replace("{{buttoncaption}}", buttoncaption);
    contentTemplate = contentTemplate.replace("{{closing}}", closing);
    var messages = [];
    if (Object.prototype.toString.call(to) === '[object Array]') {

        to.forEach(function (item) {
            message = {
                "From": "support@cybuzzsc.com",
                "To": item,
                "Subject": subject,
                "HtmlBody": contentTemplate
            }
            messages.push(message);
        });
    } else {
        message = {
            "From": "support@cybuzzsc.com",
            "To": to,
            "Subject": subject,
            "HtmlBody": contentTemplate
        }
        messages.push(message);
    }

    var Postmark = Meteor.npmRequire('postmark');
    var client = new Postmark.Client("8853fc56-68a8-467b-b3c1-a48b9468e900");
    client.sendEmailBatch(messages, function (error, batchResults) {
        if (error) {
            console.log("Unable to send via postmark: " + error.message);
            return false;
        }
        console.log("Messages sent to postmark");
        return true;
    });
}

sendMailNewTicketClient = function (to, number, subject, detail, type) {
    var intro = "Your support ticket has been successfully submitted. You must please note down this ticket number as make sure you quote this number to the support staff when asked";
    var mainhead = "Ticket #" + number;
    var mailsub = mainhead;
    var mainsummary = "<strong>" + subject + "</strong></br>" + detail;
    var whatnext = "As your ticket has been submitted, it will be taken care of earliest by our support staff. A support staff will get in touch with you in no time and will help you solve your issue";
    var buttoncaption = "Go to your portal";
    var closing = "Our motto is to give you the best and timely solution";
    return sendMail(to, mailsub, intro, mainhead, mainsummary, whatnext, buttoncaption, closing);
}

sendMailNewTicketStaff = function (to, number, client, subject, detail) {
    var intro = "A new ticket has been posted.";
    var mainhead = client;
    var mailsub = "Ticket #" + number;
    var mainsummary = "<strong>" + subject + "</strong></br>" + detail;
    var whatnext = "Please attend to this ticket ASAP. Keep in touch with the client and see to it that the issue is resolved at the earliest. Keep the client in loop and be very polite. All the best.";
    var buttoncaption = "Go to your portal";
    var closing = "No client must go unnoticed";
    return sendMail(to, subject, intro, mainhead, mainsummary, whatnext, buttoncaption, closing);
}

sendMailNewCommentClient = function (to, number, client, subject, detail) {
    var intro = "A new ticket has been posted.";
    var mainhead = client;
    var mailsub = "Ticket #" + number;
    var mainsummary = "<strong>" + subject + "</strong></br>" + detail;
    var whatnext = "Please attend to this ticket ASAP. Keep in touch with the client and see to it that the issue is resolved at the earliest. Keep the client in loop and be very polite. All the best.";
    var buttoncaption = "Go to your portal";
    var closing = "No client must go unnoticed";
    return sendMail(to, subject, intro, mainhead, mainsummary, whatnext, buttoncaption, closing);
}