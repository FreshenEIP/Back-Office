import { useQuery } from 'react-query';
import { fetchProfile } from '../api/profile';
import { useAppSelector } from '../redux/hooks';
import React from 'react';

const Profile = () => {
  //@ts-ignore
  const logReducer = useAppSelector((state) => state.logReducer);
  const getProfile = useQuery(['profile'], () =>
    fetchProfile(logReducer.accessToken),
  );
  const { data, isLoading, isError } = getProfile;
  if (isError) return <div>Error...</div>;
  if (isLoading) return <div>Loading...</div>;
  return <div>{data.username}</div>;
};

export default Profile;
