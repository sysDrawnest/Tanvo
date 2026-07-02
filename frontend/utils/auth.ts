export const getValidToken = (): string | null => {
  const token = localStorage.getItem('token');
  if (!token || token === 'null' || token === 'undefined' || token.trim() === '') {
    return null;
  }
  return token;
};
