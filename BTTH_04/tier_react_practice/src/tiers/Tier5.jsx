import { useState } from "react";

function ClickEvents() {
    const [message, setMessage] = useState("Chưa click");
    const [clicks, setClicks] = useState(0);

    return (
        <div className="card">
            <h3>5.1 — Click Events</h3>
            <p>{message}</p>
            <p>Số lần click: {clicks}</p>
            <button className="primary-btn" onClick={() => {
                setMessage("Bạn vừa click!");
                setClicks(clicks + 1);
            }}>
                Click tôi
            </button>
        </div>
    );
}

function InputEvents() {
    const [value, setValue] = useState("");

    return (
        <div className="card">
            <h3>5.2 — Input Events</h3>
            <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Gõ gì đó..." />
            <p>Realtime value: {value}</p>
            <p>Viết hoa: {value.toUpperCase()}</p>
        </div>
    );
}

function KeyboardEvents() {
    const [items, setItems] = useState([]);
    const [text, setText] = useState("");

    function addItem() {
        if (!text.trim()) return;
        setItems([...items, text.trim()]);
        setText("");
    }

    return (
        <div className="card">
            <h3>5.3 — Keyboard Events</h3>
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") addItem();
                    if (e.key === "Escape") setText("");
                }}
                placeholder="Enter để thêm, Escape để xóa input"
            />
            <ul>{items.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}</ul>
        </div>
    );
}

function FormEvents() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        message: ""
    });

    const hasEmailError = formData.email.length > 0 && !formData.email.includes("@");
    const hasPasswordError =
        formData.confirmPassword.length > 0 &&
        formData.password !== formData.confirmPassword;

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (hasEmailError) {
            alert("Email phải có @");
            return;
        }

        if (hasPasswordError) {
            alert("Mật khẩu xác nhận không khớp");
            return;
        }

        alert("Submit thành công!");
    }

    return (
        <div className="card">
            <h3>5.4 — Form Events</h3>
            <form onSubmit={handleSubmit}>
                <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={hasEmailError ? "error-input" : ""}
                    placeholder="Email"
                />
                {hasEmailError && <p className="error">Email phải có @</p>}

                <br /><br />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Mật khẩu"
                />

                <br /><br />
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={hasPasswordError ? "error-input" : ""}
                    placeholder="Xác nhận mật khẩu"
                />
                {hasPasswordError && <p className="error">Xác nhận mật khẩu không khớp</p>}

                <br /><br />
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tin nhắn"
                />

                <br /><br />
                <button className="primary-btn" type="submit">Gửi form</button>
            </form>
        </div>
    );
}

function Tier5() {
    return (
        <div>
            <section className="panel">
                <h2>Tier 5 — Events cơ bản</h2>
            </section>

            <div className="grid grid-2">
                <ClickEvents />
                <InputEvents />
                <KeyboardEvents />
                <FormEvents />
            </div>
        </div>
    );
}

export default Tier5;
