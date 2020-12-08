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

const averageSleepDuration = async () => {

}

const averageSleepQuality = async () => {

}

const averageTimeSport = async () => {

}

const averageTimeStudy = async () => {

}

const averageMood = async () => {
    
}



export { getAllNews, addNews, getNewsItem, deleteNewsItem };