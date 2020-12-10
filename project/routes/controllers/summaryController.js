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

export { showSummaryForUser, showLandingPage };