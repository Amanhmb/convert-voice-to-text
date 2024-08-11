<?php
// إعداد الاتصال بقاعدة البيانات
$servername = "localhost";
$username = "root"; // اسم المستخدم الافتراضي
$password = ""; // كلمة المرور الافتراضية
$dbname = "robot"; // اسم قاعدة البيانات

// إنشاء الاتصال
$conn = new mysqli($servername, $username, $password, $dbname);

// التحقق من الاتصال
if ($conn->connect_error) {
    die("فشل الاتصال: " . $conn->connect_error);
}

// التحقق من استقبال البيانات
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['content'])) {
    $content = $conn->real_escape_string($_POST['content']);
    
    $sql = "INSERT INTO sound (content) VALUES ('$content')";
    
    if ($conn->query($sql) === TRUE) {
        echo "تم حفظ النص بنجاح.";
    } else {
        echo "خطأ: " . $conn->error;
    }
} else {
    echo "لا توجد بيانات للحفظ.";
}

$conn->close();
?>