//import * as helloService from "../../services/helloService.js";
import * as sumService from "../../services/summaryService.js";

const getHello = async({response}) => {
    response.body = { message: await helloService.getHello() };
};

const setHello = async({request, response}) => {
    const body = request.body({type: 'json'});
    const document = await body.value;
    helloService.setHello(document.message);
    response.status = 200;
};

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