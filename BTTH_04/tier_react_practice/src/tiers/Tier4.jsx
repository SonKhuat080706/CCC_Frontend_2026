import { useState } from "react";

function NumberState() {
    const [count, setCount] = useState(0);
    const color = count > 0 ? "#16a34a" : count < 0 ? "#dc2626" : "#0f172a";
    const label = count > 0 ? "Số dương" : count < 0 ? "Số âm" : "Bằng 0";

    return (
        <div className="card">
            <h3>4.1 — useState với số</h3>
            <p style={{ color, fontSize: "2rem", fontWeight: 800 }}>{count}</p>
            <p>{label}</p>
            <button className="primary-btn" onClick={() => setCount(count + 1)}>+1</button>{" "}
            <button className="primary-btn" onClick={() => setCount(count + 5)}>Tăng 5</button>{" "}
            <button className="primary-btn" onClick={() => setCount(count - 1)}>-1</button>{" "}
            <button className="primary-btn" onClick={() => setCount(0)}>Reset</button>
        </div>
    );
}

function StringState() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    return (
        <div className="card">
            <h3>4.2 — useState với chuỗi</h3>
            <label>Tên:</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nhập tên..." />
            <br /><br />
            <label>Email:</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Nhập email..." />
            <h4>Thông tin đã nhập:</h4>
            <p>Tên: {name || "(chưa nhập)"}</p>
            <p>Email: {email || "(chưa nhập)"}</p>
            <p>Độ dài tên: {name.length}</p>
        </div>
    );
}

function BooleanState() {
    const [isDark, setIsDark] = useState(false);
    const [showDetail, setShowDetail] = useState(true);

    return (
        <div className="card" style={{ background: isDark ? "#0f172a" : "#fff", color: isDark ? "#fff" : "#0f172a" }}>
            <h3>4.3 — useState với boolean</h3>
            <button className="primary-btn" onClick={() => setIsDark(!isDark)}>
                {isDark ? "Light mode" : "Dark mode"}
            </button>{" "}
            <button className="primary-btn" onClick={() => setShowDetail(!showDetail)}>
                {showDetail ? "Ẩn chi tiết" : "Hiện chi tiết"}
            </button>
            {showDetail && <p>Boolean dùng tốt cho toggle, show/hide, open/close.</p>}
        </div>
    );
}

function MultiState() {
    const [form, setForm] = useState({ name: "", age: "", message: "" });
    const [submitted, setSubmitted] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
        setSubmitted(false);
    }

    return (
        <div className="card">
            <h3>4.4 — Kết hợp nhiều useState / state object</h3>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Tên" />
            <br /><br />
            <input name="age" value={form.age} onChange={handleChange} placeholder="Tuổi" />
            <br /><br />
            <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tin nhắn" />
            <br /><br />
            <button className="primary-btn" onClick={() => setSubmitted(true)}>Gửi</button>
            {submitted && (
                <div style={{ marginTop: "12px" }}>
                    <p>Tên: {form.name}</p>
                    <p>Tuổi: {form.age}</p>
                    <p>Tin nhắn: {form.message}</p>
                </div>
            )}
        </div>
    );
}

function Tier4() {
    return (
        <div>
            <section className="panel">
                <h2>Tier 4 — useState cơ bản</h2>
            </section>

            <div className="grid grid-2">
                <NumberState />
                <StringState />
                <BooleanState />
                <MultiState />
            </div>
        </div>
    );
}

export default Tier4;
