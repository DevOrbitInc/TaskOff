package com.devorbit.taskoff.data.api

import com.devorbit.taskoff.data.models.Task
import com.devorbit.taskoff.data.models.AuthResponse
import com.devorbit.taskoff.data.models.LoginRequest
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST

interface ApiService {
    @POST("api/auth/login")
    suspend fun login(@Body request: LoginRequest): AuthResponse

    @GET("api/tasks")
    suspend fun getTasks(): List<Task>
}
