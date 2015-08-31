Template.manageservice.helpers({
    isEdit: function () {
        return SessionStore.get('isEditingService');
    },
    editingServiceRow: function () {
        console.log(Services.findOne(SessionStore.get('editserviceid')));
        return Services.findOne(SessionStore.get('editserviceid'));
    },
    TicketList: function () {
        return Services.find({clientid: this.clientid}).fetch();
    },
    settings: function () {
        return {
            collection: Services,
            rowsPerPage: 10,
            showFilter: true,
            fields: ['name', 'description', 'clientid', {
                    key: 'action',
                    label: 'Action',
                    fn: function (value, object) {
                        return new Spacebars.SafeString('<a id="edit" serviceid="' + object._id + '" class="btn btn-default">Edit</a>  <a id="delete" serviceid="' + object._id + '" class="btn btn-danger">Delete</a>');
                    }
                }]
        };
    }
});
Template.manageservice.events({
    'click #delete': function (e, t) {
        var serviceid = $(e.currentTarget).attr("serviceid")
        console.log(serviceid);
        bootbox.confirm("This is just an old boring before-delete-confirmation. Are you sure you want to delete this record?", function (result) {
            if (result) {
                SessionStore.set("loading", true);
                Meteor.call('deleteService', serviceid, SessionStore.get("myid"), function (error, result) {
                    SessionStore.set("loading", false);
                });
            }
        });
    },
    'click #edit': function (e, t) {
        SessionStore.set("editserviceid", $(e.currentTarget).attr("serviceid"));
        SessionStore.set("isEditingService", true);
    },
    'submit #editservice': function (e, t) {
        e.preventDefault();
        SessionStore.set("isEditingService", false);
    },
    'submit #newservice': function (e, t) {
        e.preventDefault();
        // retrieve the input field values
        var name = t.find('#name').value
        var description = t.find('#description').value;
        var clientid = t.find('#clientid').value;
        SessionStore.set("loading", false);
        Meteor.call('newService', name, description, clientid, SessionStore.get("myid"), function (error, result) {
            SessionStore.set("loading", false);
            if (error) {
                SessionStore.set("loginerror", {status: true, message: "Some serious error. Please contact admin"});
            }
            else {
                console.log(result);
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