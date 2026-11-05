import { register } from 'node:module'
import { pathToFileURL } from 'node:url'
import path from 'node:path'

register(pathToFileURL(path.resolve('tests/alias-loader.mjs')).href, import.meta.url)
