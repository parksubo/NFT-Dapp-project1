import React, {FC} from "react";
import { AspectRatio, Image } from "@chakra-ui/react";

interface SlimeCardProps {
    slimeType: string;
}


const SlimeCard: FC<SlimeCardProps> = ({slimeType}) => {
    return (      
        <Image w={150} h={150} src={`images/${slimeType}.png`} alt="SlimeCard" />
    );
};

export default SlimeCard;