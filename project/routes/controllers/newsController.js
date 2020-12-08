import { getAllNews, getNewsItem } from "../../services/newsService.js"
import { reportMorning, reportEvening } from "../../services/reportService.js"

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

export { getNews, getItem };
export { getMorningReport, getEveningReport };