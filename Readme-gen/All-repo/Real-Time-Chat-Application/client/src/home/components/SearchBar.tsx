import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, ArrowLeft } from 'lucide-react';
import SearchResults from './SearchResult';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";

interface User {
  _id: string;
  fullname: string;
  username: string;
  gender: string;
  email: string;
  profilepic: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const fetchSearchResults = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/user/search?search=${searchInput}`);
      const data = await response.json();
      setSearchResults(data);
      setShowResults(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSearchResults();
  };

  const handleBack = () => {
    setShowResults(false);
    setSearchInput('');
  };

  const handleClose = () => {
    setIsSearchOpen(false);
    setShowResults(false);
    setSearchInput('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Button 
        onClick={() => setIsSearchOpen(true)}
        variant="outline"
        className="w-full flex items-center gap-2 h-12 px-4 text-muted-foreground hover:text-foreground transition-colors"
      >
        <Search className="h-4 w-4" />
        <span className="flex-1 text-left">Search users...</span>
      </Button>

      <Dialog open={isSearchOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-2xl max-h-[85vh] p-0 gap-0 overflow-hidden">
          <DialogHeader className="p-4 pb-2">
            <div className="flex items-center gap-2">
              {showResults && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBack}
                  className="h-8 w-8"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <DialogTitle className="text-xl">
                {showResults ? 'Search Results' : 'Search Users'}
              </DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="h-8 w-8 ml-auto"
              >
              </Button>
            </div>
          </DialogHeader>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-4 pb-4"
          >
            {!showResults && (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <Card className="border-2 shadow-none">
                  <CardContent className="p-2">
                    <div className="relative flex items-center gap-2">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          type="text"
                          placeholder="Type to search..."
                          value={searchInput}
                          onChange={(e) => setSearchInput(e.target.value)}
                          className="pl-10 h-12 bg-background border-none focus-visible:ring-0"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        disabled={isLoading || !searchInput.trim()}
                        className="h-8 px-4"
                      >
                        {isLoading ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Loader2 className="h-4 w-4" />
                          </motion.div>
                        ) : (
                          'Search'
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </form>
            )}

            <AnimatePresence mode="wait">
              {showResults && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.2 }}
                  className="mt-2"
                >
                  <SearchResults searchResults={searchResults} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchBar;