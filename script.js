document.addEventListener('DOMContentLoaded', () => {
    const facultyData = [
        { name: "Dr. Kulwant Singh", title: "Head of Department", bio: "Dr. Kulwant Singh serves as the Head of Department, bringing 15+ years of distinguished teaching experience across leading academic institutions. With a strategic vision for academic excellence, he mentors both students and faculty, fostering innovation and practical problem-solving across emerging technologies. His leadership continues to shape a dynamic learning environment that equips graduates to tackle real-world challenges with confidence and expertise.", image: "assets/faculity/dr.kulwant-singh.jpeg" },
        { name: "ER.Vikram Mangwana", title: "Assistant Professor", bio: "Vikram Mangwana is an Assistant Professor with over seven years of distinguished teaching experience across reputed universities. He empowers students with the analytical and technical acumen required to navigate complex digital environments, fostering a deep understanding of secure systems and investigative methodologies essential for modern technological resilience.", image: "assets/faculity/vikram-mangawana.jpeg" },
        { name: "ER.Sumit Garg", title: "Assistant Professor", bio: "Sumit Garg is an Assistant Professor who brings over seven years of teaching expertise cultivated within leading professional universities, fostering academic excellence and industry-aligned learning. He is committed to equipping future engineers with the analytical tools and practical knowledge needed to design resilient infrastructure and solve complex engineering challenges. His academic approach blends theoretical rigor with real-world application, fostering a generation of professionals capable of advancing sustainable development and precision-driven construction practices.", image: "assets/faculity/sumit-garg.jpeg" },
        { name: "ER. Manoj Joshi", title: "Teaching Assistant", bio: "ER. Manoj Joshi is a Teaching Assistant with over three years of teaching experience. He is dedicated to supporting academic excellence by assisting in core engineering subjects and guiding students in practical applications of classroom learning. With a focus on strengthening fundamentals, he helps learners build analytical and problem-solving skills essential for professional growth. His approach combines patience, clarity, and practical orientation, making him an effective mentor for aspiring engineers.", image: "assets/faculity/manoj-joshi.jpeg" },
        { name: "ER. Nitin Meena", title: "Teaching Assistant", bio: "ER. Nitin Meena is a Teaching Assistant with over three years of teaching experience. He actively supports students in developing strong academic foundations and practical skills through hands-on guidance and mentoring. His approach emphasizes conceptual clarity, collaborative learning, and real-world application, enabling students to bridge the gap between theory and practice. With his dedication and enthusiasm, he plays a vital role in shaping confident and competent future engineers.", image: "assets/faculity/nitin-meena.jpeg" },
        { name: "ER.Amandeep Kaur", title: "Assistant Professor", bio: "Amandeep Kaur is an Assistant Professor with over 7+ years of teaching experience across well-regarded higher education institutions. She is committed to empowering students through a blend of theoretical instruction and practical application, guiding them to develop strong problem-solving skills and professional readiness for dynamic roles in the tech industry.", image: "assets/faculity/Er.Amandeep-Kaur.jpeg" },
        { name: "Manmeet Kaur", title: "Assistant Professor", bio: "Manmeet Kaur is an Assistant Professor with over 9+ years of teaching experience across respected university environments. She is dedicated to cultivating analytical thinking and problem-solving abilities in students, guiding them to innovate and excel in today’s rapidly evolving technological landscape. Her commitment to academic excellence and student development continues to shape future-ready professionals.", image: "assets/faculity/Manmeet-kaur.jpeg" },
        { name: "Sarvjeet Kaur", title: "Assistant Professor", bio: "Sarvjeet Kaur is an Assistant Professor with over 6+ years of professional teaching experience in reputed universities. She is deeply committed to mentoring students through both foundational and advanced concepts in computing, encouraging innovation and critical thinking in the field of technology. Her academic approach blends clarity, curiosity, and creativity, empowering learners to excel in dynamic and evolving digital environments.", image: "assets/faculity/sarvjeet-kaur.jpg" },
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
            facultyImg.addEventListener('click', () => openImageViewer(faculty));
        }

        // Mobile 'View More' functionality
        if (isMobile) {
            const viewMoreBtn = facultyContent.querySelector('.view-more-btn');
            const bioSummary = facultyContent.querySelector('.bio-summary');

            bioSummary.style.display = 'none';

            viewMoreBtn.addEventListener('click', () => {
                const isHidden = bioSummary.style.display === 'none';
                bioSummary.style.display = isHidden ? 'block' : 'none';
                viewMoreBtn.textContent = isHidden ? 'View Less' : 'View More';
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

    /* ========================================= */
    /* === Transparent Custom Image Viewer === */
    /* ========================================= */
    const viewer = document.createElement('div');
    viewer.classList.add('image-viewer');
    viewer.innerHTML = `
        <div class="viewer-image-container">
            <span class="close-btn">&times;</span>
            <img src="" alt="Faculty Photo" class="viewer-image">
        </div>
    `;
    document.body.appendChild(viewer);

    const viewerImageContainer = viewer.querySelector('.viewer-image-container');
    const viewerImg = viewer.querySelector('.viewer-image');
    const closeBtn = viewer.querySelector('.close-btn');

    // Style the close button with JavaScript
    Object.assign(closeBtn.style, {
        position: 'absolute',
        top: '-15px', // Adjust as needed
        right: '-15px', // Adjust as needed
        width: '40px',
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#fff',
        background: '#D32F2F',
        borderRadius: '50%',
        boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
        transition: 'transform 0.2s ease',
        pointerEvents: 'auto',
        zIndex: '10',
    });

    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.transform = 'scale(1.2)';
    });
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.transform = 'scale(1)';
    });

    function openImageViewer(faculty) {
        viewerImg.src = faculty.image;
        viewer.classList.add('active');
        setTimeout(() => viewerImageContainer.style.opacity = '1', 50);
        document.body.style.overflow = 'hidden';
    }

    function closeImageViewer() {
        viewer.classList.remove('active');
        viewerImageContainer.style.opacity = '0';
        setTimeout(() => {
            if (!viewer.classList.contains('active')) {
                document.body.style.overflow = '';
            }
        }, 400);
    }

    // Close only with cross button
    closeBtn.addEventListener('click', closeImageViewer);

    // Close with Esc key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && viewer.classList.contains('active')) {
            closeImageViewer();
        }
    });

    // --- Initialize ---
    if (facultyData.length > 0) {
        renderFacultySidebar();
        updateFacultyContent(0);
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
    "The Robotics and Intelligent Systems Lab, developed in collaboration with Virtual Labs, IIT Delhi, offers students experiential learning and opportunities for applied technological research. To explore and access resources, visit the official Virtual Labs portal at <a href='https://www.vlab.co.in/broad-area-computer-science-and-engineering' target='_blank' style='color:#0d6efd; text-decoration:underline;'>www.vlab.co.in</a>."
}

  ];

  let currentFacilityIndex = 0;
  let facilitiesInterval;

  const facilitiesSidebar = document.getElementById('facilities-sidebar');
  const facilitiesContent = document.getElementById('facilities-content');

  // ----------------- RENDER SIDEBAR -----------------
  const renderFacilitiesSidebar = () => {
    if (!facilitiesSidebar) return;
    facilitiesSidebar.innerHTML = '';
    facilitiesData.forEach((facility, index) => {
      const sidebarItem = document.createElement('div');
      sidebarItem.classList.add('facilities-sidebar-item');
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

    facilitiesContent.classList.remove('active');

    setTimeout(() => {
      let html = `
        <h3>${facility.name}</h3>
        ${facility.description ? `<p>${facility.description}</p>` : ''}
      `;
      facilitiesContent.innerHTML = html;

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

      document.querySelectorAll('.facilities-sidebar-item').forEach((item, i) => {
        item.classList.toggle('active', i === index);
      });

      facilitiesContent.classList.add('active');
    }, 200);
  };

  // ----------------- AUTO SCROLL -----------------
  const startFacilitiesAutoScroll = () => {
    clearInterval(facilitiesInterval);
    facilitiesInterval = setInterval(() => {
      const nextIndex = (currentFacilityIndex + 1) % facilitiesData.length;
      updateFacilitiesContent(nextIndex);
    }, 3000);
  };

  const stopFacilitiesAutoScroll = () => {
    clearInterval(facilitiesInterval);
  };

  const resetFacilitiesAutoScroll = () => {
    stopFacilitiesAutoScroll();
    startFacilitiesAutoScroll();
  };

  // ----------------- IMAGE VIEWER (FINAL CORRECTION) -----------------
  const viewer = document.createElement('div');
  viewer.classList.add('image-viewer');
  viewer.innerHTML = `
    <span class="close-btn" aria-label="Close">&times;</span>
    <button class="arrow-btn prev-btn" aria-label="Previous Image">&#10094;</button>
    <img src="" alt="Facility Image" class="viewer-img">
    <button class="arrow-btn next-btn" aria-label="Next Image">&#10095;</button>
  `;
  document.body.appendChild(viewer);

  const viewerImg = viewer.querySelector('.viewer-img');
  const closeBtn = viewer.querySelector('.close-btn');
  const prevBtn = viewer.querySelector('.prev-btn');
  const nextBtn = viewer.querySelector('.next-btn');

  let currentViewerImages = [];
  let currentViewerImageIndex = 0;

  const openImageViewer = (images) => {
    if (!images || images.length === 0) return;

    currentViewerImages = images;
    currentViewerImageIndex = 0;

    updateViewerImage();

    viewer.classList.add('active');
    const hasMultipleImages = images.length > 1;
    prevBtn.style.display = hasMultipleImages ? 'block' : 'none';
    nextBtn.style.display = hasMultipleImages ? 'block' : 'none';
  };

  const updateViewerImage = () => {
    // Fade out the current image
    viewerImg.style.opacity = '0';

    // Wait for the transition to complete before changing the source
    setTimeout(() => {
      // Preload the new image to ensure a smooth transition
      const imgToLoad = new Image();
      imgToLoad.src = currentViewerImages[currentViewerImageIndex];
      imgToLoad.onload = () => {
        viewerImg.src = imgToLoad.src;
        viewerImg.style.opacity = '1'; // Fade in the new image
      };
    }, 500); // Wait 500ms (adjust to match your CSS transition duration)
  };

  const closeImageViewer = () => {
    viewer.classList.remove('active');
    startFacilitiesAutoScroll();
  };

  // Manual Navigation Event Listeners
  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentViewerImageIndex = (currentViewerImageIndex - 1 + currentViewerImages.length) % currentViewerImages.length;
    updateViewerImage();
  });

  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentViewerImageIndex = (currentViewerImageIndex + 1) % currentViewerImages.length;
    updateViewerImage();
  });

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

    // Create notification container if it doesn't exist
    let notificationContainer = document.querySelector('.notification-container');
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.className = 'notification-container';
        document.body.appendChild(notificationContainer);
    }

    // Functions to manage scroll behavior
    const disableScroll = () => {
        document.body.classList.add('no-scroll');
    };

    const enableScroll = () => {
        document.body.classList.remove('no-scroll');
    };

    // Eligibility rules for various courses
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

    // Qualification mapping for user-friendly display
    const qualificationMap = {
        '10': '10th grade',
        '12-science': '12th with Science stream',
        '12-commerce': '12th with Commerce stream',
        '12-arts': '12th with Arts stream',
        'graduation': 'any Bachelor\'s degree',
        'graduation-any-stream': 'any Bachelor\'s degree',
        'graduation-cs': 'Bachelor\'s degree in Computer Science',
        'graduation-science-math': 'Bachelor\'s degree in Science (with Mathematics)',
        'graduation-commerce-math': 'Bachelor\'s degree in Commerce (with Mathematics)',
        'graduation-arts-math': 'Bachelor\'s degree in Arts (with Mathematics)',
        'pgdca': 'Post Graduate Diploma in Computer Applications (PGDCA)',
        'btech': 'B.Tech'
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

    // Check eligibility based on rules
    const checkEligibility = (course, qualification) => {
        const rule = eligibilityRules[course];
        if (!rule) return { valid: false, msg: "Please select both a course and your qualification.", type: 'warning' };

        let isEligible = rule.required.includes(qualification);

        // Handle special cases where multiple graduation types qualify
        if ((course === 'mca' || course === 'pgdca') && qualification.includes('graduation')) {
            isEligible = true;
        }

        let msg, type;
        if (isEligible) {
            msg = `🎉 Congratulations! Based on your qualifications, you are provisionally eligible for the <strong>${rule.name}</strong> program. This determination is in accordance with the National Education Policy (NEP) 2020. We invite you to proceed with your application. <a href="https://admission.skduniversity.org/?CampaignSource=Google_Campaigns&CampaignName=SKDU_Brand_2025&CampaignID=22071532207&device=c&adgroupid=173412951595&gclid=&keyword=skd%20university&gad_source=1&gad_campaignid=22071532207&gbraid=0AAAAAq61iyPnX_XQUK-YtBxczg6ovDRbH" target="_blank" style="color: #0d6efd; text-decoration: underline;">Begin your application here</a>.`;
            type = 'success';
        } else {
            const requiredQualifications = rule.required.map(req => qualificationMap[req] || req);
            const formattedRequirements = requiredQualifications.length > 1
                ? requiredQualifications.slice(0, -1).join(', ') + ' or ' + requiredQualifications.slice(-1)
                : requiredQualifications[0];

            msg = `⚠️ Your qualifications do not meet the minimum criteria for <strong>${rule.name}</strong>. The required qualifications are <strong>${formattedRequirements}</strong>. Please explore other programs or consult with our academic advisors.`;
            type = 'error';
        }
        return { valid: true, msg, type };
    };

    // Show the notification pop-up
    const showNotification = (msg, type = 'info') => {
        disableScroll();
        const notif = document.createElement('div');
        notif.className = `notification ${type}`;
        notif.innerHTML = `
            <div class="content-wrapper">
                <span class="icon">${getIcon(type)}</span>
                <span class="notif-message">${msg}</span>
            </div>
            <button class="close-btn">&times;</button>
        `;
        notificationContainer.appendChild(notif);

        // Function to close and clean up the notification
        const closeNotification = () => {
            notif.classList.add('hide');
            setTimeout(() => {
                notif.remove();
                enableScroll();
            }, 500);
        };

        // Auto-close after 7 seconds
        const timer = setTimeout(closeNotification, 7000);

        // Close button functionality
        notif.querySelector('.close-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            clearTimeout(timer); // Clear the auto-close timer
            closeNotification();
        });

        // Auto-close when clicking outside the notification
        document.addEventListener('click', (e) => {
            if (!notificationContainer.contains(e.target) && notificationContainer.contains(notif)) {
                clearTimeout(timer); // Clear the auto-close timer
                closeNotification();
            }
        }, { once: true });
    };

    // Form submission handler
    eligibilityForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const studentName = e.target.querySelector('#student-name').value.trim();
        const course = e.target.querySelector('#course').value;
        const qualification = e.target.querySelector('#qualification').value;

        if (!studentName || !course || !qualification) {
            showNotification('Please fill in all the required fields.', 'warning');
            return;
        }

        const { valid, msg, type } = checkEligibility(course, qualification);
        let personalizedMsg = `Hello ${studentName}! ${msg}`;

        showNotification(personalizedMsg, type);
        eligibilityForm.reset();
    });
});
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
      transition: background-color 0.3s ease;
    }
    .view-images-btn:hover {
      background-color: #0056b3;
    }
    #imageViewer.active {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .arrow-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        font-size: 2rem;
        color: white;
        background: rgba(0, 0, 0, 0.5);
        border: none;
        cursor: pointer;
        padding: 10px;
        z-index: 1001;
        user-select: none;
    }
    #prevBtn {
        left: 20px;
    }
    #nextBtn {
        right: 20px;
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

let currentImageIndex = 0;
let currentImagesArray = [];

// New arrow buttons
const prevBtn = document.createElement('button');
prevBtn.id = 'prevBtn';
prevBtn.classList.add('arrow-btn');
prevBtn.innerHTML = '&#10094;';
viewer.appendChild(prevBtn);

const nextBtn = document.createElement('button');
nextBtn.id = 'nextBtn';
nextBtn.classList.add('arrow-btn');
nextBtn.innerHTML = '&#10095;';
viewer.appendChild(nextBtn);

function updateImage(newIndex) {
  viewerImg.style.opacity = '0'; // fade out
  
  // Use a temporary image object to preload the next image
  const tempImg = new Image();
  tempImg.onload = () => {
    // Once the image is loaded, update the viewer image source
    currentImageIndex = newIndex;
    viewerImg.src = currentImagesArray[currentImageIndex];
    
    // Now fade it in
    viewerImg.style.opacity = '1';
  };
  
  // Set the source of the temporary image to trigger loading
  tempImg.src = currentImagesArray[newIndex];
}

// Event listeners for arrow buttons
prevBtn.addEventListener('click', (e) => {
  e.stopPropagation(); // Prevent viewer from closing
  const newIndex = (currentImageIndex - 1 + currentImagesArray.length) % currentImagesArray.length;
  updateImage(newIndex);
});

nextBtn.addEventListener('click', (e) => {
  e.stopPropagation(); // Prevent viewer from closing
  const newIndex = (currentImageIndex + 1) % currentImagesArray.length;
  updateImage(newIndex);
});

// Open viewer
document.querySelectorAll('.view-images-btn').forEach(button => {
  button.addEventListener('click', () => {
    currentImagesArray = button.getAttribute('data-images').split(',');
    currentImageIndex = 0;
    
    // Immediately set the first image
    viewerImg.src = currentImagesArray[currentImageIndex];

    viewer.classList.add('active');
    document.body.classList.add('viewer-active'); 

    setTimeout(() => {
      viewerImg.style.opacity = '1';
    }, 50);
  });
});

// Close button
closeBtn.addEventListener('click', () => {
  viewer.classList.remove('active');
  viewerImg.style.opacity = '0';
  document.body.classList.remove('viewer-active'); 
});

// Close when clicking outside the image
viewer.addEventListener('click', e => {
  if (e.target === viewer) {
    viewer.classList.remove('active');
    viewerImg.style.opacity = '0';
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

document.addEventListener('DOMContentLoaded', () => {
    // --- Select all required DOM elements ---
    const slideContainer = document.querySelector('.slide-container');
    const slides = document.querySelectorAll('.slide');
    const arrows = document.querySelectorAll('.hero-arrow');
    const paginationDots = document.querySelectorAll('.dot');
    const slideCount = slides.length;
    let currentSlide = 0;
    let autoSlideInterval;

    // --- Core function to handle slide change and updates ---
    const updateSlider = () => {
        // Calculate the translation value for the smooth slide effect
        const offset = -currentSlide * 100; // 100% per slide
        slideContainer.style.transform = `translateX(${offset}%)`;

        // Update active class for pagination dots
        paginationDots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    };

    // --- Function to handle automatic slide changes ---
    const startAutoSlide = () => {
        // Clear any existing interval to prevent multiple timers running
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slideCount;
            updateSlider();
        }, 4000); // Change slide every 4 seconds
    };

    // --- Event Listeners for user interaction ---

    // Set initial background images from data attributes
    slides.forEach(slide => {
        const imageUrl = slide.getAttribute('data-image');
        if (imageUrl) {
            slide.style.backgroundImage = `url('${imageUrl}')`;
        }
    });

    // Handle arrow clicks for manual navigation
    arrows.forEach(arrow => {
        arrow.addEventListener('click', (e) => {
            // Stop the auto-slide timer when a user interacts
            clearInterval(autoSlideInterval);

            if (e.target.classList.contains('right-arrow')) {
                currentSlide = (currentSlide + 1) % slideCount;
            } else if (e.target.classList.contains('left-arrow')) {
                currentSlide = (currentSlide - 1 + slideCount) % slideCount;
            }
            updateSlider();

            // Restart the auto-slide timer after a brief delay
            startAutoSlide();
        });
    });

    // Handle pagination dot clicks for direct navigation
    paginationDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            clearInterval(autoSlideInterval);
            const index = parseInt(e.target.getAttribute('data-slide-index'));
            currentSlide = index;
            updateSlider();
            startAutoSlide();
        });
    });

    // Pause auto-slide when the mouse is over the slider
    slideContainer.parentElement.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    // Resume auto-slide when the mouse leaves the slider
    slideContainer.parentElement.addEventListener('mouseleave', () => {
        startAutoSlide();
    });

    // --- Initial setup ---
    updateSlider(); // Set the initial state
    startAutoSlide(); // Begin the automatic slide show
});

document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navContainer = document.querySelector('.nav-float-container');

    // Function to close the menu
    function closeNavMenu() {
        if (navContainer.classList.contains('active')) {
            navContainer.classList.remove('active');
        }
    }

    // Toggle the menu on button click
    navToggle.addEventListener('click', function(event) {
        event.preventDefault();
        navContainer.classList.toggle('active');
    });

    // Close the menu if a link is clicked
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeNavMenu();
        });
    });

    // Close the menu if a click occurs outside of it
    document.addEventListener('click', function(event) {
        if (!navContainer.contains(event.target) && !navToggle.contains(event.target)) {
            closeNavMenu();
        }
    });

    // Optional: Add a smooth scroll effect for in-page links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId && document.querySelector(targetId)) {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ===============================
// 🎯 Student Projects Section JS (Optimized with Animations)
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const projects = [
    {
      id: "p1",
      title: "Hospital Management System",
      team: "Ramandeep Sinmgh",
      stack: "HTML , CSS , JS",
      image: "assets/Projects/header.png",
      excerpt: "A Digital Transformation Initiative Hospital Management System  ",
    },
    {
      id: "p2",
      title: "E-Commerce Platform",
      team: "Khushpreet Singh",
      stack: "Angular, Bootstrap, Json-Server, HTML, CSS, JS",
      image: "assets/Projects/e-com.png",
      excerpt: "Full-featured online shopping site with cart, payments, and admin dashboard.",
    },
    {
      id: "p3",
      title: "EASY ACCESS",
      team: "Neeraj Arora",
      stack: "PYTHON, DJANGO",
      image: "assets/Projects/easy-access.png",
      excerpt: "A dynamic platform empowering freshers to master advanced programming languages with ease and confidence.",
    },
        {
      id: "p4",
      title: "My Book Lab",
      team: "Sukhchain Singh",
      stack: "Django,Javascript,Bootstrap,PostgreSQL",
      image: "assets/Projects/thebooklab.jpeg",
      excerpt: "A dynamic portfolio generator with customizable templates and PDF export.",
    }

  ];

  const slider = document.getElementById("projects-slider");

  // Render project cards
  projects.forEach(project => {
    const card = document.createElement("article");
    card.classList.add("card");
    card.innerHTML = `
      <div class="card-thumb">
        <img src="${project.image}" alt="${project.title} screenshot">
      </div>
      <div class="card-body">
        <h3 class="card-title">${project.title}</h3>
        <p class="card-meta">Developed By: ${project.team} • ${project.stack}</p>
        <p class="card-excerpt">${project.excerpt}</p>
      </div>
    `;
    slider.appendChild(card);
  });

  // Arrow buttons
  const leftArrow = document.getElementById("slide-left");
  const rightArrow = document.getElementById("slide-right");

  const scrollAmount = 300; // Pixels to scroll per click (adjust as needed)

  leftArrow.addEventListener("click", () => {
    slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  rightArrow.addEventListener("click", () => {
    slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Select all dropdowns to make the script reusable
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

  dropdownToggles.forEach(function(toggle) {
    const parentDropdown = toggle.closest('.dropdown');
    const dropdownMenu = parentDropdown.querySelector('.dropdown-menu');

    // Add a click event listener to each dropdown toggle
    toggle.addEventListener('click', function(event) {
      // Prevents the default action of the link
      event.preventDefault();
      
      // Toggle the 'show' class on the dropdown menu
      dropdownMenu.classList.toggle('show');
      
      // Toggle the ARIA attribute for accessibility
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true' || false;
      toggle.setAttribute('aria-expanded', !isExpanded);
    });
  });

  // Close the dropdown if the user clicks outside of it
  document.addEventListener('click', function(event) {
    // Check if the click occurred outside any dropdown container
    const isClickInsideDropdown = event.target.closest('.dropdown');
    
    if (!isClickInsideDropdown) {
      // Find all currently open dropdowns and close them
      const openDropdowns = document.querySelectorAll('.dropdown-menu.show');
      openDropdowns.forEach(function(openMenu) {
        openMenu.classList.remove('show');
        // Reset the aria-expanded attribute on the toggle button
        const toggleButton = openMenu.closest('.dropdown').querySelector('.dropdown-toggle');
        toggleButton.setAttribute('aria-expanded', 'false');
      });
    }
  });
});

document.addEventListener('DOMContentLoaded', (event) => {
    const popup = document.getElementById('disclaimer-popup');
    const closeButton = document.querySelector('.close-button');

    setTimeout(() => {
        popup.classList.add('show');
    }, 0);

    // Set a timer to automatically hide the pop-up after 10 seconds (10000 milliseconds)
    const autoCloseTimer = setTimeout(() => {
        popup.classList.remove('show');
        popup.addEventListener('transitionend', function handler() {
            popup.style.display = 'none';
            popup.removeEventListener('transitionend', handler);
        });
    }, 7000); // 7000ms = 7 seconds

    closeButton.onclick = function() {
        clearTimeout(autoCloseTimer);
        popup.classList.remove('show');
        popup.addEventListener('transitionend', function handler() {
            popup.style.display = 'none';
            popup.removeEventListener('transitionend', handler);
        });
    };

    window.onclick = function(event) {
        if (event.target === popup) {
            clearTimeout(autoCloseTimer);
            popup.classList.remove('show');
            popup.addEventListener('transitionend', function handler() {
                popup.style.display = 'none';
                popup.removeEventListener('transitionend', handler);
            });
        }
    };
});