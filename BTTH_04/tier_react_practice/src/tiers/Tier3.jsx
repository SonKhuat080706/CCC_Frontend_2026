import ProductCard from "../components/tier3/ProductCard";
import Header from "../components/tier3/Header";
import Footer from "../components/tier3/Footer";

function UserCard({ name, email, avatar }) {
    return (
        <div className="card">
            <img src={avatar} alt={name} style={{ width: 80, height: 80, borderRadius: "50%" }} />
            <h3>{name}</h3>
            <p>{email}</p>
        </div>
    );
}

function PriceTag({ originalPrice, salePrice }) {
    const discount = Math.round((1 - salePrice / originalPrice) * 100);

    return (
        <p>
            <span style={{ textDecoration: "line-through", color: "#64748b" }}>
                {originalPrice.toLocaleString("vi-VN")}đ
            </span>{" "}
            <strong style={{ color: "#dc2626" }}>{salePrice.toLocaleString("vi-VN")}đ</strong>{" "}
            <span>Giảm {discount}%</span>
        </p>
    );
}

function Tier3() {
    const products = [
        { id: 1, name: "iPhone 15", price: "25.000.000", image: "https://picsum.photos/200?random=31" },
        { id: 2, name: "Samsung S24", price: "22.000.000", image: "https://picsum.photos/200?random=32" },
        { id: 3, name: "Xiaomi 14", price: "15.000.000", image: "https://picsum.photos/200?random=33" }
    ];

    const users = [
        { id: 1, name: "Minh", email: "minh@example.com", avatar: "https://i.pravatar.cc/120?img=1" },
        { id: 2, name: "An", email: "an@example.com", avatar: "https://i.pravatar.cc/120?img=2" },
        { id: 3, name: "Linh", email: "linh@example.com", avatar: "https://i.pravatar.cc/120?img=3" }
    ];

    return (
        <div>
            <Header />

            <section className="panel">
                <h2>Tier 3 — Component Split + Props</h2>
                <p>App chia ra Header, Footer, ProductCard, UserCard, PriceTag.</p>
            </section>

            <section className="panel" id="products">
                <h3>Cửa hàng điện thoại</h3>
                <div className="grid grid-3">
                    {products.map(product => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            </section>

            <section className="panel">
                <h3>UserCard props</h3>
                <div className="grid grid-3">
                    {users.map(user => <UserCard key={user.id} {...user} />)}
                </div>
            </section>

            <section className="panel">
                <h3>PriceTag props</h3>
                <PriceTag originalPrice={25000000} salePrice={21990000} />
            </section>

            <Footer />
        </div>
    );
}

export default Tier3;
