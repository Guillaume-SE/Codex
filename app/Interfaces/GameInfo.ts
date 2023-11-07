import { GamePlateform } from "App/Models/Enums/GamePlateform";

export interface IGameInfo {
    id?: number,
    media_id: number,
    developer: string,
    publisher: string,
    plateform: GamePlateform
}