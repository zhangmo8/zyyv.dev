import { d as defineEventHandler } from '../../nitro/nitro.mjs';
import { u as useOctokit } from '../../_/github.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'zod';
import 'better-sqlite3';
import 'octokit';

const user = defineEventHandler(async () => {
  const { data } = await useOctokit().request("GET /user");
  return data;
});

export { user as default };
//# sourceMappingURL=user.mjs.map
