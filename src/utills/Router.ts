import Block from './Block';
import { renderDOM } from './renderDOM';
import { isEqual } from './isEqual';

class Route {
	private _block: Block | null = null;
	constructor(
		private _pathname: string,
		private _blockClass: typeof Block,
		private readonly _query: string) {}


	public leave() {
		this._block = null;
	}

	public match(pathname: string) {
		return isEqual(pathname, this._pathname);
	}

	public render() {
		if (!this._block) {
			this._block = new this._blockClass({});
			renderDOM(this._query, this._block);
			return;
		}
	}
}

class Router {
	private static __instance: Router;
	private _routes: Route[] = [];
	private _currentRoute: Route | null = null;
	private _history = window.history;

	constructor(private readonly _rootQuery: string) {
		if (Router.__instance) {
			return Router.__instance;
		}

		this._routes = [];
		Router.__instance = this;
	}

	public use(pathname: string, block: typeof Block) {
		const route = new Route(pathname, block, this._rootQuery);
		this._routes.push(route);
		return this;
	}

	public start() {
		window.onpopstate = (event: PopStateEvent) => {
			const target = event.currentTarget as Window;
			this._onRoute(target.location.pathname);
		};
		this._onRoute(window.location.pathname);
	}

	private _onRoute(pathname: string) {
		const route = this.getRoute(pathname);

		if (!route) {
			return;
		}

		if (this._currentRoute && this._currentRoute !== route) {
			this._currentRoute.leave();
		}

		this._currentRoute = route;
		route.render();
	}

	public go(pathname: string) {
		this._history.pushState({}, '', pathname);
		this._onRoute(pathname);
	}

	public back() {
		this._history.back();
	}

	public forward() {
		this._history.forward();
	}

	private getRoute(pathname: string) {
		return this._routes.find(route => route.match(pathname));
	}
}

export default new Router('#app');
