Template.changepassword.helpers({
    myChangepassword: function () {
        return Changepassword.find({});
    }
    
});
Template.changepassword.events({
    'click a#changepass': function (e, t) {
        e.preventDefault();
        // retrieve the input field values
        var currentpass = t.find('#currentpass').value;
        var newpass = t.find('#newpass').value;
        var renewpass = t.find('#renewpass').value;
        if(newpass==renewpass){
        SessionStore.set("loading", false);
        Meteor.call('changepassword', currentpass, newpass, SessionStore.get("myid"), function (error, result) {
            SessionStore.set("loading", false);
            
            if (error) {
                SessionStore.set("loginerror", {status: true, message: "Some serious error. Please contact admin"});
            }
            else {
                console.log(result);
                alert(result.message);
                if (result.status) {
                    // get ticket ID and go to the ticket page.

                } else {

                }
            }
        });
        return false;
    }else{
        alert("New Password and Re-New Password Not Matched");
    }
}
    ,
    'keydown #currentpass': function (e, t) {
        SessionStore.set("loginerror", undefined);
    },
    'keydown #newpass': function (e, t) {
        SessionStore.set("loginerror", undefined);
    }
});