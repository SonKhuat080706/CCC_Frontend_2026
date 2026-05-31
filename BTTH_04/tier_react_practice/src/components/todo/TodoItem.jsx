import { useState } from "react";

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(todo.text);

    function saveEdit() {
        if (!text.trim()) return;
        onEdit(todo.id, text.trim());
        setIsEditing(false);
    }

    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px",
            margin: "6px 0",
            background: todo.done ? "#f0fff4" : "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: "10px"
        }}>
            <input
                type="checkbox"
                checked={todo.done}
                onChange={() => onToggle(todo.id)}
            />

            {isEditing ? (
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") saveEdit();
                        if (e.key === "Escape") setIsEditing(false);
                    }}
                    autoFocus
                    style={{ flex: 1 }}
                />
            ) : (
                <span style={{
                    flex: 1,
                    textDecoration: todo.done ? "line-through" : "none",
                    color: todo.done ? "#999" : "#333"
                }}>
                    {todo.text}
                    <small style={{ display: "block", color: "#64748b" }}>
                        Tạo lúc: {todo.createdAt}
                    </small>
                </span>
            )}

            {isEditing ? (
                <button className="primary-btn" onClick={saveEdit}>Lưu</button>
            ) : (
                <button className="primary-btn" onClick={() => setIsEditing(true)}>Sửa</button>
            )}

            <button className="danger-btn" onClick={() => onDelete(todo.id)}>🗑</button>
        </div>
    );
}

export default TodoItem;
