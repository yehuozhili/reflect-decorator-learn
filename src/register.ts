import { Express, Router } from "express";
import {
	CONTROLLER_METADATA,
	ROUTE_METADATA,
	PARAM_METADATA,
	PARSE_METADATA,
} from "./decorators";
import { RouteType, handlerFactory } from "./utils";

function register(
	controllerStore: Record<string, any>,
	rootPath: string,
	app: Express
) {
	const router = Router();

	Object.values(controllerStore).forEach((instance) => {
		const controllerMetadata: string = Reflect.getMetadata(
			CONTROLLER_METADATA,
			instance.constructor
		);
		console.log(controllerMetadata, "kkk");

		const proto = Object.getPrototypeOf(instance);
		//这个是拿定义类上的方法
		const routeNameArr = Object.getOwnPropertyNames(proto).filter(
			(n) => n !== "constructor" && typeof proto[n] === "function"
		);
		console.log(routeNameArr, "aaa");
		// 拿到方法后遍历方法获取是否打了标签
		routeNameArr.forEach((routeName) => {
			const routeMetadata: RouteType = Reflect.getMetadata(
				ROUTE_METADATA,
				proto[routeName]
			);
			console.log(routeMetadata, "jjj");
			const { type, path } = routeMetadata;
			const handler = handlerFactory(
				proto[routeName],
				Reflect.getMetadata(PARAM_METADATA, instance, routeName),
				Reflect.getMetadata(PARSE_METADATA, instance, routeName)
			);
			// 这里进行拼路由
			router[type](controllerMetadata + path, handler);
		});
	});

	app.use(rootPath, router);
}

export default register;
