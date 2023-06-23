// const r = new Router()
// r.get("/p", m1, m2);
// r.get({ secure: true }, "/p", m1, m2);

type Middleware = (ctx: Record<string, unknown>, next: Middleware) => Promise<void>;

type RouteOptions = {
  secure?: true;
  openApi?: Record<string, unknown>;
};

class KoaRouter {
  get1(...options: unknown[]): void {
    //
  }

  get2(
    options_or_path: RouteOptions | string,
    path_or_middleware: string | Middleware,
    ...middleware: Middleware[]
  ): void {}

  get3(path: string, ...middleware: Middleware[]): void;
  get3(options: RouteOptions, path: string, ...middleware: Middleware[]): void;
  get3(...args: unknown[]): void {}
}

const r = new KoaRouter();

r.get2("s", "s", async () => {}); // :(

r.get3("/p", async () => {});
r.get3({ secure: true }, "/p", async () => {});
