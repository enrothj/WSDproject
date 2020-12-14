import * as sumService from "../../services/summaryService.js";

// Returns a summary of all users' reports for the last 7 days
const getSummary = async ({response}) => {
    const result = await sumService.getLastWeekAverages();
    response.body = result; // TODO error situations=?
    response.status = 200;
}

// Gets a summary for the requested date
const getDaySummary = async ({params, response}) => {
    const date = new Date();
    date.setFullYear(params.year);
    date.setMonth(params.month-1);
    date.setDate(params.day); 

    const result = await sumService.getAveragesDay(date);
    response.body = result;
    response.status = 200;
}

export { getSummary, getDaySummary }