import { pathToFileURL } from 'node:url'
import path from 'node:path'

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith('@/')) {
    const rel = specifier.slice(2)
    const absPath = path.resolve(process.cwd(), rel)
    // Try extensions: .ts, .tsx, .js, /index.ts, /index.js
    const extensions = ['.ts', '.tsx', '.js', '/index.ts', '/index.js', '']
    const fs = await import('node:fs')
    for (const ext of extensions) {
      const candidate = absPath + ext
      if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
        return nextResolve(pathToFileURL(candidate).href, context)
      }
    }
    return nextResolve(pathToFileURL(absPath).href, context)
  }
  return nextResolve(specifier, context)
}
