package com.devorbit.taskoff.data.models

import com.google.gson.annotations.SerializedName

/**
 * User Data Model matching Backend User schema & TECHNICAL_SPEC.md
 */
data class User(
    @SerializedName("_id")
    val id: String,

    @SerializedName("fullName")
    val fullName: String,

    @SerializedName("email")
    val email: String,

    @SerializedName("createdAt")
    val createdAt: String? = null,

    @SerializedName("updatedAt")
    val updatedAt: String? = null
) {
    /**
     * Helper property to compute user avatar initials (e.g. "Doha H" -> "DH")
     */
    val initials: String
        get() {
            val parts = fullName.trim().split("\\s+".toRegex())
            return when {
                parts.isEmpty() -> ""
                parts.size == 1 -> parts[0].take(2).uppercase()
                else -> "${parts[0].first()}${parts[1].first()}".uppercase()
            }
        }
}
