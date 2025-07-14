const fs = require('fs');
const path = require('path');

// Read all summary files
const summariesDir = './All-Summaries';
const summaryFiles = fs.readdirSync(summariesDir).filter(file => file.endsWith('.json'));

let allProjects = [];

// Read each summary file
summaryFiles.forEach(file => {
    try {
        const content = fs.readFileSync(path.join(summariesDir, file), 'utf8');
        const project = JSON.parse(content);
        allProjects.push(project);
    } catch (error) {
        console.error(`Error reading ${file}:`, error.message);
    }
});

console.log(`Total projects found: ${allProjects.length}`);

// Create groups of 5 projects each
const groups = [];
for (let i = 0; i < allProjects.length; i += 5) {
    groups.push(allProjects.slice(i, i + 5));
}

// Generate TypeScript file
let tsContent = '// Complete Project Groups - All 73 Projects\n\n';

groups.forEach((group, index) => {
    const groupNumber = index + 1;
    tsContent += `export const group_${groupNumber} = ${JSON.stringify(group, null, 2)};\n\n`;
});

// Add summary
tsContent += `// Summary: ${groups.length} groups with ${allProjects.length} total projects\n`;
tsContent += `// Generated on: ${new Date().toISOString()}\n`;

fs.writeFileSync('complete_project_groups.ts', tsContent);
console.log(`Generated complete_project_groups.ts with ${groups.length} groups and ${allProjects.length} projects`); 