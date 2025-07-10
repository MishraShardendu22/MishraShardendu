import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../ui/card';
import React from 'react';

type SkillsManagementProps = {
  skills: string[];
};

export function SkillsManagement({ skills }: SkillsManagementProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Skills</CardTitle>
        <CardDescription>
          Add new skills or remove existing ones from your portfolio
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <span className="font-medium">{skill}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
