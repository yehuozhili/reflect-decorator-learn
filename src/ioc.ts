import IndexController from "./controllers/index";
import UserController from "./controllers/users";
// 类似于appmodule
export default {
	index: new IndexController(),
	user: new UserController(),
};
