import * as esbuild from 'esbuild'
import fs from 'node:fs/promises'
import packJSON from '../package.json' with { type: 'json' }

const version = packJSON.version
const now = new Date()

let results = await esbuild.build({
  entryPoints: ['src/client/zones.js'],
  bundle: true,
  banner: {
    js: `/* wiki-plugin-zones - ${version} - ${now.toUTCString()} */`,
  },
  minify: true,
  sourcemap: true,
  logLevel: 'info',
  metafile: true,
  outfile: 'client/zones.js',
})

await fs.writeFile('meta-client.json', JSON.stringify(results.metafile))
console.log("\n  esbuild metadata written to 'meta-client.json'.")
