import { skills } from "../data/skills";

function Skills() {
    return (
        <section id="skills" className="section soft-bg">
            <div className="container">
                <p className="eyebrow">Skills</p>
                <h2>My Skills</h2>

                <div className="skills-grid">
                    {skills.map(skill => (
                        <div key={skill.name} className="skill-card">
                            <div className="skill-header">
                                <strong>{skill.name}</strong>
                                <span>{skill.level}%</span>
                            </div>
                            <div className="skill-track">
                                <div className="skill-progress" style={{ width: `${skill.level}%` }} />
                            </div>
                            <small>{skill.category}</small>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Skills;
