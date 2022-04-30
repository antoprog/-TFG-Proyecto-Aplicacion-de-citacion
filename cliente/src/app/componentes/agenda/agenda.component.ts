import {ChangeDetectionStrategy, Component, TemplateRef, ViewChild,} from '@angular/core';
import {
    addDays,
    addHours,
    endOfDay,
    endOfMonth,
    isSameDay,
    isSameMonth,
    parseISO,
    startOfDay,
    subDays,
} from 'date-fns';
import {Subject} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent,
    CalendarView,
    DAYS_OF_WEEK,
} from 'angular-calendar';
import {DetalleComponent} from "./detalle/detalle.component";
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs, 'es')

const colors: any = {
    red: {
        primary: '#ad2121',
        secondary: '#FAE3E3',
    },
    blue: {
        primary: '#1e90ff',
        secondary: '#D1E8FF',
    },
    yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA',
    },
};

@Component({
    selector: 'app-agenda',
    templateUrl: './agenda.component.html',
    styleUrls: ['./agenda.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgendaComponent {
    @ViewChild('modalContent', {static: true}) modalContent!: TemplateRef<any>;

    weekStartsOn = "1";

    locale = 'es'

    view: CalendarView = CalendarView.Month;

    CalendarView = CalendarView;

    viewDate: Date = new Date();

    modalData!: {
        action: string;
        event: CalendarEvent;
    };

    actions: CalendarEventAction[] = [
        {
            label: '<i class="fas fa-fw fa-pencil-alt"></i>',
            a11yLabel: 'Edit',
            onClick: ({event}: { event: CalendarEvent }): void => {
                this.handleEvent('Edited', event);
            },
        },
        {
            label: '<i class="fas fa-fw fa-trash-alt"></i>',
            a11yLabel: 'Delete',
            onClick: ({event}: { event: CalendarEvent }): void => {
                this.events = this.events.filter((iEvent) => iEvent !== event);
                this.handleEvent('Deleted', event);
            },
        },
    ];

    refresh = new Subject<void>();

    events: CalendarEvent[] = [
        {
            start: subDays(startOfDay(parseISO('2022-04-01T14:34:32.999Z')), 0),
            end: addDays(new Date('2022-04-02T14:34:32.999Z'), 0),
            title: 'A 3 day event',
            color: colors.red,
            actions: this.actions,
            allDay: true,
            resizable: {
                beforeStart: true,
                afterEnd: true,
            },
            draggable: true,
        },
        {
            start: subDays(startOfDay(parseISO('2022-04-03T14:34:32.999Z')), 0),
            end: addDays(parseISO('2022-04-04T14:34:32.999Z'), 0),
            title: 'A 3 day event1',
            color: colors.red,
            actions: this.actions,
            allDay: true,
            resizable: {
                beforeStart: true,
                afterEnd: true,
            },
            draggable: true,
        },
        {
            start: startOfDay(new Date()),
            title: 'An event with no end date',
            color: colors.yellow,
            actions: this.actions,
        },
        {
            start: subDays(endOfMonth(new Date()), 3),
            end: addDays(endOfMonth(new Date()), 3),
            title: 'A long event that spans 2 months',
            color: colors.blue,
            allDay: true,
        },
        {
            start: addHours(startOfDay(new Date()), 2),
            end: addHours(new Date(), 2),
            title: 'A draggable and resizable event',
            color: colors.yellow,
            actions: this.actions,
            resizable: {
                beforeStart: true,
                afterEnd: true,
            },
            draggable: true,
        },
    ];

    activeDayIsOpen: boolean = true;

    constructor(private modal: NgbModal) {

    }

    dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
        console.log('entra en dayClicked');
        if (isSameMonth(date, this.viewDate)) {
            this.activeDayIsOpen = !((isSameDay(this.viewDate, date) && this.activeDayIsOpen) ||
                events.length === 0);
            this.viewDate = date;
        }
    }

    eventTimesChanged({event,newStart,newEnd}: CalendarEventTimesChangedEvent): void {
        console.log('NEW START', newStart);
        this.events = this.events.map((iEvent) => {
            if (iEvent === event) {
                return {
                    ...event,

                    start: newStart,
                    end: newEnd,
                };
            }
            return iEvent;
        });
        this.handleEvent('Dropped or resized', event);
    }

    handleEvent(action: string, event: CalendarEvent): void {
        console.log('ACTION',action)
        console.log('EVENT',event)
        this.modalData = {event, action};
        const ref = this.modal.open(DetalleComponent, {size: 'lg'});
        ref.componentInstance.evento = event
    }

    addEvent(): void {
        this.events = [
            ...this.events,
            {
                title: 'New event',
                start: startOfDay(new Date()),
                end: endOfDay(new Date()),
                color: colors.red,
                draggable: true,
                resizable: {
                    beforeStart: true,
                    afterEnd: true,
                },
            },
        ];
    }

    deleteEvent(eventToDelete: CalendarEvent) {
        this.events = this.events.filter((event) => event !== eventToDelete);
    }

    setView(view: CalendarView) {
        this.view = view;
    }

    closeOpenMonthViewDay() {
        this.activeDayIsOpen = false;
    }
}
