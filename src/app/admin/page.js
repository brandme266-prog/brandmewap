"use client";
import { useState, useEffect } from "react";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import SEO from "@/components/SEO";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://brandme-api.brandme266.workers.dev";
const ADMIN_PASSWORD = "brandme-admin-2024";

const emptyProject = {
  title: "",
  description: "",
  image_url: "",
  category: "all",
  link: "",
  features: "",
  order_index: 0,
};

const emptyPost = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  image_url: "",
  category: "general",
  tags: "",
  is_published: false,
};

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

function AdminContent() {
  const { t, lang, toggleLang } = useLanguage();
  const [isAuth, setIsAuth] = useState(false);
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState("dashboard");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [uploading, setUploading] = useState(false);

  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState(emptyProject);

  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [postForm, setPostForm] = useState(emptyPost);

  const [stats, setStats] = useState(null);

  const authHeaders = () => ({
    Authorization: `Bearer ${password || ADMIN_PASSWORD}`,
    "Content-Type": "application/json",
  });

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/stats`, { headers: authHeaders() });
      if (res.ok) setStats(await res.json());
    } catch {}
  };

  const fetchData = async () => {
    try {
      const [projRes, postRes] = await Promise.all([
        fetch(`${API_BASE}/api/projects`),
        fetch(`${API_BASE}/api/posts`),
      ]);
      if (projRes.ok) setProjects(await projRes.json());
      if (postRes.ok) setPosts(await postRes.json());
    } catch {
      setMsg("Error connecting to server");
    }
  };

  useEffect(() => {
    if (isAuth) {
      fetchData();
      fetchStats();
    }
  }, [isAuth]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password) setIsAuth(true);
  };

  const handleUpload = async (e, target) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${API_BASE}/api/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${password || ADMIN_PASSWORD}` },
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        if (target === "project") {
          setProjectForm((f) => ({ ...f, image_url: data.url }));
        } else {
          setPostForm((f) => ({ ...f, image_url: data.url }));
        }
        setMsg("تم رفع الصورة بنجاح");
      }
    } catch {
      setMsg("خطأ في رفع الصورة");
    }
    setUploading(false);
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const payload = {
        ...projectForm,
        features: projectForm.features.split(",").map((f) => f.trim()).filter(Boolean),
        order_index: parseInt(projectForm.order_index) || 0,
      };

      const url = editingProject
        ? `${API_BASE}/api/projects/${editingProject}`
        : `${API_BASE}/api/projects`;

      const res = await fetch(url, {
        method: editingProject ? "PUT" : "POST",
        headers: authHeaders(),
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMsg(editingProject ? "تم التعديل بنجاح" : "تمت الإضافة بنجاح");
        setProjectForm(emptyProject);
        setEditingProject(null);
        fetchData();
        fetchStats();
      } else {
        const err = await res.json();
        setMsg(err.error || "خطأ في العملية");
      }
    } catch {
      setMsg("خطأ في الاتصال");
    }
    setLoading(false);
  };

  const handleEditProject = (project) => {
    setEditingProject(project.id);
    setProjectForm({
      title: project.title,
      description: project.desc || project.description,
      image_url: project.img || project.image_url,
      category: project.type || project.category,
      link: project.link,
      features: (project.tech || []).join(", "),
      order_index: project.order_index || 0,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteProject = async (id) => {
    if (!confirm("هل أنت متأكد من الحذف؟")) return;
    try {
      const res = await fetch(`${API_BASE}/api/projects/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (res.ok) {
        setMsg("تم الحذف بنجاح");
        fetchData();
        fetchStats();
      }
    } catch {
      setMsg("خطأ في الحذف");
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const payload = {
        ...postForm,
        slug: postForm.slug || slugify(postForm.title),
        tags: postForm.tags.split(",").map((t) => t.trim()).filter(Boolean),
      };

      const url = editingPost
        ? `${API_BASE}/api/posts/${editingPost}`
        : `${API_BASE}/api/posts`;

      const res = await fetch(url, {
        method: editingPost ? "PUT" : "POST",
        headers: authHeaders(),
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMsg(editingPost ? "تم التعديل بنجاح" : "تم نشر المقال بنجاح");
        setPostForm(emptyPost);
        setEditingPost(null);
        fetchData();
        fetchStats();
      } else {
        const err = await res.json();
        setMsg(err.error || "خطأ في العملية");
      }
    } catch {
      setMsg("خطأ في الاتصال");
    }
    setLoading(false);
  };

  const handleEditPost = (post) => {
    setEditingPost(post.id);
    setPostForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content || "",
      image_url: post.image_url || "",
      category: post.category || "general",
      tags: (post.tags || []).join(", "),
      is_published: !!post.is_published,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeletePost = async (id) => {
    if (!confirm("هل أنت متأكد من الحذف؟")) return;
    try {
      const res = await fetch(`${API_BASE}/api/posts/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (res.ok) {
        setMsg("تم الحذف بنجاح");
        fetchData();
        fetchStats();
      }
    } catch {
      setMsg("خطأ في الحذف");
    }
  };

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir={lang === "ar" ? "rtl" : "ltr"}>
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
          <h1 className="text-2xl font-black text-gray-900 mb-6 text-center">{t.admin.login}</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t.admin.password}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl mb-4 focus:outline-none focus:border-[#4a9a10]"
          />
          <button
            type="submit"
            className="w-full bg-[#4a9a10] text-white py-3 rounded-xl font-bold hover:bg-[#3d820d] transition"
          >
            {t.admin.enter}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir={lang === "ar" ? "rtl" : "ltr"}>
      <SEO title="لوحة التحكم" noindex={true} />
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-black text-gray-900">{t.admin.title}</h1>
          <div className="flex items-center gap-3">
            <button onClick={toggleLang} className="px-3 py-1.5 text-xs font-bold rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
              {lang === "ar" ? "EN" : "عربي"}
            </button>
            <a href="/" className="text-[#4a9a10] font-bold hover:underline">{t.admin.backToSite}</a>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          <button
            onClick={() => setTab("dashboard")}
            className={`px-6 py-3 rounded-xl font-bold transition ${
              tab === "dashboard"
                ? "bg-[#4a9a10] text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {t.admin.dashboard}
          </button>
          <button
            onClick={() => setTab("projects")}
            className={`px-6 py-3 rounded-xl font-bold transition ${
              tab === "projects"
                ? "bg-[#4a9a10] text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {t.admin.projects} ({projects.length})
          </button>
          <button
            onClick={() => setTab("posts")}
            className={`px-6 py-3 rounded-xl font-bold transition ${
              tab === "posts"
                ? "bg-[#4a9a10] text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {t.admin.posts} ({posts.length})
          </button>
        </div>

        {msg && (
          <div className={`px-4 py-3 rounded-xl mb-6 font-bold ${
            msg.includes("خطأ") ? "bg-red-50 border border-red-200 text-red-600" : "bg-[#f0f8e8] border border-[#a8d67a] text-[#3d8a10]"
          }`}>
            {msg}
          </div>
        )}

        {/* ========== DASHBOARD TAB ========== */}
        {tab === "dashboard" && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: t.admin.stats.projects, value: stats?.projects?.total || projects.length, icon: "📁", color: "bg-blue-50 text-blue-600" },
                { label: t.admin.stats.posts, value: stats?.posts?.total || posts.length, icon: "📝", color: "bg-green-50 text-green-600" },
                { label: t.admin.stats.published, value: stats?.posts?.published || posts.filter(p => p.is_published).length, icon: "✅", color: "bg-emerald-50 text-emerald-600" },
                { label: t.admin.stats.views, value: stats?.posts?.totalViews || 0, icon: "👁️", color: "bg-purple-50 text-purple-600" },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${stat.color}`}>
                      {stat.icon}
                    </span>
                  </div>
                  <p className="text-3xl font-black text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Recent Projects */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-black text-gray-900">{t.admin.recentProjects}</h3>
                  <button onClick={() => setTab("projects")} className="text-sm text-[#4a9a10] font-bold hover:underline">{t.admin.showAll}</button>
                </div>
                <div className="space-y-3">
                  {(stats?.recentProjects || projects.slice(0, 5)).map((p) => (
                    <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition">
                      <div className="w-2 h-2 rounded-full bg-[#4a9a10] flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 text-sm truncate">{p.title}</p>
                        <p className="text-xs text-gray-400">{p.category}</p>
                      </div>
                    </div>
                  ))}
                  {projects.length === 0 && <p className="text-gray-400 text-sm text-center py-4">{t.admin.noProjects}</p>}
                </div>
              </div>

              {/* Recent Posts */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-black text-gray-900">{t.admin.recentPosts}</h3>
                  <button onClick={() => setTab("posts")} className="text-sm text-[#4a9a10] font-bold hover:underline">{t.admin.showAll}</button>
                </div>
                <div className="space-y-3">
                  {(stats?.recentPosts || posts.slice(0, 5)).map((p) => (
                    <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${p.is_published ? "bg-green-500" : "bg-yellow-500"}`} />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 text-sm truncate">{p.title}</p>
                        <p className="text-xs text-gray-400">{p.views || 0} views</p>
                      </div>
                    </div>
                  ))}
                  {posts.length === 0 && <p className="text-gray-400 text-sm text-center py-4">{t.admin.noPosts}</p>}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-black text-gray-900 mb-4">{t.admin.quickActions}</h3>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => { setTab("projects"); setEditingProject(null); setProjectForm(emptyProject); }}
                  className="px-5 py-2.5 bg-[#f0f8e8] text-[#3d8a10] rounded-xl font-bold text-sm hover:bg-[#e0f5d0] transition border border-[#a8d67a]">
                  {t.admin.addProject}
                </button>
                <button onClick={() => { setTab("posts"); setEditingPost(null); setPostForm(emptyPost); }}
                  className="px-5 py-2.5 bg-[#f0f8e8] text-[#3d8a10] rounded-xl font-bold text-sm hover:bg-[#e0f5d0] transition border border-[#a8d67a]">
                  {t.admin.addPost}
                </button>
                <a href="/" target="_blank"
                  className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-200 transition">
                  {t.admin.viewSite}
                </a>
                <a href="/blog" target="_blank"
                  className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-200 transition">
                  {t.admin.viewBlog}
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ========== PROJECTS TAB ========== */}
        {tab === "projects" && (
          <>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-10">
              <h2 className="text-xl font-black text-gray-900 mb-6">
                {editingProject ? "تعديل مشروع" : "إضافة مشروع جديد"}
              </h2>
              <form onSubmit={handleProjectSubmit} className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">اسم المشروع *</label>
                  <input
                    name="title"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#4a9a10]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">التصنيف</label>
                  <select
                    name="category"
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#4a9a10]"
                  >
                    <option value="all">الكل</option>
                    <option value="web">مواقع إلكترونية</option>
                    <option value="app">تطبيقات جوال</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">الوصف</label>
                  <textarea
                    name="description"
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#4a9a10]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">رابط المشروع</label>
                  <input
                    name="link"
                    value={projectForm.link}
                    onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#4a9a10]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">التصنيفات (مفصولة بفاصلة)</label>
                  <input
                    name="features"
                    value={projectForm.features}
                    onChange={(e) => setProjectForm({ ...projectForm, features: e.target.value })}
                    placeholder="تطبيق جوال, تجارة إلكترونية"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#4a9a10]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">رابط الصورة</label>
                  <input
                    name="image_url"
                    value={projectForm.image_url}
                    onChange={(e) => setProjectForm({ ...projectForm, image_url: e.target.value })}
                    placeholder="/images/... أو رابط خارجي"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#4a9a10]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">أو رفع صورة</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleUpload(e, "project")}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                  />
                  {uploading && <span className="text-sm text-gray-500">جاري الرفع...</span>}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">ترتيب العرض</label>
                  <input
                    type="number"
                    name="order_index"
                    value={projectForm.order_index}
                    onChange={(e) => setProjectForm({ ...projectForm, order_index: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#4a9a10]"
                  />
                </div>
                <div className="md:col-span-2 flex gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#4a9a10] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#3d820d] transition disabled:opacity-50"
                  >
                    {loading ? "جاري..." : editingProject ? "تعديل" : "إضافة"}
                  </button>
                  {editingProject && (
                    <button
                      type="button"
                      onClick={() => { setEditingProject(null); setProjectForm(emptyProject); }}
                      className="bg-gray-200 text-gray-700 px-8 py-3 rounded-xl font-bold hover:bg-gray-300 transition"
                    >
                      إلغاء
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-black text-gray-900 mb-6">المشاريع الحالية ({projects.length})</h2>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:border-[#a8d67a] transition"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      {(project.img || project.image_url) && (
                        <img
                          src={project.img || project.image_url}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-black text-gray-900 truncate">{project.title}</h3>
                      <p className="text-sm text-gray-500 truncate">{project.desc || project.description}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleEditProject(project)}
                        className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-bold text-sm hover:bg-blue-100 transition"
                      >
                        تعديل
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-bold text-sm hover:bg-red-100 transition"
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ========== POSTS TAB ========== */}
        {tab === "posts" && (
          <>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-10">
              <h2 className="text-xl font-black text-gray-900 mb-6">
                {editingPost ? "تعديل مقال" : "إضافة مقال جديد"}
              </h2>
              <form onSubmit={handlePostSubmit} className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">عنوان المقال *</label>
                  <input
                    value={postForm.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      setPostForm((f) => ({ ...f, title, slug: f.slug || slugify(title) }));
                    }}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#4a9a10]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">الرابط (Slug) *</label>
                  <input
                    value={postForm.slug}
                    onChange={(e) => setPostForm({ ...postForm, slug: e.target.value })}
                    required
                    placeholder="my-article-slug"
                    dir="ltr"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#4a9a10]"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">مقتطف قصير</label>
                  <textarea
                    value={postForm.excerpt}
                    onChange={(e) => setPostForm({ ...postForm, excerpt: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#4a9a10]"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">المحتوى (Markdown / HTML)</label>
                  <textarea
                    value={postForm.content}
                    onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                    rows={12}
                    dir="ltr"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#4a9a10] font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">التصنيف</label>
                  <select
                    value={postForm.category}
                    onChange={(e) => setPostForm({ ...postForm, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#4a9a10]"
                  >
                    <option value="general">عام</option>
                    <option value="marketing">تسويق رقمي</option>
                    <option value="web">تطوير ويب</option>
                    <option value="design">تصميم</option>
                    <option value="tips">نصائح</option>
                    <option value="news">أخبار</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">الوسوم (مفصولة بفاصلة)</label>
                  <input
                    value={postForm.tags}
                    onChange={(e) => setPostForm({ ...postForm, tags: e.target.value })}
                    placeholder="تسويق, ويب, نصائح"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#4a9a10]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">رابط الصورة</label>
                  <input
                    value={postForm.image_url}
                    onChange={(e) => setPostForm({ ...postForm, image_url: e.target.value })}
                    placeholder="/images/... أو رابط خارجي"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#4a9a10]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">رفع صورة</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleUpload(e, "post")}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                  />
                  {uploading && <span className="text-sm text-gray-500">جاري الرفع...</span>}
                </div>
                <div className="md:col-span-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={postForm.is_published}
                      onChange={(e) => setPostForm({ ...postForm, is_published: e.target.checked })}
                      className="w-5 h-5 rounded border-gray-300 text-[#4a9a10] focus:ring-[#4a9a10]"
                    />
                    <span className="font-bold text-gray-700">نشر المقال</span>
                  </label>
                </div>
                <div className="md:col-span-2 flex gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#4a9a10] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#3d820d] transition disabled:opacity-50"
                  >
                    {loading ? "جاري..." : editingPost ? "تعديل" : "نشر"}
                  </button>
                  {editingPost && (
                    <button
                      type="button"
                      onClick={() => { setEditingPost(null); setPostForm(emptyPost); }}
                      className="bg-gray-200 text-gray-700 px-8 py-3 rounded-xl font-bold hover:bg-gray-300 transition"
                    >
                      إلغاء
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-black text-gray-900 mb-6">المقالات الحالية ({posts.length})</h2>
              <div className="space-y-4">
                {posts.length === 0 && (
                  <p className="text-gray-500 text-center py-8">لا يوجد مقالات بعد</p>
                )}
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:border-[#a8d67a] transition"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      {post.image_url && (
                        <img
                          src={post.image_url}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-black text-gray-900 truncate">{post.title}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                          post.is_published
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {post.is_published ? "منشور" : "مسودة"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{post.excerpt}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                        <span>{post.category}</span>
                        <span>{post.views || 0} مشاهدة</span>
                        <span>{new Date(post.created_at).toLocaleDateString("ar-EG")}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleEditPost(post)}
                        className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-bold text-sm hover:bg-blue-100 transition"
                      >
                        تعديل
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-bold text-sm hover:bg-red-100 transition"
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <LanguageProvider>
      <AdminContent />
    </LanguageProvider>
  );
}
