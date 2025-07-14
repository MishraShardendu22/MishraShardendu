import { auth } from '@/auth'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CalendarIcon, MapPinIcon, MailIcon, UsersIcon } from 'lucide-react'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'

const Page = async () => {
  const session = await auth()
  const user = session?.user

  return (
    <div className="flex flex-col w-full min-h-screen bg-background p-4 md:p-6">
      <div className="w-full max-w-full mx-auto">
        <Card className="overflow-hidden border-border shadow-lg">
          <div className="h-48 w-full bg-gradient-to-r from-primary/80 to-secondary/80 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80 opacity-50"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-white text-3xl font-bold">GitHub Profile</h1>
            </div>
            <div className="absolute inset-0 opacity-20 pattern-dots pattern-white pattern-size-4 pattern-opacity-20"></div>

            <div className="absolute -bottom-16 left-8">
              <div className="rounded-full border-4 border-card overflow-hidden shadow-lg">
                <Image
                  src={user?.image || '/default-avatar.png'}
                  alt="User Avatar"
                  width={120}
                  height={120}
                  className="rounded-full bg-muted"
                />
              </div>
            </div>
          </div>

          <CardHeader className="pt-20 pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  {user?.name || 'User Name'}
                </h2>
                <p className="text-muted-foreground mt-1">
                  {user?.bio || 'No bio provided'}
                </p>
              </div>
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4 md:col-span-2">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <MailIcon className="h-4 w-4 text-muted-foreground" /> Email
                    Address
                  </Label>
                  <Input
                    type="email"
                    value={user?.email || 'user@example.com'}
                    readOnly
                    className="bg-muted/50 border-muted"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <MapPinIcon className="h-4 w-4 text-muted-foreground" />{' '}
                    Location
                  </Label>
                  <Input
                    type="text"
                    value={user?.location || 'Not set'}
                    readOnly
                    className="bg-muted/50 border-muted"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Account Statistics
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4 bg-accent/5 border-accent/20">
                    <div className="flex items-center gap-2">
                      <UsersIcon className="h-5 w-5 text-accent" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Followers
                        </p>
                        <p className="text-xl font-bold">
                          {user?.followers || '0'}
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 bg-primary/5 border-primary/20">
                    <div className="flex items-center gap-2">
                      <UsersIcon className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Following
                        </p>
                        <p className="text-xl font-bold">
                          {user?.following || '0'}
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="bg-muted/30 py-4 flex items-center justify-between">
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Member since {user?.created_at}
            </div>
            <Badge variant="outline" className="font-normal">
              Personal Account
            </Badge>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default Page

export const metadata = {
  title: 'Settings',
  description: 'Manage your account settings and preferences.',
}
