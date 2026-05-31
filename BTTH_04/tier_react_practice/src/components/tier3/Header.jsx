function Header() {
    return (
        <header className="panel" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong>PhoneShop</strong>
            <nav style={{ display: "flex", gap: "12px" }}>
                <a href="#home">Trang chủ</a>
                <a href="#products">Sản phẩm</a>
                <a href="#contact">Liên hệ</a>
            </nav>
        </header>
    );
}

export default Header;
