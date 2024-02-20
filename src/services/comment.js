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
