Schemas.Service = new SimpleSchema({
    name: {
        type: String,
        label: "Service's Name",
    },
    description: {
        type: String,
        label: "Description",
    },
    clientid: {
        type: String,
        label: "Client",
    },
    timestamp: {
        type: Date,
        label: "timestamp"
    }
});

Services.attachSchema(Schemas.Service);