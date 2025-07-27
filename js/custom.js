document.getElementById("nativeShare").addEventListener("click", async (e) => {
  e.preventDefault();

  if (navigator.share) {
    try {
      await navigator.share({
        title: document.title,
        text: "Hey, check out Ian Allan running for Gisborne District Council.",
        url: window.location.href
      });
      console.log("Thanks for sharing me, I really appreciate it!");
    } catch (err) {
      console.error("Damn, sharing error, just copy and paste the link instead:", err);
    }
  } else {
    alert("Sharing not supported on this browser.");
  }
});


document.getElementById('hamburger-toggle').addEventListener('click', () => {
  const menu = document.getElementById('hamburger-menu');
  menu.classList.toggle('expanded');
});
