// export const clear = (): void => {
//   if (window['localStorage']['nomination']) {
//     localStorage.removeItem('nomination');
//   }
// };

export const getStorageData = (): string[] => {
  let response = localStorage.getItem('nomination');
  if (response) {
    return JSON.parse(response);
  }
  return [];
};
