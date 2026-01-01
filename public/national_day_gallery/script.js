document.addEventListener('DOMContentLoaded', function() {
    
    // --- إعداد خلفية الجسيمات ---
    tsParticles.load("tsparticles", {
        fullScreen: { enable: false },
        particles: {
            number: { value: 60, density: { enable: true, value_area: 800 }},
            color: { value: ["#ffd700", "#00A99D", "#8CC63F", "#ffffff"] },
            shape: { type: "circle" },
            opacity: { value: 0.8, random: true },
            size: { value: 5, random: true },
            move: {
                enable: true,
                speed: 2,
                direction: "bottom",
                straight: false,
                out_mode: "out",
                bounce: false,
            }
        },
        interactivity: {
            detectsOn: "canvas",
            events: {
                onHover: { enable: true, mode: "repulse" },
                resize: true
            }
        },
        detectRetina: true,
    });

    // --- إعداد التحكم بالصوت (المنطق الجديد والمصحح) ---
    const audio = document.getElementById('background-audio');
    const muteBtn = document.getElementById('mute-btn');
    const volumeSlider = document.getElementById('volume-slider');
    
    const initialVolume = 0.2;
    audio.volume = initialVolume;
    volumeSlider.value = initialVolume;

    const playlist = [ 'sound/1.m4a', 'sound/2.m4a', 'sound/3.m4a' ];
    let hasInteracted = false;

    // وظيفة لتشغيل مقطع عشوائي
    function playRandomAudio() {
        const randomIndex = Math.floor(Math.random() * playlist.length);
        audio.src = playlist[randomIndex];
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                hasInteracted = true;
            }).catch(error => {
                console.log("Autoplay was prevented. Waiting for user interaction.");
                setupInteractionListener();
            });
        }
    }

    // استدعاء الوظيفة عند انتهاء المقطع
    audio.addEventListener('ended', playRandomAudio);

    // --- المنطق الجديد للتحكم بالصوت ---

    // 1. شريط التحكم يؤثر مباشرة على مستوى الصوت
    volumeSlider.addEventListener('input', () => {
        // قم بتعيين مستوى الصوت مباشرة من قيمة الشريط
        audio.volume = volumeSlider.value;
        // عند تحريك الشريط، نفترض أن المستخدم يريد سماع الصوت، لذلك نلغي الكتم
        audio.muted = false;
        // تحديث شكل الأيقونة
        updateMuteButtonIcon();
    });

    // 2. زر الكتم يبدل حالة الكتم فقط
    muteBtn.addEventListener('click', () => {
        // قم بتبديل حالة الكتم
        audio.muted = !audio.muted;

        // إذا قمنا بإلغاء الكتم وكان مستوى الصوت صفراً، نرفعه قليلاً
        if (!audio.muted && audio.volume === 0) {
            audio.volume = 0.1; // ارفعه إلى 10%
            volumeSlider.value = 0.1;
        }
        
        // تحديث شكل الأيقونة
        updateMuteButtonIcon();
    });

    // وظيفة لتحديث شكل أيقونة الصوت بناءً على حالتين: الكتم أو مستوى الصوت صفر
    function updateMuteButtonIcon() {
        if (audio.muted || audio.volume === 0) {
            muteBtn.textContent = '🔇';
        } else {
            muteBtn.textContent = '🔊';
        }
    }

    // وظيفة لإعداد مستمع النقرة (الخطة البديلة)
    function setupInteractionListener() {
        const startAudioOnInteraction = () => {
            if (!hasInteracted) {
                audio.play();
                hasInteracted = true;
                document.body.removeEventListener('click', startAudioOnInteraction);
                document.body.removeEventListener('touchend', startAudioOnInteraction);
            }
        };
        document.body.addEventListener('click', startAudioOnInteraction);
        document.body.addEventListener('touchend', startAudioOnInteraction);
    }
    
    // ابدأ العملية
    playRandomAudio();
    // قم بتحديث الأيقونة عند بدء التشغيل للتأكد من أنها صحيحة
    updateMuteButtonIcon();
});