//import { getAllNews, getNewsItem } from "../../services/newsService.js";
import { getAllReports, getReport, reportStatus } from "../../services/reportService.js";
import { reportMorning, reportEvening } from "../../services/reportService.js";

const getNews = async({render}) => {
    render('index.ejs', { news: await getAllNews() } );
}

const getItem = async({params, render}) => {
    const content = await getNewsItem(params.id);
    console.log(content);
    render('news-item.ejs', content);
}


const getMorningReport = async({render}) => {
    render('report_morning.ejs');
}

const getEveningReport = async({render}) => {
    render('report_evening.ejs');
}

// On report choosing page, show report completion status for the day
const getReporting = async ({render, session}) => {
    // TODO: get user_id from session
    render ('report_choose.ejs', await reportStatus(1));
}

// Renders report.ejs with the matching params
const showReport = async({params, render}) => {
    render('report.ejs', await getReport(params.id));
}

// Shows all reports to the user.
const showAllReports = async({render}) => {
    render('reports.ejs', {reports: await getAllReports() });
}

export { getNews, getItem };
export { getMorningReport, getEveningReport, showAllReports, showReport, getReporting };