import { d as defineEventHandler, g as getQuery } from '../../nitro/nitro.mjs';
import { u as useOctokit } from '../../_/github.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'zod';
import 'better-sqlite3';
import 'octokit';

const contribution = defineEventHandler(async (event) => {
  const { name, year } = getQuery(event);
  const octokit = useOctokit();
  try {
    const response = await octokit.request("GET /users/{username}/events", {
      username: name,
      per_page: 100
    });
    const contributions = response.data.filter((d) => {
      const eventYear = new Date(d.created_at).getFullYear();
      return eventYear === Number.parseInt(year, 10);
    });
    return contributions;
  } catch (error) {
    console.error("Error fetching contributions:", error);
    throw error;
  }
});

export { contribution as default };
//# sourceMappingURL=contribution.mjs.map
