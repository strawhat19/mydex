import { Image, Platform } from "react-native";

export type CustomImageProps = {
    id?: any;
    alt: string;
    style?: any;
    source: any;
}

export default function CustomImage({
    style,
    source,
    id = `customImage`,
    alt = Platform.OS == `web` ? `Image` : `Mobile Image`,
}: CustomImageProps) {
    return (
        Platform.OS == `web` ? (
            // <figure id={`customImageFigure`} className={`customImageFigure`}>
                <img id={id} src={source?.uri ? source.uri : source} alt={alt} style={style} />
            // </figure>
        ) : (
            <Image id={id} alt={alt} source={source} style={style} />
        )
    )
}