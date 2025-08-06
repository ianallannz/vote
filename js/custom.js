window.addEventListener('scroll', () => {
  if (window.scrollY === 0 && location.hash) {
    history.replaceState(null, '', location.origin + location.pathname + location.search);
  }
});


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



document.addEventListener("DOMContentLoaded", () => {
  const headings = document.querySelectorAll("h2[id], h3[id]");
  const navLinks = document.querySelectorAll(".wait-right ul li a, .pc-right ul li a");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");

          navLinks.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    {
      rootMargin: "0px 0px -70% 0px", // triggers when section top is ~30% from top
      threshold: 0
    }
  );

  headings.forEach(h => observer.observe(h));
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


