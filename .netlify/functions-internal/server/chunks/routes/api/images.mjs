import { d as defineEventHandler } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'zod';
import 'better-sqlite3';

const images = defineEventHandler(async () => {
  return [];
});

export { images as default };
//# sourceMappingURL=images.mjs.map
