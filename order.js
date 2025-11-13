// Dữ liệu menu
const menuItems = [
    {
        id: 1, name: 'Cà phê đen', category: 'coffee', price: '35.000đ',
        description: 'Cà phê đen đậm đà hương vị truyền thống',
        image: 'https://images.unsplash.com/photo-1521302080334-4bebac2763a6?w=800&auto=format&fit=crop',
        nutrition: { calories: 5, protein: 0.1, fat: 0, carbs: 0.9 } // Thông tin dinh dưỡng ví dụ
    },
    {
        id: 2, name: 'Trà sen', category: 'tea', price: '45.000đ',
        description: 'Trà sen thơm ngát, thanh mát',
        image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop',
        nutrition: { calories: 2, protein: 0, fat: 0, carbs: 0.5 } // Ví dụ
    },
    {
        id: 3, name: 'Bánh Tiramisu', category: 'dessert', price: '55.000đ',
        description: 'Bánh Tiramisu béo ngậy vị cà phê',
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&auto=format&fit=crop',
        nutrition: { calories: 350, protein: 5, fat: 22, carbs: 30 } // Ví dụ
    },
    {
        id: 4, name: 'Mì Ý', category: 'food', price: '85.000đ',
        description: 'Mì Ý sốt bò bằm đậm đà',
        image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&auto=format&fit=crop',
        nutrition: { calories: 480, protein: 25, fat: 18, carbs: 55 } // Ví dụ
    },
    {
        id: 5, name: 'Khoai tây chiên', category: 'snack', price: '35.000đ',
        description: 'Khoai tây chiên giòn rụm',
        image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=800&auto=format&fit=crop',
        nutrition: { calories: 310, protein: 3, fat: 15, carbs: 40 } // Ví dụ
    },
    {
        id: 6, name: 'Súp gà', category: 'soup', price: '45.000đ',
        description: 'Súp gà nóng hổi bổ dưỡng',
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop',
        nutrition: { calories: 150, protein: 10, fat: 5, carbs: 15 } // Ví dụ
    }
];


// Các hàm tiện ích
function parsePrice(priceStr) {
    return parseInt(priceStr.replace(/\./g, '').replace('đ', ''));
}
function formatPrice(number) {
    return number.toLocaleString('vi-VN') + 'đ';
}


// ------------------- Hàm Tìm kiếm sản phẩm -------------------
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    // Lấy category đang được chọn
    const activeCategoryButton = document.querySelector('.category-btn.active');
    const currentCategory = activeCategoryButton ? activeCategoryButton.getAttribute('data-category') : 'all';

    // Lọc lại từ danh sách gốc menuItems
    const filteredItems = menuItems.filter(item => {
        // Kiểm tra xem item có thuộc category đang chọn không (hoặc là 'all')
        const matchesCategory = currentCategory === 'all' || item.category === currentCategory;
        // Chỉ kiểm tra xem tên item có chứa từ khóa tìm kiếm không
        const matchesSearch = item.name.toLowerCase().includes(searchTerm); // <--- Chỉ tìm kiếm trong tên
        // Chỉ giữ lại item nếu khớp cả hai điều kiện
        return matchesCategory && matchesSearch;
    });

    // Hiển thị kết quả đã lọc
    displayMenuItems(filteredItems);
});


// Hiển thị menu items
function displayMenuItems(items) {
    const menuGrid = document.getElementById('menuGrid');
    menuGrid.innerHTML = '';
    items.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="menu-item-content">
                <h3 class="menu-item-title">${item.name}</h3>
                <p class="menu-item-description">${item.description}</p>
                <p class="menu-item-price">${item.price}</p>
            </div>
        `;
        menuItem.addEventListener('click', () => ItemModal.open(item));
        menuGrid.appendChild(menuItem);
    });
}


// Lọc menu theo danh mục
function filterMenu(category) {
    const filteredItems = category === 'all'
        ? menuItems
        : menuItems.filter(item => item.category === category);
    displayMenuItems(filteredItems);
}

// Xử lý sự kiện cho các nút category
const categoryButtons = document.querySelectorAll('.category-btn');
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const category = button.getAttribute('data-category');
        filterMenu(category);
    });
});

// ------------------- Modal Auth (Login / Register) -------------------
const AuthModal = {
    modal: document.getElementById("authModal"),
    init() {
        // Đóng modal khi click vào nút đóng hoặc bên ngoài modal-content
        document.getElementById("closeAuthModal").addEventListener("click", () => {
            this.close();
        });
        this.modal.addEventListener("click", (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });

        // Chuyển đổi giữa Login và Register
        document.getElementById("showRegisterLink").addEventListener("click", (e) => {
            e.preventDefault();
            document.getElementById("loginForm").style.display = "none";
            document.getElementById("registerForm").style.display = "block";
        });
        document.getElementById("showLoginLink").addEventListener("click", (e) => {
            e.preventDefault();
            document.getElementById("registerForm").style.display = "none";
            document.getElementById("loginForm").style.display = "block";
        });
    },
    open() {
        this.modal.style.display = "block";
    },
    close() {
        this.modal.style.display = "none";
    }
};
AuthModal.init();

// Mở Auth Modal khi nhấn vào nút trong header
const authTrigger = document.getElementById("authTrigger");
authTrigger.addEventListener("click", (e) => {
    e.preventDefault();
    AuthModal.open();
});

// Xử lý nút đăng nhập
document.getElementById("loginBtn").addEventListener("click", () => {
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (username === "" || password === "") {
        alert("Vui lòng điền đầy đủ thông tin đăng nhập.");
    } else {
        alert("Đăng nhập thành công!");
        AuthModal.close();
    }
});

// Xử lý nút đăng ký
document.getElementById("registerBtn").addEventListener("click", () => {
    const username = document.getElementById("registerUsername").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    if (username === "" || email === "" || password === "" || confirmPassword === "") {
        alert("Vui lòng điền đầy đủ thông tin đăng ký.");
    } else if (password !== confirmPassword) {
        alert("Mật khẩu xác nhận không khớp.");
    } else {
        alert("Đăng ký thành công!");
        AuthModal.close();
    }
});



// ------------------- Modal cho Item (món ăn) -------------------
const ItemModal = {
    modal: document.getElementById('itemModal'),
    init() {
        // ... existing init code ...
        const closeBtns = this.modal.querySelectorAll('.close-btn, #closeModal'); // Sửa selector để bao gồm cả nút Đóng mới
        closeBtns.forEach(btn => btn.addEventListener('click', this.close.bind(this)));
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) { this.close(); }
        });
    },
    open(item) {
        // Lưu lại item hiện tại cho thao tác thêm giỏ hàng
        currentItem = item;
        document.getElementById('modalImage').src = item.image;
        document.getElementById('modalImage').alt = item.name;
        document.getElementById('modalTitle').textContent = item.name;
        document.getElementById('modalDescription').textContent = item.description;
        document.getElementById('modalPrice').textContent = item.price;

        // Điền thông tin dinh dưỡng
        const nutritionList = document.getElementById('nutritionList');
        const nutritionSection = document.getElementById('modalNutrition');
        nutritionList.innerHTML = ''; // Xóa list cũ

        if (item.nutrition && typeof item.nutrition === 'object') {
            nutritionSection.style.display = 'block'; // Hiện phần dinh dưỡng
            Object.entries(item.nutrition).forEach(([key, value]) => {
                const li = document.createElement('li');
                // Chuyển key thành chữ hoa đầu và thêm đơn vị
                let label = key.charAt(0).toUpperCase() + key.slice(1);
                let unit = '';
                if (key === 'calories') unit = ' kcal';
                else if (value > 0) unit = ' g'; // Chỉ thêm 'g' nếu giá trị > 0 cho protein, fat, carbs
                li.textContent = `${label}: ${value}${unit}`;
                nutritionList.appendChild(li);
            });
        } else {
            nutritionSection.style.display = 'none'; // Ẩn nếu không có data hoặc data không đúng định dạng
        }

        this.modal.style.display = 'block';
    },
    close() {
        this.modal.style.display = 'none';
    }
};
ItemModal.init();
// ------------------- Quản lý Giỏ hàng -------------------
const Cart = {
    items: [],
    updateUI() {
        const container = document.getElementById("cartItemsContainer");
        container.innerHTML = "";
        let total = 0;
        if (this.items.length === 0) {
            container.innerHTML = '<p class="empty-cart">Giỏ hàng trống!</p>';
        } else {
            this.items.forEach((item, index) => {
                total += parsePrice(item.price);
                const itemDiv = document.createElement("div");
                itemDiv.style.display = "flex";
                itemDiv.style.alignItems = "center";
                itemDiv.style.marginBottom = "10px";
                itemDiv.style.gap = "10px";
                itemDiv.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" style="width:50px; height:50px; object-fit: cover; border-radius: 5px;">
                    <span style="flex: 1;">${item.name} (${item.price})</span>
                    <button data-index="${index}" class="removeCartItem btn btn-secondary">Xóa</button>
                `;
                container.appendChild(itemDiv);
            });
            // Hiển thị tổng tiền
            document.getElementById("totalPrice").textContent = formatPrice(total);
            // Gắn sự kiện cho nút Xóa
            document.querySelectorAll(".removeCartItem").forEach(btn => {
                btn.addEventListener("click", (e) => {
                    const index = parseInt(e.target.getAttribute("data-index"));
                    Cart.removeItem(index);
                });
            });
        }
        document.querySelector(".cart-count").textContent = this.items.length;
    },
    addItem(item) {
        this.items.push(item);
        document.querySelector(".cart-count").textContent = this.items.length;
    },
    removeItem(index) {
        this.items.splice(index, 1);
        this.updateUI();
    }
};

// Sự kiện cho nút "Thêm vào giỏ hàng"
let currentItem = null;
const addToCartBtn = document.getElementById("addToCart");
addToCartBtn.addEventListener("click", () => {
    if (currentItem) {
        Cart.addItem(currentItem);
    }
    ItemModal.close();
});

// ------------------- Modal cho Giỏ hàng -------------------
const CartModal = {
    modal: document.getElementById("cartModal"),
    init() {
        document.getElementById("closeCartModal").addEventListener("click", () => {
            this.modal.style.display = "none";
        });
        this.modal.addEventListener("click", (e) => {
            if (e.target === this.modal) { this.modal.style.display = "none"; }
        });
    },
    open() {
        Cart.updateUI();
        this.modal.style.display = "block";
    }
};
CartModal.init();

// Sự kiện mở Cart Modal khi click vào icon giỏ hàng
const cartIcon = document.querySelector(".nav-item.cart .nav-link");
cartIcon.addEventListener("click", (e) => {
    e.preventDefault();
    CartModal.open();
});


// ------------------- Animation và Các Sự kiện khác -------------------
function addScrollAnimation() {
    const menuItemsDOM = document.querySelectorAll('.menu-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    menuItemsDOM.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.5s ease-out';
        observer.observe(item);
    });
}
window.addEventListener('load', addScrollAnimation);

// Hiển thị và ẩn thanh công cụ cho mobile
const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");
const navLinks = document.querySelectorAll(".nav-menu .nav-link");

menuOpenButton.addEventListener("click", () => {
    document.body.classList.toggle("show-mobile-menu");
});
menuCloseButton.addEventListener("click", () => menuOpenButton.click());
navLinks.forEach(link => {
    link.addEventListener("click", () => menuOpenButton.click());
});

// Khởi tạo hiển thị ban đầu
displayMenuItems(menuItems);