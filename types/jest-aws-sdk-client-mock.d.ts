// jest-aws-sdk-client-mock.d.ts

// This augments Jest's matchers to include the custom matcher provided by aws-sdk-client-mock-jest.
declare namespace jest {
  interface Matchers<R> {
    /**
     * Asserts that the AWS SDK mock received the specified command the given number of times.
     *
     * @param command - The constructor for the AWS command.
     * @param times - The number of times the command is expected to have been called.
     */
    toHaveReceivedCommandTimes(
      command: new (...args: any[]) => any,
      times: number
    ): R;
  }
}
