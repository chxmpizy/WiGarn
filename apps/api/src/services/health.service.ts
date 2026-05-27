export const healthService = {
  getStatus: () => ({
    status: "ok" as const,
    service: "wigarn-api",
  }),
};
