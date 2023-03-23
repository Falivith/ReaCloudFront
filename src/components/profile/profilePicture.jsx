import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const ProfilePicture = () => {
  const [avatarSrc, setAvatarSrc] = useState('/deletar.jpg');

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
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