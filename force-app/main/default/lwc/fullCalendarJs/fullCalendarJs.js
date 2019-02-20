import { LightningElement } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import FullCalendarJS from '@salesforce/resourceUrl/FullCalendarJS';

/**
 * FullCalendarJs
 * @description Full Calendar JS - Lightning Web Components
 */
export default class FullCalendarJs extends LightningElement {

  fullCalendarJsInitialised = false;

  /**
   * @description Standard lifecyle method 'renderedCallback'
   *              Ensures that the page loads and renders the 
   *              container before doing anything else
   */
  renderedCallback() {

    // Performs this operation only on first render
    if (this.fullCalendarJsInitialised) {
      return;
    }
    this.fullCalendarJsInitialised = true;

    // Executes all loadScript and loadStyle promises
    // and only resolves them once all promises are done
    Promise.all([
      loadScript(this, FullCalendarJS + '/jquery.min.js'),
      loadScript(this, FullCalendarJS + '/moment.min.js'),
      loadScript(this, FullCalendarJS + '/fullcalendar.min.js'),
      loadStyle(this, FullCalendarJS + '/fullcalendar.min.css'),
      // loadStyle(this, FullCalendarJS + '/fullcalendar.print.min.css')
    ])
    .then(() => {
      // Initialise the calendar configuration
      this.initialiseFullCalendarJs();
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.error({
        message: 'Error occured on FullCalendarJS',
        error
      });
    })
  }

  /**
   * @description Initialise the calendar configuration
   *              This is where we configure the available options for the calendar.
   *              This is also where we load the Events data.
   */
  initialiseFullCalendarJs() {
    
    const ele = this.template.querySelector('div.fullcalendarjs');

    // eslint-disable-next-line no-undef
    $(ele).fullCalendar({
      header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,basicWeek,basicDay'
      },
      defaultDate: '2019-01-12',
      // defaultDate: new Date(), // default day is today
      navLinks: true, // can click day/week names to navigate views
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      events: [
        {
            title: 'All Day Event',
            start: '2019-01-01'
        },
        {
            title: 'Long Event',
            start: '2019-01-07',
            end: '2019-01-10'
        },
        {
            id: 999,
            title: 'Repeating Event',
            start: '2019-01-09T16:00:00'
        },
        {
            id: 999,
            title: 'Repeating Event',
            start: '2019-01-16T16:00:00'
        },
        {
            title: 'Conference',
            start: '2019-01-11',
            end: '2019-01-13'
        },
        {
            title: 'Meeting',
            start: '2019-01-12T10:30:00',
            end: '2019-01-12T12:30:00'
        },
        {
            title: 'Lunch',
            start: '2019-01-12T12:00:00'
        },
        {
            title: 'Meeting',
            start: '2019-01-12T14:30:00'
        },
        {
            title: 'Happy Hour',
            start: '2019-01-12T17:30:00'
        },
        {
            title: 'Dinner',
            start: '2019-01-12T20:00:00'
        },
        {
            title: 'Birthday Party',
            start: '2019-01-13T07:00:00'
        },
        {
            title: 'Click for Google',
            url: 'http://google.com/',
            start: '2019-01-28'
        }
      ]
    });
  }
}