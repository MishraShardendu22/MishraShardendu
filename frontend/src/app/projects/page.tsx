import Link from 'next/link';

// ... other imports and component definitions ...

const ProjectsPage = () => {
  // Assuming projects state is managed elsewhere, e.g., in a context or hook
  const projects = [
    {
      project_name: "Project A",
      small_description: "Short description for Project A.",
      skills: ["Skill 1", "Skill 2"],
      inline: { id: "1" },
    },
    {
      project_name: "Project B",
      small_description: "Short description for Project B.",
      skills: ["Skill 3", "Skill 4"],
      inline: { id: "2" },
    },
    // Add more projects as needed
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Projects</h1>
      <div className="grid gap-6">
        {projects.map((project) => (
          <Link key={project.inline?.id || project.inline.id} href={`/projects/${project.inline?.id || project.inline.id}`} className="block">
            <Card className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{project.project_name}</CardTitle>
                <CardDescription>{project.small_description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage; 