import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Image, Send } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

const Blog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const postBlog = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    const id = localStorage.getItem("user-data-id");
    const username = localStorage.getItem("user-data-username");

    if (!id || !username) {
      toast.error("User data not found. Please log in again.");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("imageUrl", imageUrl);
    formData.append("userid", id);

    try {
      const res = await axios.post("http://127.0.0.1:3000/makeBlog", formData);

      if (res.status === 200) {
        toast.success("Blog posted successfully!");
        setTitle("");
        setContent("");
        setImageUrl("");
        navigate("/home");
      } else {
        toast.error("Failed to post blog.");
      }
    } catch (error) {
      console.error("Error posting blog:", error);
      toast.error("An error occurred while posting the blog.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 p-4 md:p-8">
      <Toaster position="top-right" />
      <div className="max-w-3xl mx-auto">
        <Card className="border-purple-500/20 bg-gray-900/90 backdrop-blur-sm shadow-xl">
          <CardHeader className="border-b border-purple-500/20">
            <CardTitle className="text-2xl md:text-3xl font-bold flex items-center gap-3 text-white">
              <Pencil className="w-6 h-6 text-purple-400" />
              Create New Blog Post
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-purple-200">
                Blog Title
              </label>
              <Input
                type="text"
                placeholder="Enter your blog title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-gray-800/50 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-purple-200">
                Blog Content
              </label>
              <Textarea
                placeholder="Write your blog content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[300px] bg-gray-800/50 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20 resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-purple-200">
                Image URL
              </label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Enter image URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="bg-gray-800/50 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20 pl-10"
                />
                <Image className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" />
              </div>
            </div>

            <Button
              onClick={postBlog}
              disabled={isSubmitting}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-6 flex items-center justify-center gap-2 transition-all duration-200 ease-in-out disabled:opacity-50"
            >
              {isSubmitting ? (
                "Publishing..."
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Publish Blog Post
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Blog;