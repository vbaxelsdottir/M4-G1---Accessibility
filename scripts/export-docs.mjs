import { mkdir, copyFile, cp } from 'node:fs/promises';
await mkdir('dist/resources', { recursive: true });
for (const file of ['prompt.md', 'spec.md', 'README.md']) await copyFile(file, `dist/resources/${file}`);
await copyFile('.agents/skills/accessibility/SKILL.md', 'dist/resources/SKILL.md');
for (const file of ['method.md', 'manual-review.md', 'contrast.md']) await copyFile(`report/${file}`, `dist/resources/${file}`);
await cp('tests', 'dist/resources/tests', { recursive: true });
