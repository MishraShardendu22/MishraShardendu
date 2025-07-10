import Link from 'next/link';

// ... other imports and component definitions ...

const CertificationsPage = () => {
  // ... state and data fetching ...

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Certifications</h1>
      <p className="text-lg mb-6">
        Explore our collection of professional certifications. Each certification
        provides valuable skills and knowledge in various domains.
      </p>

      <div className="grid gap-6">
        {certifications.map((cert) => (
          <Link key={cert.inline?.id || cert.inline.id} href={`/certifications/${cert.inline?.id || cert.inline.id}`} className="block">
            <Card className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{cert.title}</CardTitle>
                <CardDescription>{cert.description.slice(0, 100) + (cert.description.length > 100 ? '...' : '')}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill, index) => (
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

export default CertificationsPage; 