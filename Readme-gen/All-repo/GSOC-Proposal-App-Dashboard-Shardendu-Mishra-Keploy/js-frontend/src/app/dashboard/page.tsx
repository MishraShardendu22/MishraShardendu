/* eslint-disable @next/next/no-img-element */
import { auth } from '@/auth'
import GitHubCalendar from 'react-github-calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowUpRight, Github, Code, LineChart, Calendar } from 'lucide-react'

const Page = async () => {
  const session = await auth()
  const username = session?.user?.login?.trim() ?? ''

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">GitHub Analytics</h1>
          <p className="text-muted-foreground">
            Insights and statistics for{' '}
            <span className="font-semibold text-primary">
              {username || 'your GitHub profile'}
            </span>
          </p>
        </div>

        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          <Github size={18} />
          View Profile
          <ArrowUpRight size={16} />
        </a>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger
            value="contributions"
            className="flex items-center gap-2"
          >
            <Calendar size={16} />
            Contributions
          </TabsTrigger>
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <LineChart size={16} />
            Overview
          </TabsTrigger>
          <TabsTrigger value="languages" className="flex items-center gap-2">
            <Code size={16} />
            Languages
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Github size={20} />
                  GitHub Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  className="w-full h-auto rounded-lg shadow-sm"
                  src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&locale=en&theme=transparent&text_color=3D3D3D&title_color=FF6B3D&icon_color=7861A5&border_color=E65428&bg_color=FAF4EF`}
                  alt={`${username}'s GitHub stats`}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart size={20} />
                  Contribution Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  className="w-full h-auto rounded-lg shadow-sm"
                  src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=transparent&background=FAF4EF&border=E65428&ring=7861A5&fire=FF6B3D&currStreakNum=3D3D3D&sideNums=3D3D3D&currStreakLabel=FF6B3D&sideLabels=3D3D3D&dates=3D3D3D`}
                  alt={`${username}'s streak stats`}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Languages Tab */}
        <TabsContent value="languages">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code size={20} />
                Most Used Languages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <img
                  className="w-full max-w-lg h-auto rounded-lg shadow-sm"
                  src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&langs_count=8&layout=compact&theme=transparent&text_color=3D3D3D&title_color=FF6B3D&border_color=E65428&bg_color=FAF4EF`}
                  alt={`${username}'s most used languages`}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contributions Tab */}
        <TabsContent value="contributions">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar size={20} />
                Contribution Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 text-white bg-black rounded-lg">
                {username ? (
                  <GitHubCalendar username={username} />
                ) : (
                  <div className="text-center p-8 text-black">
                    Please log in to view your contribution calendar
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* No Data State */}
      {!username && (
        <div className="mt-8 p-6 bg-muted rounded-lg text-center">
          <p className="text-muted-foreground mb-2">
            No GitHub username detected
          </p>
          <p>Log in with GitHub to see your personalized statistics</p>
        </div>
      )}
    </div>
  )
}

export default Page
