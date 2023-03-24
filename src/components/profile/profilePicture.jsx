import React, { useState,useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { getProfilePicture, uploadPhoto } from '../../services/authentication';

const ProfilePicture = () => {
  const [avatarSrc, setAvatarSrc] = useState('/deletar.jpg');

  useEffect(() => {
    async function fetchData(){
        
      const response = await getProfilePicture()
      console.log('response =', response);
      const blob = new Blob([response.data], { type: response.type });
      const url = URL.createObjectURL(blob);
      setAvatarSrc(url);
  }
  fetchData()
  }, []);



  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const formData = new FormData();
      formData.append('file', file);
      await uploadPhoto(formData)
      setAvatarSrc(e.target.result);
    };

    reader.readAsDataURL(file);
    
  };

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <label htmlFor="avatar-upload">
        <Avatar
          alt="John Doe"
          src={avatarSrc}
          sx={{ width: 100, height: 100, cursor: 'pointer' }}
        />
      </label>
      <input
        id="avatar-upload"
        type="file"
        accept="image/*"
        onChange={handleAvatarChange}
        style={{ display: 'none' }}
      />
    </Stack>
  );
};

export default ProfilePicture;