import { useParams, Link } from "react-router-dom";
import { portfolio } from "../../data/portfolio.js";
import Navbar from "../../components/Navbar.jsx";
import Footer from "../../components/Footer.jsx";
import { useEffect } from "react";

export default function ProjectDetails() {
  const { id } = useParams();
  const project = portfolio.find(p => p.id.toString() === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-black text-gray-900 mb-4">المشروع غير موجود</h1>
            <Link to="/portfolio" className="text-[#4a9a10] font-bold hover:underline">العودة لمعرض الأعمال</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 font-bold transition-colors">
            <svg className="w-5 h-5 -scale-x-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            العودة للأعمال
          </Link>
          
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
            <div className="relative h-64 md:h-[500px] w-full bg-gray-100">
              <img 
                src={project.img} 
                alt={project.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 md:p-10">
                <div>
                  <span className="inline-block px-4 py-1.5 bg-[#4a9a10] text-white text-sm font-bold rounded-full mb-4">
                    {project.cat}
                  </span>
                  <h1 className="text-3xl md:text-5xl font-black text-white">{project.title}</h1>
                </div>
              </div>
            </div>
            
            <div className="p-6 md:p-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10 pb-10 border-b border-gray-100">
                <div>
                  <p className="text-sm text-gray-500 mb-1">العميل</p>
                  <p className="font-bold text-gray-900 text-lg">{project.client}</p>
                </div>
                {project.stats && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{project.stats.label}</p>
                    <p className="font-bold text-[#4a9a10] text-lg">{project.stats.val}</p>
                  </div>
                )}
                {project.link && (
                  <div className="col-span-2 md:col-span-2 md:text-left">
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 text-white rounded-full font-bold text-sm hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl"
                    >
                      زيارة المشروع
                      <svg className="w-4 h-4 -scale-x-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
              
              <div className="mb-10">
                <h4 className="text-2xl font-black text-gray-900 mb-4">عن المشروع</h4>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {project.description}
                </p>
              </div>

              {project.tech && (
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">التقنيات المستخدمة</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, i) => (
                      <span key={i} className="px-5 py-2.5 bg-gray-50 border border-gray-100 text-gray-700 text-sm font-semibold rounded-xl">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
