export function ExperienceBar(){
    return(
        /*se fosse no html seria apenas o class, no react usamos className*/
        <header className="experience-bar">
            <span>8 xp</span>
            <div>
                <div style={{ width: '50%' }} />

                <span className="current-experience" style={{  left: '50%' }} >
                    300 xp
                </span>
            </div>
            <span>600 xp</span>
        </header>
    );
}