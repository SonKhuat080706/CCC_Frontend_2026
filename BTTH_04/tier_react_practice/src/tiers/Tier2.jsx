function SimpleVariables() {
    const ten = "Nguyễn Văn Minh";
    const tuoi = 20;
    const queQuan = "Hà Nội";
    const canNang = 69;
    const chieuCao = 1.7;
    const bmi = canNang / (chieuCao * chieuCao);

    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Chào buổi sáng" : hour < 18 ? "Chào buổi chiều" : "Chào buổi tối";

    return (
        <div className="card">
            <h3>2.1 — Biến trong JSX</h3>
            <p>{greeting}, {ten}!</p>
            <p>Tuổi: {tuoi}</p>
            <p>Quê quán: {queQuan}</p>
            <p>BMI: {bmi.toFixed(2)}</p>
        </div>
    );
}

function ConditionalRendering() {
    const isOnline = true;
    const isLoggedIn = true;
    const stock = 0;

    return (
        <div className="card">
            <h3>2.2 — Conditional Rendering</h3>
            <p>Trạng thái: {isOnline ? "🟢 Online" : "🔴 Offline"}</p>
            {isLoggedIn ? (
                <nav style={{ display: "flex", gap: "10px" }}>
                    <a href="#">Trang chủ</a>
                    <a href="#">Hồ sơ</a>
                    <a href="#">Đăng xuất</a>
                </nav>
            ) : (
                <p>Vui lòng đăng nhập để thấy menu.</p>
            )}
            {stock === 0 && <p className="error">Hết hàng</p>}
        </div>
    );
}

function ListRendering() {
    const products = [
        { id: 1, name: "Bàn phím cơ", price: 1290000 },
        { id: 2, name: "Chuột không dây", price: 790000 },
        { id: 3, name: "Tai nghe", price: 2490000 },
        { id: 4, name: "USB 64GB", price: 190000 },
        { id: 5, name: "Màn hình 24 inch", price: 3290000 }
    ];

    const total = products.reduce((sum, product) => sum + product.price, 0);

    return (
        <div className="card">
            <h3>2.3 — List Rendering</h3>
            <ul>
                {products.map(product => (
                    <li
                        key={product.id}
                        style={{ color: product.price > 1000000 ? "#dc2626" : "#0f172a" }}
                    >
                        {product.name} — {product.price.toLocaleString("vi-VN")}đ
                    </li>
                ))}
            </ul>
            <strong>Tổng giá: {total.toLocaleString("vi-VN")}đ</strong>
        </div>
    );
}

function Tier2() {
    return (
        <div>
            <section className="panel">
                <h2>Tier 2 — Biến, điều kiện và danh sách trong JSX</h2>
            </section>

            <div className="grid grid-2">
                <SimpleVariables />
                <ConditionalRendering />
                <ListRendering />
            </div>
        </div>
    );
}

export default Tier2;
