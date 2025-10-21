import { useState, useEffect } from 'react';
import { Calendar, User } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'] & {
  profiles: { full_name: string | null } | null;
};

interface BlogPageProps {
  onNavigate: (page: string) => void;
}

export function BlogPage({ onNavigate }: BlogPageProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*, profiles(full_name)')
        .eq('is_published', true)
        .order('published_at', { ascending: false });

      if (error) throw error;
      setPosts(data as BlogPost[]);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-brand-cream/60 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="badge-soft mx-auto">journal</span>
          <h1 className="mt-4 text-4xl font-display text-brand-charcoal">Beauty Tips &amp; Advice</h1>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-brand-earth/80">
            Expert hair care rituals, tutorials, and inspiration to help you reveal your most luminous self.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse overflow-hidden rounded-3xl border border-brand-cream/70 bg-white/80 shadow-soft">
                <div className="aspect-video bg-brand-cream"></div>
                <div className="space-y-3 p-6">
                  <div className="h-4 w-3/4 rounded-full bg-brand-cream"></div>
                  <div className="h-4 rounded-full bg-brand-cream"></div>
                  <div className="h-4 w-5/6 rounded-full bg-brand-cream"></div>
                </div>
              </div>
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group cursor-pointer overflow-hidden rounded-3xl border border-brand-cream/80 bg-white/90 shadow-soft transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="aspect-video overflow-hidden bg-brand-cream">
                  {post.featured_image ? (
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-brand-earth/50">No image</div>
                  )}
                </div>
                <div className="p-6">
                  <div className="mb-4 flex items-center gap-4 text-sm text-brand-earth/70">
                    {post.published_at && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.published_at).toLocaleDateString()}</span>
                      </div>
                    )}
                    {post.profiles?.full_name && (
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{post.profiles.full_name}</span>
                      </div>
                    )}
                  </div>
                  <h2 className="mb-3 line-clamp-2 text-xl font-display text-brand-charcoal">{post.title}</h2>
                  {post.excerpt && (
                    <p className="mb-4 line-clamp-3 text-brand-earth/80">{post.excerpt}</p>
                  )}
                  <button className="font-accent text-brand-earth transition-colors duration-300 hover:text-brand-rose">
                    Read More →
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-brand-cream/80 bg-white/90 p-12 text-center shadow-soft">
            <h3 className="mb-2 text-xl font-display text-brand-charcoal">No blog posts yet</h3>
            <p className="text-brand-earth/70">Check back soon for expert hair care tips and advice!</p>
          </div>
        )}
      </div>
    </div>
  );
}
