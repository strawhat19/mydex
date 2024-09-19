export type Type = {
    type: Types; 
}

export type DataNoID = {
    name?: string; 
    index?: number;
} & Type;

export type Data = {
    id?: string;
} & DataNoID;

export enum Types {
    Tab = `Tab`,
    Data = `Data`,
}

export enum Themes {
    Dark = `dark`,
    Light = `light`,
}

export class VertImageCard {
    id: any;
    image: any;
    name: string = ``;
    fontColor?: string;
    backgroundColor: any;
    description: string = ``;
    extendedDescription?: string;
    constructor(data: Partial<VertImageCard>) {
        Object.assign(this, data);
    }
}