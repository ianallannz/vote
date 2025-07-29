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
  const leftColumn = document.querySelector('.page-left-column');
  const angleDivider = document.querySelector('.page-angle-divider');

  const isOpening = !menu.classList.contains('expanded');
  menu.classList.toggle('expanded');

  if (isOpening) {
    // Menu is opening: apply changes immediately
    leftColumn.classList.add('no-bg');
    angleDivider.classList.add('divider-shifted');
  } else {
    // Menu is closing: delay before restoring styles
    setTimeout(() => {
      leftColumn.classList.remove('no-bg');
      angleDivider.classList.remove('divider-shifted');
    }, 250); // Delay in ms
  }
});

const mediaQuery = window.matchMedia("(min-width: 768px)");

function handleBreakpointChange(e) {
  const angleDivider = document.querySelector(".page-angle-divider");
  if (e.matches) {
    // User has resized to desktop view
    angleDivider.classList.remove("divider-shifted");
  }
}

// Attach listener to watch for viewport changes
mediaQuery.addEventListener("change", handleBreakpointChange);

// Optional: run on initial load
handleBreakpointChange(mediaQuery);
