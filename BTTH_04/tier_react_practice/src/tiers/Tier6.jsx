import { useRef, useState } from "react";

function ListBasics() {
    const students = [
        { id: 1, name: "Minh", age: 20 },
        { id: 2, name: "An", age: 21 },
        { id: 3, name: "Linh", age: 19 }
    ];

    const averageAge = students.reduce((sum, student) => sum + student.age, 0) / students.length;

    return (
        <div className="card">
            <h3>6.1 — Render danh sách</h3>
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên</th>
                        <th>Tuổi</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={student.id} style={{ color: student.age >= 20 ? "#16a34a" : "#0f172a" }}>
                            <td>{index + 1}</td>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p>Tuổi trung bình: {averageAge.toFixed(1)}</p>
        </div>
    );
}

function CreateItem() {
    const [items, setItems] = useState([
        { id: 1, name: "HTML" },
        { id: 2, name: "CSS" }
    ]);
    const [newName, setNewName] = useState("");
    const [message, setMessage] = useState("");
    const inputRef = useRef(null);

    function handleAdd() {
        if (newName.trim() === "") {
            setMessage("Tên không được để trống");
            return;
        }

        const newItem = { id: Date.now(), name: newName.trim() };
        setItems([...items, newItem]);
        setNewName("");
        setMessage("Đã thêm thành công!");
        inputRef.current?.focus();
    }

    return (
        <div className="card">
            <h3>6.2 — CREATE</h3>
            <input
                ref={inputRef}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                placeholder="Nhập tên môn học..."
            />
            <button className="primary-btn" onClick={handleAdd}>➕ Thêm</button>
            {message && <p className={message.includes("thành công") ? "success" : "error"}>{message}</p>}
            <h4>Danh sách ({items.length} môn):</h4>
            {items.map(item => <div key={item.id}>{item.name}</div>)}
        </div>
    );
}

function DeleteItem() {
    const [items, setItems] = useState([
        { id: 1, name: "Minh" },
        { id: 2, name: "An" },
        { id: 3, name: "Linh" }
    ]);
    const [lastDeleted, setLastDeleted] = useState(null);
    const [message, setMessage] = useState("");

    function handleDelete(item) {
        if (!window.confirm(`Xóa ${item.name}?`)) return;
        setItems(items.filter(current => current.id !== item.id));
        setLastDeleted(item);
        setMessage(`Đã xóa ${item.name}`);
    }

    function undoDelete() {
        if (!lastDeleted) return;
        setItems([...items, lastDeleted]);
        setMessage(`Đã hoàn tác ${lastDeleted.name}`);
        setLastDeleted(null);
    }

    return (
        <div className="card">
            <h3>6.3 — DELETE</h3>
            {message && <p className="success">{message}</p>}
            {lastDeleted && <button className="primary-btn" onClick={undoDelete}>Hoàn tác</button>}
            {items.length === 0 ? <p>Danh sách trống</p> : items.map(item => (
                <div key={item.id} style={{ display: "flex", justifyContent: "space-between", margin: "6px 0" }}>
                    <span>{item.name}</span>
                    <button className="danger-btn" onClick={() => handleDelete(item)}>Xóa</button>
                </div>
            ))}
        </div>
    );
}

function UpdateItem() {
    const [items, setItems] = useState([
        { id: 1, name: "Minh", age: 20 },
        { id: 2, name: "An", age: 21 },
        { id: 3, name: "Linh", age: 19 }
    ]);

    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editAge, setEditAge] = useState("");
    const [message, setMessage] = useState("");

    function startEdit(item) {
        setEditingId(item.id);
        setEditName(item.name);
        setEditAge(String(item.age));
        setMessage("");
    }

    function saveEdit() {
        if (!editName.trim()) {
            setMessage("Không cho lưu nếu tên trống");
            return;
        }

        setItems(items.map(item =>
            item.id === editingId
                ? { ...item, name: editName.trim(), age: Number(editAge) }
                : item
        ));

        setEditingId(null);
        setMessage("Đã lưu!");
    }

    return (
        <div className="card">
            <h3>6.4 — UPDATE</h3>
            {message && <p className={message === "Đã lưu!" ? "success" : "error"}>{message}</p>}

            {items.map(item => (
                <div key={item.id} style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                    {editingId === item.id ? (
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                            <input
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") saveEdit();
                                    if (e.key === "Escape") setEditingId(null);
                                }}
                                autoFocus
                                style={{ outline: "3px solid #bfdbfe" }}
                            />
                            <input
                                type="number"
                                value={editAge}
                                onChange={(e) => setEditAge(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") saveEdit();
                                    if (e.key === "Escape") setEditingId(null);
                                }}
                                style={{ width: 80, outline: "3px solid #bfdbfe" }}
                            />
                            <button className="primary-btn" onClick={saveEdit}>Lưu</button>
                            <button className="danger-btn" onClick={() => setEditingId(null)}>Hủy</button>
                        </div>
                    ) : (
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>{item.name} - {item.age} tuổi</span>
                            <button className="primary-btn" onClick={() => startEdit(item)}>Sửa</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

function Tier6() {
    return (
        <div>
            <section className="panel">
                <h2>Tier 6 — Lists & CRUD</h2>
            </section>

            <div className="grid grid-2">
                <ListBasics />
                <CreateItem />
                <DeleteItem />
                <UpdateItem />
            </div>
        </div>
    );
}

export default Tier6;
