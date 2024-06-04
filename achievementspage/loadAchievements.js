fetch('achievements.php').then(response => response.json())
    .then(achievements => {
        console.log(achievements);
        achievements.forEach(achievement => {
            let template = document.createElement('template')
            template.innerHTML = achievementTemplate.trim()
            let img = template.content.querySelector('.achievementImg')
            img.src = '../resources/straight-post-it.png';
            let h2 = template.content.querySelector('.achievementH2')
            h2.textContent = achievement.name;
            let p = template.content.querySelector('.achievementP')
            p.textContent = achievement.description;
            if (achievement.state === "1") {
                document.body.insertBefore(template.content, document.querySelector(".lockedbanner"));
            } else {
                document.body.appendChild(template.content);
            }
        });
    })
    .catch(error => console.error('Error:', error));