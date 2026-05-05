import { getSLHolidays } from './holidays.js';
import flatpickr from 'flatpickr';


export class CeylonHolidayPicker {
  constructor(options) {
    this.field = options.field;
    this.format = options.format || 'Y-m-d';
    this.country = options.country || 'LK';
    this.apiKey = options.apiKey;
    this.userOptions = options.flatpickrOptions || {};
    this.holidayCache = {};
    this.instance = null;
    if (!this.apiKey) {
      console.warn("Ceylondates: No Calendarific API key provided.");
    }
    this.init();
  }

  setupFlatpickrWithHolidays() {
    const userOnDayCreate = this.userOptions.onDayCreate;
    const allOptions = {
      dateFormat: this.format,
      onYearChange: [async (dObj, dStr, fp) => {
        const newYear = fp.currentYear;
        await this.getHoliadys(newYear);
        fp.redraw();
      }],
      ...this.userOptions,
      onDayCreate: (dObj, dStr, fp, dayElem) => {
        const dateStr = dayElem.dateObj.toISOString().split('T')[0];
        const year = dayElem.dateObj.getFullYear();

        const yearHolidays = this.holidayCache[year] || [];
        const holiday = yearHolidays.find(h => h.date === dateStr);
        if (holiday) {
          dayElem.classList.add("is-sl-holiday");
          dayElem.setAttribute("title", holiday.name);
          if(holiday.name.toLowerCase().includes('poya')) dayElem.classList.add('is-poya');
        }
        if (typeof userOnDayCreate === 'function') {
          userOnDayCreate(dObj, dStr, fp, dayElem);
        }
      }
    };
    this.instance = flatpickr(this.field, allOptions);
  }
  async init() {
    const currentYear = new Date().getFullYear();
    await this.getHoliadys(currentYear);
    //initialize calander with the holidays
    this.setupFlatpickrWithHolidays();
  }
  async getHoliadys(year) {
    if (!this.holidayCache[year]) {
      const response = await getSLHolidays(year, this.apiKey, this.country);
      this.holidayCache[year] = response.map(holiday => ({
        date: holiday.date,
        name: holiday.name
      }));
    }
  }  
}
