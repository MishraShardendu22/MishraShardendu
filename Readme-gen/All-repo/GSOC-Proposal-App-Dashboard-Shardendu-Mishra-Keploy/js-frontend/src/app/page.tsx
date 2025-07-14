import { Metadata } from "next"

const Page = async () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-4 text-gray-600">
        This is the dashboard page. You can add your content here.
      </p>
    </div>
  )
}

export default Page

export const metadata: Metadata = {
  title: 'App Dashboard',
  description:
    'An interactive console for real-time visualizations, code merges, and test activities.',
}