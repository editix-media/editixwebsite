window.onload = function () {
  const countElements = document.querySelectorAll(".count");

  function checkInView(event) {
    event.stopPropagation();
    countElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        startCounting(element);
        window.removeEventListener("scroll", checkInView);
      }
    });
  }

  function startCounting(element) {
    const count = +element.dataset.count;
    let currentCount = 0;
    const interval = setInterval(() => {
      currentCount++;
      element.innerHTML = currentCount;
      if (currentCount >= count) {
        clearInterval(interval);
      }
    }, 10);
  }

  window.addEventListener("scroll", checkInView);
};

// Make mobile navigation work

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

///////////////////////////////////////////////////////////
// Smooth scrolling animation

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    // Scroll back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // Close mobile naviagtion
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
  });
});

///////////////////////////////////////////////////////////
// Sticky navigation

const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);

    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

const currentYear = new Date().getFullYear();
document.getElementById("year").innerHTML = currentYear;

$(document).ready(function () {
  $(".services-tab-nav a").click(function (e) {
    e.preventDefault();
    var tabId = $(this).attr("href");
    $(".services-tab-content .tab").hide();
    $(tabId).show();
    $(".services-tab-nav a").removeClass("active");
    $(this).addClass("active");
  });
});
