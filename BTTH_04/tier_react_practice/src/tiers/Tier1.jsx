import { useState } from "react";

function LifecycleDemo() {
    console.log("1️⃣ Component được gọi!");
    return (
        <div className="card">
            <h3>Lifecycle Demo</h3>
            <p>Mở Console để xem log render lần đầu.</p>
        </div>
    );
}

function BadCounter() {
    let count = 0;

    function handleClick() {
        count = count + 1;
        console.log("BadCounter count:", count);
    }

    return (
        <div className="card">
            <h3>❌ Counter dùng biến thường</h3>
            <p>Bộ đếm: {count}</p>
            <button className="primary-btn" onClick={handleClick}>Tăng (+1)</button>
            <p className="error">Console tăng nhưng UI không đổi.</p>
        </div>
    );
}

function GoodCounter() {
    console.log("🔄 GoodCounter render!");
    const [count, setCount] = useState(0);

    return (
        <div className="card">
            <h3>✅ Counter dùng useState</h3>
            <p>Bộ đếm: {count}</p>
            <button className="primary-btn" onClick={() => setCount(count + 1)}>Tăng (+1)</button>
            <p className="success">Gọi setCount → React re-render → UI cập nhật.</p>
        </div>
    );
}

function FlowDemo() {
    console.log("🔄 FlowDemo render!");
    const [step, setStep] = useState(1);

    return (
        <div className="card">
            <h3>Luồng hoạt động</h3>
            <p>Bước hiện tại: {step}</p>
            <button className="primary-btn" onClick={() => setStep(step + 1)}>Bước tiếp theo →</button>{" "}
            <button className="primary-btn" onClick={() => setStep(1)}>Quay lại đầu</button>

            <div style={{ marginTop: "12px", padding: "12px", background: "#f1f5f9", borderRadius: "10px" }}>
                {step === 1 && <p>👋 Bước 1: Xin chào!</p>}
                {step === 2 && <p>📖 Bước 2: Đang học React</p>}
                {step === 3 && <p>🎯 Bước 3: Hiểu useState</p>}
                {step >= 4 && <p>🎉 Bước 4: Hoàn thành!</p>}
            </div>
        </div>
    );
}

function Tier1() {
    return (
        <div>
            <section className="panel">
                <h2>Tier 1 — React Flow</h2>
                <p>User action → setState → component render lại → JSX mới → DOM cập nhật.</p>
            </section>

            <div className="grid grid-2">
                <LifecycleDemo />
                <BadCounter />
                <GoodCounter />
                <FlowDemo />
            </div>
        </div>
    );
}

export default Tier1;
