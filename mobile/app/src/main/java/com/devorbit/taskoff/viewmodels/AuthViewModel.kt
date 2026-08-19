package com.devorbit.taskoff.viewmodels

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.devorbit.taskoff.data.repository.AuthRepository
import java.io.IOException
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import retrofit2.HttpException

sealed interface AuthUiState {
    data object Idle : AuthUiState
    data object Loading : AuthUiState
    data object Success : AuthUiState
    data class Error(val message: String) : AuthUiState
}

class AuthViewModel(
    private val repository: AuthRepository
) : ViewModel() {
    private val _uiState = MutableLiveData<AuthUiState>(AuthUiState.Idle)
    val uiState: LiveData<AuthUiState> = _uiState

    fun login(email: String, password: String) {
        val normalizedEmail = email.trim()
        if (normalizedEmail.isBlank() || !normalizedEmail.contains("@")) {
            _uiState.value = AuthUiState.Error("Enter a valid email address.")
            return
        }
        if (password.isBlank()) {
            _uiState.value = AuthUiState.Error("Enter your password.")
            return
        }

        viewModelScope.launch {
            _uiState.value = AuthUiState.Loading
            try {
                withContext(Dispatchers.IO) {
                    repository.login(normalizedEmail, password)
                }
                _uiState.value = AuthUiState.Success
            } catch (error: Exception) {
                _uiState.value = AuthUiState.Error(error.toUserMessage())
            }
        }
    }
}

private fun Throwable.toUserMessage(): String = when (this) {
    is HttpException -> when (code()) {
        401 -> "Invalid email or password."
        else -> "We could not sign you in right now. Please try again."
    }
    is IOException -> "We could not reach the server. Check your connection and try again."
    else -> "We could not sign you in right now. Please try again."
}
