# 🇱🇰 Ceylon Holiday Picker

A lightweight, customizable wrapper for **Flatpickr** that automatically highlights Sri Lankan Public, Bank, and Mercantile holidays. It features special styling for **Poya Days** and integrates directly with the Calendarific API for real-time holiday data.

## Features
- **Auto-Highlight:** Automatically marks Sri Lankan holidays in the calendar.
- **Poya Day Styling:** Specific CSS class (`.is-poya`) for easy identification of Poya days.
- **Fully Customizable:** Pass any standard Flatpickr options through the library.
- **Yearly Caching:** Fetches holiday data once per year and caches it to optimize API usage.
- **Dynamic Updates:** Automatically fetches and renders new holidays when the user changes the year.

---

## Installation
- npm install ceylondates
- Get your API Key from https://calendarific.com/

## Basic Usage
import { CeylonHolidayPicker } from 'ceylondates';
import "flatpickr/dist/flatpickr.min.css"; //import the flatpickr styles
import "ceylondates/src/ceylonHoliday.css //import holiday styles

const calanderWithHolidays = new CeylonHolidayPicker({
    field: "#my-input",
    apiKey: "YOUR_CALENDARIFIC_API_KEY",
    format: "date-format",
    country: "--Default country code is Sri Lanka(LK), change it as you need--"
    flatpickrOptions: {
        //Your flatpickr options
    }
});