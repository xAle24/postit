fetch('achievements.php').then(response => response.json())
    .then(achievements => {
        console.log(achievements);
        achievements.forEach(achievement => {
            let template = document.createElement('template')
            template.innerHTML = achievementTemplate.trim()
            let img = template.content.querySelector('.achievementImg')
            img.alt = ''
            let h2 = template.content.querySelector('.achievementH2')
            h2.textContent = achievement.name;
            let p = template.content.querySelector('.achievementP')
            p.textContent = achievement.description;
            let container = document.querySelector('main')
            if (achievement.state === "1") {
                img.src = '../resources/achievements/achievement-unlocked.svg';
                container.insertBefore(template.content, document.querySelector(".lockedbanner"));
            } else {
                container.appendChild(template.content);
                img.src = '../resources/achievements/achievement-locked.svg';
            }
        });
    })
    .catch(error => console.error('Error:', error));