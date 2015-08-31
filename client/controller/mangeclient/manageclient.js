Template.manageclient.helpers({
    isEdit: function () {
        return SessionStore.get('isEditingClient');
    },
    editingClientRow: function () {
        console.log(Clients.findOne(SessionStore.get('editclientid')));
        return Clients.findOne(SessionStore.get('editclientid'));
    },
    TicketList: function () {
        return Clients.find({}).fetch();
    },
    settings: function () {
        return {
            collection: Clients,
            rowsPerPage: 10,
            showFilter: true,
            fields: ['name', 'email', {
                    key: 'action',
                    label: 'Action',
                    fn: function (value, object) {
                        return new Spacebars.SafeString('<a id="view" clientid="' + object._id + '" class="btn btn-default">View</a> <a id="edit" clientid="' + object._id + '" class="btn btn-default">Edit</a>  <a id="delete" clientid="' + object._id + '" class="btn btn-danger">Delete</a>');
                    }
                }]
        };
    }
});
Template.manageclient.events({
    'click #view': function (e, t) {
        var clientid = $(e.currentTarget).attr("clientid")
        console.log(clientid);
        Router.go("/service/" + clientid);
    },
    'click #delete': function (e, t) {
        var clientid = $(e.currentTarget).attr("clientid")
        console.log(clientid);
        bootbox.confirm("This is just an old boring before-delete-confirmation. Are you sure you want to delete this record?", function (result) {
            if (result) {
                SessionStore.set("loading", true);
                Meteor.call('deleteClient', clientid, SessionStore.get("myid"), function (error, result) {
                    SessionStore.set("loading", false);
                });
            }
        });
    },
    'click #edit': function (e, t) {
        SessionStore.set("editclientid", $(e.currentTarget).attr("clientid"));
        SessionStore.set("isEditingClient", true);
    },
    'submit #editclient': function (e, t) {
        e.preventDefault();
        SessionStore.set("isEditingClient", false);
    },
    'submit #newclient': function (e, t) {
        e.preventDefault();
        // retrieve the input field values
        var name = t.find('#name').value
        var email = t.find('#email').value;
        var password = t.find('#password').value;
        SessionStore.set("loading", false);
        Meteor.call('newClient', name, email, password, SessionStore.get("myid"), function (error, result) {
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