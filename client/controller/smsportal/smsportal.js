Template.smsportal.helpers({
 allStaffs: function () {
        return Staffs.find({});
    }
});

Template.smsportal.events({
    'click #mybtn': function (e, t) {
    $("input:checked").each(function(){
    var staffname=$(this).attr('staffname');
    var email=$(this).attr('email');
    var mobile=$(this).attr('mobile');
    var msg = t.find('#messages').value;
    Meteor.call('smsPortalDetails', email, mobile, staffname, msg, SessionStore.get("myid"), function (error, result) {
            alert(result.message);
        });
});    
    }
});

