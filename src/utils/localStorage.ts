export const clear = (): void => {
  if (window['localStorage']['nomination']) {
    localStorage.removeItem('nomination');
  }
};
