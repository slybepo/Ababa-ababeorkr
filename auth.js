const API_URL = "https://ppo"; 
  let auth0 = null;

  async function initAuth0() {
    auth0 = await createAuth0Client({
      domain: "dev-5ousdzi3slqmqsnw.eu.auth0.com",
      client_id: "vTGZIMoyIktLRjrwapREVNft42wuIY2Y",
      scope: "openid profile email",
      redirect_uri: window.location.origin,
    });

    if (window.location.search.includes("code=") && window.location.search.includes("state=")) {
      await auth0.handleRedirectCallback();
      window.history.replaceState({}, document.title, "/");
    }

    const isAuthenticated = await auth0.isAuthenticated();
    if (isAuthenticated) {
      const user = await auth0.getUser();
      document.getElementById("user-name").textContent = user.name || "guest";
      document.getElementById("user-name2").textContent = user.name || "guest";
      document.getElementById("user3").textContent = user.name || "guest";
      document.getElementById("user-avatar").src = user.picture || "default-avatar.png";
    } else {
      auth0.loginWithRedirect();
    }
  }

  async function fetchReactions(videoId) {
    try {
      const response = await axios.get(`${API_URL}/reactions/${videoId}`);
      const { likes, dislikes } = response.data;
      document.getElementById(`like-count-${videoId}`).textContent = likes;
      document.getElementById(`dislike-count-${videoId}`).textContent = dislikes;
    } catch (error) {
      console.error("Error fetching reactions:", error);
    }
  }

  async function handleReaction(type, videoId) {
    try {
      const token = await auth0.getTokenSilently();
      const response = await axios.post(`${API_URL}/reactions/${videoId}`, {
        type: type,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        fetchReactions(videoId);
      } else {
        alert(response.data.message || "Unable to update reaction");
      }
    } catch (error) {
      console.error("Error handling reaction:", error);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    initAuth0();
    fetchReactions("video1");
  });
</script>
  <script>
!function(w, d, s, ...args){
  var div = d.createElement('div');
  div.id = 'aichatbot';
  d.body.appendChild(div);
  w.chatbotConfig = args;
  var f = d.getElementsByTagName(s)[0],
  j = d.createElement(s);
  j.defer = true;
  j.type = 'module';
  j.src = 'https://aichatbot.sendbird.com/index.js';
  f.parentNode.insertBefore(j, f);
}(window, document, 'script', 'B639F52A-FC34-42A7-9FF5-E0AD0A87990C', 'C3qPFZlnmURUxObKk2riC', {
  apiHost: 'https://api-cf-eu-1.sendbird.com',
});
