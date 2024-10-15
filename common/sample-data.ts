// import { web } from "@/shared/shared";
import { VertImageCard } from "./types";
import { appleBlue, appleGreen, appleGreenMint, appleGreenShade, applePurple, appleRed, appleYellow, defaultDarkTabBorderColor, vertImages } from "@/components/Themed";

export const defaultVertImageCards: VertImageCard[] = [
    new VertImageCard({
        id: 1,
        key: 1,
        name: `Jelly Fish`,
        backgroundColor: appleGreen,
        image: vertImages.jelly_fish,
        fontColor: `white`,
        description: `This is the first card in our draggable grid.`,
    }),
    new VertImageCard({
        id: 2,
        key: 2,
        name: `Mother Nature`,
        backgroundColor: appleBlue,
        image: vertImages.hand_leaf,
        description: `This is the second card in our draggable grid.`,
    }),
    new VertImageCard({
        id: 3,
        key: 3,
        name: `Playing Music`,
        backgroundColor: appleRed,
        image: vertImages.playing_keyboard,
        description: `This is the third card in our draggable grid.`,
    }),
    new VertImageCard({
        id: 4,
        key: 4,
        name: `Festivals`,
        image: vertImages.wind_flag,
        backgroundColor: appleYellow,
        fontColor: defaultDarkTabBorderColor,
        description: `This is the fourth card in our draggable grid.`,
    }),
    // new VertImageCard({
    //     id: 5,
    //     key: 5,
    //     name: `Clean Energy`,
    //     image: vertImages.wind_mills,
    //     backgroundColor: applePurple,
    //     description: `This is the fifth card in our draggable grid.`,
    // }),
    // new VertImageCard({
    //     id: 6,
    //     key: 6,
    //     name: `Singing`,
    //     backgroundColor: appleGreenShade,
    //     image: vertImages.singing_rockstar,
    //     description: `This is the sixth card in our draggable grid.`,
    // }),
    // new VertImageCard({
    //     id: 7,
    //     key: 7,
    //     name: `The Outside`,
    //     backgroundColor: appleGreenMint,
    //     image: vertImages.wind_curtains,
    //     fontColor: defaultDarkTabBorderColor,
    //     description: `This is the seventh card in our draggable grid.`,
    // }),
];