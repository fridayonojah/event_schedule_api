import { PushDataModel } from "./PushDataModel";

export interface ICache {
    push(data: string, key: string): Promise<PushDataModel>;

    findOne(key: string): Promise<string>;

    remove(key: string): Promise<any>;
}