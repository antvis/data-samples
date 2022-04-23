export async function fulfillWithTimeLimit(timeLimit: number, task: any, failureValue: any) {
  let timeout;
  const timeoutPromise = new Promise((resolve) => {
    timeout = setTimeout(() => {
      resolve(failureValue);
    }, timeLimit);
  });
  const response = await Promise.race([task, timeoutPromise]);
  if (timeout) {
    clearTimeout(timeout);
  }
  return response;
}
