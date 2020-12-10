import * as summaryService from "../../services/summaryService.js";

const hello = async({render}) => {
  render('index.ejs', { hello: await getHello() });
};


const showDefaultAveragesForUser = async ({render, session}) => {

  const w_data = await summaryService.getLastWeekAveragesForUser(1); // todo session
  console.log(w_data);
  const m_data = await summaryService.getLastMonthAveragesForUser(1);
  console.log(m_data);

  render("./summarization/summary_user.ejs", {w_data: w_data, m_data: m_data});
}


export { hello };
export { showDefaultAveragesForUser };