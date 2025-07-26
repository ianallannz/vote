document.getElementById("nativeShare").addEventListener("click", async (e) => {
  e.preventDefault();

  if (navigator.share) {
    try {
      await navigator.share({
        title: document.title,
        text: "Check out this page!",
        url: window.location.href
      });
      console.log("Thanks for sharing!");
    } catch (err) {
      console.error("Error sharing:", err);
    }
  } else {
    alert("Sharing not supported on this browser.");
  }
});