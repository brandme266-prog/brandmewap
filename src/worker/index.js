export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    const corsHeaders = {
      "Access-Control-Allow-Origin": env.CORS_ORIGIN || "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    const cacheHeaders = {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    };

    if (method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    try {
      if (path === "/api/projects" && method === "GET") {
        return this.handleGetProjects(env, corsHeaders);
      }
      if (path === "/api/projects" && method === "POST") {
        return this.handleCreateProject(request, env, corsHeaders);
      }

      const projectMatch = path.match(/^\/api\/projects\/(\d+)$/);
      if (projectMatch && method === "PUT") {
        return this.handleUpdateProject(projectMatch[1], request, env, corsHeaders);
      }
      if (projectMatch && method === "DELETE") {
        return this.handleDeleteProject(projectMatch[1], request, env, corsHeaders);
      }

      if (path === "/api/posts" && method === "GET") {
        return this.handleGetPosts(request, env, corsHeaders);
      }
      if (path === "/api/posts" && method === "POST") {
        return this.handleCreatePost(request, env, corsHeaders);
      }

      const postMatch = path.match(/^\/api\/posts\/(\d+)$/);
      if (postMatch && method === "GET") {
        return this.handleGetPost(postMatch[1], env, corsHeaders);
      }
      if (postMatch && method === "PUT") {
        return this.handleUpdatePost(postMatch[1], request, env, corsHeaders);
      }
      if (postMatch && method === "DELETE") {
        return this.handleDeletePost(postMatch[1], request, env, corsHeaders);
      }

      if (path === "/api/upload" && method === "POST") {
        return this.handleUpload(request, env, corsHeaders);
      }

      if (path === "/api/stats" && method === "GET") {
        return this.handleGetStats(request, env, corsHeaders);
      }

      const imageMatch = path.match(/^\/api\/image\/(.+)$/);
      if (imageMatch && method === "GET") {
        return this.handleGetImage(imageMatch[1], env, corsHeaders);
      }

      return new Response("Not Found", { status: 404, headers: corsHeaders });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  },

  async handleGetProjects(env, corsHeaders) {
    const { results } = await env.DB.prepare(
      "SELECT * FROM projects WHERE is_active = 1 ORDER BY order_index ASC"
    ).all();

    const projects = results.map((p) => ({
      ...p,
      tech: JSON.parse(p.features || "[]"),
      img: p.image_url,
      desc: p.description,
      type: p.category,
    }));

    return new Response(JSON.stringify(projects), {
      headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
    });
  },

  async handleCreateProject(request, env, corsHeaders) {
    const auth = request.headers.get("Authorization");
    if (auth !== `Bearer ${env.ADMIN_PASSWORD}`) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await request.json();
    const { title, description, image_url, category, link, features, order_index } = body;

    if (!title) {
      return new Response(JSON.stringify({ error: "Title is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const result = await env.DB.prepare(
      `INSERT INTO projects (title, description, image_url, category, link, features, order_index)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(
        title,
        description || "",
        image_url || "",
        category || "all",
        link || "",
        JSON.stringify(features || []),
        order_index || 0
      )
      .run();

    return new Response(JSON.stringify({ id: result.meta.last_row_id, success: true }), {
      status: 201,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  },

  async handleUpdateProject(id, request, env, corsHeaders) {
    const auth = request.headers.get("Authorization");
    if (auth !== `Bearer ${env.ADMIN_PASSWORD}`) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await request.json();
    const { title, description, image_url, category, link, features, order_index, is_active } = body;

    await env.DB.prepare(
      `UPDATE projects SET
        title = COALESCE(?, title),
        description = COALESCE(?, description),
        image_url = COALESCE(?, image_url),
        category = COALESCE(?, category),
        link = COALESCE(?, link),
        features = COALESCE(?, features),
        order_index = COALESCE(?, order_index),
        is_active = COALESCE(?, is_active),
        updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`
    )
      .bind(
        title || null,
        description || null,
        image_url || null,
        category || null,
        link || null,
        features ? JSON.stringify(features) : null,
        order_index ?? null,
        is_active ?? null,
        id
      )
      .run();

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  },

  async handleDeleteProject(id, request, env, corsHeaders) {
    const auth = request.headers.get("Authorization");
    if (auth !== `Bearer ${env.ADMIN_PASSWORD}`) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    await env.DB.prepare("DELETE FROM projects WHERE id = ?").bind(id).run();

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  },

  async handleGetPosts(request, env, corsHeaders) {
    const url = new URL(request.url);
    const slug = url.searchParams.get("slug");
    const published = url.searchParams.get("published");

    if (slug) {
      const post = await env.DB.prepare(
        "SELECT * FROM blog_posts WHERE slug = ?"
      ).bind(slug).first();

      if (!post) {
        return new Response(JSON.stringify({ error: "Not found" }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      await env.DB.prepare(
        "UPDATE blog_posts SET views = views + 1 WHERE id = ?"
      ).bind(post.id).run();

      return new Response(JSON.stringify({
        ...post,
        tags: JSON.parse(post.tags || "[]"),
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
      });
    }

    let query = "SELECT * FROM blog_posts";
    const params = [];

    if (published === "1") {
      query += " WHERE is_published = 1";
    }

    query += " ORDER BY created_at DESC";

    const { results } = await env.DB.prepare(query).all();

    const posts = results.map((p) => ({
      ...p,
      tags: JSON.parse(p.tags || "[]"),
    }));

    return new Response(JSON.stringify(posts), {
      headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
    });
  },

  async handleGetPost(id, env, corsHeaders) {
    const post = await env.DB.prepare(
      "SELECT * FROM blog_posts WHERE id = ?"
    ).bind(id).first();

    if (!post) {
      return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({
      ...post,
      tags: JSON.parse(post.tags || "[]"),
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  },

  async handleCreatePost(request, env, corsHeaders) {
    const auth = request.headers.get("Authorization");
    if (auth !== `Bearer ${env.ADMIN_PASSWORD}`) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await request.json();
    const { title, slug, excerpt, content, image_url, category, tags, is_published } = body;

    if (!title || !slug) {
      return new Response(JSON.stringify({ error: "Title and slug are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const existing = await env.DB.prepare(
      "SELECT id FROM blog_posts WHERE slug = ?"
    ).bind(slug).first();

    if (existing) {
      return new Response(JSON.stringify({ error: "Slug already exists" }), {
        status: 409,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const result = await env.DB.prepare(
      `INSERT INTO blog_posts (title, slug, excerpt, content, image_url, category, tags, is_published)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(
        title,
        slug,
        excerpt || "",
        content || "",
        image_url || "",
        category || "general",
        JSON.stringify(tags || []),
        is_published ? 1 : 0
      )
      .run();

    return new Response(JSON.stringify({ id: result.meta.last_row_id, success: true }), {
      status: 201,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  },

  async handleUpdatePost(id, request, env, corsHeaders) {
    const auth = request.headers.get("Authorization");
    if (auth !== `Bearer ${env.ADMIN_PASSWORD}`) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await request.json();
    const { title, slug, excerpt, content, image_url, category, tags, is_published } = body;

    if (slug) {
      const existing = await env.DB.prepare(
        "SELECT id FROM blog_posts WHERE slug = ? AND id != ?"
      ).bind(slug, id).first();

      if (existing) {
        return new Response(JSON.stringify({ error: "Slug already exists" }), {
          status: 409,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    await env.DB.prepare(
      `UPDATE blog_posts SET
        title = COALESCE(?, title),
        slug = COALESCE(?, slug),
        excerpt = COALESCE(?, excerpt),
        content = COALESCE(?, content),
        image_url = COALESCE(?, image_url),
        category = COALESCE(?, category),
        tags = COALESCE(?, tags),
        is_published = COALESCE(?, is_published),
        updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`
    )
      .bind(
        title || null,
        slug || null,
        excerpt || null,
        content || null,
        image_url || null,
        category || null,
        tags ? JSON.stringify(tags) : null,
        is_published ?? null,
        id
      )
      .run();

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  },

  async handleDeletePost(id, request, env, corsHeaders) {
    const auth = request.headers.get("Authorization");
    if (auth !== `Bearer ${env.ADMIN_PASSWORD}`) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    await env.DB.prepare("DELETE FROM blog_posts WHERE id = ?").bind(id).run();

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  },

  async handleGetStats(request, env, corsHeaders) {
    const auth = request.headers.get("Authorization");
    if (auth !== `Bearer ${env.ADMIN_PASSWORD}`) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const projects = await env.DB.prepare("SELECT COUNT(*) as count FROM projects").first();
    const activeProjects = await env.DB.prepare("SELECT COUNT(*) as count FROM projects WHERE is_active = 1").first();
    const posts = await env.DB.prepare("SELECT COUNT(*) as count FROM blog_posts").first();
    const publishedPosts = await env.DB.prepare("SELECT COUNT(*) as count FROM blog_posts WHERE is_published = 1").first();
    const draftPosts = await env.DB.prepare("SELECT COUNT(*) as count FROM blog_posts WHERE is_published = 0").first();
    const totalViews = await env.DB.prepare("SELECT COALESCE(SUM(views), 0) as total FROM blog_posts").first();
    const recentPosts = await env.DB.prepare("SELECT id, title, slug, category, views, is_published, created_at FROM blog_posts ORDER BY created_at DESC LIMIT 5").all();
    const recentProjects = await env.DB.prepare("SELECT id, title, category, order_index FROM projects ORDER BY created_at DESC LIMIT 5").all();

    return new Response(JSON.stringify({
      projects: {
        total: projects?.count || 0,
        active: activeProjects?.count || 0,
      },
      posts: {
        total: posts?.count || 0,
        published: publishedPosts?.count || 0,
        draft: draftPosts?.count || 0,
        totalViews: totalViews?.total || 0,
      },
      recentPosts: recentPosts?.results || [],
      recentProjects: recentProjects?.results || [],
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  },

  async handleUpload(request, env, corsHeaders) {
    const auth = request.headers.get("Authorization");
    if (auth !== `Bearer ${env.ADMIN_PASSWORD}`) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return new Response(JSON.stringify({ error: "No file provided" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const key = `uploads/${Date.now()}-${file.name}`;
    await env.R2.put(key, file);

    const imageUrl = `/api/image/${key}`;

    return new Response(JSON.stringify({ url: imageUrl, key }), {
      status: 201,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  },

  async handleGetImage(key, env, corsHeaders) {
    const object = await env.R2.get(key);

    if (!object) {
      return new Response("Image not found", { status: 404, headers: corsHeaders });
    }

    const headers = {
      ...corsHeaders,
      "Content-Type": object.httpMetadata?.contentType || "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    };

    return new Response(object.body, { headers });
  },
};
