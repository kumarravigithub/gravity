Schemas.Ticket = new SimpleSchema({
    ticketid: {
        type: String,
        label: "Ticket ID - related",
    },
    event: {
        type: String,
        label: "Event - OPEN, CLOSE, HOLD etc",
    },
    userid: {
        type: String,
        label: "User ID creating this event"
    },
    usertype: {
        type: String,
        label: "User type - STAFF / CLIENT",
    },
    comment: {
        type: String,
        label: "Client ID",
    },
    isInternal: {
        type: Boolean,
        label: "Internal Comments won't be shown",
    },
    timestamp: {
        type: Date,
        label: "timestamp"
    }
});

Tickets.attachSchema(Schemas.Ticket);