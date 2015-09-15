sendMailSaveHTML = function (to, subject, intro, mainhead, mainsummary, whatnext, buttoncaption, closing, fileName) {
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

    var fs = Npm.require('fs');
    var filePath = 'd:/' + fileName + ".html";

    fs.writeFileSync(filePath, contentTemplate);
    return true;
}

sendMailTemplate = function (to, subject, intro, mainhead, mainsummary, whatnext, buttoncaption, closing) {
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

sendMail = function (to, subject, contentTemplate) {
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

sendMailNewTicketClient = function (to, number, subject, detail) {
    var contentTemplate = Assets.getText('template/newticket_client.html');
    contentTemplate = contentTemplate.replace("{{number}}", number);
    contentTemplate = contentTemplate.replace("{{subject}}", subject);
    contentTemplate = contentTemplate.replace("{{detail}}", detail);
    var mailsub = "Ticket #" + number;
    sendMail(to, mailsub, contentTemplate);
}

sendMailNewTicketStaff = function (client, number, subject, detail) {
    var toemail = [];
    var staff = Staffs.find({role: "ADMIN"}).fetch();
    staff.forEach(function (item) {
        toemail.push(item.email);
    });
    var contentTemplate = Assets.getText('template/newticket_staff.html');
    contentTemplate = contentTemplate.replace("{{client}}", client);
    contentTemplate = contentTemplate.replace("{{subject}}", subject);
    contentTemplate = contentTemplate.replace("{{detail}}", detail);
    var mailsub = "Ticket #" + number;
    sendMail(toemail, mailsub, contentTemplate);
}

sendMailNewCommentStaff = function (number, client, comment) {
    var toemail = [];
    var staff = Staffs.find({role: "ADMIN"}).fetch();
    staff.forEach(function (item) {
        toemail.push(item.email);
    });
    var ticketact = TicketActivities.findOne({ticketid: item._id, event: "SA"}, {sort: {timestamp: -1}});
    if (ticketact) {
        staffid = ticketact.assignto;
        var staff = Staffs.findOne(staffid);
        if (staff) {
            toemail.push(staff.email);
        }
    }
    var finaltoemails = _.uniq(toemail, false);

    var contentTemplate = Assets.getText('template/newcomment_staff.html');
    contentTemplate = contentTemplate.replace("{{client}}", client);
    contentTemplate = contentTemplate.replace("{{comment}}", comment);
    var mailsub = "Ticket #" + number;
    sendMail(finaltoemails, mailsub, contentTemplate);
}

sendMailNewCommentClient = function (to, number, comment) {
    var contentTemplate = Assets.getText('template/newcomment_staff.html');
    contentTemplate = contentTemplate.replace("{{client}}", "");
    contentTemplate = contentTemplate.replace("{{comment}}", comment);
    var mailsub = "Ticket #" + number;
    sendMail(to, mailsub, contentTemplate);
}

sendMailTicketClosedClient = function (to, number, subject, detail) {
    var contentTemplate = Assets.getText('template/closeticket_client.html');
    contentTemplate = contentTemplate.replace("{{number}}", number);
    contentTemplate = contentTemplate.replace("{{subject}}", subject);
    contentTemplate = contentTemplate.replace("{{detail}}", subject);
    var mailsub = "Ticket #" + number;
    sendMail(to, mailsub, contentTemplate);
}

sendMailTicketClosedStaff = function (to, number, client, subject, detail) {
    var contentTemplate = Assets.getText('template/closeticket_staff.html');
    contentTemplate = contentTemplate.replace("{{number}}", number);
    contentTemplate = contentTemplate.replace("{{client}}", client);
    contentTemplate = contentTemplate.replace("{{subject}}", subject);
    contentTemplate = contentTemplate.replace("{{detail}}", detail);
    var mailsub = "Ticket #" + number;
    sendMail(to, mailsub, contentTemplate);
}

sendMailTicket = function (to, number, subject, comment) {
    var intro = "Cheers! This ticket has been closed by the client.";
    var mainhead = "{{client}}";
    var mailsub = "Ticket #{{number}}";
    var mainsummary = "<strong>{{subject}}</strong><br></br>{{detail}}";
    var whatnext = "Start working on next issue. If there is no issue assigned to you, ask your PM or RM about next task. If nothing else is left : Go grab a beer!";
    var buttoncaption = "Go to your portal";
    var closing = "Our motto is to give the client the best and timely solution";
    return sendMailSaveHTML(to, mailsub, intro, mainhead, mainsummary, whatnext, buttoncaption, closing, "closeticket_staff");
}