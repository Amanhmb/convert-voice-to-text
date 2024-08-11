// محتويات script.js
const startButton = document.getElementById('start-recording');
const saveButton = document.getElementById('save-content');
const transcriptionField = document.getElementById('transcription');
const statusField = document.getElementById('status');
const resultField = document.getElementById('result');

let recognition;
if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
} else if ('SpeechRecognition' in window) {
    recognition = new SpeechRecognition();
} else {
    alert('متصفحك لا يدعم خاصية تحويل الصوت إلى نص.');
}

if (recognition) {
    recognition.lang = 'ar-SA'; // تعيين لغة الاستماع للعربية
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = function() {
        statusField.textContent = 'جاري التسجيل...';
    };

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        transcriptionField.value = transcript;
        statusField.textContent = 'تم الانتهاء من التسجيل.';
    };

    recognition.onerror = function(event) {
        statusField.textContent = 'حدث خطأ: ' + event.error;
    };

    recognition.onend = function() {
        statusField.textContent = 'تم إيقاف التسجيل.';
    };

    startButton.addEventListener('click', function() {
        recognition.start();
    });

    saveButton.addEventListener('click', function() {
        const content = transcriptionField.value;
        if (content.trim()) {
            saveToDatabase(content);
        } else {
            resultField.textContent = 'النص فارغ، لا يمكن الحفظ.';
        }
    });
}

function saveToDatabase(content) {
    fetch('save.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'content=' + encodeURIComponent(content) // التأكد من صياغة البيانات بشكل صحيح
    })
    .then(response => response.text())
    .then(data => {
        // عرض النتيجة بعد الرد من السيرفر
        resultField.textContent = data;
    })
    .catch(error => {
        // عرض رسالة خطأ في حال حدوث مشكلة
        resultField.textContent = 'حدث خطأ أثناء الحفظ: ' + error;
    });
}
