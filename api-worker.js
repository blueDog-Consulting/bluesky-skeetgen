// Cloudflare Worker for Bluesky API integration
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
    }

    // Add CORS headers to all responses
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    try {
      // Route: Get posts by handle
      if (path === '/api/posts' && request.method === 'GET') {
        const handle = url.searchParams.get('handle');
        if (!handle) {
          return new Response(JSON.stringify({ error: 'Handle parameter is required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        const posts = await fetchPostsByHandle(handle);
        return new Response(JSON.stringify(posts), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Route: Get specific post by URL
      if (path === '/api/post' && request.method === 'GET') {
        const postUrl = url.searchParams.get('url');
        if (!postUrl) {
          return new Response(JSON.stringify({ error: 'URL parameter is required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        const post = await fetchPostByUrl(postUrl);
        return new Response(JSON.stringify(post), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Route: Health check
      if (path === '/api/health') {
        return new Response(JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Default: Return 404
      return new Response(JSON.stringify({ error: 'Not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    } catch (error) {
      console.error('Worker error:', error);
      return new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  },
};

// Fetch posts by Bluesky handle
async function fetchPostsByHandle(handle) {
  try {
    // Clean the handle (remove @ if present)
    const cleanHandle = handle.startsWith('@') ? handle.slice(1) : handle;

    // Bluesky API endpoint for getting posts
    const apiUrl = `https://bsky.social/xrpc/app.bsky.feed.getAuthorFeed?actor=${cleanHandle}&limit=20`;

    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'BlueskyPostGenerator/1.0',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Bluesky API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.feed || !Array.isArray(data.feed)) {
      return { posts: [], error: 'No posts found' };
    }

    // Transform Bluesky posts to our format
    const posts = data.feed.map(item => {
      const post = item.post;
      const author = post.author;

      return {
        id: post.uri,
        text: post.record?.text || '',
        author: author.displayName || author.handle,
        handle: author.handle,
        timestamp: post.indexedAt,
        likes: post.likeCount || 0,
        reposts: post.repostCount || 0,
        replies: post.replyCount || 0,
        avatar: author.avatar || '',
        images: post.embed?.images?.map(img => img.fullsize) || [],
        isRepost: item.reason?.$type === 'app.bsky.feed.defs#reasonRepost',
        isReply: post.record?.reply !== undefined,
      };
    });

    return { posts, count: posts.length };

  } catch (error) {
    console.error('Error fetching posts:', error);
    return { posts: [], error: error.message };
  }
}

// Fetch specific post by URL
async function fetchPostByUrl(postUrl) {
  try {
    // Extract post URI from URL
    // Example: https://bsky.app/profile/username.bsky.social/post/3juxx2q5n2g2a
    const urlMatch = postUrl.match(/\/post\/([^\/]+)$/);
    if (!urlMatch) {
      throw new Error('Invalid post URL format');
    }

    const postId = urlMatch[1];
    const handle = postUrl.match(/profile\/([^\/]+)/)?.[1];

    if (!handle) {
      throw new Error('Could not extract handle from URL');
    }

    // Bluesky API endpoint for getting specific post
    const apiUrl = `https://bsky.social/xrpc/app.bsky.feed.getPostThread?uri=at://${handle}/app.bsky.feed.post/${postId}`;

    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'BlueskyPostGenerator/1.0',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Bluesky API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.thread?.post) {
      throw new Error('Post not found');
    }

    const post = data.thread.post;
    const author = post.author;

    return {
      id: post.uri,
      text: post.record?.text || '',
      author: author.displayName || author.handle,
      handle: author.handle,
      timestamp: post.indexedAt,
      likes: post.likeCount || 0,
      reposts: post.repostCount || 0,
      replies: post.replyCount || 0,
      avatar: author.avatar || '',
      images: post.embed?.images?.map(img => img.fullsize) || [],
      isRepost: false, // Individual posts don't show repost status
      isReply: post.record?.reply !== undefined,
    };

  } catch (error) {
    console.error('Error fetching post:', error);
    return { error: error.message };
  }
}