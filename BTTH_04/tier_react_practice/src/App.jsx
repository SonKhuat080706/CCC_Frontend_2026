import { useState } from "react";
import Tier0 from "./tiers/Tier0";
import Tier1 from "./tiers/Tier1";
import Tier2 from "./tiers/Tier2";
import Tier3 from "./tiers/Tier3";
import Tier4 from "./tiers/Tier4";
import Tier5 from "./tiers/Tier5";
import Tier6 from "./tiers/Tier6";
import Tier7TodoApp from "./tiers/Tier7TodoApp";

const pages = [
    { key: "tier0", label: "Tier 0 — Component", component: <Tier0 /> },
    { key: "tier1", label: "Tier 1 — React Flow", component: <Tier1 /> },
    { key: "tier2", label: "Tier 2 — JSX Variables", component: <Tier2 /> },
    { key: "tier3", label: "Tier 3 — Component Split", component: <Tier3 /> },
    { key: "tier4", label: "Tier 4 — useState", component: <Tier4 /> },
    { key: "tier5", label: "Tier 5 — Events", component: <Tier5 /> },
    { key: "tier6", label: "Tier 6 — CRUD", component: <Tier6 /> },
    { key: "tier7", label: "Tier 7 — Todo App", component: <Tier7TodoApp /> }
];

function App() {
    const [activePage, setActivePage] = useState("tier7");
    const current = pages.find(page => page.key === activePage);

    return (
        <div className="app-shell">
            <aside className="sidebar">
                <h1>BTTH_04 React Tiers</h1>
                {pages.map(page => (
                    <button
                        key={page.key}
                        className={activePage === page.key ? "active" : ""}
                        onClick={() => setActivePage(page.key)}
                    >
                        {page.label}
                    </button>
                ))}
            </aside>

            <main className="content">
                {current.component}
            </main>
        </div>
    );
}

export default App;
