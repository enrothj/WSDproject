import * as summaryService from "../../services/summaryService.js";

// Shows a user's summary page
const showSummaryForUser = async ({render, session}) => {

  const w_data = await summaryService.getLastWeekAveragesForUser(1); // todo session
  console.log(w_data);
  const m_data = await summaryService.getLastMonthAveragesForUser(1);
  console.log(m_data);

  render("./summarization/summary_user.ejs", {w_data: w_data, m_data: m_data});
}


// Shows the landing page. Data to be rendered is the mood averages for today and yesterday.
const showLandingPage = async ({render}) => {
  const data = {};
  // Get today's average mood
  data.today = await summaryService.getAvgMoodToday();
  // Get yesterday's average mood
  data.yesterday = await summaryService.getAvgMoodYesterday();
  console.log(data);

  render('landing.ejs', data);
}

// Shows the averages for the requested week for the current user
const showWeekSummary = async({render, request, session}) => {
  const body = request.body();
  const params = await body.value;

  const user_id = 1;// TODO Add user auth
  const week = params.get('week'); // todo check how week input works, i.e. if you have to parse it for postgresql

  const result = await summaryService.getAveragesWeekForUser(week, user_id);

  render('averages_week.ejs', {data: result, week: week, user_id: user_id});
}

// Shows the averages for the requested month for the current user
const showMonthSummary = async({render, request, session}) => {
  const body = request.body();
  const params = await body.value;

  const user_id = 1;// TODO Add user auth
  const month = params.get('month'); // todo check how month input works

  const result = await summaryService.getAveragesMonthForUser(month, user_id); 

  render('averages_month.ejs', {data: result, month: month, user_id: user_id});
}

export { showSummaryForUser, showLandingPage, showWeekSummary, showMonthSummary };