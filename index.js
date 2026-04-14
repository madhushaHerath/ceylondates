import pikaday from 'pikaday';

export class SLHolidayPicker {
  constructor(options) {
    this.apiKey = options.apiKey;
    if (!this.apiKey) {
      console.warn("Ceylondates: No Calendarific API key provided.");
    }
    this.init();
  }

  async init() {
    const getThisYear = new Date().getFullYear();
    const holidays = await getSLHolidays(getThisYear, this.apiKey);
    //initialize Pikaday
  }
}