import * as summaryService from "../../services/summaryService.js";

const hello = async({render}) => {
  render('index.ejs', { hello: await getHello() });
};


const showWeeklyAveragesForUser = async ({render, session}) => {

  const data = await summaryService.getAverageForUser("mood", 7, 1);
  console.log(data);

  render("./summarization/summary_user.ejs", {data: data});
}


export { hello };
export { showWeeklyAveragesForUser };