# ProGuard / R8 rules for Noor
# Keep application class and main activity (adjust if new classes are added)
-keep class com.example.noor.MainActivity { *; }

# Keep view binding classes (generated)
-keep class **Binding { *; }

# If using ML Kit or reflection-heavy libs later, add their keep rules here.
