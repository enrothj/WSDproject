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

  render("./summarization/summary_user.ejs", {w_data: w_data, m_data: m_data, authStatus: status});
}


// Shows the landing page. Data to be rendered is the mood averages for today and yesterday.
const showLandingPage = async ({session, render}) => {
  const data = {};
  // Get today's average mood
  data.today = await summaryService.getAvgMoodToday();
  // Get yesterday's average mood
  data.yesterday = await summaryService.getAvgMoodYesterday();
  data.authStatus = await authenticationStatus(session);
  console.log(data);

  render('landing.ejs', data);
}

// Shows the averages for the requested week for the current user
const showWeekSummary = async({render, request, session}) => {
  const body = request.body();
  const params = await body.value;

  const user_id = await getUserId(session);
  const week_input = params.get('week');
  const week = week_input.split("W")[1]; // Gets the week number

  const result = await summaryService.getAveragesWeekForUser(week, user_id);

  render('summarization/averages_week.ejs', {data: result, week: week, user_id: user_id});
}

// Shows the averages for the requested month for the current user
const showMonthSummary = async({render, request, session}) => {
  const body = request.body();
  const params = await body.value;

  const user_id = await getUserId(session);
  const month_input = params.get('month');
  const month = month_input.split("-")[1]; // Gets the month number

  const result = await summaryService.getAveragesMonthForUser(month, user_id); 

  render('summarization/averages_month.ejs', {data: result, month: month, user_id: user_id});
}

export { showSummaryForUser, showLandingPage, showWeekSummary, showMonthSummary };