import { Common } from "./Common";

export class Middleware {
    /**
     * 
     * @returns Helment was removed because of some errors that needs to
     */
    public static handle(): any[] {
        return [
            Common.handleBodyRequestParsing,
            // Common.handleCors,
            Common.handleCompression,
            Common.handCookieParsing,
        ];
    }
}