export const toggleBodyScrolling = (state: boolean) => {
  state ? document.body.classList.remove('overflow-hidden') : document.body.classList.add('overflow-hidden')
};