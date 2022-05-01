export interface Agenda {
    start: Date,
    end: Date,
    title: String,
    color: String
    actions: String,
    allDay: Boolean,
    resizable: {
        beforeStart: Boolean,
        afterEnd: Boolean,
    },
    draggable: Boolean,
}
