import React, { useState,useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { getProfilePicture, uploadPhoto } from '../../services/authentication';

const ProfilePicture = ({nome}) => {
  const [avatarSrc, setAvatarSrc] = useState(null);

  useEffect(() => {
    async function fetchData(){
        
      const response = await getProfilePicture()
      const uint8Array = new Uint8Array(response.data.data);
      const blob = new Blob([uint8Array], { type: response.data.type });
      const url = URL.createObjectURL(blob);
      setAvatarSrc(url);
  }
  fetchData()
  }, []);


  const handleAvatarChange = async(event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    
    formData.append('file', file);
    await uploadPhoto(formData)
    
    const reader = new FileReader();
    
    reader.onload = async (e) => {   
      setAvatarSrc(e.target.result);
    };

    reader.readAsDataURL(file);
    
  };

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <label htmlFor="avatar-upload">
        <Avatar alt="John Doe"
          src={avatarSrc}
          sx={{ width: 100, height: 100, cursor: 'pointer', marginBottom: '35px' }}
          >
          {nome} 
          
          </Avatar>
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