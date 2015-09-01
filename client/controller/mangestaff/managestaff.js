Template.managestaff.helpers({
    isEdit: function () {
        return SessionStore.get('isEditingStaff');
    },
    editingStaffRow: function () {
        console.log(Staffs.findOne(SessionStore.get('editstaffid')));
        return Staffs.findOne(SessionStore.get('editstaffid'));
    },
    TicketList: function () {
        return Staffs.find({}).fetch();
    },
    settings: function () {
        return {
            collection: Staffs,
            rowsPerPage: 10,
            showFilter: true,
            fields: ['name', 'email', {
                    key: 'action',
                    label: 'Action',
                    fn: function (value, object) {
                        return new Spacebars.SafeString('<a id="edit" staffid="' + object._id + '" class="btn btn-default">Edit</a>  <a id="delete" staffid="' + object._id + '" class="btn btn-danger">Delete</a>');
                    }
                }]
        };
    }
});
Template.managestaff.events({
    'click #delete': function (e, t) {
        var staffid = $(e.currentTarget).attr("staffid")
        console.log(staffid);
        bootbox.confirm("This is just an old boring before-delete-confirmation. Are you sure you want to delete this record?", function (result) {
            if (result) {
                SessionStore.set("loading", true);
                Meteor.call('deleteStaff', staffid, SessionStore.get("myid"), function (error, result) {
                    SessionStore.set("loading", false);
                });
            }
        });
    },
    'click #edit': function (e, t) {
        SessionStore.set("editstaffid", $(e.currentTarget).attr("staffid"));
        SessionStore.set("isEditingStaff", true);
    },
    'submit #editstaff': function (e, t) {
        e.preventDefault();
        SessionStore.set("isEditingStaff", false);
    },
    'submit #newstaff': function (e, t) {
        e.preventDefault();
        // retrieve the input field values
        var name = t.find('#name').value
        var role = t.find('#sel1').value;
        var email = t.find('#email').value;
        var password = t.find('#password').value;
        SessionStore.set("loading", false);
        Meteor.call('newStaff', name, role, email, password, SessionStore.get("myid"), function (error, result) {
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
    },
    'keydown #supportemail': function (e, t) {
        SessionStore.set("loginerror", undefined);
    },
    'keydown #password': function (e, t) {
        SessionStore.set("loginerror", undefined);
    }
});