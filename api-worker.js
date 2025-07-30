// Cloudflare Worker for Bluesky Post Generator - handles both static assets and API routes
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
      // API Routes
      if (path.startsWith('/api/')) {
        return await handleApiRoutes(request, url, corsHeaders);
      }

      // Static Assets - serve from site directory
      return await serveStaticAssets(request, url, corsHeaders);

    } catch (error) {
      console.error('Worker error:', error);
      return new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  },
};

// Handle API routes
async function handleApiRoutes(request, url, corsHeaders) {
  const path = url.pathname;

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

  // Route: Proxy avatar images to avoid CORS issues
  if (path === '/api/avatar' && request.method === 'GET') {
    const avatarUrl = url.searchParams.get('url');
    if (!avatarUrl) {
      return new Response(JSON.stringify({ error: 'URL parameter is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    try {
      const response = await fetch(avatarUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch avatar: ${response.status}`);
      }

      const imageBuffer = await response.arrayBuffer();
      return new Response(imageBuffer, {
        headers: {
          ...corsHeaders,
          'Content-Type': response.headers.get('Content-Type') || 'image/jpeg',
          'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
        },
      });
    } catch (error) {
      console.error('Error proxying avatar:', error);
      return new Response(JSON.stringify({ error: 'Failed to proxy avatar' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  }

  // Route: Health check
  if (path === '/api/health') {
    return new Response(JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // API route not found
  return new Response(JSON.stringify({ error: 'API endpoint not found' }), {
    status: 404,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

// Serve static assets
async function serveStaticAssets(request, url, corsHeaders) {
  const path = url.pathname;

  // Default to index.html for root path
  let filePath = path === '/' ? '/index.html' : path;

  // Remove leading slash for asset lookup
  filePath = filePath.startsWith('/') ? filePath.slice(1) : filePath;

  // If no file extension, assume it's a route that should serve index.html
  if (!filePath.includes('.')) {
    filePath = 'index.html';
  }

  try {
    // Try to fetch the asset from the site directory
    const asset = await env.ASSETS.fetch(new Request(`https://fake-host/${filePath}`));

    if (asset.status === 404) {
      // If asset not found, serve index.html for SPA routing
      const indexAsset = await env.ASSETS.fetch(new Request('https://fake-host/index.html'));

      // Process index.html for Google Analytics
      console.log('Processing index.html (404 handler)');
      const htmlContent = await indexAsset.text();
      let modifiedHtml = htmlContent;

      // If GA ID is set, replace placeholder; otherwise, replace with empty string
      if (env.GOOGLE_ANALYTICS_ID) {
        console.log('GA ID found (404 handler):', env.GOOGLE_ANALYTICS_ID);
        modifiedHtml = htmlContent.replace(/\{\{GOOGLE_ANALYTICS_ID\}\}/g, env.GOOGLE_ANALYTICS_ID);
      } else {
        console.log('No GA ID configured (404 handler)');
        // Replace placeholder with empty string to disable GA
        modifiedHtml = htmlContent.replace(/\{\{GOOGLE_ANALYTICS_ID\}\}/g, '');
      }

      console.log('404 handler HTML processing complete');

      return new Response(modifiedHtml, {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/html',
        },
      });
    }

    // Determine content type based on file extension
    let contentType = 'text/plain';
    if (filePath.endsWith('.html')) contentType = 'text/html';
    else if (filePath.endsWith('.css')) contentType = 'text/css';
    else if (filePath.endsWith('.js')) contentType = 'application/javascript';
    else if (filePath.endsWith('.png')) contentType = 'image/png';
    else if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) contentType = 'image/jpeg';
    else if (filePath.endsWith('.gif')) contentType = 'image/gif';
    else if (filePath.endsWith('.svg')) contentType = 'image/svg+xml';

        // Replace Google Analytics placeholder with actual ID for HTML files
    if (filePath.endsWith('.html')) {
      console.log('Processing HTML file:', filePath);
      const htmlContent = await asset.text();
      let modifiedHtml = htmlContent;

      // If GA ID is set, replace placeholder; otherwise, replace with empty string
      if (env.GOOGLE_ANALYTICS_ID) {
        console.log('GA ID found:', env.GOOGLE_ANALYTICS_ID);
        modifiedHtml = htmlContent.replace(/\{\{GOOGLE_ANALYTICS_ID\}\}/g, env.GOOGLE_ANALYTICS_ID);
      } else {
        console.log('No GA ID configured');
        // Replace placeholder with empty string to disable GA
        modifiedHtml = htmlContent.replace(/\{\{GOOGLE_ANALYTICS_ID\}\}/g, '');
      }

      console.log('HTML processing complete');
      return new Response(modifiedHtml, {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': contentType,
        },
      });
    }

    return new Response(asset.body, {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': contentType,
      },
    });

  } catch (error) {
    console.error('Error serving static asset:', error);
    return new Response('Not found', {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'text/plain' },
    });
  }
}

// Fetch posts by Bluesky handle using public API
async function fetchPostsByHandle(handle) {
  try {
    // Clean the handle (remove @ if present)
    const cleanHandle = handle.startsWith('@') ? handle.slice(1) : handle;

    // Public Bluesky API endpoint for getting posts
    const apiUrl = `https://api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=${cleanHandle}&limit=20`;

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

      // Use avatar URL as-is from the Bluesky API
      let avatarUrl = author.avatar || '';

      return {
        id: post.uri,
        text: post.record?.text || '',
        author: author.displayName || author.handle,
        handle: author.handle,
        timestamp: post.indexedAt,
        likes: post.likeCount || 0,
        reposts: post.repostCount || 0,
        replies: post.replyCount || 0,
        avatar: avatarUrl,
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

// Fetch specific post by URL using public API
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

    // Public Bluesky API endpoint for getting specific post
    const apiUrl = `https://api.bsky.app/xrpc/app.bsky.feed.getPostThread?uri=at://${handle}/app.bsky.feed.post/${postId}`;

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

    // Use avatar URL as-is from the Bluesky API
    let avatarUrl = author.avatar || '';

    return {
      id: post.uri,
      text: post.record?.text || '',
      author: author.displayName || author.handle,
      handle: author.handle,
      timestamp: post.indexedAt,
      likes: post.likeCount || 0,
      reposts: post.repostCount || 0,
      replies: post.replyCount || 0,
      avatar: avatarUrl,
      images: post.embed?.images?.map(img => img.fullsize) || [],
      isRepost: false, // Individual posts don't show repost status
      isReply: post.record?.reply !== undefined,
    };

  } catch (error) {
    console.error('Error fetching post:', error);
    return { error: error.message };
  }
}

