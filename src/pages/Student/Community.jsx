/*
 * UPDATED BY CURSOR — PURPOSE: Elevated Student Community page (VIEW-ONLY).
 * Students can browse community posts with reactions UI, but cannot create posts.
 * BACKEND CONTRACT (README):
 *  - GET `/api/community/posts?subject=<Physics|Chemistry|Biology>` -> Array<Post>
 *    Post: { id, title, subject, authorName, createdAt, content, media: [{type,url}], likes, comments }
 * TODO: API -> /api/community/posts (replace mock with real calls in `src/services/api.js`).
 */

import { useEffect, useState } from 'react';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../components/ui/tooltip';
import { ScrollArea } from '../../components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { getCommunityPosts } from '../../services/api';
import { subjects } from '../../data/mockData';
import { Heart, MessageCircle, Link as LinkIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const Community = () => {
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    getCommunityPosts({ subject: selectedSubject })
      .then((data) => setPosts(data))
      .catch((e) => setError(e.message || 'Failed to load posts'))
      .finally(() => setLoading(false));
  }, [selectedSubject]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
        <h1 className="text-3xl font-bold text-foreground">Community</h1>
          <p className="text-muted-foreground">Share resources, ask questions, and collaborate</p>
        </div>
        <Badge variant="outline">{selectedSubject}</Badge>
      </div>

      <Tabs value={selectedSubject} onValueChange={setSelectedSubject}>
        <TabsList className="relative w-full max-w-xl overflow-hidden rounded-full bg-muted/50 border border-border/40 p-1">
          <motion.div
            className="absolute top-1 bottom-1 left-1 w-[33.333%] rounded-full bg-background shadow-sm"
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            animate={{ x: `${subjects.indexOf(selectedSubject) * 100}%` }}
          />
          {subjects.map((s) => (
            <TabsTrigger
              key={s}
              value={s}
              className="relative z-10 flex-1 rounded-full text-sm font-medium text-muted-foreground data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              {s}
            </TabsTrigger>
          ))}
        </TabsList>
        {subjects.map((s) => (
          <TabsContent key={s} value={s} className="mt-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Posts list (view-only) */}
              <div className="space-y-4">
            {loading ? (
              <div className="text-center text-muted-foreground">Loading posts...</div>
            ) : error ? (
              <div className="text-center text-destructive">{error}</div>
            ) : posts.length === 0 ? (
                  <Card className="p-10 text-center">
                    <p className="text-muted-foreground">Be the first to share something in the community!</p>
                  </Card>
                ) : (
                  <ScrollArea className="h-[70vh] pr-2">
                    <div className="space-y-4">
                      {posts.map((p, idx) => (
                        <motion.div
                          key={p._id || p.id}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.04 }}
                        >
                          <Card className="p-5 space-y-3 border-border/60 hover:shadow-lg/60 transition-shadow">
                            <div className="flex items-start justify-between gap-3">
                              <div className="space-y-1">
                                <h3 className="font-semibold text-foreground tracking-tight">{p.title}</h3>
                                <div className="text-xs text-muted-foreground">
                                  <span className="font-medium">{p.authorName || 'Teacher'}</span>
                                  <span className="mx-2">·</span>
                                  {new Date(p.createdAt).toLocaleString()}
                                </div>
                              </div>
                    <Badge variant="secondary">{p.subject}</Badge>
                  </div>

                            <p className="text-sm text-muted-foreground leading-6">{p.body || p.content}</p>

                  {Array.isArray(p.media) && p.media.length > 0 && (
                              <div className="grid grid-cols-2 gap-3">
                      {p.media.map((m, i) => (
                        m.type === 'image' ? (
                                    <img key={i} src={m.url} alt="attachment" className="h-36 w-full object-cover rounded-md" />
                                  ) : (
                                    <a
                                      key={i}
                                      href={m.url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-primary text-sm underline"
                                    >
                            View {m.type}
                          </a>
                        )
                      ))}
                    </div>
                  )}

                            <div className="flex items-center gap-3 pt-1">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" size="sm" className="gap-2">
                                      <Heart className="h-4 w-4" />
                                      <span className="text-xs">{p.likes ?? 0}</span>
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>Like</TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" size="sm" className="gap-2">
                                      <MessageCircle className="h-4 w-4" />
                                      <span className="text-xs">{p.comments ?? 0}</span>
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>Comment</TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button asChild variant="ghost" size="sm" className="gap-2">
                                      <a href={p.link || '#'} aria-label="Copy link">
                                        <LinkIcon className="h-4 w-4" />
                                      </a>
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>Copy link</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Community;


