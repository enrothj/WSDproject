import { executeQuery } from "../database/database.js"

const getAllNews = async() => {
    const results = await executeQuery("SELECT * FROM news;");
    if (results && results.rowCount > 0) {
        return results.rowsOfObjects();
    }

    return [];
}

const addNews = async(newNews) => {
    await executeQuery("INSERT INTO news (title, content) VALUES ($1, $2)", newNews.title, newNews.content);
}

const getNewsItem = async(id) => {
    const result = await executeQuery("SELECT * FROM news WHERE id = $1;", id);
    if (result) {
        return result.rowsOfObjects()[0];
    }

    return {};
}

const deleteNewsItem = async(id) => {
    await executeQuery("DELETE FROM news WHERE id = $1", id);
}


export { getAllNews, addNews, getNewsItem, deleteNewsItem };