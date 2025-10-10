# 🌟 Cao Phan Khanh Duy - CV Portfolio

[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-brightgreen)](https://khanhdii.github.io)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> A modern, responsive, and beautifully designed CV portfolio website showcasing my journey as a Data Scientist and AI Engineer.

## ✨ Features

- 🎨 **Modern Design**: Beautiful gradient backgrounds with smooth animations
- 📱 **Fully Responsive**: Optimized for all devices (desktop, tablet, mobile)
- ⚡ **Performance Optimized**: Fast loading with smooth transitions
- 🎭 **Interactive UI**: Scroll animations, hover effects, and dynamic filtering
- 🌈 **Gradient Themes**: Eye-catching color schemes with glassmorphism effects
- 📊 **Dynamic Content**: Interactive publication filtering and animated statistics
- 🔍 **SEO Friendly**: Optimized meta tags and semantic HTML
- ♿ **Accessible**: ARIA labels and keyboard navigation support

## 🚀 Quick Start

### Xem Trực Tiếp (View Live)

Truy cập website: [https://khanhdii.github.io](https://khanhdii.github.io)

### Chạy Locally (Run Locally)

1. Clone repository này:
```bash
git clone https://github.com/Khanhdii/Khanhdii.github.io.git
cd Khanhdii.github.io
```

2. Mở file `index.html` trong trình duyệt:
```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

Hoặc sử dụng Live Server:
```bash
# Nếu bạn có Python
python -m http.server 8000

# Nếu bạn có Node.js
npx serve

# Sau đó truy cập: http://localhost:8000
```

## 📦 Deploy lên GitHub Pages

### Bước 1: Tạo Repository

1. Đăng nhập vào [GitHub](https://github.com)
2. Tạo repository mới với tên: `<username>.github.io` (thay `<username>` bằng username GitHub của bạn)
3. Ví dụ: `Khanhdii.github.io`

### Bước 2: Push Code

```bash
# Khởi tạo git (nếu chưa có)
git init

# Thêm tất cả files
git add .

# Commit
git commit -m "Initial commit: Add beautiful CV portfolio"

# Thêm remote repository
git remote add origin https://github.com/Khanhdii/Khanhdii.github.io.git

# Push lên GitHub
git branch -M main
git push -u origin main
```

### Bước 3: Kích Hoạt GitHub Pages

1. Vào repository trên GitHub
2. Click vào **Settings** (⚙️)
3. Scroll xuống phần **Pages** (bên trái)
4. Trong phần **Source**, chọn:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**
6. Đợi vài phút và truy cập: `https://<username>.github.io`

### Bước 4: Cập Nhật Nội Dung

Mỗi khi bạn muốn cập nhật CV:

```bash
# Chỉnh sửa files
# Sau đó:

git add .
git commit -m "Update CV content"
git push
```

Website sẽ tự động cập nhật sau vài phút!

## 🎨 Tùy Chỉnh (Customization)

### Thay Đổi Màu Sắc

Mở file `styles.css` và chỉnh sửa các biến CSS:

```css
:root {
    --primary: #6366f1;        /* Màu chính */
    --secondary: #8b5cf6;      /* Màu phụ */
    --accent: #ec4899;         /* Màu nhấn */
    /* ... */
}
```

### Cập Nhật Thông Tin Cá Nhân

Mở file `index.html` và chỉnh sửa nội dung trong các section:

- **Hero Section**: Tên, chức danh, mô tả
- **Experience**: Kinh nghiệm làm việc
- **Education**: Học vấn
- **Publications**: Bài báo khoa học
- **Projects**: Dự án
- **Skills**: Kỹ năng
- **Awards**: Giải thưởng

### Thêm Hiệu Ứng

File `script.js` có nhiều hiệu ứng có thể bật/tắt:

- Particle Effect (hiệu ứng hạt)
- Cursor Trail (vệt chuột)
- Typing Effect (hiệu ứng đánh máy)

Uncomment các dòng code để bật các hiệu ứng này!

## 📁 Cấu Trúc Thư Mục

```
Khanhdii.github.io/
├── index.html          # File HTML chính
├── styles.css          # File CSS styling
├── script.js           # File JavaScript
├── README.md           # File này
└── assets/             # (Tùy chọn) Thư mục chứa hình ảnh
    └── images/
```

## 🛠️ Công Nghệ Sử Dụng

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Grid, Flexbox, Animations
- **JavaScript (Vanilla)**: No frameworks, pure JS
- **Font Awesome**: Icons
- **Google Fonts**: Inter font family

## 📱 Responsive Breakpoints

- **Desktop**: > 768px
- **Tablet**: 480px - 768px
- **Mobile**: < 480px

## ⚡ Performance

- ✅ Lightweight (no heavy frameworks)
- ✅ Fast loading time
- ✅ Optimized animations
- ✅ Lazy loading support
- ✅ Smooth scrolling

## 🎯 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ⚠️ IE11 (limited support)

## 📝 Sections

1. **Hero** - Giới thiệu chính với thống kê nổi bật
2. **Professional Summary** - Tóm tắt chuyên môn
3. **Experience** - Kinh nghiệm làm việc với timeline
4. **Education** - Học vấn và thành tích
5. **Publications** - Bài báo khoa học với bộ lọc
6. **Projects** - Dự án đã thực hiện
7. **Skills** - Kỹ năng chuyên môn
8. **Awards** - Giải thưởng và hoạt động
9. **Contact** - Thông tin liên hệ

## 🎨 Design Highlights

- **Glassmorphism**: Hiệu ứng kính mờ hiện đại
- **Gradient Orbs**: Các quả cầu gradient động
- **Smooth Transitions**: Chuyển động mượt mà
- **Hover Effects**: Hiệu ứng khi di chuột
- **Scroll Animations**: Hiệu ứng khi cuộn trang
- **Color Themes**: Bảng màu chuyên nghiệp

## 🔧 Troubleshooting

### Website không hiển thị?

1. Kiểm tra tên repository phải là: `<username>.github.io`
2. Đảm bảo file chính là `index.html` (viết thường)
3. Đợi 5-10 phút sau khi push code
4. Kiểm tra Settings > Pages đã được kích hoạt

### Fonts không load?

- Kiểm tra kết nối internet
- Google Fonts có thể bị chặn ở một số quốc gia
- Thử xóa cache trình duyệt

### Animations không chạy?

- Kiểm tra file `script.js` đã được link đúng
- Mở Console (F12) xem có lỗi không
- Đảm bảo JavaScript được bật trong trình duyệt

## 📧 Contact

- **Email**: hauduy20122002@gmail.com
- **Phone**: +84-978-650-231
- **GitHub**: [@Khanhdii](https://github.com/Khanhdii)
- **LinkedIn**: [Cao Phan Khanh Duy](https://linkedin.com/in/cao-phan-khanh-duy-a81329282)

## 📄 License

MIT License - Bạn tự do sử dụng và chỉnh sửa cho mục đích cá nhân.

## 🙏 Credits

- Design inspiration from modern portfolio trends
- Icons by [Font Awesome](https://fontawesome.com)
- Fonts by [Google Fonts](https://fonts.google.com)

## 🌟 Show Your Support

Nếu bạn thấy project này hữu ích, hãy cho một ⭐ trên GitHub!

---

<div align="center">
  Made with ❤️ by Cao Phan Khanh Duy
  <br>
  <sub>Valedictorian 2025 | AI/ML Engineer | Researcher</sub>
</div>

