import { useEffect, useState } from "react";
import TodoItem from "../components/todo/TodoItem";
import TodoFilter from "../components/todo/TodoFilter";

function Tier7TodoApp() {
    const [todos, setTodos] = useState(() => {
        const saved = localStorage.getItem("btth04-todos");
        return saved ? JSON.parse(saved) : [];
    });
    const [inputValue, setInputValue] = useState("");
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        localStorage.setItem("btth04-todos", JSON.stringify(todos));
    }, [todos]);

    function addTodo() {
        if (inputValue.trim() === "") return;

        const newTodo = {
            id: Date.now(),
            text: inputValue.trim(),
            done: false,
            createdAt: new Date().toLocaleString("vi-VN")
        };

        setTodos([newTodo, ...todos]);
        setInputValue("");
    }

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            addTodo();
        }
    }

    function toggleTodo(id) {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, done: !todo.done } : todo
        ));
    }

    function deleteTodo(id) {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    function editTodo(id, newText) {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, text: newText } : todo
        ));
    }

    function clearCompleted() {
        setTodos(todos.filter(todo => !todo.done));
    }

    const filteredTodos = todos.filter(todo => {
        if (filter === "active") return !todo.done;
        if (filter === "completed") return todo.done;
        return true;
    });

    const activeCount = todos.filter(todo => !todo.done).length;
    const completedCount = todos.filter(todo => todo.done).length;

    return (
        <div>
            <section className="panel">
                <h2>Tier 7 — Todo App hoàn chỉnh</h2>
                <p>Đủ tính năng: thêm, hiển thị, toggle, xóa, sửa, đếm, filter, localStorage.</p>
            </section>

            <div className="panel" style={{ maxWidth: "600px", margin: "0 auto" }}>
                <h1 style={{ textAlign: "center" }}>📋 Todo List</h1>

                <div style={{ display: "flex", marginBottom: "20px" }}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={
                            filter === "completed"
                                ? "Thêm việc mới vẫn vào danh sách tất cả..."
                                : "Nhập công việc..."
                        }
                        style={{
                            flex: 1,
                            borderRadius: "10px 0 0 10px"
                        }}
                    />
                    <button
                        onClick={addTodo}
                        className="primary-btn"
                        style={{ borderRadius: "0 10px 10px 0" }}
                    >
                        Thêm
                    </button>
                </div>

                <TodoFilter filter={filter} setFilter={setFilter} />

                {filteredTodos.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "40px", color: "#999" }}>
                        {todos.length === 0 ? "📝 Chưa có công việc nào" : "Không có công việc phù hợp"}
                    </div>
                ) : (
                    filteredTodos.map(todo => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={toggleTodo}
                            onDelete={deleteTodo}
                            onEdit={editTodo}
                        />
                    ))
                )}

                {todos.length > 0 && (
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "10px",
                        flexWrap: "wrap",
                        marginTop: "15px",
                        padding: "10px",
                        background: "#f9f9f9",
                        borderRadius: "10px"
                    }}>
                        <span>{activeCount} việc chưa hoàn thành</span>
                        <span>{completedCount} việc đã xong</span>
                        <span>Tổng: {todos.length} việc</span>
                        {completedCount > 0 && (
                            <button className="danger-btn" onClick={clearCompleted}>
                                Xóa việc đã xong
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Tier7TodoApp;
