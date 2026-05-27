import { healthService } from "../services/health.service";

export const healthController = {
  check: () => healthService.getStatus(),
};
