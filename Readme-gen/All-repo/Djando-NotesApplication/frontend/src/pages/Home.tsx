import { useEffect, useState } from "react";
import api from "../api";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Trash2 } from "lucide-react";
import { Alert, AlertDescription } from "../components/ui/alert";

interface Note {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

const Home = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const showAlert = (type: 'success' | 'error', message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 3000);
  };

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => {
        setNotes(res.data);
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
        showAlert('error', 'Failed to fetch notes');
      });
  };

  const deleteNote = (id: number) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          showAlert('success', 'Note deleted successfully!');
        } else {
          showAlert('error', 'Failed to delete note');
        }
        getNotes();
      })
      .catch((error) => {
        console.error("Error deleting note:", error);
        showAlert('error', 'Failed to delete note');
      });
  };

  const createNote = (e: React.FormEvent) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) {
          showAlert('success', 'Note created successfully!');
          setContent("");
          setTitle("");
        } else {
          showAlert('error', 'Failed to create note');
        }
        getNotes();
      })
      .catch((err) => {
        console.error("Error creating note:", err);
        showAlert('error', 'Failed to create note');
      });
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {alert && (
        <Alert className={`mb-4 ${alert.type === 'success' ? 'bg-green-50 text-green-900' : 'bg-red-50 text-red-900'}`}>
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 mb-8">
        {notes.map((note) => (
          <Card key={note.id} className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">{note.title}</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteNote(note.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-2 whitespace-pre-wrap">{note.content}</p>
              <p className="text-sm text-gray-400">
                {new Date(note.created_at).toLocaleDateString("en-US", {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Create a Note</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={createNote} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Input
                type="text"
                id="title"
                name="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium">
                Content
              </label>
              <Textarea
                id="content"
                name="content"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full min-h-[100px]"
              />
            </div>
            <Button type="submit" className="w-full">
              Create Note
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;