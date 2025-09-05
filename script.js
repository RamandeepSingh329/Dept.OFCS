document.addEventListener('DOMContentLoaded', () => {

    const facultyData = [
        { name: "Dr. Kulwant Singh", title: "Head of Department", bio: "Dr. Kulwant Singh serves as the Head of Department, bringing 15+ years of distinguished teaching experience across leading academic institutions. With a strategic vision for academic excellence, he mentors both students and faculty, fostering innovation and practical problem-solving across emerging technologies. His leadership continues to shape a dynamic learning environment that equips graduates to tackle real-world challenges with confidence and expertise.", image: "assets/faculity/dr.kulwant-singh.jpeg" },
        { name: "ER.Vikram Mangwana", title: "Assistant Professor", bio: "Vikram Mangwana is an Assistant Professor with over seven years of distinguished teaching experience across reputed universities. He empowers students with the analytical and technical acumen required to navigate complex digital environments, fostering a deep understanding of secure systems and investigative methodologies essential for modern technological resilience.", image: "assets/faculity/vikram-mangawana.jpeg" },
        { name: "ER.Sumit Garg", title: "Assistant Professor", bio: "Sumit Garg is an Assistant Professor who brings over seven years of teaching expertise cultivated within leading professional universities, fostering academic excellence and industry-aligned learning. He is committed to equipping future engineers with the analytical tools and practical knowledge needed to design resilient infrastructure and solve complex engineering challenges. His academic approach blends theoretical rigor with real-world application, fostering a generation of professionals capable of advancing sustainable development and precision-driven construction practices.", image: "assets/faculity/sumit-garg.jpeg" },
        { name: "ER.Amandeep Kaur", title: "Assistant Professor", bio: "Amandeep Kaur is an Assistant Professor with over 6+ years of teaching experience across well-regarded higher education institutions. She is committed to empowering students through a blend of theoretical instruction and practical application, guiding them to develop strong problem-solving skills and professional readiness for dynamic roles in the tech industry.", image: "assets/faculity/Er.Amandeep-Kaur.jpeg" },
        { name: "Manmeet Kaur", title: "Assistant Professor", bio: "Manmeet Kaur is an Assistant Professor with over 9+ years of teaching experience across respected university environments. She is dedicated to cultivating analytical thinking and problem-solving abilities in students, guiding them to innovate and excel in today’s rapidly evolving technological landscape. Her commitment to academic excellence and student development continues to shape future-ready professionals.", image: "assets/faculity/Manmeet-kaur.jpeg" },
        { name: "Sarvjeet Kaur", title: "Assistant Professor", bio: "Sarvjeet Kaur is an Assistant Professor with over 6+ years of professional teaching experience in reputed universities. She is deeply committed to mentoring students through both foundational and advanced concepts in computing, encouraging innovation and critical thinking in the field of technology. Her academic approach blends clarity, curiosity, and creativity, empowering learners to excel in dynamic and evolving digital environments.", image: "assets/sarvjeet.jpg" },
        { name: "Rajwinder Singh", title: "Assistant Engineer", bio: "Rajwinder Singh is a dedicated Assistant Engineer who specializes in designing and maintaining secure, high-performance digital systems. Known for his precision and problem-solving acumen, he contributes to building resilient infrastructures that support institutional growth and technological advancement. His commitment to engineering excellence and continuous innovation makes him a valuable asset in today’s rapidly evolving digital landscape.", image: "assets/faculity/rajwinder-singh.jpeg" },
        { name: "Suraj Singh", title: "Lab Assistant", bio: "Suraj Singh is a committed Lab Assistant known for his hands-on support in technical training environments. With a strong foundation in digital systems and communication protocols, he ensures smooth lab operations and fosters practical learning experiences. Suraj plays a key role in preparing students for real-world challenges by maintaining high standards of accuracy, efficiency, and professional conduct.", image: "assets/faculity/suraj-singh.png" }
    ];

    let currentFacultyIndex = 0;
    let facultyInterval;
    const facultySidebar = document.getElementById('faculty-sidebar');
    const facultyContent = document.getElementById('faculty-content');
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    // --- Render Faculty Sidebar ---
    function renderFacultySidebar() {
        if (!facultySidebar) return;
        facultyData.forEach((faculty, index) => {
            const sidebarItem = document.createElement('div');
            sidebarItem.classList.add('faculty-sidebar-item');
            sidebarItem.innerText = faculty.name;
            sidebarItem.addEventListener('click', () => {
                updateFacultyContent(index);
                resetFacultyAutoScroll();
            });
            facultySidebar.appendChild(sidebarItem);
        });
    }

    // --- Update Faculty Content ---
    function updateFacultyContent(index) {
        if (!facultyContent) return;
        currentFacultyIndex = index;
        const faculty = facultyData[index];

        let contentHTML = `
            <div class="faculty-image-container">
                <img src="${faculty.image}" alt="${faculty.name}" class="faculty-image">
            </div>
            <h3>${faculty.name}</h3>
            <p class="title">${faculty.title}</p>
        `;

        if (isMobile) {
            contentHTML += `
                <div class="bio-container">
                    <p class="bio-summary">${faculty.bio}</p>
                    <button class="view-more-btn">View More</button>
                </div>
            `;
        } else {
            contentHTML += `<p>${faculty.bio}</p>`;
        }

        facultyContent.innerHTML = contentHTML;

        // Manage active state for sidebar items
        document.querySelectorAll('.faculty-sidebar-item').forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });

        // Fade-in animation
        facultyContent.classList.remove('active');
        setTimeout(() => {
            facultyContent.classList.add('active');
        }, 10);

        // Click-to-view image
        const facultyImg = facultyContent.querySelector('.faculty-image');
        if (facultyImg) {
            facultyImg.addEventListener('click', () => {
                openImageViewer(faculty.image);
            });
        }

        // Mobile 'View More' functionality
        if (isMobile) {
            const viewMoreBtn = facultyContent.querySelector('.view-more-btn');
            const bioSummary = facultyContent.querySelector('.bio-summary');

            bioSummary.style.display = 'none';

            viewMoreBtn.addEventListener('click', () => {
                if (bioSummary.style.display === 'none') {
                    bioSummary.style.display = 'block';
                    viewMoreBtn.textContent = 'View Less';
                } else {
                    bioSummary.style.display = 'none';
                    viewMoreBtn.textContent = 'View More';
                }
            });
        }
    }

    // --- Auto-scroll faculty ---
    function startFacultyAutoScroll() {
        clearInterval(facultyInterval);
        if (!isMobile) {
            facultyInterval = setInterval(() => {
                currentFacultyIndex = (currentFacultyIndex + 1) % facultyData.length;
                updateFacultyContent(currentFacultyIndex);
            }, 8000);
        }
    }

    function resetFacultyAutoScroll() {
        startFacultyAutoScroll();
    }

    // --- Image Viewer (Optimized) ---
    const viewer = document.createElement('div');
    viewer.classList.add('image-viewer');
    viewer.innerHTML = `
        <div class="viewer-overlay"></div>
        <div class="viewer-content">
            <span class="close-btn">&times;</span>
            <img src="" alt="Faculty Image" class="viewer-image">
        </div>
    `;
    document.body.appendChild(viewer);

    const viewerImg = viewer.querySelector('.viewer-image');
    const closeBtn = viewer.querySelector('.close-btn');
    const viewerOverlay = viewer.querySelector('.viewer-overlay');

    function openImageViewer(src) {
        viewerImg.src = src;
        viewer.classList.add('active');
        setTimeout(() => viewerImg.style.opacity = '1', 50);
        document.body.style.overflow = 'hidden';
    }

    function closeImageViewer() {
        viewer.classList.remove('active');
        viewerImg.style.opacity = '0';
        document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeImageViewer);
    viewerOverlay.addEventListener('click', closeImageViewer);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && viewer.classList.contains('active')) {
            closeImageViewer();
        }
    });

    // --- Initialize ---
    if (facultySidebar && facultyContent) {
        renderFacultySidebar();
        updateFacultyContent(currentFacultyIndex);
        startFacultyAutoScroll();
    }
});
   // --- DEGREE SLIDES MANUAL NAVIGATION LOGIC ---
    const degreeSlidesContainer = document.querySelector('.degree-slides-container');
    const prevButton = document.getElementById('prev-degree');
    const nextButton = document.getElementById('next-degree');

    if (degreeSlidesContainer && prevButton && nextButton) {
        const degreeCards = document.querySelectorAll('.degree-card');
        let currentCardIndex = 0;
        const updateActiveCard = (index) => {
            degreeCards.forEach(card => card.classList.remove('active'));
            if (degreeCards[index]) {
                degreeCards[index].classList.add('active');
            }
        };
        const updateButtons = () => {
            prevButton.disabled = currentCardIndex === 0;
            nextButton.disabled = currentCardIndex === degreeCards.length - 1;
        };
        const scrollToCard = (index) => {
            const scrollDistance = degreeCards[index].offsetLeft - degreeSlidesContainer.offsetLeft;
            degreeSlidesContainer.scrollTo({
                left: scrollDistance,
                behavior: 'smooth'
            });
            updateActiveCard(index);
            updateButtons();
        };
        prevButton.addEventListener('click', () => {
            if (currentCardIndex > 0) {
                currentCardIndex--;
                scrollToCard(currentCardIndex);
            }
        });
        nextButton.addEventListener('click', () => {
            if (currentCardIndex < degreeCards.length - 1) {
                currentCardIndex++;
                scrollToCard(currentCardIndex);
            }
        });
        scrollToCard(currentCardIndex);
    }


document.addEventListener('DOMContentLoaded', () => {
  // ----------------- FACILITIES DATA -----------------
  const facilitiesData = [
    {
      name: "Highlights connection between developers and mentors",
      title: "TechTalk",
      images: ["assets/project-development/mentorship.jpeg"]
      // (No description provided — handled gracefully below)
    },
    {
      name: "Empowering Minds Through Education",
      title: "Core Learning",
      images: [
        "assets/smart-classes/classroom.jpeg",
        "assets/smart-classes/smart-classes3.jpeg",
        "assets/smart-classes/classroom-1.jpeg",
        "assets/smart-classes/class-room.jpeg"
      ],
      description:
        "From foundational subjects to advanced specializations, our curriculum is delivered through dynamic sessions led by passionate educators."
    },
    {
      name: "Advanced Computer Lab I",
      title: "Hands-on Computing Lab",
      images: [
        "assets/smart-classes/class-room.jpeg",
        "assets/img3.jpeg",
        "assets/varish.jpeg",
        "assets/ajay.jpg"
      ],
      description:
        "Our state-of-art computer labs are equipped with high-performance workstations and specialized software for a variety of courses."
    },
    {
      name: "Advanced Computer Lab II",
      title: "Programming Lab",
      images: ["assets/lab2-image1.jpg", "assets/lab2-image2.jpg"],
      description:
        "Equipped with ultra-fast workstations, industry-grade software, and dedicated environments for AI, machine learning, and data science."
    },
    {
      name:
        "Mentors transform the learning journey by enriching students’ experiences through digital classrooms, where knowledge meets innovation.",
      title: "Smart Class",
      images: [
        "assets/smart-classes/smart-classes3.jpeg",
        "assets/smart-classes/smart-classes2.jpeg"
      ],
      description:
        "Interactive, tech-enabled classrooms designed to elevate students engagement and understanding."
    },
    {
      name: "Virtual Lab Collaboration with IIT Delhi",
      title: "Virtual Lab",
      images: ["assets/virtuallab.jpg"],
      description:
        "The Robotics and Intelligent Systems Lab, developed in collaboration with Virtual Labs, IIT Delhi, provides experiential learning and applied technological research."
    }
  ];

  let currentFacilityIndex = 0;
  let facilitiesInterval;
  let viewerImageInterval;

  const facilitiesSidebar = document.getElementById('facilities-sidebar');
  const facilitiesContent = document.getElementById('facilities-content');

  // ----------------- RENDER SIDEBAR -----------------
  const renderFacilitiesSidebar = () => {
    if (!facilitiesSidebar) return;
    facilitiesSidebar.innerHTML = '';
    facilitiesData.forEach((facility, index) => {
      const sidebarItem = document.createElement('div');
      sidebarItem.classList.add('facilities-sidebar-item');
      // Use 'title' if available, else fallback to 'name'
      sidebarItem.innerText = facility.title || facility.name;

      sidebarItem.addEventListener('click', () => {
        updateFacilitiesContent(index);
        resetFacilitiesAutoScroll();
      });
      facilitiesSidebar.appendChild(sidebarItem);
    });
  };

  // ----------------- UPDATE MAIN CONTENT -----------------
  const updateFacilitiesContent = (index) => {
    if (!facilitiesContent) return;
    currentFacilityIndex = index;
    const facility = facilitiesData[index];

    // Optional fade-out class if you have CSS for it
    facilitiesContent.classList.remove('active');

    setTimeout(() => {
      // Build content safely (avoid rendering 'undefined' description)
      let html = `
        <h3>${facility.name}</h3>
        ${facility.description ? `<p>${facility.description}</p>` : ''}
      `;

      facilitiesContent.innerHTML = html;

      // Only render "View Images" button if there are images
      if (facility.images && facility.images.length > 0) {
        const viewBtn = document.createElement('button');
        viewBtn.classList.add('view-image-btn');
        viewBtn.textContent = 'View Images';
        viewBtn.addEventListener('click', () => {
          stopFacilitiesAutoScroll();
          openImageViewer(facility.images);
        });
        facilitiesContent.appendChild(viewBtn);
      }

      // Highlight active sidebar
      document.querySelectorAll('.facilities-sidebar-item').forEach((item, i) => {
        item.classList.toggle('active', i === index);
      });

      // Optional fade-in class if you have CSS for it
      facilitiesContent.classList.add('active');
    }, 200);
  };

  // ----------------- AUTO SCROLL (3s) -----------------
  const startFacilitiesAutoScroll = () => {
    clearInterval(facilitiesInterval);
    facilitiesInterval = setInterval(() => {
      const nextIndex = (currentFacilityIndex + 1) % facilitiesData.length;
      updateFacilitiesContent(nextIndex);
    }, 3000); // every 3s ✅
  };

  const stopFacilitiesAutoScroll = () => {
    clearInterval(facilitiesInterval);
  };

  const resetFacilitiesAutoScroll = () => {
    stopFacilitiesAutoScroll();
    startFacilitiesAutoScroll();
  };

  // ----------------- IMAGE VIEWER (FIXED) -----------------
  const viewer = document.createElement('div');
  viewer.classList.add('image-viewer');
  viewer.innerHTML = `<span class="close-btn" aria-label="Close">&times;</span><img src="" alt="Facility Image">`;
  document.body.appendChild(viewer);

  const viewerImg = viewer.querySelector('img');
  const closeBtn = viewer.querySelector('.close-btn');

  const openImageViewer = (images) => {
    if (!images || images.length === 0) return;

    let currentImageIndex = 0;

    const updateViewerImage = () => {
      // Preload the next image to prevent flicker
      const imgToLoad = new Image();
      imgToLoad.src = images[currentImageIndex];
      imgToLoad.onload = () => {
        viewerImg.src = imgToLoad.src;
      };
    };

    // Set the initial image source and then make the viewer visible
    viewerImg.src = images[0];
    viewer.classList.add('active');

    // Ensure previous interval is cleared
    clearInterval(viewerImageInterval);

    // Auto-advance images every 3s if there's more than one
    if (images.length > 1) {
      viewerImageInterval = setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateViewerImage();
      }, 3000); // every 3s
    }
  };

  const closeImageViewer = () => {
    clearInterval(viewerImageInterval);
    viewer.classList.remove('active');
    startFacilitiesAutoScroll();
  };

  closeBtn.addEventListener('click', closeImageViewer);
  viewer.addEventListener('click', (e) => {
    if (e.target === viewer) closeImageViewer();
  });

  // Optional: close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && viewer.classList.contains('active')) {
      closeImageViewer();
    }
  });

  // ----------------- INITIALIZE -----------------
  if (facilitiesSidebar && facilitiesContent) {
    renderFacilitiesSidebar();
    updateFacilitiesContent(currentFacilityIndex);
    startFacilitiesAutoScroll();
  }
});
document.addEventListener('DOMContentLoaded', () => {

    // ----------------- CAROUSEL DATA & SETUP -----------------
    const studentItems = document.querySelectorAll('#student-data-container .student-card-item');
    let currentIndex = 0;
    let interval;
    const transitionDuration = 300; // milliseconds, should match CSS transition time

    // ----------------- CUSTOM IMAGE VIEWER -----------------
    // Create the image viewer element and append it to the body
    const viewer = document.createElement('div');
    viewer.classList.add('image-viewer');
    viewer.innerHTML = `<span class="close-btn">&times;</span><img src="" alt="Student Image">`;
    document.body.appendChild(viewer);

    const viewerImg = viewer.querySelector('img');
    viewer.querySelector('.close-btn').addEventListener('click', closeImageViewer);
    viewer.addEventListener('click', e => { 
        if (e.target === viewer) closeImageViewer(); 
    });

    function openImageViewer(src) {
        viewerImg.src = src;
        viewer.classList.add('active');
        viewerImg.style.opacity = '0';
        setTimeout(() => (viewerImg.style.opacity = '1'), 50);
    }

    function closeImageViewer() {
        viewerImg.style.opacity = '0';
        viewer.classList.remove('active');
    }

    // ----------------- STUDENT CAROUSEL LOGIC -----------------
    const studentCardWrapper = document.querySelector('.student-card-wrapper');

    function renderStudent(index) {
        if (!studentCardWrapper) return;
        const currentCard = studentCardWrapper.querySelector('.student-card');
        const nextCardContent = studentItems[index].innerHTML;

        // If there's an existing card, fade it out first
        if (currentCard) {
            currentCard.classList.remove('active');
            setTimeout(() => {
                updateCardContent(nextCardContent);
            }, transitionDuration);
        } else {
            // This is for the very first render
            updateCardContent(nextCardContent);
        }
    }

    function updateCardContent(content) {
        studentCardWrapper.innerHTML = `<div class="student-card">${content}</div>`;
        const newCard = studentCardWrapper.querySelector('.student-card');

        // Re-attach the click event listener for the image viewer
        const studentImage = newCard.querySelector('.student-image');
        if (studentImage) {
            studentImage.addEventListener('click', () => openImageViewer(studentImage.src));
        }

        // Trigger the fade-in
        setTimeout(() => {
            newCard.classList.add('active');
        }, 50);
    }

    function updateStudent(index) {
        currentIndex = index;
        renderStudent(currentIndex);
    }

    function startAutoChange() {
        clearInterval(interval);
        interval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % studentItems.length;
            updateStudent(nextIndex);
        }, 5000);
    }

    function stopAutoChange() {
        clearInterval(interval);
    }

    if (studentCardWrapper && studentItems.length > 0) {
        renderStudent(currentIndex);
        startAutoChange();

        studentCardWrapper.addEventListener('mouseenter', stopAutoChange);
        studentCardWrapper.addEventListener('mouseleave', startAutoChange);
    }

    // ----------------- REVEAL ON SCROLL -----------------
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));
});
    // --- Sticky Header with Scroll Behavior ---
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const mainNav = document.querySelector('.main-nav');
    if (hamburger && mainNav) {
        hamburger.addEventListener('click', () => {
            mainNav.classList.toggle('nav-active');
            hamburger.classList.toggle('active');
        });
    }


    // --- Smooth Scrolling for Navigation ---
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                if (mainNav) mainNav.classList.remove('nav-active');
                if (hamburger) hamburger.classList.remove('active');
            }
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Course Carousel Logic ---
    const track = document.querySelector('.carousel-track');
    if (track) {
        const cards = Array.from(track.children);
        const cardWidth = cards[0].offsetWidth + 32;
        let currentIndex = 0;
        function slideNext() {
            currentIndex++;
            if (currentIndex > cards.length - 3) {
                currentIndex = 0;
            }
            track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        }
        setInterval(slideNext, 3000);
    }


// --- Optimized Courses Sidebar Toggle ---
const courseTabs = document.querySelectorAll(".courses-sidebar li");
const courseDetails = document.querySelectorAll(".course-detail");

const clearActive = () => {
    courseTabs.forEach(t => t.classList.remove("active"));
    courseDetails.forEach(c => c.classList.remove("active"));
};

courseTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
        clearActive();
        tab.classList.add("active");
        // Activate corresponding course detail by index
        const target = courseDetails[index];
        if (!target) return;
        target.classList.add("active");
    });
});

// --- General Page Load State ---
document.body.classList.add('loaded');

// --- News & Events Slider Logic ---
document.addEventListener("DOMContentLoaded", () => {
    // Select the carousel elements
    const newsTrack = document.getElementById("newsTrack");
    const dotsContainer = document.querySelector(".news-dots");
    const newsCards = newsTrack ? newsTrack.children : [];
    const totalSlides = newsCards.length;
    let index = 0;
    let autoSlideInterval;

    // Create the navigation dots based on the number of slides
    if (dotsContainer && totalSlides > 0) {
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement("span");
            dot.className = "dot";
            if (i === 0) dot.classList.add("active");
            dotsContainer.appendChild(dot);
        }
    }

    const dots = dotsContainer ? dotsContainer.querySelectorAll(".dot") : [];

    // Function to update the slide position and active dot
    function updateSlide(newIndex) {
        index = (newIndex + totalSlides) % totalSlides;
        if (newsTrack) {
            newsTrack.style.transition = "transform 0.8s ease-in-out";
            newsTrack.style.transform = `translateX(-${index * 100}%)`;
        }

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });
    }

    // Function to start the automatic slide change
    function startAutoSlide() {
        stopAutoSlide(); // Clear any existing interval
        autoSlideInterval = setInterval(() => {
            updateSlide(index + 1);
        }, 4000); // Change slide every 4 seconds
    }

    // Function to stop the automatic slide change
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Event listeners for dot navigation
    if (dots.length > 0) {
        dots.forEach((dot, i) => {
            dot.addEventListener("click", () => {
                stopAutoSlide();
                updateSlide(i);
                startAutoSlide();
            });
        });
    }

    // Pause auto-slide on hover
    const slider = document.querySelector(".news-slider");
    if (slider) {
        slider.addEventListener("mouseenter", stopAutoSlide);
        slider.addEventListener("mouseleave", startAutoSlide);
    }

    // Initial call to start the auto-slide
    if (newsTrack && totalSlides > 1) {
        startAutoSlide();
    }
});

// --- News Ticker Logic ---
const newsTicker = document.querySelector('.news-ticker');
const newsContainer = document.querySelector('.news-container');

function handleTickerAnimation(event) {
    if (event.type === 'mouseenter' || event.type === 'focusin') {
        newsContainer.style.animationPlayState = 'paused';
    } else if (event.type === 'mouseleave' || event.type === 'focusout') {
        newsContainer.style.animationPlayState = 'running';
    }
}

if (newsTicker && newsContainer) {
    newsTicker.addEventListener('mouseenter', handleTickerAnimation);
    newsTicker.addEventListener('mouseleave', handleTickerAnimation);
    newsTicker.addEventListener('focusin', handleTickerAnimation);
    newsTicker.addEventListener('focusout', handleTickerAnimation);
}
document.addEventListener('DOMContentLoaded', () => {
    const eligibilityForm = document.getElementById('eligibility-form');
    if (!eligibilityForm) {
        console.error('Eligibility form not found. Make sure the ID is correct.');
        return;
    }

    // Create notification container if not exists
    let notificationContainer = document.querySelector('.notification-container');
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.className = 'notification-container';
        document.body.appendChild(notificationContainer);
    }

    // Eligibility rules
    const eligibilityRules = {
        'bca': { required: ['12-science', '12-commerce', '12-arts'], name: 'Bachelor of Computer Applications (BCA)', advice: 'a 10+2 qualification with at least 50% marks.' },
        'bca-mca-integrated': { required: ['12-science', '12-commerce', '12-arts'], name: 'BCA + MCA Integrated', advice: 'a 10+2 qualification with at least 50% marks.' },
        'mca': { required: ['btech', 'graduation-cs', 'graduation-science-math', 'graduation-commerce-math', 'graduation-arts-math', 'pgdca', 'graduation-any-stream'], name: 'Master of Computer Applications (MCA)', advice: 'a Bachelor\'s degree with at least 50% marks, typically with a strong foundation in Mathematics.' },
        'pgdca': { required: ['graduation-any-stream'], name: 'Post Graduate Diploma in Computer Applications (PGDCA)', advice: 'a Bachelor\'s degree in any stream with typically 45-50% marks.' },
        'bsc-cs': { required: ['12-science'], name: 'B.Sc in Computer Science', advice: 'a 10+2 qualification, preferably in Science.' },
        'bsc-it': { required: ['12-science'], name: 'B.Sc in Information Technology', advice: 'a 10+2 qualification, preferably in Science.' },
        'btech': { required: ['12-science'], name: 'B.Tech in Computer Science Engineering', advice: '10+2 with PCM and minimum 50% marks.' },
        'msc-cs': { required: ['graduation'], name: 'M.Sc in Computer Science', advice: 'Bachelor\'s degree with 45-50% marks.' },
        'msc-it': { required: ['graduation'], name: 'M.Sc in Information Technology', advice: 'Bachelor\'s degree with 45-50% marks.' },
        'diploma-cs-eng': { required: ['10', '12-science'], name: 'Diploma in Computer Science Engineering', advice: '10th-grade with Science & Math, min 40% marks.' },
        'diploma-elec-eng': { required: ['10', '12-science'], name: 'Diploma in Electrical Engineering', advice: '10th-grade with Science & Math, min 40% marks.' },
        'diploma-ece-eng': { required: ['10', '12-science'], name: 'Diploma in Electronics & Communication Engineering', advice: '10th-grade with Science & Math, min 40% marks.' },
        'diploma-mech-eng': { required: ['10'], name: 'Diploma in Mechanical Engineering', advice: '10th-grade with Math & Science, min 40% marks.' },
        'diploma-civil-eng': { required: ['10', '12-science'], name: 'Diploma in Civil Engineering', advice: '10th-grade with Science & Math, min 40% marks.' }
    };

    // Notification icons
    const getIcon = (type) => {
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: '💡'
        };
        return icons[type] || '💡';
    };

    // Eligibility check
    const checkEligibility = (course, qualification) => {
        const rule = eligibilityRules[course];
        if (!rule) return { valid: false, msg: "Please select both course and qualification.", type: 'warning' };

        // Default eligibility check
        let isEligible = rule.required.includes(qualification);

        // Special case: MCA - any graduation is eligible
        if (course === 'mca' && qualification.includes('graduation')) {
            isEligible = true;
        }

        // Special case: PGDCA - any graduation is eligible
        if (course === 'pgdca' && qualification.includes('graduation')) {
            isEligible = true;
        }

        const msg = isEligible
            ? `🎉 Congratulations! As per the university norms and in line with the National Education Policy (NEP) 2020, you are eligible for the <strong>${rule.name}</strong> program. <a href="https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChsSEwidhd2z1ZiPAxXED4MDHYuEGMkYACICCAEQABoCc2Y&co=1&ase=2&gclid=EAIaIQobChMInYXds9WYjwMVxA-DAx2LhBjJEAAYASAAEgKTJPD_BwE&ohost=www.google.com&cid=CAASJeRoBToMSfssZSGfmpm8mTnaEu1XKixsD7rgE8kD8JZF-R9Z0Gw&category=acrcp_v1_40&sig=AOD64_2KM6RJldY691U3yODcwEx4CheZLw&q&nis=4&adurl&ved=2ahUKEwjs-taz1ZiPAxWmzTgGHUKoHOUQ0Qx6BAgcEAE" target="_blank" style="color: #0d6efd; text-decoration: underline;">Start your journey here</a>.`
            : `⚠️ It seems your current qualification may not meet the eligibility requirements for the <strong>${rule.name}</strong> program. Don't worry, there are many other pathways to a successful career! We recommend exploring other related programs or considering a preparatory course to meet the criteria.`;

        const type = isEligible ? 'success' : 'error';
        return { valid: true, msg, type };
    };

    // Show notification
    const showNotification = (msg, type = 'info', duration = 8000) => {
        const notif = document.createElement('div');
        notif.className = `notification ${type}`;
        notif.innerHTML = `
            <div class="content-wrapper">
                <span class="icon">${getIcon(type)}</span>
                <span class="notif-message">${msg}</span>
            </div>
            <button class="close-btn">&times;</button>
            <div class="progress"></div>
        `;

        notificationContainer.appendChild(notif);

        // Close button
        notif.querySelector('.close-btn').addEventListener('click', () => {
            notif.classList.add('hide');
            setTimeout(() => notif.remove(), 500);
        });

        // Progress bar animation duration
        const progress = notif.querySelector('.progress');
        progress.style.animationDuration = `${duration / 1000}s`;

        // Auto remove
        setTimeout(() => {
            notif.classList.add('hide');
            setTimeout(() => notif.remove(), 500);
        }, duration);
    };

    // Form submit
    eligibilityForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const course = e.target.querySelector('#course').value;
        const qualification = e.target.querySelector('#qualification').value;

        const { valid, msg, type } = checkEligibility(course, qualification);

        if (!valid) return showNotification(msg, 'warning');

        showNotification(msg, type);
        eligibilityForm.reset();
    });
});
document.addEventListener("DOMContentLoaded", () => {
    // The image-setting JavaScript has been removed.
    // The background image is now handled by the CSS.
});// News Data with multiple images per item
const newsData = [
  
  {
    images: ["assets/Students/skdu-team1.jpeg", "assets/Students/skdu-team.jpeg"],
    title: "Girls' Tug-of-War Team Triumphs at University Games 2025",
    icon: "fas fa-trophy",
    desc: "Our talented girls' team secured victory in the thrilling tug-of-war competition at the University Games, held on National Sports Day. Their dedication and teamwork brought home the gold, making the university proud."
  },

  {
    images: ["assets/Int.conference/Int.conference.jpeg", "assets/Int.conference/img1.jpeg", "assets/Int.conference/img2.jpeg", "assets/Int.conference/img3.jpeg", "assets/Int.conference/img4.jpeg", "assets/Int.conference/img5.jpeg", "assets/Int.conference/img6.jpeg"],
    title: "International Conference on Cyber Security & Laws in the context of Innovations and Intellectual Properry ICCL-IP 2025",
    icon: "fas fa-user-graduate",
    desc: "26th – 27th September 2025 An international forum bringing together researchers, professionals, and innovators to explore advancements in cyber security, legal frameworks, and the protection of intellectual property in the digital era."},
  {
    images: [
      "assets/nationalconference/conference4.jpg",
      "assets/nationalconference/conference.jpg",
      "assets/nationalconference/conference1.jpg",
      "assets/nationalconference/conference2.jpg",
      "assets/nationalconference/conference3.jpg"
    ],
    title: "National Conference on New Approaches in Computer Science & Engineering",
    icon: "fas fa-user-graduate",
    desc: "Empowering aspirants with expert guidance, interactive sessions, and exposure to diverse academic and professional pathways."
  },
  {
    images: [
      "assets/placements/placements.jpg",
      "assets/placements/placements2.jpg",
      "assets/placements/placements1.jpg",
      "assets/placements/placements3.jpg",
      "assets/placements/placements4.jpg"
    ],
    title: "Placement Drive",
    icon: "fas fa-briefcase",
    desc: "Pioneering researchers, visionary keynote speakers, and tech innovators explore emerging paradigms and foster collaboration."
  },
  {
    images: ["assets/workshop/workshop.jpeg", "assets/workshop/workshop1.jpeg", "assets/workshop/workshop3.jpeg"],
    title: "Brighter Tech Workshop",
    icon: "fas fa-laptop-code",
    desc: "Hands-on workshop on Cybersecurity Trends offering aspirants practical insights into emerging threats and defense strategies."
  },
  {
    images: ["assets/fresherparty/fresher3.jpg", "assets/fresherparty/fresher2.jpg", "assets/fresherparty/fresher.jpg"],
    title: "Fresher Party",
    icon: "fas fa-cocktail",
    desc: "Welcoming new aspirants with vibrant celebrations, interactive sessions, and camaraderie to start their academic journey."
  },
  {
    images: ["assets/edutour/edutour1.jpg", "assets/edutour/edutour2.jpg"],
    title: "Academic Tour",
    icon: "fas fa-university",
    desc: "Immersive exposure to leading institutions and research facilities, bridging classroom learning with real-world environments."
  }
];

/**
 * Injects the necessary CSS for smooth transitions and animation pausing.
 */
function injectCSS() {
  const style = document.createElement('style');
  style.textContent = `
    body.viewer-active #newsTrack,
    #newsTrack.paused {
      animation-play-state: paused;
    }
    #imageViewer.active #viewerImg {
      transition: opacity 1s ease-in-out; /* smoother fade */
    }
    .view-images-btn {
      padding: 10px 20px;
      background-color: #007BFF;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
      margin-top: 10px;
      text-align: center;
    }
    .view-images-btn:hover {
      background-color: #0056b3;
    }
  `;
  document.head.appendChild(style);
}

// Call the function to inject the CSS when the script runs
injectCSS();

// Render News Cards
const newsTrack = document.getElementById('newsTrack');

newsData.forEach(item => {
  const card = document.createElement('div');
  card.classList.add('news-card');

  const allImagesData = item.images.join(',');

  card.innerHTML = `
    <h3><i class="${item.icon}"></i> ${item.title}</h3>
    <p>${item.desc}</p>
    <button class="view-images-btn" data-images="${allImagesData}">View Images</button>
  `;

  newsTrack.appendChild(card);
});

// Image Viewer Functionality
const viewer = document.getElementById('imageViewer');
const viewerImg = document.getElementById('viewerImg');
const closeBtn = document.getElementById('closeViewer');

let autoChangeTimeout;
let currentImageIndex = 0;
let currentImagesArray = [];

function changeImage() {
  viewerImg.style.opacity = '0'; // fade out
  
  setTimeout(() => {
    currentImageIndex = (currentImageIndex + 1) % currentImagesArray.length;
    viewerImg.src = currentImagesArray[currentImageIndex];
    
    // fade in
    viewerImg.style.opacity = '1';
    
    // Next change after 8s (1s fade + 7s visible)
    autoChangeTimeout = setTimeout(changeImage, 8000);
  }, 1000); // matches fade duration (1s)
}

// Open viewer
document.querySelectorAll('.view-images-btn').forEach(button => {
  button.addEventListener('click', () => {
    currentImagesArray = button.getAttribute('data-images').split(',');
    currentImageIndex = 0;

    viewerImg.src = currentImagesArray[currentImageIndex];
    viewer.classList.add('active');
    document.body.classList.add('viewer-active'); 

    setTimeout(() => {
      viewerImg.style.opacity = '1';
    }, 50);

    autoChangeTimeout = setTimeout(changeImage, 8000); // start slideshow
  });
});

// Close button
closeBtn.addEventListener('click', () => {
  viewer.classList.remove('active');
  viewerImg.style.opacity = '0';
  clearTimeout(autoChangeTimeout); 
  document.body.classList.remove('viewer-active'); 
});

// Close when clicking outside the image
viewer.addEventListener('click', e => {
  if (e.target === viewer) {
    viewer.classList.remove('active');
    viewerImg.style.opacity = '0';
    clearTimeout(autoChangeTimeout); 
    document.body.classList.remove('viewer-active'); 
  }
});

// New Event Listeners for Focus
newsTrack.addEventListener('focusin', () => {
    newsTrack.classList.add('paused');
});

newsTrack.addEventListener('focusout', () => {
    // A small delay is added to prevent flickering when focus shifts between elements within the same card.
    setTimeout(() => {
        // Check if the focus has moved outside the news card container entirely
        if (!newsTrack.contains(document.activeElement)) {
            newsTrack.classList.remove('paused');
        }
    }, 10);
});

const quotes = [
  {
    text: "Dream, dream, dream. Dreams transform into thoughts and thoughts result in action.",
    author: "— Dr. A.P.J. Abdul Kalam"
  },
  {
    text: "Arise, awake, and stop not until the goal is reached.",
    author: "— Swami Vivekananda"
  },
  {
    text: "The highest education is that which does not merely give us information but makes our life in harmony with all existence.",
    author: "— Rabindranath Tagore"
  },
  {
    text: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
    author: "— Mahatma Gandhi"
  },
  {
    text: "True knowledge is not attained by thinking. It is what you are; it is what you become.",
    author: "— Sri Aurobindo"
  },
  {
    text: "Cultivation of mind should be the ultimate aim of human existence.",
    author: "— B. R. Ambedkar"
  },
  {
    text: "The end-product of education should be a free creative man, who can battle against historical circumstances and adversities of nature.",
    author: "— Sarvepalli Radhakrishnan"
  },
  {
    text: "Educationists should build the capacities of the spirit of inquiry, creativity, entrepreneurial and moral leadership among students.",
    author: "— Dr. A.P.J. Abdul Kalam"
  }
];

let index = 0;
const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");

function showQuote(i) {
  // Start fade-out
  quoteText.classList.remove("fade-in");
  quoteAuthor.classList.remove("fade-in");
  quoteText.classList.add("fade-out");
  quoteAuthor.classList.add("fade-out");

  // After fade-out, change content and fade-in
  setTimeout(() => {
    quoteText.textContent = `“${quotes[i].text}”`;
    quoteAuthor.textContent = quotes[i].author;

    quoteText.classList.remove("fade-out");
    quoteAuthor.classList.remove("fade-out");

    quoteText.classList.add("fade-in");
    quoteAuthor.classList.add("fade-in");
  }, 500); // match CSS fade-out duration
}

// Initial load
showQuote(index);

// Auto change every 7s
setInterval(() => {
  index = (index + 1) % quotes.length;
  showQuote(index);
}, 7000);
