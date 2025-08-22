package com.example.noor

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.noor.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.messageText.text = getString(R.string.welcome_message)

        // TODO: لاحقاً: إضافة منطق التقاط/اختيار صورة ثم تنفيذ OCR
        binding.actionButton.setOnClickListener {
            // Placeholder action
            binding.messageText.text = getString(R.string.placeholder_action)
        }
    }
}