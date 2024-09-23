import { Dimensions } from "react-native";

export const COL = 5;
export const MARGIN = 8;
export const SIZE = Dimensions.get(`window`).width / COL - MARGIN;

export const getOrder = (x: any, y: any) => {
    'worklet';
    const row = Math.round(y / SIZE);
    const col = Math.round(x / SIZE);
    return row * COL + col;
};

export const getPosition = (index: any) => {
    'worklet';
    return {
      x: (index % COL) * SIZE,
      y: Math.floor(index / COL) * SIZE,
    };
};