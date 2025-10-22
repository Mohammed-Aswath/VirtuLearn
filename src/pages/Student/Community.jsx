/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Student community feed displaying teacher posts
 * BACKEND CONTRACT: GET /api/community?subject=... -> [posts]
 * TODO: Replace mock in src/services/api.js with real axios call
 */

import { useEffect, useState } from 'react';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { getCommunityPosts } from '../../services/api';
import { subjects } from '../../data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

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
        <h1 className="text-3xl font-bold text-foreground">Community</h1>
        <Badge variant="outline">{selectedSubject}</Badge>
      </div>

      <Tabs value={selectedSubject} onValueChange={setSelectedSubject}>
        <TabsList className="grid w-full max-w-md grid-cols-3">
          {subjects.map((s) => (
            <TabsTrigger key={s} value={s}>{s}</TabsTrigger>
          ))}
        </TabsList>
        {subjects.map((s) => (
          <TabsContent key={s} value={s} className="space-y-4">
            {loading ? (
              <div className="text-center text-muted-foreground">Loading posts...</div>
            ) : error ? (
              <div className="text-center text-destructive">{error}</div>
            ) : posts.length === 0 ? (
              <div className="text-center text-muted-foreground">No posts yet</div>
            ) : (
              posts.map((p) => (
                <Card key={p._id || p.id} className="p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">{p.title}</h3>
                    <Badge variant="secondary">{p.subject}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{p.body || p.content}</p>
                  {Array.isArray(p.media) && p.media.length > 0 && (
                    <div className="space-y-2">
                      {p.media.map((m, i) => (
                        m.type === 'image' ? (
                          <img key={i} src={m.url} alt="attachment" className="max-h-48 rounded" />
                        ) : (
                          <a key={i} href={m.url} target="_blank" rel="noreferrer" className="text-primary text-sm underline">
                            View {m.type}
                          </a>
                        )
                      ))}
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground">
                    {new Date(p.createdAt).toLocaleString()}
                  </div>
                </Card>
              ))
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Community;


