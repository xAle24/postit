fetch('loadNotification.php').then(response => response.json())
    .then(notifications => {
        notifications.forEach(notification => {
            let p = document.createElement('p')
            p.textContent = notification.description;
            document.getElementById("notificationContent").appendChild(p);
        });
    })
    .catch(error => console.error('Error:', error));