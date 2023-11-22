import { AttachmentContract } from "@ioc:Adonis/Addons/AttachmentLite";
import { GamePlateform } from "App/Models/Enums/GamePlateform";
import { MediaTypes } from "App/Models/Enums/MediaTypes";

export interface IMedia {
    id?: number
    mediaParentId: number | null,
    name: string,
    type: MediaTypes,
    cover: AttachmentContract | null,
    released: string
    synopsis: string
}

export interface IGame extends IMedia {
    developer: string,
    publisher: string,
    plateform: GamePlateform
}

export interface IMovie extends IMedia {
    director: number,
    screenwriter: string,
    duration: string
}