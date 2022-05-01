const mongoose = require('mongoose');

const agendaSchema = mongoose.Schema({
    id: String,
    start: Date,
    end: Date,
    title: String,
    color: {
        primary: String,
        secondary: String
    },
    actions: [{
        id: String,
        label: String,
        cssClass: String,
        a11yLabel: String
    }],
    allDay: Boolean,
    cssClass: String,
    resizable: {
        beforeStart: Boolean,
        afterEnd: Boolean,
    },
    draggable: Boolean,
    meta: String
})

module.exports = mongoose.model('Agenda', agendaSchema);
