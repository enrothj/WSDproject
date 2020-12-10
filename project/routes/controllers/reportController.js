//import { getAllNews, getNewsItem } from "../../services/newsService.js";
import { getAllReports, getReport, reportStatus} from "../../services/reportService.js";
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
    render('./reporting/report_morning.ejs');
}

const getEveningReport = async({render}) => {
    render('./reporting/report_evening.ejs');
}

// On report choosing page, show report completion status for the day
const getReporting = async ({render, session}) => {
    // TODO: get user_id from session
    render ('./reporting/report_choose.ejs', await reportStatus(1));
}

// Renders report.ejs with the matching params
const showReport = async({params, render}) => {
    render('./reporting/report.ejs', await getReport(params.id));
}

// Shows all reports to the user.
const showAllReports = async({render}) => {
    render('./reporting/reports.ejs', {reports: await getAllReports() });
}


const postMorningReport = async ({request, render}) => {
    const body = request.body();
    const params = await body.value;

    const report = {};
    report.mood = params.get('mood');
    console.log(report.mood);
    report.sleep_duration = params.get('sleep_duration');
    console.log(report.sleep_duration);
    report.sleep_quality = params.get('sleep_quality');
    console.log(report.sleep_quality);
    report.date = params.get('date');
    console.log(report.date);
    report.user_id = 1; // TODO auth

    await reportMorning(report);

    // TODO: validation
    render('./reporting/report_morning.ejs');
}

const postEveningReport = async ({request, render}) => {
    const body = request.body();
    const params = await body.value;

    const report = {};
    report.mood = params.get('mood');
    report.sport = params.get('sport');
    report.study = params.get('study');
    report.eating = params.get('eating');
    report.date = params.get('date');
    report.user_id = 1; // TODO auth

    await reportEvening(report);

    // TODO: validation
    render('./reporting/report_evening.ejs');
}

export { getNews, getItem };
export { getMorningReport, getEveningReport, showAllReports, showReport, getReporting, postMorningReport, postEveningReport };