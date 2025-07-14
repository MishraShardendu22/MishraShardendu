import React from 'react'

interface TopicsSectionProps {
  topics: string[]
}

const TopicsSection: React.FC<TopicsSectionProps> = ({ topics }) => {
  return (
    <div className="bg-card rounded-lg shadow-md p-6 mb-8 border border-border">
      <h2 className="text-xl font-bold mb-4 text-foreground">Topics</h2>
      <div className="flex flex-wrap gap-2">
        {topics.length > 0 ? (
          topics.map((topic, index) => (
            <span
              key={index}
              className="bg-accent/10 text-accent-foreground px-3 py-1 rounded-full text-sm hover:bg-accent/20 transition-colors"
            >
              {topic}
            </span>
          ))
        ) : (
          <span className="text-muted-foreground">No topics found</span>
        )}
      </div>
    </div>
  )
}

export default TopicsSection
