/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Teacher community page to create and view posts
 * BACKEND CONTRACT: GET /api/community?subject=..., POST /api/community -> { success, post }
 * TODO: Replace mock in src/services/api.js with real axios call
 */

import { useEffect, useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { getCommunityPosts, postCommunityPost, uploadMedia } from '../../services/api';
import { subjects } from '../../data/mockData';

const TeacherCommunity = () => {
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [file, setFile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);

  const load = () => {
    setLoading(true);
    getCommunityPosts({ subject: selectedSubject }).then(setPosts).finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSubject]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setPosting(true);
    let media = [];
    if (file) {
      try {
        const meta = await uploadMedia(file, { keyPrefix: `virtulearn/community` });
        media.push({ type: 'image', url: meta.url });
      } catch (_) {}
    }
    if (mediaUrl) media.push({ type: 'link', url: mediaUrl });
    await postCommunityPost({ subject: selectedSubject, title, body, media });
    setTitle('');
    setBody('');
    setMediaUrl('');
    setFile(null);
    setPosting(false);
    load();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-foreground">Community</h1>
      <Card className="p-6 space-y-4">
        <form onSubmit={onSubmit} className="space-y-4" aria-label="Create community post">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter post title" required />
            </div>
            <div className="space-y-2">
              <Label>Subject</Label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="body">Body</Label>
            <Input id="body" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Write something..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="media">Attachment URL (optional)</Label>
            <Input id="media" value={mediaUrl} onChange={(e) => setMediaUrl(e.target.value)} placeholder="https://..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="file">Upload Media (optional)</Label>
            <Input id="file" type="file" accept="image/*,application/pdf,video/*,audio/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          </div>
          <Button type="submit" disabled={posting}>{posting ? 'Posting...' : 'Post'}</Button>
        </form>
      </Card>

      <div className="space-y-3">
        {loading ? (
          <div className="text-center text-muted-foreground">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="text-center text-muted-foreground">No posts</div>
        ) : (
          posts.map((p) => (
            <Card key={p.id} className="p-5 space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-semibold">{p.title}</div>
                <span className="text-xs text-muted-foreground">{p.subject}</span>
              </div>
              <div className="text-sm text-muted-foreground">{p.content}</div>
              {p.mediaUrl && (<a href={p.mediaUrl} target="_blank" rel="noreferrer" className="text-xs underline text-primary">View attachment</a>)}
              <div className="text-xs text-muted-foreground">By {p.authorName} • {new Date(p.createdAt).toLocaleString()}</div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default TeacherCommunity;


