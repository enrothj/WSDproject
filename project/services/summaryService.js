import { executeQuery } from "../database/database.js"

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

// Returns an object containing the summary for the last 7 days for the specified user.
const getLastWeekAveragesForUser = async (user_id) => {
    const rowsInInterval = await executeQuery("SELECT * FROM reports WHERE date >= \
                                current_date - interval '7 days' AND user_id = $1;", user_id);
    
    if (rowsInInterval && rowsInInterval.rowCount == 0) {
        return {};
    }
    
    const result = await executeQuery(
        "SELECT AVG(mood)::numeric(10,2) AS mood, AVG(sleep_duration)::numeric(10,2) AS sleep_duration, AVG(sleep_quality)::numeric(10,2) AS sleep_quality, \
        AVG(time_sport)::numeric(10,2) AS time_sport, AVG(time_study)::numeric(10,2) AS time_study, AVG(eating)::numeric(10,2) AS eating FROM reports WHERE \
        date >= current_date - interval '7 days' AND user_id = $1;", user_id
    );
    if (result && result.rowCount > 0) {
        return result.rowsOfObjects()[0];
    }

    return {};
}

// Returns an object containing the summary for the last 30 days for the specified user.
const getLastMonthAveragesForUser = async (user_id) => {
    const rowsInInterval = await executeQuery("SELECT * FROM reports WHERE date >= \
                                current_date - interval '30 days' AND user_id = $1;", user_id);
    
    if (rowsInInterval && rowsInInterval.rowCount == 0) {
        return {};
    }
    
    const result = await executeQuery(
        "SELECT AVG(mood)::numeric(10,2) AS mood, AVG(sleep_duration)::numeric(10,2) AS sleep_duration, AVG(sleep_quality)::numeric(10,2) AS sleep_quality, \
        AVG(time_sport)::numeric(10,2) AS time_sport, AVG(time_study)::numeric(10,2) AS time_study, AVG(eating)::numeric(10,2) AS eating FROM reports WHERE \
        date >= current_date - interval '30 days' AND user_id = $1;", user_id
    );
    if (result && result.rowCount > 0) {
        return result.rowsOfObjects()[0];
    }

    return {};
}

// Get summary for 7 days for all users.
const getLastWeekAverages = async () => {
    const result = await executeQuery(
        "SELECT AVG(mood)::numeric(10,2) AS mood, AVG(sleep_duration)::numeric(10,2) AS sleep_duration, AVG(sleep_quality)::numeric(10,2) AS sleep_quality, \
        AVG(time_sport)::numeric(10,2) AS time_sport, AVG(time_study)::numeric(10,2) AS time_study, AVG(eating)::numeric(10,2) AS eating FROM reports WHERE \
        date >= current_date - interval '7 days';"
    );
    if (result && result.rowCount > 0) {
        return result.rowsOfObjects()[0];
    }

    return {};
}

// Returns the average mood of users today.
const getAvgMoodToday = async () => {
    const result = await executeQuery("SELECT AVG(mood)::numeric(4,2) AS mood FROM reports WHERE date = current_date;");

    if (result && result.rowCount) {
        return result.rowsOfObjects()[0];
    }

    return {mood: 0};
}

// Returns the average mood of users yesterday
const getAvgMoodYesterday = async () => {
    const result = await executeQuery("SELECT AVG(mood)::numeric(4,2) AS mood FROM reports WHERE date = current_date - interval '1 days';");

    if (result && result.rowCount) {
        return result.rowsOfObjects()[0];
    }

    return {mood: 0};
}

// Returns an object containing the averages for the requested week and user
const getAveragesWeekForUser = async (week, user_id) => {
    // Check that data exists for the requested time period
    const rowsInInterval = await executeQuery("SELECT * FROM reports WHERE \
                date_part('week', date) = $1 AND user_id = $2;", week, user_id);
    
    if (rowsInInterval && rowsInInterval.rowCount == 0) {
        return {};
    }
    const result = await executeQuery(
        "SELECT AVG(mood)::numeric(10,2) AS mood, AVG(sleep_duration)::numeric(10,2) AS sleep_duration, AVG(sleep_quality)::numeric(10,2) AS sleep_quality, \
        AVG(time_sport)::numeric(10,2) AS time_sport, AVG(time_study)::numeric(10,2) AS time_study, AVG(eating)::numeric(10,2) AS eating FROM reports WHERE \
        date_part('week', date) = $1 AND user_id = $2;", week, user_id
    );
    if (result && result.rowCount > 0) {
        return result.rowsOfObjects()[0];
    }

    return {};
}

// Returns an object containing the averages for the requested month and user
const getAveragesMonthForUser = async (month, user_id) => {
    // Check that data exists for the requested time period
    const rowsInInterval = await executeQuery("SELECT * FROM reports WHERE \
                date_part('month', date) = $1 AND user_id = $2;", month, user_id);
    
    if (rowsInInterval && rowsInInterval.rowCount == 0) {
        return {};
    }
    const result = await executeQuery(
        "SELECT AVG(mood)::numeric(10,2) AS mood, AVG(sleep_duration)::numeric(10,2) AS sleep_duration, AVG(sleep_quality)::numeric(10,2) AS sleep_quality, \
        AVG(time_sport)::numeric(10,2) AS time_sport, AVG(time_study)::numeric(10,2) AS time_study, AVG(eating)::numeric(10,2) AS eating FROM reports WHERE \
        date_part('month', date) = $1 AND user_id = $2;", month, user_id
    );
    if (result && result.rowCount > 0) {
        return result.rowsOfObjects()[0];
    }

    return {};
}

// Returns the summary for all users for the requested date
const getAveragesDay = async (date) => {
    const result = await executeQuery(
        "SELECT AVG(mood)::numeric(10,2) AS mood, AVG(sleep_duration)::numeric(10,2) AS sleep_duration, AVG(sleep_quality)::numeric(10,2) AS sleep_quality, \
        AVG(time_sport)::numeric(10,2) AS time_sport, AVG(time_study)::numeric(10,2) AS time_study, AVG(eating)::numeric(10,2) AS eating FROM reports WHERE \
        date = $1;", date
    );
    if (result && result.rowCount > 0) {
        return result.rowsOfObjects()[0];
    }

    return {};
}

export { getLastWeekAveragesForUser, getLastMonthAveragesForUser, getAvgMoodToday, getAvgMoodYesterday };
export { getAveragesWeekForUser, getAveragesMonthForUser };
export { getLastWeekAverages, getAveragesDay }