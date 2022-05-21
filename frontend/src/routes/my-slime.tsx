import React, {FC, useEffect, useState} from "react";
import { Grid } from "@chakra-ui/react";
import { mintSlimeTokenContract } from "../web3Config";
import SlimeCard from "../components/SlimeCard";

interface MySlimeProps {
    account: string;
}

const MySlime: FC<MySlimeProps> = ({account}) => {
    
    const [slimeCardArray, setSlimeCardArray] = useState<string[]>();

    const getSlimeTokens = async () => {
        try {
            const balanceLength = await mintSlimeTokenContract.methods
            .balanceOf(account)
            .call();
            
            const tempSlimeCardArray = [];

            // balanceLength를 10진수로 변형 후 for문을 돌려서 가지고있는 카드의 타입을 배열에 저장
            for(let i = 0; i < parseInt(balanceLength, 10); i++) {
                const slimeTokenId = await mintSlimeTokenContract.methods
                .tokenOfOwnerByIndex(account, i)
                .call();

                const slimeType = await mintSlimeTokenContract.methods
                .slimeTypes(slimeTokenId)
                .call();

                tempSlimeCardArray.push(slimeType);
            }

            setSlimeCardArray(tempSlimeCardArray);
        }
        catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if(!account) return;

        getSlimeTokens();
    }, [account]);

    useEffect(() => {
        console.log(slimeCardArray);
    }, [slimeCardArray]);


    // templateColumn으로 한 줄에 4개씩 카드를 출력
    // slimeCardArray가 존재하면 map을 이용하여 슬라임 카드를 하나씩 리턴
    return (
        <Grid templateColumns="repeat(4, 1fr)" gap={8}>
        {slimeCardArray &&
          slimeCardArray.map((v, i) => {
            return <SlimeCard key={i} slimeType={v} />;
          })}
      </Grid>
    );
};

export default MySlime;