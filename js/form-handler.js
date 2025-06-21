/**
 * ===================================
 * FORM HANDLER JAVASCRIPT (VERSI BARU UNTUK APPS SCRIPT DENGAN e.parameter)
 * File: form-handler.js
 * Deskripsi: Menangani form submission, validasi, dan integrasi Google Sheets dengan redirect otomatis.
 *            Disesuaikan untuk Apps Script yang menerima data sebagai form-urlencoded (e.parameter).
 * ===================================
 */

// ===================================
// KONFIGURASI GOOGLE SHEETS
// ===================================

const GOOGLE_SHEETS_CONFIG = {
  // URL Google Apps Script Web App (PASTIKAN INI ADALAH URL DARI DEPLOYMENT ANDA)
  // Contoh: https://script.google.com/macros/s/AKfycbyy16kBCcXHGHI58fbc8jcDSIiEnAHkfyE1R8Yb7-h9cUzvQKjyIqAZvVwKZqVk4a0tGg/exec
  scriptURL:
    "https://script.google.com/macros/s/AKfycbxYG1rZU0_kgUtpwhKcuVMfjJFJ826QM-Ys-OFoaIG8B9er8Gb2SbnPG2-Qg_I5BPbACg/exec",

  // Timeout untuk request (ms)
  timeout: 10000,

  // Retry configuration
  maxRetries: 1, // Diatur ke 1 sesuai permintaan user sebelumnya
  retryDelay: 1000,
};

// ===================================
// KONFIGURASI REDIRECT
// ===================================

const REDIRECT_CONFIG = {
  // URL halaman utama yang akan dituju setelah konfirmasi berhasil
  mainPageURL: "main/main.html", // <--- GANTI DENGAN URL HALAMAN ANDA

  // Delay sebelum redirect (dalam milidetik)
  redirectDelay: 2000, // 2 detik - bisa disesuaikan

  // Apakah menggunakan animasi saat redirect
  useAnimation: true,
};

// ===================================
// FORM VALIDATION RULES
// ===================================

const VALIDATION_RULES = {
  nama: {
    required: true,
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Z\s.\[\]\{\}\(\)\'\-]+$/,
    errorMessages: {
      required: "Nama lengkap wajib diisi",
      minLength: "Nama minimal 2 karakter",
      maxLength: "Nama maksimal 100 karakter",
      pattern:
        "Nama hanya boleh mengandung huruf, spasi, titik, apostrof, dan tanda hubung",
    },
  },
  alamat: {
    required: false,
    maxLength: 500,
    errorMessages: {
      maxLength: "Alamat maksimal 500 karakter",
    },
  },
  kehadiran: {
    required: true,
    errorMessages: {
      required: "Silakan pilih konfirmasi kehadiran Anda",
    },
  },
};

// ===================================
// FORM HANDLER CLASS
// ===================================

class WeddingFormHandler {
  constructor() {
    this.form = document.getElementById("confirmationForm");
    this.submitBtn = document.getElementById("submitBtn");
    this.successMessage = document.getElementById("successMessage");
    this.backBtn = document.getElementById("backBtn");

    this.isSubmitting = false;
    this.retryCount = 0;

    this.initializeEventListeners();
    this.setupFormValidation();
  }

  /**
   * Inisialisasi event listeners
   */
  initializeEventListeners() {
    if (this.form) {
      this.form.addEventListener("submit", this.handleFormSubmit.bind(this));
    }

    // Tombol kembali di pesan sukses (disembunyikan jika redirect otomatis aktif)
    if (this.backBtn) {
      this.backBtn.addEventListener("click", this.handleBackToMain.bind(this));
    }

    // Real-time validation untuk input teks/textarea
    const inputs = this.form.querySelectorAll(
      'input:not([type="radio"]), textarea',
    );
    inputs.forEach((input) => {
      input.addEventListener("blur", () => this.validateField(input));
      input.addEventListener("input", () => this.clearFieldError(input));
    });

    // Validation untuk radio button
    const radioButtons = this.form.querySelectorAll('input[type="radio"]');
    radioButtons.forEach((radio) => {
      radio.addEventListener("change", () => {
        this.validateField(radio);
        this.updateRadioButtonStyles();
      });
    });
  }

  /**
   * Setup form validation (menonaktifkan validasi HTML5 default)
   */
  setupFormValidation() {
    if (this.form) {
      this.form.setAttribute("novalidate", "true");
    }
  }

  /**
   * Validasi field individual
   * @param {HTMLElement} field - Elemen input/textarea yang error
   * @param {string} message - Pesan error yang akan ditampilkan
   */
  validateField(field) {
    const fieldName = field.name;
    const fieldValue = field.value.trim();
    const rules = VALIDATION_RULES[fieldName];

    if (!rules) return true; // Tidak ada aturan validasi untuk field ini

    this.clearFieldError(field); // Bersihkan error sebelumnya

    // Validasi required
    if (rules.required && !fieldValue) {
      if (field.type === "radio") {
        const radioGroup = this.form.querySelectorAll(
          `input[name="${fieldName}"]`,
        );
        const isChecked = Array.from(radioGroup).some((radio) => radio.checked);
        if (!isChecked) {
          this.showFieldError(field, rules.errorMessages.required);
          return false;
        }
      } else {
        this.showFieldError(field, rules.errorMessages.required);
        return false;
      }
    }

    // Lewati validasi lain jika field kosong dan tidak wajib
    if (!fieldValue && !rules.required) return true;

    // Validasi panjang (min/max length)
    if (rules.minLength && fieldValue.length < rules.minLength) {
      this.showFieldError(field, rules.errorMessages.minLength);
      return false;
    }

    if (rules.maxLength && fieldValue.length > rules.maxLength) {
      this.showFieldError(field, rules.errorMessages.maxLength);
      return false;
    }

    // Validasi pola (regex)
    if (rules.pattern && !rules.pattern.test(fieldValue)) {
      this.showFieldError(field, rules.errorMessages.pattern);
      return false;
    }

    return true;
  }

  /**
   * Validasi seluruh form
   * @returns {boolean} - True jika semua field valid, false jika ada yang tidak valid
   */
  validateForm() {
    let isValid = true;
    // Ambil semua input dan textarea (kecuali submit button)
    const fields = this.form.querySelectorAll(
      'input:not([type="submit"]), textarea',
    );

    fields.forEach((field) => {
      // Jika ada satu field yang tidak valid, set isValid menjadi false
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    return isValid;
  }

  /**
   * Menampilkan pesan error pada field input
   * @param {HTMLElement} field - Elemen input/textarea yang error
   * @param {string} message - Pesan error yang akan ditampilkan
   */
  showFieldError(field, message) {
    const errorElement = document.getElementById(field.name + "Error");
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.remove("hidden");
    }
    // Tambahkan styling error
    field.classList.add("border-red-500", "focus:ring-red-500");
    field.classList.remove("border-white/50", "focus:ring-wedding-rose");
  }

  /**
   * Menghapus pesan error pada field input
   * @param {HTMLElement} field - Elemen input/textarea yang akan dibersihkan errornya
   */
  clearFieldError(field) {
    const errorElement = document.getElementById(field.name + "Error");
    if (errorElement) {
      errorElement.textContent = "";
      errorElement.classList.add("hidden");
    }
    // Hapus styling error
    field.classList.remove("border-red-500", "focus:ring-red-500");
    field.classList.add("border-white/50", "focus:ring-wedding-rose");
  }

  /**
   * Memperbarui styling radio button berdasarkan pilihan
   */
  updateRadioButtonStyles() {
    const radioButtons = this.form.querySelectorAll('input[type="radio"]');
    radioButtons.forEach((radio) => {
      const customRadio = radio.nextElementSibling; // Ini adalah div .radio-custom
      const innerCircle = customRadio?.querySelector(".w-2\\.5"); // Lingkaran di dalamnya

      if (innerCircle) {
        innerCircle.style.opacity = radio.checked ? "1" : "0";
      }
    });
  }

  /**
   * Handle form submission (ketika tombol submit diklik)
   * @param {Event} event - Event submit form
   */
  async handleFormSubmit(event) {
    event.preventDefault(); // Mencegah reload halaman

    if (this.isSubmitting) return; // Mencegah double submission

    // Validasi form sebelum mengirim
    if (!this.validateForm()) {
      this.showNotification("Mohon perbaiki kesalahan pada form", "error");
      return;
    }

    this.isSubmitting = true; // Set status sedang mengirim
    this.setLoadingState(true); // Tampilkan loading pada tombol

    try {
      const formData = this.collectFormData(); // Kumpulkan data form
      await this.submitToGoogleSheets(formData); // Kirim data ke Apps Script

      this.showSuccessMessageWithRedirect(); // Tampilkan pesan sukses & mulai redirect
      this.retryCount = 0; // Reset counter retry
    } catch (error) {
      console.error("Error submitting form:", error);

      // Logika retry jika terjadi kegagalan
      if (this.retryCount < GOOGLE_SHEETS_CONFIG.maxRetries) {
        this.retryCount++;
        this.showNotification(
          `Gagal mengirim data. Mencoba lagi... (${this.retryCount}/${GOOGLE_SHEETS_CONFIG.maxRetries})`,
          "warning",
        );

        setTimeout(() => {
          this.handleFormSubmit(event); // Coba lagi setelah delay
        }, GOOGLE_SHEETS_CONFIG.retryDelay * this.retryCount);

        return; // Keluar dari fungsi agar tidak masuk finally dulu
      }

      // Jika semua retry gagal
      this.showNotification(
        "Gagal mengirim konfirmasi. Silakan coba lagi nanti.",
        "error",
      );
    } finally {
      this.isSubmitting = false; // Reset status mengirim
      this.setLoadingState(false); // Sembunyikan loading
    }
  }

  /**
   * Mengumpulkan data dari form menjadi objek
   * @returns {Object} - Objek berisi data form
   */
  collectFormData() {
    const formData = new FormData(this.form);
    const data = {};
    // Pastikan nama key sesuai dengan header di Google Sheet (case-insensitive)
    data.nama = formData.get("nama").trim();
    data.alamat = formData.get("alamat").trim();
    data.kehadiran = formData.get("kehadiran");
    data.timestamp = new Date().toISOString(); // Untuk kolom 'tanggal' di Apps Script
    data.useragent = navigator.userAgent; // Contoh data tambahan

    return data;
  }

  /**
   * Mengirim data ke Google Apps Script
   * @param {Object} data - Data yang akan dikirim
   */
  async submitToGoogleSheets(data) {
    // Mengubah objek data menjadi URL-encoded form data
    const formData = new URLSearchParams();
    for (const key in data) {
      // Pastikan key di-lowercase agar sesuai dengan e.parameter di Apps Script
      formData.append(key.toLowerCase(), data[key]);
    }

    const response = await fetch(GOOGLE_SHEETS_CONFIG.scriptURL, {
      method: "POST",
      mode: "cors",
      headers: {
        // Content-Type harus application/x-www-form-urlencoded untuk e.parameter
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(), // Kirim sebagai string URL-encoded
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    // Periksa properti 'result' dari respons Apps Script
    if (result.result !== "success") {
      throw new Error(result.error || "Gagal mengirim data ke Google Sheets");
    }

    return result;
  }

  /**
   * Mengatur status loading pada tombol submit
   * @param {boolean} isLoading - True jika sedang loading, false jika tidak
   */
  setLoadingState(isLoading) {
    if (!this.submitBtn) return;

    const btnText = this.submitBtn.querySelector(".btn-text");
    const btnLoading = this.submitBtn.querySelector(".btn-loading");

    this.submitBtn.disabled = isLoading; // Nonaktifkan tombol saat loading
    this.submitBtn.classList.toggle("loading", isLoading); // Tambah/hapus class loading
    btnText.style.display = isLoading ? "none" : "inline"; // Sembunyikan teks normal
    btnLoading.style.display = isLoading ? "flex" : "none"; // Tampilkan loading spinner
  }

  /**
   * Menampilkan pesan sukses dan memulai redirect otomatis
   */
  showSuccessMessageWithRedirect() {
    if (!this.form || !this.successMessage) return;

    // Fungsi yang akan dijalankan setelah form disembunyikan
    const transitionComplete = () => {
      this.form.style.display = "none";
      this.successMessage.classList.remove("hidden");

      // Sembunyikan tombol kembali karena akan redirect otomatis
      if (this.backBtn) {
        this.backBtn.style.display = "none";
      }

      // Animasikan pesan sukses
      if (typeof gsap !== "undefined" && REDIRECT_CONFIG.useAnimation) {
        gsap.from(this.successMessage, {
          duration: 0.8,
          opacity: 0,
          y: 20,
          ease: "power2.out",
          onComplete: () => {
            this.startRedirectCountdown(); // Mulai countdown setelah animasi pesan sukses
          },
        });
      } else {
        this.startRedirectCountdown(); // Langsung mulai countdown jika tanpa animasi
      }
    };

    // Sembunyikan form dengan animasi (jika GSAP tersedia)
    if (typeof gsap !== "undefined" && REDIRECT_CONFIG.useAnimation) {
      gsap.to(this.form, {
        duration: 0.5,
        opacity: 0,
        y: -20,
        ease: "power2.out",
        onComplete: transitionComplete,
      });
    } else {
      transitionComplete(); // Langsung sembunyikan form jika tanpa animasi
    }
  }

  /**
   * Memulai countdown redirect
   */
  startRedirectCountdown() {
    const countdownElement = document.createElement("p");
    countdownElement.className = "text-sm text-gray-600 mt-4";
    countdownElement.id = "redirectCountdown";
    this.successMessage.appendChild(countdownElement);

    let countdown = Math.ceil(REDIRECT_CONFIG.redirectDelay / 1000);

    const updateCountdown = () => {
      countdownElement.textContent = `Anda akan diarahkan ke halaman utama dalam ${countdown} detik...`;
      if (countdown <= 0) {
        this.performRedirect();
      } else {
        countdown--;
        setTimeout(updateCountdown, 1000);
      }
    };

    updateCountdown(); // Panggil pertama kali untuk menampilkan hitungan awal
  }

  /**
   * Melakukan redirect ke halaman utama
   */
  performRedirect() {
    if (typeof gsap !== "undefined" && REDIRECT_CONFIG.useAnimation) {
      gsap.to(document.body, {
        duration: 0.5,
        opacity: 0,
        ease: "power2.out",
        onComplete: () => {
          window.location.href = REDIRECT_CONFIG.mainPageURL;
        },
      });
    } else {
      window.location.href = REDIRECT_CONFIG.mainPageURL;
    }
  }

  /**
   * Handle kembali ke halaman utama (backup jika user mengklik tombol)
   */
  handleBackToMain() {
    this.performRedirect();
  }

  /**
   * Menampilkan notifikasi sementara di pojok kanan atas layar
   * @param {string} message - Pesan notifikasi
   * @param {string} type - Tipe notifikasi (success, error, warning, info)
   */
  showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 translate-x-full`;

    const typeClasses = {
      success: "bg-green-500 text-white",
      error: "bg-red-500 text-white",
      warning: "bg-yellow-500 text-black",
      info: "bg-blue-500 text-white",
    };

    notification.classList.add(...typeClasses[type].split(" "));
    notification.innerHTML = `
            <div class="flex items-center space-x-2">
                <i class="fas fa-${type === "success" ? "check" : type === "error" ? "times" : type === "warning" ? "exclamation" : "info"}-circle"></i>
                <span>${message}</span>
            </div>`;

    document.body.appendChild(notification);

    // Animasikan masuk
    setTimeout(() => notification.classList.remove("translate-x-full"), 100);

    // Animasikan keluar dan hapus setelah 5 detik
    setTimeout(() => {
      notification.classList.add("translate-x-full");
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }
}

// ===================================
// INITIALIZATION
// ===================================

// Inisialisasi form handler ketika DOM siap
let formHandler;

function initializeFormHandler() {
  console.log("📝 Menginisialisasi form handler dengan redirect otomatis...");
  formHandler = new WeddingFormHandler();
  console.log("✅ Form handler berhasil diinisialisasi!");
  console.log(`🔗 Redirect akan menuju: ${REDIRECT_CONFIG.mainPageURL}`);
  console.log(`⏱️ Delay redirect: ${REDIRECT_CONFIG.redirectDelay}ms`);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeFormHandler);
} else {
  initializeFormHandler();
}

// Export untuk digunakan di file lain
window.WeddingFormHandler = WeddingFormHandler;
window.REDIRECT_CONFIG = REDIRECT_CONFIG;
