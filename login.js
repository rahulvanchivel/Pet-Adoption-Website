document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        sessionStorage.setItem('loggedIn', 'true');
        window.location.href = 'index.html';
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
  