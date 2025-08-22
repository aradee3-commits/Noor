# قواعد مبدئية - وسّعها لاحقاً حسب المكتبات التي ستضيفها

# احتفظ بفئات R (تلقائياً عادةً)
-keep class **.R {
    *;
}
-keep class **.R$* {
    *;
}

# (اختياري) الإبقاء على أسماء الدوال العامة في الحزم الداخلية لاحقاً عند إضافة مكتبات انعكاس/JSON
# -keepclassmembers class com.example.noor.** { *; }

# تجاهل التحذيرات العامة
-dontwarn javax.annotation.**
-dontwarn org.jetbrains.annotations.**

# تحسينات افتراضية (يُوفّرها ملف Android الافتراضي أيضاً)
# إذا واجهت مشاكل في Debugging، يمكنك تعطيل الإزالة:
# -dontoptimize
# -dontobfuscate