import { AttachmentContract } from "@ioc:Adonis/Addons/AttachmentLite";
import { MediaTypes } from "App/Models/Enums/MediaTypes";

export interface IMedia {
    id?: number
    media_parent_id: number | null,
    name: string,
    type: MediaTypes,
    cover: AttachmentContract | null,
    released: string
    synopsis: string
}