Schemas.Ticket = new SimpleSchema({
    number: {
        type: Number,
        label: "Ticket Number",
        unique: true,
    },
    subject: {
        type: String,
        label: "Subject",
        min: 20
    },
    serviceid: {
        type: String,
        label: "Service ID"
    },
    detail: {
        type: String,
        label: "Detailed Summary",
        max: 10000
    },
    clientid: {
        type: String,
        label: "Client ID",
    },
    status: {
        type: String,
        label: "Status",
    },
    timestamp: {
        type: Date,
        label: "timestamp",
        optional: true
    }
});

Tickets.attachSchema(Schemas.Ticket);