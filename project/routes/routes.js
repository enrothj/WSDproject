import { Router } from "../deps.js";
//import { hello } from "./controllers/helloController.js";
import { getNews, getItem } from "./controllers/newsController.js";
import * as helloApi from "./apis/helloApi.js";
import * as newsApi from "./apis/newsApi.js";
import { getNewsItem } from "../services/newsService.js";

const router = new Router();

//router.get('/', hello);
router.get('/api/hello', helloApi.getHello);
router.post('/api/hello', helloApi.setHello);

router.get('/', getNews);
router.get('/news/:id', getItem);

router.get('/api/news', newsApi.getAllNews);
router.post('/api/news', newsApi.addNews);
router.get('/api/news/:id', newsApi.getNewsItem);
router.delete('/api/news/:id', newsApi.deleteNewsItem);


export { router };