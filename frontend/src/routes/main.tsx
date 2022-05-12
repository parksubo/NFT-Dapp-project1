import React, { FC, useState,  } from "react";
import { Box, Text, Flex, Button } from '@chakra-ui/react';
import { mintSlimeTokenContract } from "../web3Config";

// 타입스크립트는 Props의 타입을 모두 정해주어야 함
interface MainProps {
  account: string;
}

// Generic을 붙여서 App으로 부터 받아온 account를 사용할 수 있게 함
const Main: FC<MainProps> = ({ account }) => {

  const [newSlimeCard, setNewSlimeCard] = useState<string>();

  // mint 버튼을 클릭했을 때 발동하는 함수
  const onClickMint = async() => {
    try {
      // 계정이 없을 경우 그냥 return
      if(!account) return;
      
      // mintSlimeToken 컨트랙트의 메소드중 mintslimeToken을 실행하여 account로 send
      const response = await mintSlimeTokenContract.methods
        .mintSlimeToken()
        .send({from: account});

      console.log(response);
    } 
    catch (error) {
      console.error(error);
    }

  };

    return (
    <Flex
      w="full" h="100vh"
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      <Box>
        {newSlimeCard ? <div>SlimeCard</div> : <Text>Let's mint Slime Card</Text>}
      </Box>
      <Button
        mt={4}
        size="sm"
        colorScheme={"blue"}
        onClick={onClickMint}
      >
        Mint
      </Button>
    </Flex>
    );
};

export default Main