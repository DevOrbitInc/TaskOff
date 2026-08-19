package com.devorbit.taskoff.data.models

import com.google.gson.annotations.SerializedName

/**
 * Standard Error Response Shape matching TECHNICAL_SPEC.md
 */
data class ApiErrorDetail(
    @SerializedName("message")
    val message: String,

    @SerializedName("code")
    val code: String? = null
)

/**
 * Standard API Response Wrapper
 */
data class ApiResponse<T>(
    @SerializedName("success")
    val success: Boolean = true,

    @SerializedName("data")
    val data: T? = null,

    @SerializedName("error")
    val error: ApiErrorDetail? = null
)

/**
 * Auth Response returned by /api/auth/login and /api/auth/register
 */
data class AuthResponse(
    @SerializedName("token")
    val token: String,

    @SerializedName("user")
    val user: User
)

data class LoginRequest(
    @SerializedName("email")
    val email: String,

    @SerializedName("password")
    val password: String
)
