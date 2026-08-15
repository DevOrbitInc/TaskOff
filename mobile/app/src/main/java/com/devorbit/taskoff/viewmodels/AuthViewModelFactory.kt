package com.devorbit.taskoff.viewmodels

import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.devorbit.taskoff.data.api.TaskApiFactory
import com.devorbit.taskoff.data.repository.AuthRepository

class AuthViewModelFactory(
    private val applicationContext: Context
) : ViewModelProvider.Factory {
    @Suppress("UNCHECKED_CAST")
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (AuthViewModel::class.java.isAssignableFrom(modelClass)) {
            return AuthViewModel(
                AuthRepository(
                    apiService = TaskApiFactory.create(applicationContext),
                    applicationContext = applicationContext
                )
            ) as T
        }

        throw IllegalArgumentException("Unknown ViewModel class: ${modelClass.name}")
    }
}
