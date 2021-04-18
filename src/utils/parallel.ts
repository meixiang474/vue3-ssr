export const parallel = (promises: Promise<any>[]): Promise<any[]> => {
  return Promise.all(
    promises.map(
      (promise) =>
        new Promise((resolve) => {
          promise.then(resolve, resolve);
        })
    )
  );
};
