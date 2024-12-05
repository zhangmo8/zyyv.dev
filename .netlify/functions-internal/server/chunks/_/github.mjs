import { Octokit } from 'octokit';

let _octokit;
function useOctokit() {
  if (!_octokit) {
    _octokit = new Octokit({
      auth: process.env.zm8_github_token
    });
  }
  return _octokit;
}

export { useOctokit as u };
//# sourceMappingURL=github.mjs.map
