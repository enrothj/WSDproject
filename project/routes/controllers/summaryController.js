import { getHello } from "../../services/helloService.js";
import * as summaryService from "../../services/summaryService.js";

const hello = async({render}) => {
  render('index.ejs', { hello: await getHello() });
};


const showWeeklyAveragesForUser = async ({render, session}) => {

  const data = await summaryService.getAverageForUser("*", 7, 1); // Todo add user handling

  render("summary_user.ejs", data);
}


export { hello };
export { showWeeklyAveragesForUser };