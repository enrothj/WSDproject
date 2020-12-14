import * as sumService from "../../services/summaryService.js";

// Returns a summary of all users' reports for the last 7 days
const getSummary = async ({response}) => {
    const result = await sumService.getLastWeekAverages();
    response.body = result; // TODO error situations=?
    response.status = 200;
}

const getDaySummary = async ({params, response}) => { // TODO FIX!!!
    // Make the date
    const date = `${params.year}-${params.month}-${params.day}`;
    console.log(`API request date is ${date}`);

    const result = await sumService.getAveragesDay(date);
    response.body = result;
    response.status = 200;
}
   
export { getHello, setHello };
export { getSummary, getDaySummary }