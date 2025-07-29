document.addEventListener('DOMContentLoaded', () => {
    // [UBAH] Variabel dipindahkan ke atas untuk diakses semua fungsi
    const petals = document.querySelectorAll('.petal');
    const messageDisplay = document.getElementById('message-display');
    const finalReveal = document.getElementById('final-reveal');
    const flowerContainer = document.querySelector('.flower-container');
    const instructionText = document.querySelector('.instruction-text');
    
    // [BARU] Fungsi untuk animasi judul dan memunculkan bunga
    function startIntroAnimation() {
        const titleLetters = document.querySelectorAll('.main-title .letter');
        
        // Memberi jeda animasi pada setiap huruf
        titleLetters.forEach((letter, index) => {
            letter.style.animationDelay = `${index * 0.07}s`;
        });

        // Hitung total durasi animasi judul untuk memunculkan bunga sesudahnya
        const totalAnimationTime = titleLetters.length * 0.07 * 1000; // dalam milidetik

        setTimeout(() => {
            flowerContainer.classList.add('visible');
            instructionText.classList.add('visible');
        }, totalAnimationTime);
    }

    const messages = [
        "You're my sunshine",
        "Kamu perempuan terhebat yang selalu ada...",
        "Terima kasih selalu jadi alasan buat aku bahagia setiap hari.",
        "Semua momen sama kamu jadi hal favorit buat aku.",
        "Aku harap dengan ini, kamu bahagia dan senang.",
        "Kamu cantik melebihi segalanya dari yang aku impikan.",
        "Kamu pantas untuk ini dan hal yang lebih menyenangkan lainnya.",
        "Dan sebagai penutup..."
    ];

    let expectedPetal = 1;
    let messageTimeout;

    petals.forEach((petal, index) => {
        const rotationAngle = 45 * index;
        const counterRotation = -rotationAngle;
        petal.querySelector('span').style.setProperty('--rotation', `${counterRotation}deg`);

        const originalTransform = window.getComputedStyle(petal).getPropertyValue('transform');
        petal.style.setProperty('--original-transform', originalTransform);

        petal.addEventListener('click', () => {
            const petalNumber = parseInt(petal.dataset.petal);

            if (petalNumber !== expectedPetal) {
                petal.classList.add('shake');
                setTimeout(() => {
                    petal.classList.remove('shake');
                }, 500);
                return;
            }
            
            if (petal.classList.contains('plucked')) return;

            petal.classList.add('plucked');
            const randomRotate = (Math.random() - 0.5) * 60;
            petal.style.setProperty('--random-rotate', `${randomRotate}deg`);
            
            let pluckedPetalsCount = expectedPetal;
            expectedPetal++;

            if (instructionText) instructionText.classList.add('hidden');
            if (messageTimeout) clearTimeout(messageTimeout);

            messageDisplay.textContent = messages[pluckedPetalsCount - 1];
            messageDisplay.classList.add('visible');

            messageTimeout = setTimeout(() => {
                messageDisplay.classList.remove('visible');
            }, 3000);

            if (pluckedPetalsCount === petals.length) {
                setTimeout(() => {
                    flowerContainer.style.transform = 'scale(0)';
                    flowerContainer.style.opacity = '0';
                    messageDisplay.classList.remove('visible');
                    setTimeout(() => {
                        finalReveal.classList.add('visible');
                    }, 800);
                }, 1000);
            }
        });
    });

    startIntroAnimation();
});