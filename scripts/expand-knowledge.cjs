const fs = require('fs');
const path = require('path');

// ============================================================
// Read detailed sections from JSON file
// ============================================================
const sectionsPath = path.join(__dirname, 'detailed-sections.json');
const detailedContentMap = JSON.parse(fs.readFileSync(sectionsPath, 'utf8'));

// ============================================================
// Load and update knowledgeConfig.ts
// ============================================================
const configPath = path.join(__dirname, '..', 'lib', 'knowledgeConfig.ts');
let config = fs.readFileSync(configPath, 'utf8');

// Add detailedSections to interface (handles both old and extendedContent variants)
if (!config.includes('detailedSections:')) {
  config = config.replace(
    /(  relatedTools: \{ name: string; href: string; icon: string; desc: string \}\[\];[\s\S]*?)(\n}\n*export const KNOWLEDGE_POINTS)/,
    '$1\n  detailedSections: KnowledgeSection[];\n}\n\ninterface KnowledgeSection {\n  title: string;\n  content: string;\n}\n\nexport const KNOWLEDGE_POINTS'
  );
  console.log('Added detailedSections to KnowledgePoint interface');
}

// Insert detailedSections for each knowledge point
for (const [slug, sections] of Object.entries(detailedContentMap)) {
  const slugPattern = new RegExp(`slug:\\s*['"]${slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`);
  const match = config.match(slugPattern);
  if (!match) {
    console.log(`WARNING: Could not find slug: ${slug}`);
    continue;
  }

  // Skip if already injected for this slug
  const alreadyInjected = config.slice(match.index, match.index + 2000).includes('detailedSections:');
  if (alreadyInjected) {
    console.log(`SKIP: detailedSections already exists for: ${slug}`);
    continue;
  }

  const slugIndex = match.index;
  const afterSlug = config.slice(slugIndex);
  const relatedToolsMatch = afterSlug.match(/relatedTools:\s*\[[\s\S]*?\]\s*,/);
  if (!relatedToolsMatch) {
    console.log(`WARNING: Could not find relatedTools for slug: ${slug}`);
    continue;
  }

  const relatedToolsEnd = slugIndex + relatedToolsMatch.index + relatedToolsMatch[0].length;

  // Format the detailedSections, escaping special characters
  const sectionsStr = sections.map(s => {
    const escapedTitle = JSON.stringify(s.title);
    const escapedContent = JSON.stringify(s.content);
    return `    { title: ${escapedTitle}, content: ${escapedContent} }`;
  }).join(',\n');

  const detailedSectionsCode = `\n  detailedSections: [\n${sectionsStr}\n  ],`;

  config = config.slice(0, relatedToolsEnd) + detailedSectionsCode + config.slice(relatedToolsEnd);
  console.log(`Added detailedSections for: ${slug} (${sections.length} sections)`);
}

fs.writeFileSync(configPath, config, 'utf8');
console.log('\nknowledgeConfig.ts updated successfully!');
