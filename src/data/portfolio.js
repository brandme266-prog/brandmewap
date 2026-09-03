export const categories = ["الكل", "تصميم مواقع", "تطبيقات جوال"];

export const portfolio = [
  { 
    id: 1, title: "منصة ذاكرلي التعليمية", cat: "تصميم مواقع", img: "/images/httpszakrly.online.webp", client: "Zakrly", link: "https://zakrly.online",
    description: "منصة تعليمية متكاملة تهدف إلى تسهيل عملية التعلم عن بعد وتوفير بيئة تفاعلية بين المعلم والطالب. تحتوي المنصة على نظام فصول افتراضية، اختبارات إلكترونية، وتتبع لأداء الطلاب.",
    tech: ["React", "Node.js", "MongoDB"]
  },
  { 
    id: 2, title: "تطبيق كوزمالينك (CosmaLink)", cat: "تطبيقات جوال", img: "/images/cosmalink.png", client: "CosmaLink", link: "https://play.google.com/store/apps/details?id=com.pharmacysmarts.app",
    description: "تطبيق متكامل لطلب الأدوية ومستحضرات التجميل من صيدليات كوزمالينك. يوفر التطبيق تجربة مستخدم سلسة لتصفح المنتجات، رفع الوصفات الطبية، وتتبع حالة الطلب حتى التوصيل.",
    tech: ["Flutter", "Firebase", "Node.js"]
  },
  { 
    id: 3, title: "تطبيق أوردارت (Ordart)", cat: "تطبيقات جوال", img: "/images/httpsplay.google.comstoreappsdetailsid=com.ordart.app.webp", client: "Ordart", link: "https://play.google.com/store/apps/details?id=com.ordart.app",
    description: "تطبيق مميز لتوصيل الطلبات وتسهيل عمليات الشراء من المتاجر المحلية. يحتوي التطبيق على نظام خرائط متقدم لتتبع المندوبين ولوحة تحكم متكاملة لإدارة العمليات.",
    tech: ["React Native", "Google Maps API", "Laravel"]
  },
  { 
    id: 4, title: "موقع وكالة إشراق", cat: "تصميم مواقع", img: "/images/httpsishraq-adv.com.webp", client: "Ishraq Adv", link: "https://ishraq-adv.com",
    description: "موقع تعريفي متكامل لوكالة إشراق للدعاية والإعلان، يعرض خدمات الوكالة وسابقة أعمالها بشكل عصري وجذاب يعكس هوية الشركة الإبداعية.",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"]
  },

  { 
    id: 6, title: "موقع نجد سداد", cat: "تصميم مواقع", img: "/images/httpsnajdsadad.com.png", client: "نجد سداد", link: "https://najdsadad.com",
    description: "موقع إلكتروني لشركة نجد سداد لتقديم خدمات الدفع والتقسيط. يتميز الموقع بتصميم احترافي يركز على تجربة المستخدم وسهولة الوصول للخدمات المالية.",
    tech: ["Vue.js", "Nuxt.js", "Tailwind CSS"]
  },
  { 
    id: 7, title: "متجر أحمد الماسي", cat: "تصميم مواقع", img: "/images/httpsahmedalmasi.com.jpeg", client: "أحمد الماسي", link: "https://ahmedalmasi.com",
    description: "متجر إلكتروني فاخر متخصص في بيع العطور المتميزة بأنواعها، يوفر تجربة تسوق راقية تعكس جودة العطور مع نظام دفع إلكتروني آمن وسريع.",
    tech: ["Shopify", "React", "Tailwind CSS"]
  },
  { 
    id: 8, title: "منصة درر هب", cat: "تصميم مواقع", img: "/images/httpsdorarhub.com.png", client: "درر هب", link: "https://dorarhub.com",
    description: "منصة إبداعية لتقديم الخدمات الرقمية المبتكرة وتطوير الأعمال، تعتمد على تصميم عصري وحيوي لجذب الزوار وتسهيل الوصول للخدمات.",
    tech: ["Next.js", "Node.js", "Framer Motion"]
  },
  { 
    id: 9, title: "نظام إدارة ضفاف الخليج", cat: "تصميم مواقع", img: "/images/dhafa-alkhaleej.png", client: "ضفاف الخليج", link: "",
    description: "نظام متكامل لإدارة المبيعات العقارية، يتيح متابعة الأداء، إدارة العملاء والوحدات والمشاريع بالإضافة إلى تقارير تفصيلية وإحصائيات دقيقة.",
    tech: ["React", "Tailwind CSS"]
  },
  { 
    id: 10, title: "منصة كساب للشحن", cat: "تصميم مواقع", img: "/images/kassab.png", client: "كساب", link: "https://kassab-dashboard.pages.dev/",
    description: "لوحة تحكم متكاملة لشركة كساب للشحن، لتسهيل تتبع المناديب وإدارة الطلبات بفعالية وربط الشركات بالمطاعم والصيدليات بخريطة تفاعلية ومؤشرات أداء مباشرة.",
    tech: ["React", "Vite", "Tailwind CSS"]
  },
  { 
    id: 11, title: "تطبيق إدارة شركات التسويق", cat: "تطبيقات جوال", img: "/images/marketing-app.jpg", client: "شركة تسويق", link: "https://drive.google.com/drive/folders/18A8D9ZI0A5DWn3UC58BySPDfHrlsIfqQ?usp=sharing",
    description: "تطبيق موبايل (APK) متكامل لإدارة شركات التسويق. يتيح متابعة الحملات الإعلانية، تحليل الأداء، وإدارة العملاء والميزانيات من خلال واجهة احترافية وسهلة الاستخدام.",
    tech: ["Flutter", "Firebase", "REST API"]
  }
];
