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

/**
 * The application provides functionality for summarization of responses. Each user can view statistics of 
 * their reports on a weekly and monthly level. These statistics are as follows.

    Average sleep duration
    Average time spent on sports and exercise
    Average time spent studying
    Average sleep quality
    Average generic mood

    High-level summaries generated from all the users of the application are shown both on 
    the landing page of the application and provided through an API. 
 */

const getAverageForUser = async (column, interval, user_id) => {
    const result = await executeQuery("SELECT AVG($1) FROM reports WHERE entry_date >= current_date at time zone 'UTC' - interval '$2 days' AND user_id = $3;", 
                                        column, interval, user_id);
    if (result && result.rowCount > 0) {
        return result.rowsOfObjects();
    }

    return [];
}

const getAveragesForAll = async (column, interval) => {
    const result = await executeQuery("SELECT AVG($1) FROM reports WHERE entry_date >= current_date at time zone 'UTC' - interval '$2 days';", 
                                        column, interval);
    if (result && result.rowCount > 0) {
        return result.rowsOfObjects()[0];
    }

    return {};
}



export { getAllNews, addNews, getNewsItem, deleteNewsItem };
export { getAverageForUser, getAveragesForAll };