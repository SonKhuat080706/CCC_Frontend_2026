function UserProfile() {
    return (
        <div className="card">
            <h1>Hồ sơ cá nhân</h1>
            <img src="https://picsum.photos/120/120?random=21" alt="Ảnh đại diện" style={{ borderRadius: "50%" }} />
            <table>
                <tbody>
                    <tr>
                        <td>Họ tên:</td>
                        <td>Minh</td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td>minh@example.com</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

function ProductInfo() {
    return (
        <div className="card">
            <h2>iPhone 15</h2>
            <p className="price">25.000.000đ</p>
            <ul>
                <li>Màn hình: 6.1 inch</li>
                <li>Camera: 48MP</li>
                <li>Pin: 3349 mAh</li>
            </ul>
            <button className="primary-btn">Mua ngay</button>
        </div>
    );
}

function Tier0() {
    return (
        <div>
            <section className="panel">
                <h2>Tier 0 — Component đầu tiên</h2>
                <p>React Component = function trả về JSX.</p>
                <ul>
                    <li>HTML `class` → JSX `className`</li>
                    <li>HTML `for` → JSX `htmlFor`</li>
                    <li>Thẻ tự đóng: `img`, `input` phải viết dạng `&lt;img /&gt;`</li>
                </ul>
            </section>

            <div className="grid grid-2">
                <UserProfile />
                <ProductInfo />
            </div>
        </div>
    );
}

export default Tier0;
