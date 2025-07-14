import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, PenSquare, Trash2, User} from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Blog {
  _id: string;
  title: string;
  content: string;
  image?: string;
  username: string;
}

const Home = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingBlog, setDeletingBlog] = useState<string | null>(null);
  const user = localStorage.getItem("user-data-username");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/getBlog");
        setBlogs(response.data.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        toast.error("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You are not logged in");
      navigate("/login");
    }
  }, [navigate]);

  const handleDelete = async (title: string) => {
    try {
      const response = await axios.delete("http://127.0.0.1:3000/deleteBlog", {
        headers: { "Content-Type": "application/json" },
        data: title,
      });
      if (response.status === 200) {
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.title !== title));
        toast.success("Blog deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog");
    } finally {
      setDeletingBlog(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 p-4 md:p-8">
      <Toaster position="top-right" />
      
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Blog Feed</h1>
          <Button
            onClick={() => navigate("/blog")}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <PenSquare className="w-4 h-4 mr-2" />
            Create Post
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
          </div>
        ) : blogs.length === 0 ? (
          <Card className="bg-gray-800/50 border-purple-500/20 backdrop-blur-sm">
            <CardContent className="flex flex-col items-center justify-center h-64">
              <p className="text-gray-400 text-lg">No blogs available yet.</p>
              <Button
                onClick={() => navigate("/blog")}
                className="mt-4 bg-purple-600 hover:bg-purple-700"
              >
                Create Your First Post
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {blogs.map((blog) => (
              blog.username && blog.title && blog.content && (
                <Card key={blog._id} className="bg-gray-800/50 border-purple-500/20 backdrop-blur-sm transform transition-all duration-200 hover:shadow-purple-500/10 hover:shadow-lg">
                  <CardHeader className="border-b border-purple-500/20">
                    <div className="flex items-center space-x-2 mb-2">
                      <User className="w-4 h-4 text-purple-400" />
                      <CardTitle className="text-purple-200">{blog.username}</CardTitle>
                    </div>
                    <CardTitle className="text-2xl text-white">{blog.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="py-6">
                    <p className="text-gray-300 whitespace-pre-wrap">{blog.content}</p>
                    {blog.image && (
                      <div className="mt-4 rounded-lg overflow-hidden">
                        <img 
                          src={blog.image} 
                          alt="Blog" 
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    )}
                  </CardContent>
                  {blog.username.toLowerCase() === user?.toLowerCase() && (
                    <CardFooter className="border-t border-purple-500/20">
                      <Button
                        onClick={() => setDeletingBlog(blog.title)}
                        variant="destructive"
                        className="w-full"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Blog
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              )
            ))}
          </div>
        )}

        <AlertDialog open={!!deletingBlog} onOpenChange={() => setDeletingBlog(null)}>
          <AlertDialogContent className="bg-gray-800 border-purple-500/20">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">Delete Blog Post</AlertDialogTitle>
              <AlertDialogDescription className="text-gray-300">
                Are you sure you want to delete this blog post? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-gray-700 text-white hover:bg-gray-600">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deletingBlog && handleDelete(deletingBlog)}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Home;