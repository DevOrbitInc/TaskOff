package com.devorbit.taskoff.data.repository

import android.content.Context
import com.devorbit.taskoff.data.api.ApiService
import com.devorbit.taskoff.data.api.SessionTokenStore
import com.devorbit.taskoff.data.models.AuthResponse
import com.devorbit.taskoff.data.models.LoginRequest

class AuthRepository(
    private val apiService: ApiService,
    private val applicationContext: Context
) {
    suspend fun login(email: String, password: String): AuthResponse {
        val response = apiService.login(LoginRequest(email = email, password = password))
        SessionTokenStore.save(applicationContext, response.token)
        return response
    }
}
