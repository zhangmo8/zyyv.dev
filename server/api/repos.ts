import type { Repo } from '~/types'
import { useOctokit } from '../utils/github'

export default defineEventHandler(async () => {
  const { data } = await useOctokit().request('GET /user/repos', { per_page: 100 })

  console.log('data', data)

  const publicRepos = data.filter(repo => !repo.fork && !repo.archived && !repo.private && repo.description)
  const repoGroups: Record<string, Repo[]> = {
    UI: publicRepos,
  }

  return {
    list: Object.fromEntries(Object.entries(repoGroups).filter(([_, repos]) => repos.length > 0)),
    data,
  }
})
