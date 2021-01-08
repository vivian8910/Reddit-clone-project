import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMeQuery } from '../generated/graphql';

export const useIsAuth = () => {
  const [{ data, fetching }] = useMeQuery();
  const router = useRouter();
  useEffect(() => {
    if (!fetching && !data?.me) {
      // take the user back to the intended page after they logged in
      router.replace('/login?next=' + router.pathname);
    }
  }, [data, router, fetching]);
};
