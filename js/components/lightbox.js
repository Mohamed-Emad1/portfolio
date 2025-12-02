class Lightbox {
  constructor() {
    this.images = [];
    this.currentIndex = 0;
    this.isActive = false;
    this.init();
  }

  init() {
    this.createLightboxDOM();
    this.bindEvents();
  }

  createLightboxDOM() {
    const lightbox = document.createElement("div");
    lightbox.className = "lightbox-modal";
    lightbox.id = "lightbox-modal";
    lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
                <button class="lightbox-prev" aria-label="Previous image"><i class="fas fa-chevron-left"></i></button>
                <div class="lightbox-image-container">
                    <img src="" alt="Project Image" class="lightbox-image">
                    <div class="lightbox-loader"></div>
                </div>
                <button class="lightbox-next" aria-label="Next image"><i class="fas fa-chevron-right"></i></button>
                <div class="lightbox-counter"></div>
            </div>
        `;
    document.body.appendChild(lightbox);

    this.modal = document.getElementById("lightbox-modal");
    this.image = this.modal.querySelector(".lightbox-image");
    this.closeBtn = this.modal.querySelector(".lightbox-close");
    this.prevBtn = this.modal.querySelector(".lightbox-prev");
    this.nextBtn = this.modal.querySelector(".lightbox-next");
    this.counter = this.modal.querySelector(".lightbox-counter");
    this.loader = this.modal.querySelector(".lightbox-loader");
  }

  bindEvents() {
    this.closeBtn.addEventListener("click", () => this.close());
    this.prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.prev();
    });
    this.nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.next();
    });

    // Close on background click
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (!this.isActive) return;

      if (e.key === "Escape") this.close();
      if (e.key === "ArrowLeft") this.prev();
      if (e.key === "ArrowRight") this.next();
    });

    // Image load handling
    this.image.addEventListener("load", () => {
      this.loader.style.display = "none";
      this.image.style.opacity = "1";
    });

    this.image.addEventListener("loadstart", () => {
      this.loader.style.display = "block";
      this.image.style.opacity = "0";
    });
  }

  open(images, index = 0) {
    if (!images || images.length === 0) return;

    this.images = images;
    this.currentIndex = index;
    this.isActive = true;
    this.modal.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent background scrolling
    this.updateImage();
  }

  close() {
    this.isActive = false;
    this.modal.classList.remove("active");
    document.body.style.overflow = ""; // Restore scrolling
    setTimeout(() => {
      this.image.src = ""; // Clear image to prevent flash on next open
    }, 300);
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateImage();
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.updateImage();
  }

  updateImage() {
    this.loader.style.display = "block";
    this.image.style.opacity = "0";
    this.image.src = this.images[this.currentIndex];
    this.counter.textContent = `${this.currentIndex + 1} / ${
      this.images.length
    }`;
  }
}
