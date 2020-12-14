import { executeQuery } from "../database/database.js";

// Returns the status of reporting done on that day, i.e. if the user has done the reports for that day
const reportStatus = async (user_id) => {
  const today = new Date();
  const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  const morning_done = await executeQuery("SELECT * FROM reports WHERE user_id = $1 and date = $2 and morning = true;", user_id, date);
  const evening_done = await executeQuery("SELECT * FROM reports WHERE user_id = $1 and date = $2 and morning = false;", user_id, date);

  let morning = false;
  let evening = false;

  if (morning_done && morning_done.rowCount > 0) {
    morning = true;
  }
  if (evening_done && evening_done.rowCount > 0) {
    evening = true;
  }

  return {morning_done: morning, evening_done: evening};
}

// If there is a report of the same type for the same day by the same user, delete it.
const deleteDuplicateReport = async (morning, date, user_id) => {
  const result = await executeQuery("SELECT id AS report_id FROM reports WHERE morning=$1 AND date=$2 AND user_id=$3", morning, date, user_id);
  if (result && result.rowCount > 0) {
    const report_id = result.rowsOfObjects()[0].report_id;
    await executeQuery("DELETE FROM reports WHERE id=$1", report_id);
  }
}

/**
 * the application asks for the sleep duration and sleep quality, as well as generic mood. 
 * Sleep duration is given as a decimal indicating hours slept, and sleep quality and generic 
 * mood are given using a scale from 1 to 5, where 1 indicates very poor and 5 indicates excellent.
 * 
 * In both options, by default, the application assumes that the reporting is done for the 
 * current day (or, in the case of the morning, for the previous night). Both reporting options 
 * should also provide an input field through which a different day can be chosen -- this way, 
 * if a user skips reporting, the data can be filled in at a later point. 
 */
const reportMorning = async (report) => {
  // Get date or default to today
  const date = (report.date) ? report.date : "now()";
  // Delete possible duplicate report
  await deleteDuplicateReport(true, date, report.user_id);

  await executeQuery("INSERT INTO reports (morning, mood, sleep_duration, sleep_quality, user_id, date) VALUES (true, $1,$2,$3,$4,$5);", 
                                    report.mood, report.sleep_duration, report.sleep_quality, report.user_id, date);
}

/**
 * the application asks for time spent on sports and exercise, time spent studying, regularity and 
 * quality of eating, and generic mood. Time spent on sports and exercise, and time spent studying 
 * are given as a decimal number indicating the number of hours. Regularity and quality of eating 
 * as well as the generic mood are given using a scale from 1 to 5, where 1 indicates 
 * very poor and 5 indicates excellent.
 * 
 * In both options, by default, the application assumes that the reporting is done for the 
 * current day (or, in the case of the morning, for the previous night). Both reporting options 
 * should also provide an input field through which a different day can be chosen -- this way, 
 * if a user skips reporting, the data can be filled in at a later point. 
 */
const reportEvening = async (report) => {
  // Get date or default to today
  const date = (report.date) ? report.date : "now()";
  // Delete possible duplicate report
  await deleteDuplicateReport(false, date, report.user_id);

  await executeQuery("INSERT INTO reports (morning, mood, time_sport, time_study, eating, user_id, date) VALUES (false, $1,$2,$3,$4,$5,$6);",
                                      report.mood, report.sport, report.study, report.eating, report.user_id, date);
}

export { reportMorning, reportEvening, reportStatus };