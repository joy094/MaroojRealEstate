document.addEventListener("DOMContentLoaded", function() {

    // ১. প্রয়োজনীয় HTML উপাদানগুলো ধরুন
    // যেহেতু একাধিক কার্ড আছে, তাই সব 'book-btn' বাটন ধরুন
    const bookNowButtons = document.querySelectorAll(".book-btn"); 
    const modalOverlay = document.getElementById("modalOverlay");
    const bookingForm = document.getElementById("bookingForm");
    const thankYouMessage = document.getElementById("thankYouMessage");
    // একই ক্লাস দিয়ে একাধিক বন্ধ করার বাটন ধরুন
    const closeButtons = document.querySelectorAll(".close-button");

    // === A: ফর্ম দেখানো এবং লুকানো (পপ-আপ ম্যানেজমেন্ট) ===

    // একাধিক 'Book Now' বাটনে ক্লিক ইভেন্ট লিসেনার যোগ
    bookNowButtons.forEach((button) => {
        button.addEventListener("click", function () {
            // পপ-আপ দেখানো
            modalOverlay.classList.add("modal-visible"); 
            
            // নিশ্চিত করা হলো ফর্মটি দেখা যায় এবং থ্যাঙ্ক ইউ মেসেজ লুকানো
            bookingForm.style.display = "block"; 
            thankYouMessage.style.display = "none";
        });
    });

    // বন্ধ করার বাটনগুলোতে ইভেন্ট লিসেনার: পপ-আপ লুকানোর জন্য
    closeButtons.forEach((button) => {
        button.addEventListener("click", function () {
            // পপ-আপ লুকানো
            modalOverlay.classList.remove("modal-visible"); 
        });
    });
    
    // ওভারলেতে ক্লিক করলে বন্ধ করার জন্য (ঐচ্ছিক)
    modalOverlay.addEventListener('click', function(e) {
        // যদি ক্লিকটি কন্টেন্ট বক্সের বাইরে হয়
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('modal-visible');
        }
    });

    // === B: ফর্ম সাবমিশন এবং রেসপন্স হ্যান্ডলিং ===

    bookingForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const data = new FormData(event.target);
        
        // Formspree-কে ডেটা পাঠানো
        const response = await fetch(event.target.action, {
            method: bookingForm.method,
            body: data,
            headers: {
                'Accept': 'application/json',
            },
        });

        // 🚀 রেসপন্স পরীক্ষা: response.ok নিশ্চিত করছে সাবমিশন সফল হয়েছে
        if (response.ok) {
            // ✅ সাবমিশন সফল হলে:
            
            // ১. ফর্মটি লুকিয়ে রাখা
            bookingForm.style.display = "none";
            
            // ২. থ্যাঙ্ক ইউ মেসেজটি দেখানো
            thankYouMessage.style.display = "block" ;
             thankYouMessage.style.fontFamily = "Tiro bangla", serif;
            
            // ফর্মের ডেটা রিসেট করা (ঐচ্ছিক, পরেরবার খোলার জন্য)
            bookingForm.reset(); 
        } else {
            // ❌ সাবমিশন ব্যর্থ হলে
            alert("ফর্ম সাবমিট করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
        }
    });
});