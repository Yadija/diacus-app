import { useSession } from 'next-auth/react';
import axios from '../api/axios';

const useRefreshToken = () => {
  const session = useSession();

  const refresh = async () => {
    const {
      data: { data },
    } = await axios.put(
      '/auth',
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.data?.user?.refreshToken}`,
        },
      }
    );

    await session.update({
      ...session.data,
      user: {
        ...session.data?.user,
        ...data,
      },
    });

    return data;
  };

  return refresh;
};

export default useRefreshToken;
