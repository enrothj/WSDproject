import { Router } from "../deps.js";
import { getNews, getItem } from "./controllers/reportController.js";
import * as reportController from "./controllers/reportController.js";
import * as summaryController from "./controllers/summaryController.js";


const router = new Router();

router.get('/behavior/reporting', reportController.getReporting);
router.get('/behavior/reporting/morning', reportController.getMorningReport);
router.post('/behavior/reporting/morning', reportController.postMorningReport)
router.get('/behavior/reporting/evening', reportController.getEveningReport);
router.post('/behavior/reporting/evening', reportController.postEveningReport);

router.get('/behavior/summary', summaryController.showDefaultAveragesForUser);

export { router };