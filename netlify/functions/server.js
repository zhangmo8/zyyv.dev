import { loadNuxt } from 'nuxt'

export async function handler(event) {
  const nuxt = await loadNuxt({
    dev: false,
    mode: 'server',
    buildDir: '.output',
  })

  try {
    const url = event.path
    const method = event.httpMethod
    const headers = event.headers
    const body = event.body ? JSON.parse(event.body) : undefined

    const response = await nuxt.server.renderHandle({
      url,
      method,
      headers,
      body,
    })

    return {
      statusCode: response.statusCode,
      headers: {
        ...response.headers,
        'Content-Type': 'text/html; charset=utf-8',
      },
      body: response.body,
    }
  }
  catch (error) {
    console.error('SSR Error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    }
  }
  finally {
    await nuxt.close()
  }
}
