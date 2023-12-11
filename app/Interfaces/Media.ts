import { AttachmentContract } from "@ioc:Adonis/Addons/AttachmentLite";
import { GamePlateform } from "App/Models/Enums/GamePlatform";
import { MediaTypes } from "App/Models/Enums/MediaTypes";
import { DateTime } from "luxon";

export interface IMedia {
    id: number
    mediaParentId: number | null,
    name: string,
    type: MediaTypes,
    cover: AttachmentContract | null,
    released: string,
    synopsis: string,
    createdAt?: DateTime,
    updatedAt?: DateTime
}

export interface IGame extends IMedia {
    developer: string,
    publisher: string,
    plateform: GamePlateform
}

export interface IMovie extends IMedia {
    director: string,
    screenwriter: string,
    duration: number
}

export interface IBook extends IMedia {
    author: string,
    illustrator: string,
    editor: string,
    pages: number
}

export interface ISeason extends IMedia {
    creator: string,
    length: number
}