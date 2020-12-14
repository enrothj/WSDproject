//import { getAllNews, getNewsItem } from "../../services/newsService.js";
import { validate, required, isNumeric, numberBetween, isDate } from "https://deno.land/x/validasaur@v0.15.0/mod.ts";
import { getAllReports, getReport, reportStatus} from "../../services/reportService.js";
import { reportMorning, reportEvening } from "../../services/reportService.js";
import { getUserId, authenticationStatus } from "../../services/authenticationService.js";

const getNews = async({render}) => {
    render('index.ejs', { news: await getAllNews() } );
}

const getItem = async({params, render}) => {
    const content = await getNewsItem(params.id);
    console.log(content);
    render('news-item.ejs', content);
}

const getMorningReport = async({render}) => {
    const date = new Date();
    const today = date.toJSON().split('T')[0];
    const data = {
        mood: 1,
        sleep_duration: 0,
        sleep_quality: 1,
        date: today,
        errors: [],
        success: "",
    }
    render('./reporting/report_morning.ejs', data);
}

const getEveningReport = async({render}) => {
    const date = new Date();
    const today = date.toJSON().split('T')[0];
    const data = {
        mood: 1,
        sport: 0,
        study: 0,
        eating: 1,
        date: today,
        errors: [],
        success: "",
    }
    render('./reporting/report_evening.ejs', data);
}

// On report choosing page, show report completion status for the day
const getReporting = async ({render, session}) => {
    const user_id = await getUserId(session);
    const data = await reportStatus(user_id);
    data.authStatus = await authenticationStatus(session);

    render ('./reporting/report_choose.ejs', data);
}

// Renders report.ejs with the matching params
const showReport = async({params, render}) => {
    render('./reporting/report.ejs', await getReport(params.id));
}

// Shows all reports to the user.
const showAllReports = async({render}) => {
    render('./reporting/reports.ejs', {reports: await getAllReports() });
}

// Validate the morning report form data
const validateMorningForm = async (data) => {
    const validationRules = {
        mood: [required, isNumeric, numberBetween(1, 5)],
        sleep_duration: [required, isNumeric, numberBetween(0, 24)],
        sleep_quality: [required, isNumeric, numberBetween(1, 5)],
        date: [required, isDate],
    };

    return await validate(data, validationRules);
}

const postMorningReport = async ({request, session, render, response}) => {
    const body = request.body();
    const params = await body.value;

    const data = {
        mood: Number(params.get('mood')),
        sleep_duration: Number(params.get('sleep_duration')),
        sleep_quality: Number(params.get('sleep_quality')),
        date: params.get('date'),
        user_id: await getUserId(session),
        errors: [],
        success: "",
    };

    // Validate the form
    const [passes, errors] = await validateMorningForm(data);

    if (!passes) {
        data.errors = errors;
        render("reporting/report_morning.ejs", data);
        return;
    }

    await reportMorning(data);
    data.success = "Successfully submitted morning report."

    render('./reporting/report_morning.ejs', data);
    response.redirect("/behavior/reporting");
}

// Validation for the evening report form data
const validateEveningForm = async (data) => {
    const validationRules = {
        mood: [required, isNumeric, numberBetween(1, 5)],
        sport: [required, isNumeric, numberBetween(0, 24)],
        study: [required, isNumeric, numberBetween(1, 5)],
        eating: [required, isNumeric, numberBetween(1,5)],
        date: [required, isDate],
    };

    return await validate(data, validationRules);
}

const postEveningReport = async ({request, session, render, response}) => {
    const body = request.body();
    const params = await body.value;

    const data = {
        mood: Number(params.get('mood')),
        sport: Number(params.get('sport')),
        study: Number(params.get('study')),
        eating: Number(params.get('eating')),
        date: params.get('date'),
        user_id: await getUserId(session), // TODO auth
        errors: [],
        success: "",
    };
    
    // Validate the form
    const [passes, errors] = await validateEveningForm(data);

    if (!passes) {
        data.errors = errors;
        render("reporting/report_evening.ejs", data);
        return;
    }

    await reportEvening(data);

    render('./reporting/report_evening.ejs', data);
    response.redirect("/behavior/reporting");
}

export { getNews, getItem };
export { getMorningReport, getEveningReport, showAllReports, showReport, getReporting, postMorningReport, postEveningReport };