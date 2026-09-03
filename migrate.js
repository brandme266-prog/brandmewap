const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  if (content.includes('next/image')) {
    content = content.replace(/import Image from ['"]next\/image['"];?/g, '');
    content = content.replace(/<Image([^>]+)>/g, (match, props) => {
      // Remove Next.js specific props and keep standard img props
      let newProps = props.replace(/priority=\{?[^}]*\}?/g, '')
                          .replace(/quality=\{?[^}]*\}?/g, '')
                          .replace(/fill/g, '')
                          .replace(/objectFit=["'][^"']*["']/g, '');
      return `<img${newProps}>`;
    });
    content = content.replace(/<\/Image>/g, '</img>'); // Although image is self-closing, just in case
    changed = true;
  }

  if (content.includes('next/link')) {
    content = content.replace(/import Link from ['"]next\/link['"];?/g, 'import { Link } from "react-router-dom";');
    // next/link also uses <Link href=...> instead of <Link to=...>
    content = content.replace(/<Link([^>]*)href=/g, '<Link$1to=');
    changed = true;
  }
  
  if (content.includes('next/navigation') || content.includes('next/router')) {
    content = content.replace(/import\s+\{\s*useRouter(?:,\s*useSearchParams)?\s*\}\s+from\s+['"]next\/navigation['"];?/g, 'import { useNavigate, useSearchParams } from "react-router-dom";');
    content = content.replace(/const\s+router\s*=\s*useRouter\(\);?/g, 'const navigate = useNavigate();');
    content = content.replace(/router\.push\(/g, 'navigate(');
    content = content.replace(/router\.replace\(/g, 'navigate(');
    changed = true;
  }

  // Vite uses import.meta.env for env vars
  if (content.includes('process.env.NEXT_PUBLIC_')) {
    content = content.replace(/process\.env\.NEXT_PUBLIC_/g, 'import.meta.env.VITE_');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated:', filePath);
  }
}

function traverse(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverse(fullPath);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      replaceInFile(fullPath);
    }
  }
}

traverse(path.join(process.cwd(), 'src'));
console.log('Done');
