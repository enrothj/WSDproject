import { getAllNews, getNewsItem } from "../../services/newsService.js"

const getNews = async({render}) => {
    render('index.ejs', { news: await getAllNews() } );
}

const getItem = async({params, render}) => {
    const content = await getNewsItem(params.id);
    console.log(content);
    render('news-item.ejs', content);
}

export { getNews, getItem };