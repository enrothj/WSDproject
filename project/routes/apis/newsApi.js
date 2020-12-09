//import * as newsService from "../../services/newsService.js"

const getAllNews = async({response}) => {
    const results = await newsService.getAllNews();
    response.body = results;
};

const addNews = async({request, response}) => {
    const body = request.body({type: 'json'});
    const document = await body.value;
    await newsService.addNews(document);
    response.status = 200;
}

const getNewsItem = async({params, response}) => {
    const id = params.id;
    const result = await newsService.getNewsItem(id);
    response.body = result;
}

const deleteNewsItem = async({params, response}) => {
    const id = params.id;
    await newsService.deleteNewsItem(id);
    response.status = 200;
}

export { getAllNews, addNews, getNewsItem, deleteNewsItem };