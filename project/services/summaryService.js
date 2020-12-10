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
    console.log("getAverageForUser: column = "+column+", interval = "+interval);

    const rowsInInterval = await executeQuery("SELECT * FROM reports WHERE date >= \
                                current_date - interval '7 days' AND user_id = 1;");
    
    if (rowsInInterval && rowsInInterval.rowCount == 0) {
        return {};
    }
    
    const result = await executeQuery(
        `SELECT AVG(mood)::numeric(10,2) AS mood, AVG(sleep_duration)::numeric(10,2) AS sleep_duration, AVG(sleep_quality)::numeric(10,2) AS sleep_quality, \
        AVG(time_sport)::numeric(10,2) AS time_sport, AVG(time_study)::numeric(10,2) AS time_study, AVG(eating)::numeric(10,2) AS eating FROM reports WHERE \
        date >= current_date - interval '${interval} days' AND user_id = 1;`
    );
    if (result && result.rowCount > 0) {
        return result.rowsOfObjects()[0];
    }

    return {};
}

const getAveragesForAll = async (column, interval) => {
    const result = await executeQuery("SELECT AVG($1) FROM reports WHERE date >= current_date - interval '$2 days';", 
                                        column, interval);
    if (result && result.rowCount > 0) {
        return result.rowsOfObjects()[0];
    }

    return {};
}



export { getAllNews, addNews, getNewsItem, deleteNewsItem };
export { getAverageForUser, getAveragesForAll };