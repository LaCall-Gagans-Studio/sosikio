import * as migration_20251116_052827 from './20251116_052827';
import * as migration_20251116_062926 from './20251116_062926';
import * as migration_20251116_063138 from './20251116_063138';

export const migrations = [
  {
    up: migration_20251116_052827.up,
    down: migration_20251116_052827.down,
    name: '20251116_052827',
  },
  {
    up: migration_20251116_062926.up,
    down: migration_20251116_062926.down,
    name: '20251116_062926',
  },
  {
    up: migration_20251116_063138.up,
    down: migration_20251116_063138.down,
    name: '20251116_063138'
  },
];
