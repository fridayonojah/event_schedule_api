
import * as compression from 'compression';
import * as cors from 'cors';
import {Router} from 'express';
import * as helmet from "helmet";
import * as cookie from 'cookie-parser';
import * as csrf from 'csurf';
import * as express from 'express';
// import cors =  require('cors');

export class Common {
  // public static handleCors(router: Router): void {
  //   router.use(cors({credentials: true, origin: true}));
  // }

  public static handleBodyRequestParsing(router: Router): void {
    router.use(express.urlencoded({extended: true}));
    router.use(express.json());
  }

  public static handleCompression(router: Router): void {
    router.use(compression());
  }

  // public static handleHelmet(router: Router): void {
  //   // This part of helment should be resolved: But removed temp
  //   router.use(helmet.contentSecurityPolicy());
  // }

  public static handCookieParsing(router: Router): void {
    router.use(cookie());
  }

  public static handleCsrf(router: Router): void {
    router.use(csrf({cookie: true}));
  }
}
