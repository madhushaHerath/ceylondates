
export async function getSLHolidays(year,API_KEY,country) {
    const url = `https://calendarific.com/api/v2/holidays?api_key=${API_KEY}&country=${country}&year=${year}`;

    try {
        const response = await fetch(url);
        const result = await response.json();

        if (result.meta && result.meta.code === 200) {
            return result.response.holidays.map(h => ({
                date: h.date.iso,
                name: h.name,   
                type: h.type[0]
            }));
        } else {
            console.error("API Error:", result.meta.error_detail);
            return [];
        }
    } catch (error) {
        console.error("Fetch Error:", error);
        return [];
    }
}