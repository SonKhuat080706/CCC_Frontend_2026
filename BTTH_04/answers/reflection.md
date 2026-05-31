# Reflection — Exercise 0.0

## 1. Ở Phần A, mỗi lần thêm/xóa/toggle 1 todo, phải gọi bao nhiêu hàm?

Trong bản Vanilla JS:

- Thêm todo:
  1. `addTodo()`
  2. `renderTodos()`

- Toggle todo:
  1. `toggleTodo(id)`
  2. `renderTodos()`

- Xóa todo:
  1. `deleteTodo(id)`
  2. `renderTodos()`

Mỗi thao tác đều phải tự cập nhật mảng dữ liệu rồi tự gọi `renderTodos()` để vẽ lại DOM.

## 2. Ở Phần B, khi `setTodos(...)` chạy, React tự động làm gì?

React tự động:

1. Cập nhật state mới.
2. Gọi lại component `TodoApp`.
3. Tạo JSX mới dựa trên state mới.
4. So sánh UI cũ và UI mới.
5. Chỉ cập nhật phần DOM cần thay đổi.

Vì vậy không cần tự gọi hàm render DOM thủ công như Vanilla JS.

## 3. Nếu Portfolio có 50 project, cách nào quản lý danh sách an toàn hơn? Tại sao?

Cách React dùng `useState`, `.map()`, `.filter()` an toàn hơn vì:

- Data nằm trong state rõ ràng.
- UI được render từ data, tránh sửa DOM thủ công nhiều nơi.
- Khi thêm/xóa/lọc project, chỉ cần cập nhật state.
- Ít lỗi hơn khi danh sách dài hoặc logic phức tạp.
- Component như `ProjectCard` có thể tái sử dụng cho mọi project.

## 4. Kết nối Portfolio

Với Portfolio:

- `ProjectCard` tương tự `TodoItem`: mỗi project là một item trong danh sách.
- `.map()` dùng để render danh sách project.
- `.filter()` dùng để lọc project theo category như `web`, `mobile`, `design`.
- `useState` dùng để lưu danh sách project và filter hiện tại.

Ví dụ:

```jsx
const [filter, setFilter] = useState("all");

const filteredProjects = filter === "all"
    ? projects
    : projects.filter(project => project.category === filter);

return filteredProjects.map(project => (
    <ProjectCard key={project.id} {...project} />
));
```
