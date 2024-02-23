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

// usa o API Canvas do próprio navegador para redimensionar a imagem antes dela chegar no backend
  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    const maxWidth = 200; 
    const maxHeight = 200;
    const reader = new FileReader();
  
    reader.onload = async (e) => {
      const img = document.createElement("img");
      img.src = e.target.result;
  
      img.onload = async () => {
        let width = img.width;
        let height = img.height;
  
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }
  
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
  
        canvas.toBlob(async (blob) => {
          const formData = new FormData();
          formData.append('file', blob, file.name);
          await uploadPhoto(formData);
          setAvatarSrc(URL.createObjectURL(blob));
        }, file.type);
      };
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