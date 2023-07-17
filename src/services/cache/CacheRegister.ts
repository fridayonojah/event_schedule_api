import { ICache } from "./ICache";

export class CacheRegister {
    private readonly ICache: ICache

    constructor(cache: ICache) {
        this.ICache = cache
    }

    public register(): ICache {
        return this.ICache;
    }
}