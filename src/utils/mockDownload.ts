export const mockDownload = async (url: string): Promise<void> => {
  // Simulate API call with 1.5 second delay
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Mock download initiated for: ${url}`);
      resolve();
    }, 1500);
  });
};
