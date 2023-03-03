function wrapIt(promise) {
  return Promise.allSettled([promise]).then(([{ value, reason }]) => {
    return { data: value, error: reason };
  });
}
