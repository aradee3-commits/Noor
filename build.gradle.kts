plugins {
    // يمكن إضافة Plugins لاحقاً (مثل detekt أو ktlint)
}

tasks.register<Delete>("clean") {
    delete(rootProject.layout.buildDirectory)
}