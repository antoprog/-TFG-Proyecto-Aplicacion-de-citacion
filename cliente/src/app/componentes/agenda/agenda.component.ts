import {ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild,} from '@angular/core';
import {endOfDay, isSameDay, isSameMonth, parseISO, startOfDay, subDays,} from 'date-fns';
import {Subject} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView,} from 'angular-calendar';
import {DetalleComponent} from "./detalle/detalle.component";
import {registerLocaleData} from '@angular/common';
import localeEs from '@angular/common/locales/es';
import {AgendaService} from "../../servicios/agenda.service";

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
export class AgendaComponent implements OnInit {
    @ViewChild('modalContent', {static: true}) modalContent!: TemplateRef<any>;

    constructor(private modal: NgbModal, private servicioAgenda: AgendaService) {
    }

    ngOnInit(): void {
        this.servicioAgenda.getAgendaByPsicologo('aa').subscribe({
            next: value => {
                for (const valor of value) {
                    valor.start = subDays(startOfDay(parseISO(String(valor.start))), 0)
                    valor.end = subDays(startOfDay(parseISO(String(valor.end))), 0)
                    this.events.push(valor)
                }
                this.refresh.next()
            }
        })
    }

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
    events: CalendarEvent[] = [];

    activeDayIsOpen: boolean = true;

    dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
        console.log('entra en dayClicked');
        if (isSameMonth(date, this.viewDate)) {
            this.activeDayIsOpen = !((isSameDay(this.viewDate, date) && this.activeDayIsOpen) ||
                events.length === 0);
            this.viewDate = date;
        }
    }

    eventTimesChanged({event, newStart, newEnd}: CalendarEventTimesChangedEvent): void {
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
        console.log('ACTION', action)
        console.log('EVENT', event)
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
