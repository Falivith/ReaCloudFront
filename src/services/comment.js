import { baseUrl } from './utils';

export async function submitComment(commentText, resourceId) {
  const reaCloudSession = await JSON.parse(localStorage.getItem("reaCloudSession"))
  const token = reaCloudSession?.jwt_token;

  const commentConfig = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    try {
      const commentData = {
        text: commentText,
        resourceId: resourceId,
      };

      const response = await baseUrl.post('/api/comments', commentData, commentConfig);
      return response;
    } catch (error) {
      console.error('Erro ao postar o comentário:', error);
      return null;
    }
  } else {
    console.log('Você não pode enviar um comentário sem estar logado.');
    return null;
  }
}

export async function deleteComment(commentId) {
  const reaCloudSession = await JSON.parse(localStorage.getItem("reaCloudSession"))
  const token = reaCloudSession?.jwt_token;

  const commentConfig = {
    headers: { 'Authorization': `Bearer ${token}` },
  };

  if (token) {
    try {
      const response = await baseUrl.delete(`/api/comments/${commentId}`, commentConfig);
      console.log(response.data);
      return response;
    } catch (error) {
      console.error('Erro ao deletar o comentário:', error);
      return null;
    }
  }
}

export async function getCommentInfo(id) {
  try {
    const response = await baseUrl.get(`/api/comments/${id}`);
    const comments = response.data;
    console.log(comments);
    return comments;
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
}
