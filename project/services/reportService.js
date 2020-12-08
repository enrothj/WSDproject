import { executeQuery } from "../database/database.js";

const getHello = async() => {
  const res = await executeQuery("SELECT message FROM messages ORDER BY id DESC LIMIT 1");
  if (res && res.rowCount > 0) {
    return res.rowsOfObjects()[0].message;
  }

  return 'No messages available';
}

const setHello = async(newMessage) => {
  await executeQuery("INSERT INTO messages (message, sender) VALUES ($1, 'API');", newMessage);
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
const reportMorning = async () => {

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
const reportEvening = async () => {

}




export { getHello, setHello };