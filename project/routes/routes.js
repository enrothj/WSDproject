import { Router } from "../deps.js";
import * as reportController from "./controllers/reportController.js";
import * as summaryController from "./controllers/summaryController.js";
import * as authController from "./controllers/authenticationController.js";

const router = new Router();

router.get('/behavior/reporting', reportController.getReporting);
router.get('/behavior/reporting/morning', reportController.getMorningReport);
router.post('/behavior/reporting/morning', reportController.postMorningReport)
router.get('/behavior/reporting/evening', reportController.getEveningReport);
router.post('/behavior/reporting/evening', reportController.postEveningReport);

router.get('/behavior/summary', summaryController.showSummaryForUser);
router.post('/behavior/summary/week', summaryController.showWeekSummary);
router.post('/behavior/summary/month', summaryController.showMonthSummary);

router.get('/auth/login', authController.showLogin);
router.get('/auth/logout', authController.showLogout);
router.get('/auth/registration', authController.showRegister);
router.post('/auth/login', authController.postLogin);
router.post('/auth/logout', authController.postLogout);
router.post('/auth/logout', authController.postRegister);

router.get('/', summaryController.showLandingPage);

export { router };