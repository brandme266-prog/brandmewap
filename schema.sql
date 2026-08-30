CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  category TEXT DEFAULT 'all',
  link TEXT,
  features TEXT DEFAULT '[]',
  order_index INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_active ON projects(is_active);
CREATE INDEX IF NOT EXISTS idx_projects_order ON projects(order_index);

INSERT INTO projects (title, description, image_url, category, link, features, order_index) VALUES
('تطبيق أوردرات (Ordart)', 'تطبيق ذكي لتسهيل الطلبات وتقديم تجربة مستخدم سلسة وعصرية.', '/images/httpsplay.google.comstoreappsdetailsid=com.ordart.app.png', 'app', 'https://play.google.com/store/apps/details?id=com.ordart.app', '["تطبيق جوال","تجارة إلكترونية"]', 1),
('تطبيق صيدلية سمارت', 'تطبيق متكامل لتوفير خدمات الصيدلية الذكية والأدوية بسرعة وأمان.', '/images/httpsplay.google.comstoreappsdetailsid=com.pharmacysmarts.app.png', 'app', 'https://play.google.com/store/apps/details?id=com.pharmacysmarts.app', '["تطبيق صحي","صيدلية رقمية"]', 2),
('منصة إشراق الإعلانية', 'موقع إلكتروني احترافي لوكالة إشراق الإعلانية يعرض خدماتهم وأعمالهم بقوة.', '/images/httpsishraq-adv.com.png', 'web', 'https://ishraq-adv.com/', '["تطوير ويب","منصة إعلانية"]', 3),
('موقع جنة (Ganna1)', 'واجهة متجر إلكتروني حديثة توفر تجربة تسوق ممتازة للعملاء.', '/images/httpsganna1.com.png', 'web', 'https://ganna1.com/', '["متجر إلكتروني","ويب"]', 4),
('منصة ذاكرلي أونلاين', 'منصة تعليمية متكاملة للتعلم عن بعد توفر حلولاً دراسية للطلاب.', '/images/httpszakrly.online.png', 'web', 'https://zakrly.online/', '["منصة تعليمية","ويب"]', 5),
('موقع Smart Pharmacy', 'الواجهة الرقمية لمنصة الصيدلية الذكية عبر الويب لتصفح وشراء المنتجات.', '/images/httpssmartpharmacy.app.png', 'web', 'https://smartpharmacy.app', '["منصة طبية","ويب"]', 6);
