import { Flex, IconButton } from '@chakra-ui/core';
import React from 'react';
import { useState } from 'react';
import { PostSnippetFragment, useVoteMutation } from '../generated/graphql';

interface VoteSectionProps {
  post: PostSnippetFragment;
}

export const VoteSection: React.FC<VoteSectionProps> = ({ post }) => {
  const [, vote] = useVoteMutation();
  const [isLoading, setIsloading] = useState<'upvote-loading' | 'downvote-loading' | 'not-loading'>('not-loading');
  const handleUpvote = async (postId: number) => {
    setIsloading('upvote-loading');
    await vote({ postId, value: 1 });
    setIsloading('not-loading');
  };

  const handleDownvote = async (postId: number) => {
    setIsloading('downvote-loading');
    await vote({ postId, value: -1 });
    setIsloading('not-loading');
  };
  return (
    <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
      <IconButton
        icon="chevron-up"
        onClick={() => handleUpvote(post.id)}
        isLoading={isLoading === 'upvote-loading'}
        aria-label="upvote post"
      />
      {post.points}
      <IconButton
        icon="chevron-down"
        onClick={() => handleDownvote(post.id)}
        isLoading={isLoading === 'downvote-loading'}
        aria-label="downvote post"
      />
    </Flex>
  );
};
