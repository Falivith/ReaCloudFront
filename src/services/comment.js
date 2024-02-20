import { checkLoginStatus, baseUrl } from './utils';

export async function submitComment(commentText, resourceId) {
  const { userObject, config } = await checkLoginStatus();

  const commentConfig = {
    headers: {
      'Authorization': `${config.headers.Authorization}`,
      'Content-Type': 'application/json',
    },
  };

  if (userObject) {
    try {
      const commentData = {
        text: commentText,
        resourceId: resourceId,
      };

      const response = await baseUrl.post('/api/comment', commentData, commentConfig);
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


export async function getCommentInfo(id) {
  try {
    // Make a GET request to fetch comments based on the provided id
    const response = await baseUrl.get(`/api/comment/${id}`);

    const comments = response.data;
    console.log('Retrieved comments:', comments); // Log comments to the console
    return comments;
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
}
