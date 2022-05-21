import React, { FC } from "react";
import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Layout: FC = ({ children }) => {
    /* Flex로 컨텐츠가 가운데로 정렬되게 작성*/
    return (
        <Stack h="100vh">
            <Flex
                bg="purple.200"
                p={4}
                justifyContent="space-around"
                alignItems="center"
            >
                <Box>
                    <Text fontWeight="bold">Slime</Text>
                </Box>
                <Link to="/">
                <Button size="sm" colorScheme="blue">
                    Main
                </Button>
                </Link>
                <Link to="my-slime">
                <Button size="sm" colorScheme="red">
                    My Slime
                </Button>
                </Link>
            </Flex>
            <div>헤더</div>        
            <Flex 
                direction="column"
                h="full"
                justifyContent="center"
                alignItems="center"
            >
                { children }
            </Flex>               
        </Stack>
    );
};

export default Layout;