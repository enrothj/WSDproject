import * as summaryService from "../../services/summaryService.js";
import { authenticationStatus, getUserId } from "../../services/authenticationService.js";

// Shows a user's summary page
const showSummaryForUser = async ({render, session}) => {

  const user_id = await getUserId(session);
  const w_data = await summaryService.getLastWeekAveragesForUser(user_id);
  console.log(w_data);
  const m_data = await summaryService.getLastMonthAveragesForUser(user_id);
  console.log(m_data);
  const status = await authenticationStatus(session);

  const data = {
    authStatus: status,
    w_data: w_data,
    m_data: m_data,
  };

  if (Object.keys(w_data).length === 0) {
    data.w_dataFound = false;
  } else {
    data.w_dataFound = true;
  }

  if (Object.keys(m_data).length === 0) {
    data.m_dataFound = false;
  } else {
    data.m_dataFound = true;
  }

  render("./summarization/summary_user.ejs", data);
}


// Shows the landing page. Data to be rendered is the mood averages for today and yesterday.
const showLandingPage = async ({session, render}) => {
  const data = {};
  // Get today's average mood
  data.today = await summaryService.getAvgMoodToday();
  // Get yesterday's average mood
  data.yesterday = await summaryService.getAvgMoodYesterday();
  data.authStatus = await authenticationStatus(session);

  render('landing.ejs', data);
}

// Shows the averages for the requested week for the current user
const showWeekSummary = async({render, request, session}) => {
  const body = request.body();
  const params = await body.value;

  const week_input = params.get('week');
  const week = week_input.split("W")[1]; // Gets the week number

  const data = {
    user_id: await getUserId(session),
    week: week,
    authStatus: await authenticationStatus(session),
  }
  const result = await summaryService.getAveragesWeekForUser(week, data.user_id);
  
  if (Object.keys(result).length === 0) {
    data.dataFound = false;
  } else {
    data.dataFound = true;
    data.results = result;
  }
  render('summarization/averages_week.ejs', data);
}

// Shows the averages for the requested month for the current user
const showMonthSummary = async({render, request, session}) => {
  const body = request.body();
  const params = await body.value;

  const month_input = params.get('month');
  const month = month_input.split("-")[1]; // Gets the month number

  const data = {
    user_id: await getUserId(session),
    month: month,
    authStatus: await authenticationStatus(session),
  }
  const result = await summaryService.getAveragesMonthForUser(month, data.user_id); 

  if (Object.keys(result).length === 0) {
    data.dataFound = false;
  } else {
    data.dataFound = true;
    data.results = result;
  }


  render('summarization/averages_month.ejs', data);
}

export { showSummaryForUser, showLandingPage, showWeekSummary, showMonthSummary };