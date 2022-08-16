import { Route } from "./route";

export default class Router {
  private static __instance: Router;
  private _routes: Route[] = [];
  private _history = window.history;
  private _currentRoute: Route | null = null;

  constructor() {
    if (Router.__instance) {
      return Router.__instance;
    }

    Router.__instance = this;
  }

  public use(pathname: string, block: ClassDecorator, props: object = {}) {
    const routeProps = Object.assign({ rootQuery: "#app" }, props);
    const route = new Route(pathname, block, routeProps);

    this._routes.push(route);

    return this;
  }

  public start() {
    window.onpopstate = () => {
      this._onRoute(window.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string) {
    const route = this._getRoute(pathname);

    if (!route) {
      return;
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;

    route.render();
  }

  public go(pathname: string) {
    this._history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  public replace(pathname: string) {
    this._history.replaceState({}, "", pathname);
    this._onRoute(pathname);
  }

  public back() {
    this._history.back();
  }

  public forward() {
    this._history.forward();
  }

  private _getRoute(pathname: string) {
    return this._routes.find((route) => route.match(pathname));
  }

  public getRoute(pathname: string) {
    return this._getRoute(pathname);
  }
}
