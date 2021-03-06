import { Box, Button, Flex, Link } from '@chakra-ui/core';
import React from 'react';
import NextLink from 'next/link';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  const displayContent = () => {
    if (!fetching) {
      if (data?.me) {
        return (
          <Flex>
            <Box mr={2}>{data.me.username}</Box>
            <Button variant="link" onClick={() => logout()} isLoading={logoutFetching}>
              logout
            </Button>
          </Flex>
        );
      } else {
        return (
          <>
            <NextLink href="/login">
              <Link mr={2}>login</Link>
            </NextLink>
            <NextLink href="/register">
              <Link>register</Link>
            </NextLink>
          </>
        );
      }
    }
    return null;
  };
  return (
    <Flex zIndex={1} position="sticky" top={0} bg="tan" p={4}>
      <Box ml={'auto'}>{displayContent()}</Box>
    </Flex>
  );
};
