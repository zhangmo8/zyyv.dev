import { d as defineEventHandler } from '../../nitro/nitro.mjs';
import { u as useOctokit } from '../../_/github.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'zod';
import 'better-sqlite3';
import 'octokit';

const repos = defineEventHandler(async () => {
  const { data } = await useOctokit().request("GET /user/repos", { per_page: 100 });
  const publicRepos = data.filter((repo) => !repo.fork && !repo.archived && !repo.private && repo.description);
  const repoGroups = {
    UI: publicRepos
  };
  return {
    list: Object.fromEntries(Object.entries(repoGroups).filter(([_, repos]) => repos.length > 0)),
    data
  };
});

export { repos as default };
//# sourceMappingURL=repos.mjs.map
