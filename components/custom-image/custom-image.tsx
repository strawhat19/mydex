import { Image, Platform } from "react-native";

export type CustomImageProps = {
    alt: string;
    style?: any;
    source: any;
}

export default function CustomImage({
    style,
    source,
    alt = Platform.OS == `web` ? `Image` : `Mobile Image`,
}: CustomImageProps) {
    return (
        Platform.OS == `web` ? (
            <img src={source?.uri ? source.uri : source} alt={alt} style={style} />
        ) : (
            <Image alt={alt} source={source} style={style} />
        )
    )
}