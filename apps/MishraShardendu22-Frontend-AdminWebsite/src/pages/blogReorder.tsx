import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { CheckCircle2, GripVertical, Loader2, Save, TrendingDown, TrendingUp } from 'lucide-react'
import { useEffect, useState } from 'preact/hooks'
import toast from 'react-hot-toast'
import { ErrorState, Loading } from '../components/shared'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Card, CardHeader, CardTitle } from '../components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { useAuth } from '../hooks/use-auth'
import type { BlogReorderUpdate } from '../types/types.data'
import { blogsAPI } from '../utils/apiResponse.util'

interface BlogItem {
  uid: string
  blogId: number
  title: string
  order: number
}

interface ChangedItem {
  uid: string
  blogId: number
  title: string
  oldOrder: number
  newOrder: number
}

interface SortableCardProps {
  item: BlogItem
}

const SortableCard = ({ item }: SortableCardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.uid,
  })

  // KEY FIX: Disable transform when dragging to prevent dual movement
  const style = {
    transform: isDragging ? 'unset' : CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative transition-all duration-200 ${
        isDragging ? 'opacity-50 shadow-lg scale-[0.98]' : ''
      }`}
    >
      <Card
        className={`border bg-card ${isDragging ? '' : 'hover:shadow-md hover:border-primary/30'}`}
      >
        <CardHeader className="p-4">
          <div className="flex items-start gap-3">
            <div
              className="mt-0.5 cursor-grab active:cursor-grabbing p-1 rounded hover:bg-muted/50 transition-colors"
              {...attributes}
              {...listeners}
              role="button"
              tabIndex={0}
              aria-roledescription="draggable"
              aria-describedby={`blog-${item.blogId}`}
            >
              <GripVertical className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base font-medium text-foreground line-clamp-2 leading-snug">
                {item.title}
              </CardTitle>
            </div>
            <Badge variant="secondary" className="shrink-0 font-mono text-xs h-6 px-2">
              #{item.order}
            </Badge>
          </div>
        </CardHeader>
      </Card>
    </div>
  )
}

export default function BlogReorderPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const [items, setItems] = useState<BlogItem[]>([])
  const [originalOrder, setOriginalOrder] = useState<Map<string, number>>(new Map())
  const [changedItems, setChangedItems] = useState<ChangedItem[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    if (!isLoading && !isAuthenticated) return

    const fetchBlogs = async () => {
      try {
        setLoading(true)
        const res = await blogsAPI.getReorderList()
        const data = Array.isArray(res.data) ? res.data : []

        const sorted = [...data].sort((a, b) => (a.orderId ?? 0) - (b.orderId ?? 0))

        const blogItems: BlogItem[] = sorted.map((blog) => ({
          uid: `blog-${blog.id}`,
          blogId: blog.id,
          title: blog.title,
          order: blog.orderId,
        }))

        setItems(blogItems)

        const orderMap = new Map<string, number>()
        blogItems.forEach((item) => orderMap.set(item.uid, item.order))
        setOriginalOrder(orderMap)
        setError('')
      } catch (err) {
        console.error('Failed to load blogs:', err)
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to load blogs. Please try again later.'
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [isAuthenticated, isLoading])

  const handleSave = async () => {
    if (changedItems.length === 0) return

    try {
      setSaving(true)
      const payload: BlogReorderUpdate[] = changedItems.map((item) => ({
        id: item.blogId,
        blogId_New: item.newOrder,
      }))

      await blogsAPI.updateReorder(payload)

      const newOrderMap = new Map(originalOrder)
      changedItems.forEach((item) => newOrderMap.set(item.uid, item.newOrder))
      setOriginalOrder(newOrderMap)
      setChangedItems([])
      toast.success('Blogs reordered successfully')
    } catch {
      toast.error('Failed to save changes. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    if (!over || active.id === over.id) return

    setItems((current) => {
      const oldIndex = current.findIndex((item) => item.uid === active.id)
      const newIndex = current.findIndex((item) => item.uid === over.id)

      const reordered = arrayMove(current, oldIndex, newIndex)
      const updated = reordered.map((item, idx) => ({ ...item, order: idx + 1 }))

      const changes: ChangedItem[] = []
      updated.forEach((item) => {
        const original = originalOrder.get(item.uid)
        if (original !== undefined && original !== item.order) {
          changes.push({
            uid: item.uid,
            blogId: item.blogId,
            title: item.title,
            oldOrder: original,
            newOrder: item.order,
          })
        }
      })

      setChangedItems(changes)
      return updated
    })
  }

  const activeItem = items.find((item) => item.uid === activeId)

  if (loading) {
    return <Loading title="Loading Blogs" description="Please wait..." size="lg" />
  }

  if (error) {
    return <ErrorState title="Error Loading Blogs" message={error} size="lg" />
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Only owner can access this page</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="border-b pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-semibold text-foreground">Blog Reorder</h1>
        </div>
        <p className="text-sm text-muted-foreground ml-14">Reorder blog posts (owner only)</p>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 border rounded-lg bg-muted/20">
          <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center mb-4">
            <svg className="h-8 w-8 text-muted-foreground" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 7h18M3 12h18M3 17h18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-foreground mb-1">No Blogs Found</h3>
          <p className="text-sm text-muted-foreground">Blogs will appear here once created</p>
        </div>
      ) : (
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full max-w-md h-10 bg-muted p-1">
            <TabsTrigger value="all" className="flex-1 text-sm data-[state=active]:bg-background">
              All Blogs ({items.length})
            </TabsTrigger>
            <TabsTrigger
              value="changed"
              className="flex-1 text-sm data-[state=active]:bg-background"
            >
              Changes {changedItems.length > 0 && `(${changedItems.length})`}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={items.map((i) => i.uid)} strategy={rectSortingStrategy}>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((item) => (
                    <SortableCard key={item.uid} item={item} />
                  ))}
                </div>
              </SortableContext>
              <DragOverlay>
                {activeItem ? (
                  <Card className="shadow-xl border-primary/50 bg-card">
                    <CardHeader className="p-4">
                      <div className="flex items-start gap-3">
                        <GripVertical className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <CardTitle className="text-base font-medium text-foreground line-clamp-2 flex-1">
                          {activeItem.title}
                        </CardTitle>
                        <Badge variant="secondary" className="font-mono text-xs h-6 px-2">
                          #{activeItem.order}
                        </Badge>
                      </div>
                    </CardHeader>
                  </Card>
                ) : null}
              </DragOverlay>
            </DndContext>
          </TabsContent>

          <TabsContent value="changed" className="mt-6 space-y-4">
            {changedItems.length > 0 && (
              <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg border">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {changedItems.length} {changedItems.length === 1 ? 'blog' : 'blogs'} modified
                    </p>
                    <p className="text-xs text-muted-foreground">Click save to apply changes</p>
                  </div>
                </div>
                <Button
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-primary hover:bg-primary/90"
                >
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            )}

            {changedItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 border rounded-lg bg-muted/20">
                <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-1">No Changes</h3>
                <p className="text-sm text-muted-foreground">
                  Reorder blogs in the All Blogs tab to see changes
                </p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-lg border">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50 border-b">
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Blog Title
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Previous
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        New
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Change
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-card">
                    {changedItems.map((item) => {
                      const orderChange = item.newOrder - item.oldOrder
                      const isMovedDown = orderChange > 0

                      return (
                        <tr key={item.blogId} className="hover:bg-muted/30 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-foreground truncate max-w-xs">
                                {item.title}
                              </span>
                              <span className="text-xs text-muted-foreground font-mono">
                                Blog ID: #{item.blogId}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <Badge variant="outline" className="font-mono text-xs">
                              #{item.oldOrder}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <Badge variant="default" className="font-mono text-xs bg-primary">
                              #{item.newOrder}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <div className="flex items-center justify-center gap-1">
                              {isMovedDown ? (
                                <TrendingDown className="h-3.5 w-3.5 text-orange-500" />
                              ) : (
                                <TrendingUp className="h-3.5 w-3.5 text-green-500" />
                              )}
                              <span
                                className={`text-sm font-medium ${isMovedDown ? 'text-orange-500' : 'text-green-500'}`}
                              >
                                {Math.abs(orderChange)}
                              </span>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
