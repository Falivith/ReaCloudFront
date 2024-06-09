import { baseUrl } from './utils';

export async function submitComment(commentText, resourceId) {
  const reaCloudSession = JSON.parse(localStorage.getItem("reaCloudSession"));
  const token = reaCloudSession?.jwt_token;

  const commentConfig = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const commentData = {
      text: commentText,
      resourceId: resourceId,
    };

    const response = await baseUrl.post('/api/comments', commentData, commentConfig);
    return response;
  } catch (error) {
    if (error.response) {
      const statusCode = error.response.status;
      if (statusCode === 401 || statusCode === 404) {
        return { error: true, message: 'Unlogged' };
      } else if (statusCode === 400) {
        return { error: true, message: 'Bad Request' };
      }
    } else {
      return { error: true, message: 'Network Error' };
    }
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
    return comments;
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
}
