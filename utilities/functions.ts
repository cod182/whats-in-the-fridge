export const toggleBodyScrolling = (state: boolean) => {
  state ? document.body.classList.remove('overflow-hidden') : document.body.classList.add('overflow-hidden')
};

export const queryDatabase = async (query: string) => {
  try {
    const response = await fetch('/api/getdata', {
      method: 'GET',
      headers: {
        'query-header': query,
      }
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return false;
  }
}