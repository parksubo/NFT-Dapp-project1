import React, { FC, useEffect, useState } from "react";
import {Button} from '@chakra-ui/react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Main from "./routes/main";

const App: FC = () => {

  // 메타마스크에서 가져올 정보를 담기 위한 useState 
  const [account, setAccount] = useState<string>("");

  // 메타마스크를 통해서 계정을 가져오는 함수
  const getAccount = async () => {

    try {
      // 메타마스크 계정 주소 설정
      if(window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      }
      // 메타마스크가 설치되있지 않으면 실행되지 않음
      else {
        alert("Install Metamask!");
      }
    } 
    catch(error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAccount();
    //console.log(account);
  }, [account]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main account={account} />}></Route>
      </Routes>
    </BrowserRouter>

  )
  

  /*<Button colorScheme="gray">web3-boilerplate</Button>;*/

};

export default App;
